---
title: using-rxjs-this-way-in-angular
toc: true
tags:
  - angular
  - rxjs
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

-   functions 不會改動任何的外部狀態
-   functions 不依賴 input 以外的 outside state，一樣的 input 會得到一樣的 output

[補充資料](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976)

此為 functional programming 的基礎，當我們在 reactive flow 時，遵循這個原則可以讓我們不會被 outside state 干擾，更專注於 reactive 的行為上

---

## 記得 `unsubscribe()`

不要造成 memory leak

常用兩招 unsubscribe 所有的 subscriptions

1.  使用 array

    ```ts
    import { Subscription, Observable } from 'rxjs';
    class AppComponent implements OnInit, OnDestroy {
      private subscriptions = Subscription[];

      ngOnInit() {
        this.subscriptions.push(heroes$.subscribe());
      }

      ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
      }
    }
    ```

2.  使用 `takeUntil()` operator

    ```ts
    class AppComponent implements OnInit, OnDestroy {
      private destroy$ = new Subject();

      ngOnInit() {
        this.heroes$.pipe(takeUntil(this.destroy$)).subscribe());
      }

      ngOnDestroy() {   
        this.destroy$.next(true);
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
	this.heroes$.subscribe(heroes => this.heroes = heroes)
}
```
`loadData()` 如果被 call 到就重複訂閱了

```ts
// good
ngOnInit() {
	this.heroes$.subscribe(heroes => this.heroes = heroes)
}
```
---

## 不要 nested subscribes
```ts
// bad
class AppComponent {
  user: User;

  constructor(private route: ActivatedRoute, private userService: UserService){
    this.route.params.pipe(map(v => v.id)).subscribe(
      id => this.userService.fetchById(id).subscribe(user => this.user = user)
    )
  }
}
```

    // good
    class AppComponent {
        user: User;
        constructor(
            private route: ActivatedRoute,
            private userService: UserService)
        {
            this.route.params
                .pipe(
                    map(v => v.id),
                    switchMap(id => this.userService.fetchById(id))
                )
                .subscribe(user => this.user = user)
        }
    }

再來一個 Akita 的例子

    // bad
    this.userService.query.username$.subscribe(
      username => this.userService.updateSecuritiesAndPreference(username).subscribe()
    )

    // good
    this.userService.query.username$.pipe(
      mergeMap(username => this.userService.updateSecuritiesAndPreference(username))
    ).subscribe()

**憋不住寫出 nested subscribes，請用 `switchMap`, `mergeMap`, `exhaustMap` 重構這坨糙 code**

---

## 可以用 `async` pipeline 就不要自己 subscribe

好處

1.  自動幫你 on init subscribe
2.  自動幫你 on destroy unsubscribe
3.  code 變少了 更好看

    @Component({
        ...
        template: `<user-detail [user]="user$|async"></user-detail>`
    })
    class AppComponent {
        // expose a user$ stream that will be
        // subscribed in the template with the async pipe
        user$ = this.route.params.pipe(
            map(v => v.id),
            switchMap(id => this.userService.fetchById(id))
        );

        constructor(
            private route: ActivatedRoute,
            private userService: UserService) {
        }

    }

---

## 不要從父組件傳 stream 給子組件

父組件訂閱 stream 後，直接傳值給子組件

這樣一來就不用每個子組件都訂閱一次，使用更少記憶體，且邏輯也更清晰

    // bad
    // app.component.ts
    @Component({
        selector: 'app',
        template: `
            <!--
                BAD: The users$ steram is passed
                to user-detail directly as a stream
            -->
            <user-detail [user$]="user$"></user-detail>
        `
    })
    class AppComponent {
        // this http call will get called when the
        // user-detail component subscribes to users$
        // We don't want that
        users$ = this.http.get(...);
        ...
    }

    // user-detail.component.ts
    @Component({
        selector: 'user-detail',
        template: `

        `
    })
    class UserDetailComponent implements OnInit {
        @Input() user$: Observable<User>;
        user: User;
        ngOnInit(){
            // WHOOPS! This child component subscribes to the stream
            // of the parent component which will do an automatic XHR call
            // because Angular HTTP returns a cold stream
            this.user$.subscribe(u => this.user = u);
        }
    }

    // good
    // app.component.ts
    @Component({
        selector: 'app',
        template: `
            <user-detail [user]="user$|async"></user-detail>
        `
    })
    class AppComponent implements OnInit {
        users$: Observable<User[]> = this.http.get(...);
        user: User;
        ngOnInit(){
            // the app component (smart) subscribes to the user$ which will
            // do an XHR call here
            this.users$ = this.http.get(...);
        }
        ...
    }

    // user-detail.component.ts
    @Component({
        selector: 'user-detail',
        template: `

        `
    })
    class UserDetailComponent {
        // This component doesn't even know that we are using RxJS which
        // results in better decoupling
        @Input() user: User;
    }

