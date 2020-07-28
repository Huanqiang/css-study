# 外观模式

## 外观模式

外观模式又称为门面模式，是一种使用频率非常高的结构型设计模式，它通过引入一个外观角色来简化客户端与子系统之间的交互，为复杂的子系统调用提供一个统一的入口，降低子系统与客户端的耦合度，且客户端调用非常方便。

外观模式包含如下两个角色：

**Facade（外观角色）**：在客户端可以调用它的方法，在外观角色中可以知道相关的（一个或者多个）子系统的功能和责任；在正常情况下，它将所有从客户端发来的请求委派到相应的子系统去，传递给相应的子系统对象处理。

**SubSystem（子系统角色）**：在软件系统中可以有一个或者多个子系统角色，每一个子系统可以不是一个单独的类，而是一个类的集合，它实现子系统的功能；每一个子系统都可以被客户端直接调用，或者被外观角色调用，它处理由外观类传过来的请求；子系统并不知道外观的存在，对于子系统而言，外观角色仅仅是另外一个客户端而已。

外观模式的目的不是给予子系统添加新的功能接口，而是为了让外部减少与子系统内多个模块的交互，松散耦合，从而让外部能够更简单地使用子系统。

外观模式的本质是：**封装交互，简化调用**。

### 举个例子

- 背景：小明的爷爷已经 80 岁了，一个人在家生活：每次都需要打开灯、打开电视、打开空调；睡觉时关闭灯、关闭电视、关闭空调；
- 冲突：行动不方便，走过去关闭那么多电器很麻烦，所以需要为小明的爷爷提供一个便捷的操作：

1. 家具类

```java
//灯类
public class SubSystemA_Light {
     public void on(){
        System.out.println("打开了灯....");
    }

     public void off(){
        System.out.println("关闭了灯....");
    }
}

//电视类
public class SubSystemB_Television {
     public void on(){
        System.out.println("打开了电视....");
    }

     public void off(){
        System.out.println("关闭了电视....");
    }
}

//空调类
public class SubSystemC_Aircondition {
     public void on(){
        System.out.println("打开了电视....");
    }

     public void off(){
        System.out.println("关闭了电视....");
    }
}
```

2. 外观类：集成遥控器，将各类电器同一作用（逻辑）的操作封装在一起，比如起床了，就封装 开灯、开电视和开空调这三个操作。

```java
public class Facade{

    SubSystemA_Light light；
    SubSystemB_Television television ；
    SubSystemC_Aircondition aircondition；


    //传参
    public Facade(SubSystemA_Light light,SubSystemB_Television television,SubSystemC_Aircondition aircondition){
        this.light = light;
        this.television  = television ;
        this.aircondition =aircondition;
    }
    //起床后一键开电器
    public void on{
        System.out.prinln("起床了")；
        light.on()；
        television.on();
        aircondition.on()；
    }

    //起床后一键开电器
    public void off{
        //睡觉时一键关电器
        System.out.prinln("睡觉了")；
        light.off()；
        television.off();
        aircondition.off()；
    }
}
```

3. 使用情况

```java
public class Facade Pattern{
    public static void main(String[] args){
        //实例化电器类
        SubSystemA_Light light = new SubSystemA_Light();
        SubSystemB_Television television = new SubSystemB_Television();
        SubSystemC_Aircondition aircondition = new SubSystemC_Aircondition();

        //传参
        Facade facade = new Facade(light,television,aircondition);

        //客户端直接与外观对象进行交互
        facade.on();
        System.out.prinln("可以看电视了")；
        facade.off();
        System.out.prinln("可以睡觉了")；
    }
}
```

## 解决的问题

外观模式完全符合 迪米特原则，它实现了使用者和内部系统的松耦合，内部系统为复杂的一系列操作提供一个简单的调用入口，使用者无需关注这一系列操作本身的复杂关系，只需要知道通过这个封装好的接口就能完成对应的交互。

对于使用者（client）而言，使用者无需再关注系统的内部逻辑，能够专注于自己的业务代码。

对应内部系统而言，无论内部一系列操作如果改变，只要提供对外的接口不不变，就不会影响到其客户使用。

## 使用场景

1. 众多第三方库的对外 API 实际上都应用了外观模式来封装内部逻辑；
2. 日常开发中，遇到内部逻辑复杂，外部系统能需要组合一系列操作才能完成某一功能的时候，就可以使用外观模式进行封装；

### 在项目中的运用

1. urs 登录注册组件的设计，该组件封装了对 urs 提供的组件的调用，当我们需要 urs 各类登录、注册组件的时候，只需要传入对应的参数即可；

![URS组件设计模式](https://cdn.jsdelivr.net/gh/Huanqiang/imgBed/img/20200728150226.png)

可以看出 URS 组件就是我们采用了外观模式封装的，他隔离了 URS 第三方提供的众多组件，后续组件只要使用该组件就可以了。

但是有所缺陷的是，封装的不够彻底，没有将 URS 第三方组件的使用封装在该组件内部，而是由后续组件在调用传入；

## 与其他设计模式的关系

- [外观模式](https://refactoringguru.cn/design-patterns/facade)为现有对象定义了一个新接口， [适配器模式](https://refactoringguru.cn/design-patterns/adapter)则会试图运用已有的接口。 *适配器*通常只封装一个对象， *外观*通常会作用于整个对象子系统上。
- 当只需对客户端代码隐藏子系统创建对象的方式时， 你可以使用[抽象工厂模式](https://refactoringguru.cn/design-patterns/abstract-factory)来代替[外观](https://refactoringguru.cn/design-patterns/facade)。
- [享元模式](https://refactoringguru.cn/design-patterns/flyweight)展示了如何生成大量的小型对象， [外观](https://refactoringguru.cn/design-patterns/facade)则展示了如何用一个对象来代表整个子系统。
- [外观](https://refactoringguru.cn/design-patterns/facade)和[中介者模式](https://refactoringguru.cn/design-patterns/mediator)的职责类似： 它们都尝试在大量紧密耦合的类中组织起合作。
  - *外观*为子系统中的所有对象定义了一个简单接口， 但是它不提供任何新功能。 子系统本身不会意识到外观的存在。 子系统中的对象可以直接进行交流。
  - *中介者*将系统中组件的沟通行为中心化。 各组件只知道中介者对象， 无法直接相互交流。
- [外观](https://refactoringguru.cn/design-patterns/facade)类通常可以转换为[单例模式](https://refactoringguru.cn/design-patterns/singleton)类， 因为在大部分情况下一个外观对象就足够了。
- [外观](https://refactoringguru.cn/design-patterns/facade)与[代理模式](https://refactoringguru.cn/design-patterns/proxy)的相似之处在于它们都缓存了一个复杂实体并自行对其进行初始化。 *代理*与其服务对象遵循同一接口， 使得自己和服务对象可以互换， 在这一点上它与*外观*不同。
