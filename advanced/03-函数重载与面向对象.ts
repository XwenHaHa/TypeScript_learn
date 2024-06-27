// 1、函数类型签名
// 直接在函数中进行参数和返回值的类型声明
const foo = (name: string): number => {
  return name.length;
};

// 使用类型别名将函数抽离出来
type FuncFoo = (name: string) => number;
const foo1: FuncFoo = (name) => {
  return name.length;
};

// 2、void类型
// 在TypeScript中，一个没有返回值的函数，返回类型应该被标注为void
function foo2(): void {}
function bar(): undefined {
  return;
}
// 因为之前在原始类型中讲到undefined 类型是一个实际的、有意义的类型值，而 void 才代表着空的、没有意义的类型值。

// 3、可选参数与rest参数
// 有时候我们希望函数的参数可以更加灵活，比如不一定是必传的
function foo3(name: string, age?: number): number {
  const inputAge = age ?? 18;
  return name.length + inputAge;
}

// 也可以直接为可选参数设置默认值
function foo4(name: string, age: number = 18): number {
  const inputAge = age;
  return name.length + inputAge;
}

// 需要注意的是可选参数一定要在必选参数之后

// 对于rest参数的类型标注比较简单，由于实际上是一个数组，所以也应当用数组类型标注
function foo5(arg1: string, ...rest: [number, boolean]) {}
foo5("XwenHaHa", 1, true);

// 4、函数重载
// 在某些逻辑复杂的时候，函数可能有多组入参类型和返回值类型
function func(foo: number, bar: true): string;
function func(foo: number, bar?: false): number;
function func(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo);
  } else {
    return foo * 599;
  }
}
// 要实现与入参关联的返回值类型可以使用函数重载
const rest1 = func(599);
const rest2 = func(599, true);
const rest3 = func(599, false);

// 5、异步函数、Generate函数签名
// 对于异步函数，Generator函数，异步Generator函数的类型签名基本一致，返回值的类型有所区别
async function asyncFunc(): Promise<void> {}
function* genFunc(): Iterable<void> {}
async function* asyncGenFunc(): AsyncIterable<void> {}

// 6、类与类成员的类型签名
class Foo {
  prop: string;
  constructor(inputProp: string) {
    this.prop = inputProp;
  }
  print(addon: string): void {
    console.log(`${this.prop} and ${addon}`);
  }
  get PropA(): string {
    return `${this.prop}+A`;
  }
  set PropA(value: string) {
    this.prop = `${value}+A`;
  }
}
// 唯一需要注意的就是setter方法不允许进行类型返回值的类型标注，可以理解为setter的返回值并不会被消费，它只是一个关注过程的函数

// 就像函数可以用函数声明和函数表达式一样，类也可以通过类声明和类表达式的方法创建
const Foo1 = class {
  prop: string;
  constructor(inputProp: string) {
    this.prop = inputProp;
  }
  print(addon: string): void {
    console.log(`${this.prop} and ${addon}`);
  }
};

// 7、修饰符
// 在 TypeScript 中我们能够为 Class 成员添加这些修饰符：`public` / `private` / `protected` / `readonly`
class Foo2 {
  private prop: string;
  constructor(inputProp: string) {
    this.prop = inputProp;
  }
  protected print(addon: string): void {
    console.log(`${this.prop} and ${addon}`);
  }
  public get propA(): string {
    return `${this.prop}+A`;
  }
  public set propA(value: string) {
    this.propA = `${value}+A`;
  }
}

// - public：此类成员在类、类的实例、子类中都能被访问。
// - private：此类成员仅能在类的内部被访问。
// - protected：此类成员仅能在类与子类中被访问，你可以将类和类的实例当成两种概念，即一旦实例化完毕（出厂零件），那就和类（工厂）没关系了，即不允许再访问受保护的成员。

// 8、静态成员
// 我们可以使用static关键字来表示一个成员为静态类
class Foo3 {
  static staticHandle() {}
  public instanceHandle() {}
}

// 我们可以查看编译到 ES5 及以下 target 的 JavaScript 代码（ES6 以上就原生支持静态成员了），来进一步了解它们的区别：
var Foo4 = /** @class */ (function () {
  function Foo() {}
  Foo.staticHandler = function () {};
  Foo.prototype.instanceHandler = function () {};
  return Foo;
})();
// 从中我们可以看到，静态成员直接被挂载在函数体上，而实例成员挂载在原型上，这就是二者的最重要差异：
// 静态成员不会被实例继承，它始终只属于当前定义的这个类（以及其子类）。而原型对象上的实例成员则会沿着原型链进行传递，也就是能够被继承。

// 9、继承、实现、抽象类
// 既然说到Class,就一定离不开继承。TS也是用extends关键字实现继承
class Base {
  print() {}
}
class Derived extends Base {
  print() {
    super.print();
  }
  // 此成员不能有override修饰符，因为他未在基类中声明
  // override printf(){}
}

// 基类中的哪些成员能够被派生类访问，完全是由其访问性修饰符决定的。我们在上面其实已经介绍过，派生类中可以访问到使用 `public` 或 `protected` 修饰符的基类成员。除了访问以外，基类中的方法也可以在派生类中被覆盖，但我们仍然可以通过 super 访问到基类中的方法

// 在派生类中覆盖基类方法时，我们并不能确保派生类的这一方法能覆盖基类方法，万一基类中不存在这个方法呢？所以，TypeScript 4.3 新增了 `override` 关键字，来确保派生类尝试覆盖的方法一定在基类中存在定义：

// 除了积累与派生类还有一个很重要的概念就是抽象类
// 简单来说，一个抽象类描述了一个类中应当有哪些成员（属性、方法等），一个抽象方法描述了这一方法在实际实现中的结构。
abstract class AbsFoo {
  abstract absProp: string;
  abstract get absGetter(): string;
  abstract absMethod(name: string): string;
}

// 对于抽象类，它的本质就是描述类的结构。看到结构，你是否又想到了 interface？是的。interface 不仅可以声明函数结构，也可以声明类的结构：
interface FooStruct {
  absProp: string;
  get absGetter(): string;
  absMethod(input: string): string;
}

class Foo5 implements FooStruct {
  absProp: string = "XwenHaHa";

  get absGetter() {
    return "XwenHaHa";
  }

  absMethod(name: string) {
    return name;
  }
}
