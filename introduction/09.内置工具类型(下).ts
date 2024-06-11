// 1:Record
type UserProps = "name" | "job" | "email";

type User = Record<UserProps, string>;
// 相当于实现了:
// type User = {
//   name: string;
//   job: string;
//   email: string;
// };

const user: User = {
  name: "XwenHaHa",
  job: "front-end-engineer",
  email: "xwenhaha@qq.com",
};

// 可以用Record类型来声明属性名还没确定的接口类型
type unknownProps = Record<string, string>;
const unknownUser: unknownProps = {
  name: "XwenHaHa",
  age: "18",
  job: "front-end-engineer",
  email: "xwenhaha@qq.com",
};

// 2:Pick
// Pick接收一个对象类型以及一个字面量类型组成的联合类型，这个联合类型只能是对象类型的属性名组成
type pickUserProps = Pick<User, "name" | "job">;
const pickUser: pickUserProps = {
  name: "XwenHaHa",
  job: "front-end-engineer",
};

// 3:Omit
// Omit类型就相当于Pick类型的另一面，入参和Pick一致但效果却是相反的
// 它会移除传入的属性名的部分，只保留剩下的部分作为新的对象类型：
type omitUserProps = Omit<User, "name" | "job">;
const omitUser: omitUserProps = {
  email: "xwenhaha@qq.com",
};

// 4:Exclude差集 Extract交集
type PeopleProps = "name" | "age" | "email" | "phone" | "address";
type OtherPeopleProps = "name" | "email";

// type ExcludePeopleProps = "age" | "phone" | "address"
type ExcludePeopleProps = Exclude<PeopleProps, OtherPeopleProps>;

// type ExtractPeopleProps = "name" | "email";
type ExtractPeopleProps = Extract<PeopleProps, OtherPeopleProps>;

// 5:Parameters 和 ReturnType
// 提取函数的参数类型与返回值类型：
// type Add = (x: number, y: number) => number;
// 如果只有函数，而并没有这个函数类型呢
const addHandler = (x: number, y: number) => x + y;
type Add = typeof addHandler;

type AddParams = Parameters<Add>;
type AddReturn = ReturnType<Add>;

const addParams: AddParams = [1, 2];
const returnParams: AddReturn = 3;

// 6:Awaited提取Promise内部的string类型
// 定义一个函数，该函数返回一个 Promise 对象
async function getPromise() {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Hello, World!");
    }, 1000);
  });
}

type Result = Awaited<ReturnType<typeof getPromise>>;

export { UserProps, User };
