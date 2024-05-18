// 基本类型
const userName: string = "Xwen";
const userAge: number = 18;
const userMarried: boolean = false;

// 对象类型
interface User {
  userName: string;
  userAge: number;
  userMarried?: boolean;
}

const xwen: User = {
  userName: "Xwen",
  userAge: 18,
  userMarried: false,
};

// 接口加上数组类型
const userList: User[] = [
  {
    userName: "test1",
    userAge: 18,
    userMarried: false,
  },
  {
    userName: "test1",
    userAge: 18,
    userMarried: false,
  },
  {
    userName: "test1",
    userAge: 18,
    userMarried: false,
  },
];

// 用接口描述对象类型，需要拥有全部属性，不能多也不能少
// const user1: User = {
//   userName: "Xwen",
// };

// 为了适应一种场景，可能需要这个属性可能又不需要，就要用到可选标记
const user2: User = {
  userName: "Xwen",
  userAge: 18,
};

// 在JavaScript中，我们存放一组常量信息通常是用对象
const userLevelCode = {
  Visitor: "1001",
  NonVIPUser: "1002",
  VIPUser: "1003",
  Admin: "1004",
};

// 而在TypeScript中，我们可以用枚举类型，这是一个更好的常量定义方式
enum USerLevelCode {
  Visitor = "1001",
  NonVIPUser = "1002",
  VIPUser = "1003",
  Admin = "1004",
}

// 这样有个好处就是相比于对象，枚举类型有更好的提示，可以看到这个枚举类型的值
console.log(USerLevelCode.Visitor);

// 关于set和map的类型标注则类似于数组类型标注中的Array<类型>
const set = new Set<number>();

set.add(1);
// set.add("2");

const map = new Map<number, string>();

map.set(1, "1");
// map.set("2", "2");
