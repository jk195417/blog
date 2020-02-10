---
title: 在 Angular 中請這樣用 RxJS
tags:
  - angular
  - rxjs
thumbnail: using-rxjs-this-way-in-angular/angular+rxjs.png
toc: true
date: 2020-02-10 21:25:06
---

本篇只是閱讀原文後的譯文
原文出處： <https://blog.strongbrew.io/rxjs-best-practices-in-angular>

<!-- more -->

## Stream 加上 `$` suffix

這是一個由 Cycle.js 開始的[慣例](https://cycle.js.org/basic-examples.html#basic-examples-increment-a-counter-what-is-the-convention)

Angular 官方也[建議](https://angular.io/guide/rx-library#naming-conventions-for-observables)，在 `Observable` 型別的變數後面加上 `$` ，這樣一看就知道是不是 observable

```html
<!-- bad -->
<li *ngFor="let hero of heroes | async" />

<!-- good -->
<li *ngFor="let hero of heroes$ | async" />
```

---

## 使用 pure functions

pure functions 的定義

- functions 不會改動任何的外部狀態
- functions 不依賴 input 以外的 outside state，一樣的 input 會得到一樣的 output

[補充資料](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976)

此為 functional programming 的基礎，當我們在 reactive flow 時，遵循這個原則可以讓我們不會被 outside state 干擾，更專注於 reactive 的行為上

---

## 記得 `unsubscribe()`

不要造成 memory leak

常用 3 招 unsubscribe 所有的 subscriptions

1. 使用 array

    ```ts
    import { Subscription } from 'rxjs';
    class AppComponent implements OnDestroy {
        private subscriptions = Subscription[];

        this.subscriptions.push(observable1$.subscribe());
        this.subscriptions.push(observable2$.subscribe());
        this.subscriptions.push(observable3$.subscribe());

        ngOnDestroy() {
            this.subscriptions.forEach(s => s.unsubscribe());
        }
    }
    ```

2. 使用 `takeUntil()` operator

    ```ts
    class AppComponent implements OnDestroy {
        private destroy$ = new Subject();

        this.observable1$.pipe(takeUntil(this.destroy$)).subscribe());
        this.observable2$.pipe(takeUntil(this.destroy$)).subscribe());
        this.observable3$.pipe(takeUntil(this.destroy$)).subscribe());

        ngOnDestroy() {
            this.destroy$.next(true);
        }
    }
    ```

3. 使用 <https://github.com/wardbell/subsink>

    ```ts
    class AppComponent implements OnDestroy {
        private subs = new SubSink();

        this.subs.sink = observable1$.subscribe();
        this.subs.sink = observable2$.subscribe();
        this.subs.sink = observable3$.subscribe();

        ngOnDestroy() {
            this.subs.unsubscribe();
        }
    }
    ```

---

## 不要重複訂閱

```ts
// bad
ngOnInit() {
    this.loadData()
}

loadData() {
    this.observable$.subscribe(result => this.result = result);
}
```

`loadData()` 如果會被重複使用到就造成重複訂閱了

```ts
// good
ngOnInit() {
    this.observable$.subscribe(result => this.result = result);
}
```

---

## 不要 nested subscribes

```ts
// bad
class AppComponent {
    user: User;

    constructor(private route: ActivatedRoute, private userService: UserService){
        this.route.params.pipe(map(v => v.id))
        .subscribe(id => this.userService.fetchById(id)
            .subscribe(user => this.user = user));
    }
}
```

```ts
// good
class AppComponent {
    user: User;
    constructor(private route: ActivatedRoute, private userService: UserService){
        this.route.params.pipe(
            map(v => v.id),
            switchMap(id => this.userService.fetchById(id))
        )
        .subscribe(user => this.user = user);
    }
}
```

再來一個 Akita 的例子

```ts
// bad
this.userService.query.username$.subscribe(
    username => this.userService.getUserProfile(username).subscribe()
);

// good
this.userService.query.username$.pipe(
    mergeMap(username => this.userService.getUserProfile(username))
).subscribe();
```

**憋不住寫出 nested subscribes，請用 `switchMap`, `concatMap`, `mergeMap`, `exhaustMap` 重構這坨糙 code**

---

## 可以用 `async` pipeline 就不要自己 subscribe

好處

1. 自動幫你 on init subscribe
2. 自動幫你 on destroy unsubscribe
3. code 變少了 更好看

```ts
@Component({
    template: `<user-detail [user]="user$ | async"></user-detail>`
})
class AppComponent {
    user$ = this.route.params.pipe(
        map(v => v.id),
        switchMap(id => this.userService.fetchById(id))
    );
    constructor(private route: ActivatedRoute,private userService: UserService) {}
}
```

---

## 不要從父組件傳 stream 給子組件

父組件訂閱 stream 後，直接傳值給子組件

這樣一來就不用每個子組件都訂閱一次，使用更少記憶體，且邏輯也更清晰

```ts
// bad
// app.component.ts
@Component({
    selector: 'app',
    template: `<user-detail [user$]="user$"></user-detail>`
})
class AppComponent {
    users$ = this.http.get('https://api.example.com/users');
}

// user-detail.component.ts
@Component({
    selector: 'user-detail',
    template: ``
})
class UserDetailComponent implements OnInit {
    @Input() user$: Observable<User>;
    user: User;
    ngOnInit(){
        this.user$.subscribe(user => this.user = user);
    }
}
```

```ts
// good
// app.component.ts
@Component({
    selector: 'app',
    template: `<user-detail [user]="user$ | async"></user-detail>`
})
class AppComponent implements OnInit {
    users$: Observable<User[]> = this.http.get(...);
    user: User;
    ngOnInit(){
        this.users$ = this.http.get('https://api.example.com/users');
    }
    ...
}

// user-detail.component.ts
@Component({
    selector: 'user-detail',
    template: ``
})
class UserDetailComponent {
    @Input() user: User;
}
```

---

## 不要從 component 傳 stream 給 service

原本一個 stream 從 **service** 出發，到 **component** 被 subscribe

**services** > **component**

這個時候你又把 stream 作為參數傳回 service，如果這個 service 又被其他 component 使用

**services** > **component** > **service** > **components** > **...**

此時這個 Stream 的生命週期就沒完沒了了

```ts
// bad
// app.component.ts
class AppComponent {
    users$ = this.http.get('https://api.example.com/users');
    filteredUsers$ = this.fooService.filterUsers(this.users$);
}

// foo.service.ts
class FooService {
    filterUsers(users$: Observable<User[]>): Observable<User[]> {
        return users$.pipe(map(users => users.filter(user => user.age >= 18))
    }
}
```

正確做法應該是

```ts
// good
// app.component.ts
class AppComponent {
    users$ = this.http.get('https://api.example.com/users')
    filteredUsers$ = this.users$.pipe(switchMap(users => this.fooService.filterUsers(users)));
}

// foo.service.ts
class FooService {
    filterUsers(users: User[]): User[] {
        return users.filter(user => user.age >= 18);
    }
}
```

---

## 少用 `BehaviorSubject` 與 Akita 的 `getValue()`

當你使用 `getValue()` 的瞬間，你就已經 not thinking reactive 了

---

## 保持 Clean code

1. pipe 內的 operators 對齊好

    ```ts
    foo$.pipe(
        map(...)
        filter(...)
        tap(...)
    )
    ```

2. stream 邏輯太複雜的時候抽到另一個 stream 中，可以用 `subject$.next()`

    ```ts
    // Listening on save button click
    this.subscriptions.push(
        this.onSaveBtnClick$.subscribe(data => {
            const user: User = { ...data };
            !user.id ? this.createRecord$.next(user) : this.updateRecord$.next(user);
        })
    );

    // Listening on record create
    this.subscriptions.push(
        this.createRecord$.pipe(
            mergeMap(user => this.userService.create(user))
        )
        .subscribe(_ => console.info('user created'))
    );

    // Listening on record update
    this.subscriptions.push(
        this.updateRecord$.pipe(
            mergeMap(user => this.userService.update(user.id, user))
        )
        .subscribe(_ => console.info('user created'))
    );
    ```

3. operator 中的邏輯太複雜的時候，可以抽到 `private` method 中
4. 單行能解決，就不用 `{}`

    ```ts  
    // bad
    observable$.subscribe(result => {
        console.log(result)
    })

    // good
    observable$.subscribe(result => console.log(result))
    ```
