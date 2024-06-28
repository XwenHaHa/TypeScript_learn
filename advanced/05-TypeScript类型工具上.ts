// 1、类型别名
// 类型别名的作用主要是对一组类型或者一个特定类型结构进行封装，以便在其他地方进行复用

// 抽离一组联合类型
type StatusCode = 200 | 301 | 400 | 500 | 502;
type PossibleDataTypes = string | number | (() => unknown);
const status: StatusCode = 502;

// 抽离一组函数类型
type Handle = (e: Event) => void;

const clickHandle: Handle = (e) => {};
const moveHandle: Handle = (e) => {};
const dragHandle: Handle = (e) => {};

// 在类型别名中，如果类型别名可以这么声明自己能够接收泛型。一旦接收泛型，我们就叫他工具类型
type Factory<T> = T | number | string;

// 虽然现在类型别名摇身一变成了工具类型，但它的基本功能仍然是创建类型，只不过工具类型能够接受泛型参数，实现更灵活的类型创建功能。从这个角度看，工具类型就像一个函数一样，泛型是入参，内部逻辑基于入参进行某些操作，再返回一个新的类型。
type FactoryWithBool = Factory<boolean>;
const foo: FactoryWithBool = true;

// 声明一个有实际意义的工具类型
type MaybeArray<T> = T | T[];

function ensureArray<T>(input: MaybeArray<T>): T[] {
  return Array.isArray(input) ? input : [input];
}

// 2、联合类型与交叉类型
// 代表着按位与的 `&` 需要符合这里的所有类型，才可以说实现了这个交叉类型，即 `A & B`，需要同时满足 A 与 B 两个类型才行。
interface NameStruct {
  name: string;
}
interface AgeStruct {
  age: number;
}
type ProfileStruct = NameStruct & AgeStruct;
const profile: ProfileStruct = {
  name: "XwenHaHa",
  age: 18,
};

type Struct1 = {
  primitiveProp: string;
  objectProp: {
    name: string;
  };
};

type Struct2 = {
  primitiveProp: number;
  objectProp: {
    age: number;
  };
};

type Compose = Struct1 & Struct2;

// type PrimitivePropType = never
// 想一下之前的定义，说明这是既符合string又符合number类型的成员，那肯定是根本不存在的类型嘛也就是never
type PrimitivePropType = Compose["primitiveProp"];
type ObjectPropType = Compose["objectProp"];

// 如果是两个联合类型组成的交叉类型呢？道理也是一样，也就是两边联合类型的交集
type UnionIntersection1 = (1 | 2 | 3) & (1 | 2);
type UnionIntersection2 = (string | number | symbol) & string;

// 3、索引类型
// 3.1索引签名类型
// 索引签名类型主要指的是在接口或者类型别名中，通过一下语法快速声明一个键值类型一致的结构
interface AllStringTypes1 {
  [key: string]: string;
}
type AllStringTypes2 = {
  [key: string]: string;
};
// 这时即使还没声明具体的属性，对于这类类型结构还是会全部被视为string类型
type PropType1 = AllStringTypes1["XwenHaHa"];
type PropType2 = AllStringTypes1["18"];
// 在这个例子中我们声明的键的类型为 string（`[key: string]`），这也意味着在实现这个类型结构的变量中只能声明字符串类型的键：
const foo1: AllStringTypes1 = {
  XwenHaHa: "18",
};

// JavaScript 中，对于 `obj[prop]` 形式的访问会将数字索引访问转换为字符串索引访问，也就是说， `obj[599]` 和 `obj['599']` 的效果是一致的。
// 因此，在字符串索引签名类型中我们仍然可以声明数字类型的键。类似的，symbol 类型也是如此：
const foo2: AllStringTypes1 = {
  linbudu: "599",
  599: "linbudu",
  [Symbol("ddd")]: "symbol",
};

// 索引签名类型也可以和具体的键值对类型声明并存，但这时这些具体的键值类型也需要符合索引签名类型的声明：
// 这里的符合即指子类型，因此自然也包括联合类型
interface StringOrBooleanTypes {
  propA: number;
  propB: boolean;
  //类型“string”的属性“propC”不能赋给“string”索引类型“number | boolean”
  //propC: string;
  [key: string]: number | boolean;
}

// 3.2、索引类型查询
// keyof操作符会把对象中所有键转换为对应字面量类型，然后再组合成联合类型
interface Foo {
  XwenHaHa: 1;
  18: 1;
}
type FooKeys = keyof Foo; // XwenHaHa | 18

// 3.3、索引类型访问
// 在 JavaScript 中我们可以通过 `obj[expression]` 的方式来动态访问一个对象属性（即计算属性）
// 而 TypeScript 中我们也可以通过类似的方式，只不过这里的 expression 要换成类型
interface Foo1 {
  propA: number;
  propB: boolean;
}

type PropAType = Foo1["propA"];
type PropBType = Foo1["propB"];
type PropTypeUnion = Foo1[keyof Foo1];

// 4、映射类型-类型编程的第一步
type Stringify<T> = {
  [k in keyof T]: string;
};

type Clone<T> = {
  [K in keyof T]: T[K];
};

interface Foo2 {
  propA: string;
  propB: number;
  propC: boolean;
  prop4: () => {};
}

type StringifyFoo = Stringify<Foo2>;
// 相当于
// type StringifyFoo = {
//     propA: string;
//     propB: string;
//     propC: string;
//     prop4: string;
// }

type StringifyCloneFoo = Clone<Foo2>;
// 这就相当于克隆了一个接口
export { status };
