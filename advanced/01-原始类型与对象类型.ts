// 1、原始类型的类型标注
// 除了 null 与 undefined 以外，余下的类型基本上可以完全对应到 JavaScript 中的数据类型概念
const tmp1: null = null;
const tmp2: undefined = undefined;

//在 TypeScript 中，null 与 undefined 类型都是有具体意义的类型
// const tmp3: string = null; // 不能将 null 赋值给 string
// const tmp4: string = undefined; // 不能将 undefined 赋值给 string

// TypeScript 的原始类型标注中也有 void，但与 JavaScript 中不同的是，这里的 void 用于描述一个内部没有 return 语句，或者没有显式 return 一个值的函数的返回值
function func1() {}
function func2() {
  return;
}
function func3() {
  return undefined;
}
// 在这里，func1 与 func2 的返回值类型都会被隐式推导为 void，只有显式返回了 undefined 值的 func3 其返回值类型才被推导为了 undefined。

// 你可以认为 void 表示一个空类型，而 null 与 undefined 都是一个具有意义的实际类型

// 2、数组的类型标注
// 有两种声明数组类型的方式
const arr1: string[] = [];
const arr2: Array<string> = []; // arr2: string[]

// 很多时候,数组只有固定几个成员，但是我们访问的时候却超出了数组的长度进行访问肯定是不合理的
const arr3: string[] = ["X", "Wen", "HaHa"];
console.log(arr3[2333]);

// 这种时候我们就希望的是确定数组只有几个成员，越界的时候给出类型报错，这个时候我们就可以用元组来进行类型标注
const arr4: [string, string, string] = ["X", "Wen", "HaHa"];
// console.log(arr4[2333]); // 类型报错 长度为3的元组类型[string, string, string]在2333处

// 元组也支持了在某一个位置上的可选成员
const arr5: [string, number?, boolean?] = ["XwenHaHa"];

// 有时候可能觉得元组的可读性不是很好，不能直接知道几个元素分别代表什么，而在TypeScript4.0中，有了具名元组的支持使得我们可以为元组中的元素打上类似属性的标记：
const arr6: [name: string, age: number, male?: boolean] = [
  "XwenHaHa",
  18,
  true,
];

// 除了越界访问可能还存在隐式访问，对于元组，隐式访问也能揪出来警告
// 长度为 "3" 的元组类型 "[string, number, boolean]" 在索引 "3" 处没有元素。
// const [myName, age, male, other] = arr6;

// 2、对象类型标注
interface IDescription {
  readonly name: string;
  age: number;
  male?: boolean;
  func?: Function;
}

// 每一个属性值都要一一对应到接口类型
// 我们还可以对属性进行修饰，常见包括可选和只读
const obj1: IDescription = {
  name: "XwenHaha",
  age: 18,
  male: true,
  // 无需实现 func 也是合法的
};

// 无法分配到 "name" ，因为它是只读属性
// obj1.name = "Xwen";

// interface 用来描述对象、类的结构，而类型别名用来将一个函数签名、一组联合类型、一个工具类型等等抽离成一个完整独立的类型

// object、Object 以及 { }
// 原型链的顶端就是Object以及Function，也就意味着所有原始类型和对象类型最后都指向Object，表现为Object包含了所有的类型
