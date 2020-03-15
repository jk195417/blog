---
title: '從 Ruby 到 C# - operators'
tags:
  - ruby
  - c#
thumbnail: from-ruby-to-c-sharp/ruby-and-c-sharp-icons.png
toc: true
categories:
  - 技術文章
  - 從 Ruby 到 C#
---

Ruby 與 C# 的 operators 蠻相近的，應該說整個程式圈的 operators 都大概長那樣阿，~~嗯，沒錯，本篇完~~

欸，不是，我們快速帶過相同用法的 operators ，然後聊聊有差異的地方，這樣總行了吧

<!-- more -->

## 賦值 Assignment

最基本的賦值 `=` 相同

```ruby
# Ruby
foo = "bar"
```

```csharp
// C#
var foo = "bar";
```

數學運算相關的 operators `+=`，`-=`，`*=`，`/=` 與 `%=` 皆相同，但 Ruby 還有多一個次方運算後賦值的 `**=`

```ruby
# Ruby
foo = 0 # => 0
foo += 3 # foo = foo + 3 => 3
foo -= 1 # foo = foo - 1 => 2
foo *= 10 # foo = foo * 10 => 20
foo /= 5 # foo = foo / 5 => 4
foo %= 3 # foo = foo % 3 => 1
foo **= 3 # foo = foo ** 3 => 1
```

```csharp
// C#
var foo = 0; // => 0
foo += 3; // foo = foo + 3 => 3
foo -= 1; // foo = foo - 1 => 2
foo *= 10; // foo = foo * 10 => 20
foo /= 5; // foo = foo / 5 => 4
foo %= 3; // foo = foo % 3 => 1
```

位元運算相關的 operators `&=`，`|=` 與 `^=` 也相同

```ruby
# Ruby
foo = true # => true
foo &= false # foo = foo & false => false
foo |= true # foo = foo | true => true
foo ^= true # foo = foo ^ true => false
```

```csharp
// C#
var foo = true; // => true
foo &= false; // foo = foo & false => false
foo |= true; // foo = foo | true => true
foo ^= true; // foo = foo ^ true => false
```

邏輯運算相關的賦值 operators 就有點不同了，在 Ruby 中有 `||=` 的用法，而 C# 可用 `??=` 做到

```ruby
# Ruby
numbers ||= []
numbers << 5
```

```csharp
// C#
List<int> numbers = null;
numbers ??= new List<int>();
numbers.Add(5);
```

在 Ruby 中，我們常以 `||=` 為變數加上預設值，如果變數已經有值了就保持不動，若變數 undefined 或為 `nil`/`false` 才賦值

```ruby
# Ruby
$redis ||= Redis.new # 如果沒有 redis client 就補建一個
```

比較少應用場景的 `&&=`，在 C# 中需要 override `&=`