---

## 不要從 component 傳 stream 給 service

原本一個 stream 從 **service** 出發，到 **component** 被 subscribe

**services > component**

這個時候你又把 stream 作為參數傳回 service，如果這個 service 又被其他 component 使用

**services > component > servcie > components...**

此時這個 Stream 的生命週期就沒完沒了了

    // bad
    // app.component.ts
    class AppComponent {
         users$ = this.http.get(...)
         filteredusers$ = this.fooService
            .filterUsers(this.users$); // Passing stream directly: BAD
        ...
    }

    // foo.service.ts
    class FooService {
        // return a stream based on a stream
        // BAD! because we don't know what will happen here
        filterUsers(users$: Observable<User[]>): Observable<User[]> {
            return users$.pipe(
                map(users => users.filter(user => user.age >= 18))
        }
    }

正確做法應該是

    // good
    // app.component.ts
    class AppComponent {
        users$ = this.http.get(...)
        filteredusers$ = this.users$
            .pipe(switchMap(users => this.fooService.filterUsers(users)));
        ...
    }

    // foo.service.ts
    class FooService {
        // this is way cleaner: this service doesn't even know
        // about streams now
        filterUsers(users: User[]): User[] {
            return users.filter(user => user.age >= 18);
        }
    }

---

## 少用 `BehaviorSubject` 與 Akita 的 `getValue()`

當你使用 `getValue()` 的瞬間，你就已經 not thinking reactive 了

---

## 保持 Clean code

1.  pipe 內的 operators 對齊好

        foo$.pipe(
        	map(...)
          filter(...)
          tap(...)
        )

2.  stream 邏輯太複雜的時候抽到另一個 stream 中，可以用 `subject$.next()`

        // Listening on save button click
        this.subscriptions.push(
            this.onSaveBtnClick$.subscribe(_event => {
            const customer = <CcrCustomer>{ ...this.selectedCustomer };
            customer.search_term = this.formValidation.value.search_term.toUpperCase();
            customer.ccr_contact_usernames = this.formValidation.value.ccr_contact_usernames.toUpperCase();
            customer.enable_flag = this.formValidation.value.enable_flag;
            customer.update_by_worker_no = Number(this.userService.query.getValue().details.workerNumber);
            customer.update_time = new Date();
            customer.update_time_t = this.datePipe.transform(customer.update_time, 'yyyy-MM-dd HH:mm:ss');
            !customer.sn ? this.createRecord$.next(customer) : this.updateRecord$.next(customer);
            })
        );

        // Listening on record create
        this.subscriptions.push(
            this.createRecord$
            .pipe(
                mergeMap(customer => this.pcnCcrCustomerListService.addCustomer(customer)),
                // TODO: If API can return sn we created, then we don't need to request all terms again.
                mergeMap(_success => this.pcnCcrCustomerListService.getCustomers())
            )
            .subscribe(_customers => {
                this.messenger.successToastr(`Search term of CCR protect customer is created.`, 'Success');
                this.selectCustomer(null);
            })
        );

        // Listening on record update
        this.subscriptions.push(
            this.updateRecord$.pipe(
        			mergeMap(customer => this.pcnCcrCustomerListService.updateCustomer(customer))
        		).subscribe(_success => {
        	    this.messenger.successToastr(`Search term of CCR protect customer ${this.selectedCustomer.search_term} is updated.`, 'Success');
        	    this.selectCustomer(null);
        	  })
        );

3.  operator 中的邏輯太複雜的時候，可以抽到 `private` method 中
4.  單行能解決，就不用 `{}`

        // bad
        heroes$.subscribe(heroes => console.log(heroes))

        // good
        heroes$.subscribe(heroes => {
        	console.log(heroes)
        })
