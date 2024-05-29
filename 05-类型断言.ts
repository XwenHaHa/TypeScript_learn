// any类型意思是告诉类型检查系统，放弃这个类型的检查
function myFunc1(param: any): any {}

// 想要用万能类型+不想放弃类型检查就需要用到unknown类型
// param 的类型已经被固定为 unknown，此时我们可以用类型断言修改一个变量的类型
// 指着这个变量告诉 TS，这个类型看起来是一个字符串，其实它是一个数字！
function myFunc2(param: unknown) {
  (param as unknown[]).forEach((item) => {});
}

// 有些时候开发者开始是定义好了维护类型的，但是随着项目不断迭代更替，导致类型报错
// 这个时候我们就可以请出类型断言，然后随着一步步调用不断完善类型最后补全
const str: string = "Xwen";
(str as any).handler().result.prop; // ...

interface IJob {
  title: string;
}

interface IUser {
  name: string;
  job: IJob;
}

const user: IUser = {
  name: "Xwen",
  job: {
    title: "Front end Engineer",
  },
};

// 这里的job如果我们不加类型断言，TypeScript 会认为此时 job 的类型就是一个空对象
const { name: myName, job = {} as IJob } = user;

const { title } = job; // 类型“{}”上不存在属性“title”。

// 总结：unknown和any都赋予了我们描述任意类型的能力，而unknown则是为了解决any类型过于无拘无束的特点而生的
