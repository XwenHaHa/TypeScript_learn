// 有一个接口结构，描述了响应的消息结构
interface IRes {
  code: number;
  status: string;
  data: any;
}

// 但是在大多数情况下，这里的code和status来自于一组确定值的集合
// 我们就可以使用联合类型加上字面量类型了
interface ICorrectRes {
  code: 1000 | 10001 | 50000;
  status: "success" | "failture";
  data: any;
}

// 最开始可能会好奇，'1000'和'success'这些不是一个值吗，怎么也可以作为类型
// 在TypeScript中，这叫做字面量类型，代表比原始类型更精确的类型，同时也是原始类型的子类型
// 主要包括字符串字面量类型、数字字面量类型、布尔字面量类型和对象字面量类型
const str: "Xwen" = "Xwen";
const num: 18 = 18;
const bool: true = true;

// 单个字面量类型一般没有意义，通常和联合类型一起使用
interface Tmp {
  bool: true | false;
  num: 1 | 2 | 3;
  str: "Xwen" | "Ha" | "Ha";
}

// 联合类型
interface Tmp1 {
  mixed: true | string | 999 | {} | (() => {}) | (1 | 2);
}
// 联合类型中的函数类型需要用()包裹起来

// 枚举值
enum PageUrl {
  Home_Page_Url = "url1",
  Setting_Page_Url = "url2",
  Share_Page_Url = "url3",
}
