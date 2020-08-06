# 生成器模式（建造者）

生成器模式的目标就是一个对象，通过使用不同的 builder 策略为对象属性设置不同的值，从而灵活的得到对应的实例。

## 示意图

**生成器模式**是一种创建型设计模式， 使你能够分步骤创建复杂对象。 该模式允许你使用相同的创建代码生成不同类型和形式的对象。

![生成器设计模式](https://refactoringguru.cn/images/patterns/content/builder/builder-zh.png)

### 问题

假设有这样一个复杂对象， 在对其进行构造时需要对诸多成员变量和嵌套对象进行繁复的初始化工作。 这些初始化代码通常深藏于一个包含众多参数且让人基本看不懂的构造函数中； 甚至还有更糟糕的情况， 那就是这些代码散落在客户端代码的多个位置。

![大量子类会带来新的问题](https://refactoringguru.cn/images/patterns/diagrams/builder/problem1.png)

如果为每种可能的对象都创建一个子类， 这可能会导致程序变得过于复杂。

例如， 我们来思考如何创建一个 `房屋`House对象。 建造一栋简单的房屋， 首先你需要建造四面墙和地板， 安装房门和一套窗户， 然后再建造一个屋顶。 但是如果你想要一栋更宽敞更明亮的房屋， 还要有院子和其他设施 （例如暖气、 排水和供电设备）， 那又该怎么办呢？

最简单的方法是扩展 `房屋`基类， 然后创建一系列涵盖所有参数组合的子类。 但最终你将面对相当数量的子类。 任何新增的参数 （例如门廊类型） 都会让这个层次结构更加复杂。

另一种方法则无需生成子类。 你可以在 `房屋`基类中创建一个包括所有可能参数的超级构造函数， 并用它来控制房屋对象。 这种方法确实可以避免生成子类， 但它却会造成另外一个问题。

![可伸缩的构造函数](https://refactoringguru.cn/images/patterns/diagrams/builder/problem2.png)

拥有大量输入参数的构造函数也有缺陷： 这些参数也不是每次都要全部用上的。

通常情况下， 绝大部分的参数都没有使用， 这使得[对于构造函数的调用十分不简洁](https://refactoringguru.cn/smells/long-parameter-list)。 例如， 只有很少的房子有游泳池， 因此与游泳池相关的参数十之八九是毫无用处的。

### 解决方案

生成器模式建议将对象构造代码从产品类中抽取出来， 并将其放在一个名为*生成器*的独立对象中。

![应用生成器模式](https://refactoringguru.cn/images/patterns/diagrams/builder/solution1.png)

生成器模式让你能够分步骤创建复杂对象。 生成器不允许其他对象访问正在创建中的产品。

该模式会将对象构造过程划分为一组步骤， 比如 `build­Walls`创建墙壁和 `build­Door`创建房门创建房门等。 每次创建对象时， 你都需要通过生成器对象执行一系列步骤。 重点在于你无需调用所有步骤， 而只需调用创建特定对象配置所需的那些步骤即可。

当你需要创建不同形式的产品时， 其中的一些构造步骤可能需要不同的实现。 例如， 木屋的房门可能需要使用木头制造， 而城堡的房门则必须使用石头制造。

在这种情况下， 你可以创建多个不同的生成器， 用不同方式实现一组相同的创建步骤。 然后你就可以在创建过程中使用这些生成器 （例如按顺序调用多个构造步骤） 来生成不同类型的对象。

![img](https://refactoringguru.cn/images/patterns/content/builder/builder-comic-1-zh.png)

不同生成器以不同方式执行相同的任务。

例如， 假设第一个建造者使用木头和玻璃制造房屋， 第二个建造者使用石头和钢铁， 而第三个建造者使用黄金和钻石。 在调用同一组步骤后， 第一个建造者会给你一栋普通房屋， 第二个会给你一座小城堡， 而第三个则会给你一座宫殿。 但是， 只有在调用构造步骤的客户端代码可以通过通用接口与建造者进行交互时， 这样的调用才能返回需要的房屋。

#### 主管

你可以进一步将用于创建产品的一系列生成器步骤调用抽取成为单独的*主管*类。 主管类可定义创建步骤的执行顺序， 而生成器则提供这些步骤的实现。

![img](https://refactoringguru.cn/images/patterns/content/builder/builder-comic-2-zh.png)

主管知道需要哪些创建步骤才能获得可正常使用的产品。

严格来说， 你的程序中并不一定需要主管类。 客户端代码可直接以特定顺序调用创建步骤。 不过， 主管类中非常适合放入各种例行构造流程， 以便在程序中反复使用。

此外， 对于客户端代码来说， 主管类完全隐藏了产品构造细节。 客户端只需要将一个生成器与主管类关联， 然后使用主管类来构造产品， 就能从生成器处获得构造结果了。

## 定义

建造者模式是较为复杂的创建型模式，它将客户端与包含多个组成部分（或部件）的复杂对象的创建过程分离，客户端无须知道复杂对象的内部组成部分与装配方式，只需要知道所需建造者的类型即可。它关注如何一步一步创建一个的复杂对象，不同的具体建造者定义了不同的创建过程，且具体建造者相互独立，增加新的建造者非常方便，无须修改已有代码，系统具有较好的扩展性。

> 将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。建造者模式是一种对象创建型模式。



![UML类图](https://upload-images.jianshu.io/upload_images/103735-21dae004efea8394.gif)

### 角色

- Builder（抽象建造者）：它为创建一个产品Product对象的各个部件指定抽象接口，在该接口中一般声明两类方法，一类方法是buildPartX()，它们用于创建复杂对象的各个部件；另一类方法是getResult()，它们用于返回复杂对象。Builder既可以是抽象类，也可以是接口。
- ConcreteBuilder（具体建造者）：它实现了Builder接口，实现各个部件的具体构造和装配方法，定义并明确它所创建的复杂对象，也可以提供一个方法返回创建好的复杂产品对象。
- Product（产品角色）：它是被构建的复杂对象，包含多个组成部件，具体建造者创建该产品的内部表示并定义它的装配过程。
- Director（指挥者）：指挥者又称为导演类，它负责安排复杂对象的建造次序，指挥者与抽象建造者之间存在关联关系，可以在其construct()建造方法中调用建造者对象的部件构造与装配方法，完成复杂对象的建造。客户端一般只需要与指挥者进行交互，在客户端确定具体建造者的类型，并实例化具体建造者对象（也可以通过配置文件和反射机制），然后通过指挥者类的构造函数或者Setter方法将该对象传入指挥者类中。

## 例子

下面我们举个例子来说明一下

在建造者模式的定义中提到了**复杂对象**，那么什么是复杂对象？简单来说，复杂对象是指那些包含多个成员属性的对象，这些成员属性也称为部件或零件，如汽车包括方向盘、发动机、轮胎等部件，电子邮件包括发件人、收件人、主题、内容、附件等部件。

一个典型的复杂对象类代码示例如下：

```tsx
class Product  {
       private  String partA; //定义部件，部件可以是任意类型，包括值类型和引用类型
       private  String partB;
       private  String partC;
       //partA的Getter方法和Setter方法省略
       //partB的Getter方法和Setter方法省略
       //partC的Getter方法和Setter方法省略
}
```

在抽象建造者类中定义了产品的创建方法和返回方法，其典型代码如下：

```csharp
abstract class Builder {
     //创建产品对象
       protected  Product product=new Product();
      
       public  abstract void buildPartA();
       public  abstract void buildPartB();
       public  abstract void buildPartC();
      
     //返回产品对象
       public  Product getResult() {
              return  product;
       }
}
```

在建造者模式的结构中还引入了一个指挥者类Director，该类主要有两个作用：一方面它隔离了客户与创建过程；另一方面它控制产品的创建过程，包括某个buildPartX()方法是否被调用以及多个buildPartX()方法调用的先后次序等。指挥者针对抽象建造者编程，客户端只需要知道具体建造者的类型，即可通过指挥者类调用建造者的相关方法，返回一个完整的产品对象。在实际生活中也存在类似指挥者一样的角色，如一个客户去购买电脑，电脑销售人员相当于指挥者，只要客户确定电脑的类型，电脑销售人员可以通知电脑组装人员给客户组装一台电脑。

指挥者类的代码示例如下：

```cpp
class Director {
       private  Builder builder;
      
       public  Director(Builder builder) {
              this.builder=builder;
       }
      
       public  void setBuilder(Builder builder) {
              this.builder=builer;
       }
      
     //产品构建与组装方法
       public Product construct() {
              builder.buildPartA();
              builder.buildPartB();
              builder.buildPartC();
              return builder.getResult();
       }
}
```

在指挥者类中可以注入一个抽象建造者类型的对象，其核心在于提供了一个建造方法construct()，在该方法中调用了builder对象的构造部件的方法，最后返回一个产品对象。

对于客户端而言，只需关心具体的建造者即可。

一般情况下，客户端类代码片段如下所示：

```cpp
Builder  builder = new ConcreteBuilder(); //可通过配置文件实现
Director director = new  Director(builder);
Product product = director.construct();
```

### TS 实现

```tsx
class Product {
  a: string
  b: string
  c: string
}

interface Builder {
  setA(): void
  setB(): void
  setC(): void
  getResult(): Product
}

class ConcreteBuilder implements Builder {
  private product = new Product()
  setA(): void {
    this.product.a = 'a'
  }
  setB(): void {
    this.product.b = 'b'
  }
  setC(): void {
    this.product.c = 'c'
  }
  getResult() {
    return this.product
  }
}

class Director {
  builder: Builder
  constructor(cBuilder: Builder) {
    this.builder = cBuilder
  }

  buildProduct() {
    this.builder.setA()
    this.builder.setB()
    this.builder.setC()
    return this.builder.getResult()
  }
}

const director = new Director(new ConcreteBuilder())
const product = director.buildProduct()
```

## 与其他模式的关系

- 在许多设计工作的初期都会使用[工厂方法模式](https://refactoringguru.cn/design-patterns/factory-method) （较为简单， 而且可以更方便地通过子类进行定制）， 随后演化为使用[抽象工厂模式](https://refactoringguru.cn/design-patterns/abstract-factory)、 [原型模式](https://refactoringguru.cn/design-patterns/prototype)或[生成器模式](https://refactoringguru.cn/design-patterns/builder) （更灵活但更加复杂）。
- [抽象工厂模式](https://refactoringguru.cn/design-patterns/abstract-factory)通常基于一组[工厂方法](https://refactoringguru.cn/design-patterns/factory-method)， 但你也可以使用[原型模式](https://refactoringguru.cn/design-patterns/prototype)来生成这些类的方法。
- [原型](https://refactoringguru.cn/design-patterns/prototype)可用于保存[命令模式](https://refactoringguru.cn/design-patterns/command)的历史记录。
- 大量使用[组合模式](https://refactoringguru.cn/design-patterns/composite)和[装饰模式](https://refactoringguru.cn/design-patterns/decorator)的设计通常可从对于[原型](https://refactoringguru.cn/design-patterns/prototype)的使用中获益。 你可以通过该模式来复制复杂结构， 而非从零开始重新构造。
- [原型](https://refactoringguru.cn/design-patterns/prototype)并不基于继承， 因此没有继承的缺点。 另一方面， *原型*需要对被复制对象进行复杂的初始化。 [工厂方法](https://refactoringguru.cn/design-patterns/factory-method)基于继承， 但是它不需要初始化步骤。
- 有时候[原型](https://refactoringguru.cn/design-patterns/prototype)可以作为[备忘录模式](https://refactoringguru.cn/design-patterns/memento)的一个简化版本， 其条件是你需要在历史记录中存储的对象的状态比较简单， 不需要链接其他外部资源， 或者链接可以方便地重建。
- [抽象工厂](https://refactoringguru.cn/design-patterns/abstract-factory)、 [生成器](https://refactoringguru.cn/design-patterns/builder)和[原型](https://refactoringguru.cn/design-patterns/prototype)都可以用[单例模式](https://refactoringguru.cn/design-patterns/singleton)来实现。

## 应用场景







## 参考

https://refactoringguru.cn/design-patterns/builder

https://www.jianshu.com/p/4dcc723b676e