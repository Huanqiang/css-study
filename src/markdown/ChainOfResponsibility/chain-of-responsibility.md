# 责任链模式

## 什么是职责链模式？

**责任链**是一种行为设计模式， 允许你将请求沿着处理者链进行发送， 直至其中一个处理者对其进行处理。

该模式允许多个对象来对请求进行处理， 而无需让发送者类与具体接收者类相耦合。 链可在运行时由遵循标准处理者接口的任意处理者动态生成。



##  意图

**责任链模式**是一种行为设计模式， 允许你将请求沿着处理者链进行发送。 收到请求后， 每个处理者均可对请求进行处理， 或将其传递给链上的下个处理者。

![责任链设计模式](https://refactoringguru.cn/images/patterns/content/chain-of-responsibility/chain-of-responsibility.png)

##  问题

假如你正在开发一个在线订购系统。 你希望对系统访问进行限制， 只允许认证用户创建订单。 此外， 拥有管理权限的用户也拥有所有订单的完全访问权限。

简单规划后， 你会意识到这些检查必须依次进行。 只要接收到包含用户凭据的请求， 应用程序就可尝试对进入系统的用户进行认证。 但如果由于用户凭据不正确而导致认证失败， 那就没有必要进行后续检查了。

![责任链解决的问题](https://refactoringguru.cn/images/patterns/diagrams/chain-of-responsibility/problem1-zh.png)

请求必须经过一系列检查后才能由订购系统来处理。

在接下来的几个月里， 你实现了后续的几个检查步骤。

- 一位同事认为直接将原始数据传递给订购系统存在安全隐患。 因此你新增了额外的验证步骤来清理请求中的数据。
- 过了一段时间， 有人注意到系统无法抵御暴力密码破解方式的攻击。 为了防范这种情况， 你立刻添加了一个检查步骤来过滤来自同一 IP 地址的重复错误请求。
- 又有人提议你可以对包含同样数据的重复请求返回缓存中的结果， 从而提高系统响应速度。 因此， 你新增了一个检查步骤， 确保只有没有满足条件的缓存结果时请求才能通过并被发送给系统。

![每增加一个检查步骤，程序都变得更加臃肿、混乱和丑陋](https://refactoringguru.cn/images/patterns/diagrams/chain-of-responsibility/problem2-zh.png)

代码变得越来越多， 也越来越混乱。

检查代码本来就已经混乱不堪， 而每次新增功能都会使其更加臃肿。 修改某个检查步骤有时会影响其他的检查步骤。 最糟糕的是， 当你希望复用这些检查步骤来保护其他系统组件时， 你只能复制部分代码， 因为这些组件只需部分而非全部的检查步骤。

系统会变得让人非常费解， 而且其维护成本也会激增。 你在艰难地和这些代码共处一段时间后， 有一天终于决定对整个系统进行重构。

##  解决方案

与许多其他行为设计模式一样， **责任链**会将特定行为转换为被称作*处理者*的独立对象。 在上述示例中， 每个检查步骤都可被抽取为仅有单个方法的类， 并执行检查操作。 请求及其数据则会被作为参数传递给该方法。

模式建议你将这些处理者连成一条链。 链上的每个处理者都有一个成员变量来保存对于下一处理者的引用。 除了处理请求外， 处理者还负责沿着链传递请求。 请求会在链上移动， 直至所有处理者都有机会对其进行处理。

最重要的是： 处理者可以决定不再沿着链传递请求， 这可高效地取消所有后续处理步骤。

在我们的订购系统示例中， 处理者会在进行请求处理工作后决定是否继续沿着链传递请求。 如果请求中包含正确的数据， 所有处理者都将执行自己的主要行为， 无论该行为是身份验证还是数据缓存。

![处理者依次排列，组成一条链](https://refactoringguru.cn/images/patterns/diagrams/chain-of-responsibility/solution1-zh.png)

处理者依次排列， 组成一条链。

不过还有一种稍微不同的方式 （也是更经典一种）， 那就是处理者接收到请求后自行决定是否能够对其进行处理。 如果自己能够处理， 处理者就不再继续传递请求。 因此在这种情况下， 每个请求要么最多有一个处理者对其进行处理， 要么没有任何处理者对其进行处理。 在处理图形用户界面元素栈中的事件时， 这种方式非常常见。

例如， 当用户点击按钮时， 按钮产生的事件将沿着 GUI 元素链进行传递， 最开始是按钮的容器 （如窗体或面板）， 直至应用程序主窗口。 链上第一个能处理该事件的元素会对其进行处理。 此外， 该例还有另一个值得我们关注的地方： 它表明我们总能从对象树中抽取出链来。

![对象树的枝干可以组成一条链](https://refactoringguru.cn/images/patterns/diagrams/chain-of-responsibility/solution2-zh.png)

对象树的枝干可以组成一条链。

所有处理者类均实现同一接口是关键所在。 每个具体处理者仅关心下一个包含 `execute`执行方法的处理者。 这样一来， 你就可以在运行时使用不同的处理者来创建链， 而无需将相关代码与处理者的具体类进行耦合。

## 例子

假设我们负责一个售卖手机的电商网站，经过分别交纳500元定金和200元定金的两轮预定后（订单已在此时生成），现在已经到了正式购买的阶段。

公司针对支付过定金的用户有一定的优惠政策。在正式购买后，已经支付过500元定金的用户会收到100元的商城优惠券，200元定金的用户可以收到50元的优惠券，而之前没有支付定金的用户只能进入普通购买模式，也就是没有优惠券，且在库存有限的情况下不一定保证能买到。

在页面加载之初，我们会传递给页面几个字段。

- orderType：表示订单类型（定金用户或者普通购买用户），code的值为1的时候是500元定金用户，为2的时候是200元定金用户，为3的时候是普通购买用户。
- pay：表示用户是否已经支付定金，值为true或者false，虽然用户已经下过500元定金的订单，但如果他一直没有支付定金，现在只能降级进入普通购买模式。
- stock：表示当前用于普通购买的手机库存数量，已经支付过500元或者200元定金的用户不受此限制。

```javascript
class Chain {
  constructor() {
    this.next = undefined
  }

  add(node) {
    this.next = node
    return this.next
  }

  handleTask(data) {}
}

class Order500 extends Chain {
  handleTask(orderType, pay, stock) {
    if (orderType === 1 && pay === true) {
      console.log('500元定金预购，得到100优惠券')
    } else {
      this.next.handleTask(orderType, pay, stock)
    }
  }
}

class Order200 extends Chain {
  handleTask(orderType, pay, stock) {
    if (orderType === 2 && pay === true) {
      console.log('200元定金预购，得到50优惠券')
    } else {
      this.next.handleTask(orderType, pay, stock)
    }
  }
}

class OrderNormal extends Chain {
  handleTask(orderType, pay, stock) {
    if (stock > 0) {
      console.log('普通购买，无优惠券')
    } else {
      console.log('手机库存不足')
    }
  }
}

let chainOrder500 = new Order500()
let chainOrder200 = new Order200()
let chainOrderNormal = new OrderNormal()

chainOrder500.add(chainOrder200).add(chainOrderNormal)

chainOrder500.handleTask(1, true, 500)	// 500元定金预购，得到100优惠券
chainOrder500.handleTask(2, true, 500)	// 200元定金预购，得到50优惠券
chainOrder500.handleTask(3, true, 500)	// 普通购买，无优惠券
chainOrder500.handleTask(1, false, 0)		// 手机库存不足
```

## 与其他模式的关系

- [责任链模式](https://refactoringguru.cn/design-patterns/chain-of-responsibility)、 [命令模式](https://refactoringguru.cn/design-patterns/command)、 [中介者模式](https://refactoringguru.cn/design-patterns/mediator)和[观察者模式](https://refactoringguru.cn/design-patterns/observer)用于处理请求发送者和接收者之间的不同连接方式：

  - *责任链*按照顺序将请求动态传递给一系列的潜在接收者， 直至其中一名接收者对请求进行处理。
  - *命令*在发送者和请求者之间建立单向连接。
  - *中介者*清除了发送者和请求者之间的直接连接， 强制它们通过一个中介对象进行间接沟通。
  - *观察者*允许接收者动态地订阅或取消接收请求。

- [责任链](https://refactoringguru.cn/design-patterns/chain-of-responsibility)通常和[组合模式](https://refactoringguru.cn/design-patterns/composite)结合使用。 在这种情况下， 叶组件接收到请求后， 可以将请求沿包含全体父组件的链一直传递至对象树的底部。

- [责任链](https://refactoringguru.cn/design-patterns/chain-of-responsibility)的管理者可使用[命令模式](https://refactoringguru.cn/design-patterns/command)实现。 在这种情况下， 你可以对由请求代表的同一个上下文对象执行许多不同的操作。

  还有另外一种实现方式， 那就是请求自身就是一个*命令*对象。 在这种情况下， 你可以对由一系列不同上下文连接而成的链执行相同的操作。

- [责任链](https://refactoringguru.cn/design-patterns/chain-of-responsibility)和[装饰模式](https://refactoringguru.cn/design-patterns/decorator)的类结构非常相似。 两者都依赖递归组合将需要执行的操作传递给一系列对象。 但是， 两者有几点重要的不同之处。

  * 责任链的管理者可以相互独立地执行一切操作， 还**可以随时停止传递请求**。
  * 各种装饰可以在遵循基本接口的情况下扩展对象的行为。 此外， 装饰无法中断请求的传递。

## 应用

1. Tomcat 过滤器中的责任链模式；
2. Spring AOP 通过责任链模式来管理 Advisor；
3. 变种：对责任链中节点的处理变动以下，每个节点处理完后，仍然可以让下一个节点继续处理，这种情况下就有很多用场景，比如 pipe，数据清洗，多层拦截器等多个独立任务处理同一个数据的操作均可使用

























