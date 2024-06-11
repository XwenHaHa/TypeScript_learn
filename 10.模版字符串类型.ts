// 1、JS中有模版字符串的概念，TS的类型中也有这个概念
type Name = "Xwen";
type Greeting = `Hello ${Name}`;
// 模板字符串类型的语法和模板字符串完全一致，包括定义与内部的计算插槽
const People: Greeting = "Hello Xwen";

// 2、而在类型检查方面，模版字符串类型可以提供更加精确的字符串类型结构描述，例如我们检查一个字符串是否满足1.2.3这样的格式
type Version = String;

const v1: Version = "1.2.3";
// 例如这里的v2应该是不符合我的条件的，但是还是通过了
const v2: Version = "1.2";

type NewVersion = `${number}.${number}.${number}`;

const v3: NewVersion = "1.2.3";
// const v4: NewVersion = "1.2"; //不能将类型“"1.2"”分配给类型“`${number}.${number}.${number}`”。
// const v5: NewVersion = "a.2.3"; //不能将类型“"a.2.3"”分配给类型“`${number}.${number}.${number}`”。

// 3、类型别名的函数式用法，其实和模版字符串类型也可以有紧密合作
type SayHello<T extends string | number> = `Hello ${T}`;
const Greet1: SayHello<"Xwen"> = "Hello Xwen";
const Greet2: SayHello<2333> = "Hello 2333";

// 模版字符串类型还有一个重要的能力是其自动分发的特性，即当一个模板字符串类型中的插槽传入了联合类型时，这个模板字符串类型会自动被扩展为使用所有联合类型的组合
type Brand = "iphone" | "xiaomi" | "honor";
// type SKU = "iphone-lastest" | "xiaomi-lastest" | "honor-lastest"
// 由于我们在插槽中传入了一个联合类型，模板字符串类型自动地遍历所有可能的联合类型成员，进行计算后再重新合并回联合类型
type SKU = `${Brand}-lastest`;

// 那如果是多个联合类型呢？
type Memory = "16G" | "32G" | "64G" | "128G";
type ItemType = "official" | "second-hand";
// 这个时候我们就会得到一个多个类型的排列组合
type NewSKU = `${Brand}-${Memory}-${ItemType}`;

// 为什么需要这个类型？ 使用字面量类型来提供精确的类型定义时，会面临的一个问题就是当可用的字面量类型过多，自己一个个写会非常的头痛，可能就直接选择用 string 类型了。