> 有人在 StackOverflow 上[提問](https://stackoverflow.com/questions/6346001/why-are-there-no-or-operators-in-c) ，為何 C# 沒有 `||=` 與 `&&=`，我個人是不太認同[此觀點](https://stackoverflow.com/a/6346266/9762797)，反正常用的 `||=` 可以用 `??=` 取代，影響不大，有興趣的網友可以加入這串討論

---

## 比較 Comparison

Ruby 與 C# 在 `==`，`!=`，`>`，`>=`，`<`，`<=` 與三元表示法 `? :` 都相同

```ruby
# Ruby
a = 10
b = 50
a == b # => false
a != b # => true
a > b # => false
a >= b # => false
a < b # => true
a <= b # => true
a < b ? 'yes' : 'no' # => 'yes'
```

```csharp
// C#
var a = 10;
var b = 50;
a == b // => false
a != b // => true
a > b // => false
a >= b // => false
a < b // => true
a <= b // => true
(a < b) ? 'yes' : 'no' // => 'yes'
```

不過 Ruby 中有一個特別的 operator `<=>`，它會回傳四種結果：

- -1 小於
- 0 等於
- 1 大於
- nil 無法比較

```ruby
# Ruby
a = 100
a <=> 101 # -1
a <=> 100 # 0
a <=> 99 # 1
a <=> '100' # nil
```

常常能在[排序演算法](https://ruby-doc.org/core-2.7.0/Array.html#method-i-sort)中見到他的身影

> 補充，在 Ruby 中，我們可以在 lass 中 include [Comparable](https://ruby-doc.org/core-2.7.0/Comparable.html) module，為 class 擴充 7 種比較 methods `<`，`<=`，`==`，`>`，`>=`，`between?`與`clamp`

```ruby
# Ruby
array.sort{ |a, b| a <=> b }
```

---

## 算數 Arithmetic

數學相關的 `+`，`-`，`*`，`/` 與 `%` 皆相等

但 Ruby 有次方運算 `**`，沒有 `++` 與 `--`，見[官方 FAQ](https://www.ruby-lang.org/en/documentation/faq/7)

{% asset_img ruby-faq-7-++--.png %}

```ruby
number = 10
number + 1 # => 11
number - 1 # => 9
number * 2 # => 20
number / 3 # => 3
number % 3 # => 1
number ** 2 # => 100
```

```csharp
var number = 10;
number + 1; // => 11
number - 1; // => 9
number * 2; // => 20
number / 3; // => 3
number % 3; // => 1
number++; // 11
number--; // 10
```

---

## 位元 Bitwise

`~`，`<<`，`>>`，`&`，`|`，`^` 在 bitwise 上的用法完全相同

```ruby
# Ruby
a = 0b1100101
b = 0b1010101
~a # => 0b..10011010
a << 1 # => 0b11001010
a >> 2 # => 0b11001
a & b # => 0b1000101
a | b # => 0b1110101
a ^ b # => 0b0110000
```

```csharp
// C#
uint a = 0b1100101;
uint b = 0b1010101;
~a // =>  0b..10011010
a << 1 // =>  0b11001010
a >> 2 // =>  0b11001
a & b // =>  0b1000101
a | b // =>  0b1110101
a ^ b // =>  0b0110000
```

在 Ruby 中某些 bitwise operators 會被 override 成其他用途，並非作為 bitwise operators 使用，如

```ruby
# Ruby
string = 'foo'
string << 'bar' # => 'foobar'

array = [1, 2, 3, 4]
array << 5 # => [1, 2, 3, 4, 5]
array & [4, 5, 6, 7] # => [4, 5]
```

使用前讀一下用的 class 的文件喔

---

## 邏輯布林 Logic boolean

`!`，`&`，`|`，`^` 也是一樣的用法

```ruby
# Ruby
!true # => false
true & false # => false
true | false # => true
true ^ true # => false
```

```csharp
// C#
!true // => false
true & false // => false
true | false // => true
true ^ true // => false
```

它們在處理空 `nil` or `null` 上有些小差異

```ruby
# Ruby
!nil # => true
```

```csharp
// C#
!null // => error CS0023: The `!' operator cannot be applied tooperand of type `null'
```

> C# 中，型別為 `bool` 的變數無法存入 `null` 除非你使用 nullable 型別 `bool?` 宣告變數

另外還有兩個非常常用的 [short-circuit evaluation](https://en.wikipedia.org/wiki/Short-circuit_evaluation) operators `&&` 與 `||`，使用方法也一樣喔

---

## 如何自訂 Operators

由於 Ruby 與 C# 都是物件導向語言，以上這些 operators 會根據各類別不同的實作而有不同的效果

換句話說，這兩種語言都或多或少允許我們改寫類別的 operators，但他們還是有些許的差異

Ruby 中的 operators 其實就是個 method，見[官方 FAQ](https://www.ruby-lang.org/en/documentation/faq/7)

{% asset_img ruby-faq-7-operators.png %}

想要改變 operators 的行為則需要覆寫(override) 對應的 method

例如[這題 Leetcode](https://leetcode.com/problems/same-tree/discuss/539928/The-easiest-Ruby-OOP-solution%3A-override-operator)，用 override `TreeNode` 的 `==` 條件解決問題

```ruby
# Ruby
class TreeNode
  def ==(tree)
    val == tree&.val && left == tree&.left && right == tree&.right
  end
end

# @param {TreeNode} p
# @param {TreeNode} q
# @return {Boolean}
def is_same_tree(p, q)
  p == q
end
```

而 C# 將 operators 視為一種保留字 `operator`，我們需要透過[多載(overload) operators](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/operator-overloading) 改變 operators 的行為

```csharp
// C#
class TreeNode {
  public int val;
  public TreeNode left;
  public TreeNode right;
  public TreeNode(int x) { val = x; }

  public static bool operator ==(TreeNode l, TreeNode r) {
    return l.val == r.val && l.left == r.left && l.right == r.right;
  }

  public static bool operator !=(TreeNode l, TreeNode r) {
    return l.val != r.val || l.left != r.left || l.right != r.right;
  }
}
```

官方建議大家在 overload operator 時，遵照這份[指引](https://docs.microsoft.com/en-us/dotnet/standard/design-guidelines/operator-overloads)，如上面的例子，overload `==` 請一併 overload `!=`

---

## 統整

共通點

- `=`，`+=`，`-=`，`*=`，`/=`，`%=`，`&=`，`|=`，`^=`
- `==`，`!=`，`>`，`>=`，`<`，`<=`，`? :`
- `+`，`-`，`*`，`/`，`%`
- `~`，`<<`，`>>`，`&`，`|`，`^`
- `!`，`&`，`|`，`^`
- `&&`，`||`

Ruby 多了

- `**`．`**=`
- `&&=`，`||=`

C# 多了

- `++`，`--`
- `??=`  

---

## References

- <https://en.wikibooks.org/wiki/Ruby_Programming/Syntax/Operators>
- <https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/>

## 系列文章

1. {% post_link from-ruby-to-c-sharp %}
2. {% post_link from-ruby-to-c-sharp-operators %}
3. Condition
4. Loop and Enumerator
5. Base Type
6. Collection Type
7. Code Inclusion
8. Class
9. Interface
10. Error handler
11. Dev tools
