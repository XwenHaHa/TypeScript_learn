// 一、内置类型：any、unknown、never
// 有的时候我们的TS代码并不需要特别严格的类型标注，比如console.log就支持任意类型的参数，不管是啥通通来者不拒
// 那么难道我们要把类型用联合类型通通联合起来？
// 这样当然是不现实的，为了能够表示任意类型，TS提供了any，此时我们就可以用any来作为参数的类型
function log(message: any, ...optionalParams: any[]): void {}

// 除了显式标记一个变量或者参数为any，在某些情况下你的变量和参数也会被隐式地推导为any
// 1、在定义变量时没有指定类型，此时TS会推断为any
let a; // any
// 2、在定义函数时没有指定参数类型，此时TS会推断为any
function fn2(a, b) {
  return a + b;
}

// any类型的主要意义，其实就是为了表示一个无拘无束的任意类型，它能兼容所有类型，也能够被所有类型兼容
// 这就意味着他开了一个外挂，无论什么时候都能用any跳过类型检查，当然运行出问题就要自己负责了

// 为了避免滥用成AnyScript，要记住一下小tips
// 1、如果是类型不兼容报错导致你使用 any，考虑用类型断言替代
// 2、如果是类型太复杂导致你不想全部声明而使用 any，考虑将这一处的类型去断言为你需要的最简类型。如你需要调用 `foo.bar.baz()`，就可以先将 foo 断言为一个具有 bar 方法的类型
// 3、如果你是想表达一个未知类型，更合理的方式是使用 unknown。

// unknown和any类型有些相似，unknown 和 any 的一个主要差异
// 体现在赋值给别的变量时，any 就像是我身化万千无处不在，所有类型都把它当自己人。而 unknown 就像是 “我虽然身化万千，但我坚信我在未来的某一刻会得到一个确定的类型”简单地说，any 放弃了所有的类型检查，而 unknown 并没有。这一点也体现在对 unknown 类型的变量进行属性访问时：

// 要对 unknown 类型进行属性访问，需要进行类型断言，即“虽然这是一个未知的类型，但我跟你保证它在这里就是这个类型！”：
let unknownVar: unknown;
(unknownVar as { foo: () => {} }).foo();

// 虚无的never类型
type UnionWithNever = "XwenHaHa" | 18 | true | void | never;
// 看上面的类型推断，你会发现，void类型还存在，never直接不见了，因为never严格来说是一个什么都没有的类型

// 在某些情况下使用 never 确实是符合逻辑的，比如一个只负责抛出错误的函数：
function justThrow(): never {
  throw new Error();
}

// 实际上，由于 TypeScript 强大的类型分析能力，每经过一个 if 语句处理，`strOrNumOrBool` 的类型分支就会减少一个（因为已经被对应的 typeof 处理过）。而在最后的 else 代码块中，它的类型只剩下了 never 类型，即一个无法再细分、本质上并不存在的虚空类型。在这里，我们可以利用 never 类型变量仅能赋值给 never 类型变量的特性，来巧妙地分支处理检查：
declare const strOrNumOrBool: string | number | boolean;
if (typeof strOrNumOrBool === "string") {
  strOrNumOrBool.charAt(1);
} else if (typeof strOrNumOrBool === "number") {
  strOrNumOrBool.toFixed();
} else if (typeof strOrNumOrBool === "boolean") {
  strOrNumOrBool === true;
} else {
  const _exhaustiveCheck: never = strOrNumOrBool;
  throw new Error(`Unknown input type：${_exhaustiveCheck}`);
}

// 二、类型断言：警告编译器不准报错
// 类型断言其实就是一个将变量的已有类型更改为新指定类型的操作，它的基本语法是 as NewType
// 可以将any/unknown类型断言到一个具体的类型
let unknownType: unknown;
(unknownType as { foo: () => {} }).foo();

// 还可以断言到any来为所欲为
const str: string = "hello world";
(str as any).func().foo().prop;

// 类型断言正常的用法是，在TS类型分析不正确或者不符合预期时，将其断言为正确的类型
interface IFoo {
  name: string;
}
declare const obj: {
  myFoo: IFoo;
};
const { myFoo = {} as IFoo } = obj;

// 三、双重断言
// 使用类型断言的时候，如果原类型和断言类型之间差别过大，就会给一个类型报错
const str1: string = "XwenHaHa";
// 类型 "string" 到类型 "{ handle: () => {}; }" 的转换可能是错误的，因为两种类型不能充分重叠。如果这是有意的，请先将表达式转换为 "unknown"。
// (str1 as { handle: () => {} }).handle();
// 此时会提醒先断言到unknown类型再断言到预期类型
(str as unknown as { handle: () => {} }).handle();

// 四、非空断言
declare const unFoo: {
  func?: () => {
    prop?: number | null;
  };
};
// 例如这个例子，如果不管三七二十一地坚持调用，想要解决掉类型报错就可以使用非空断言：
unFoo.func!().prop!.toFixed();
