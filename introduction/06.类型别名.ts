// 字面量类型
// 字面量类型的意思就是希望将变量类型约束在几个特定的值里面,而组成 Status 的这两个“值”，其实就是字面量类型
// 例如下面的Xwen和HaHa都是字面量类型
type Status = "Xwen" | "HaHa";
const fixedStr: Status = "Xwen";
const fixedNum = 2333;
// 理想状态下，例如请求状态和用户类型被固定在一定范围内的属性，都应该用字面量类型来约束

// 我们甚至可以用接口组成的联合类型
interface VisitorUser {}
interface CommonUser {}
interface VIPUser {}
interface AdminUser {}

type User = VisitorUser | CommonUser | VIPUser | AdminUser;

// 交叉类型
interface UserBasicInfo {}
interface UserJobInfo {}
interface UserFamilyInfo {}

type UserInfo = UserBasicInfo & UserJobInfo & UserFamilyInfo;
// 如果交叉几个对象类型，可以理解为是一个新的类型内部合并了这两个对象类型
