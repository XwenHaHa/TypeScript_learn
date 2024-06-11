// 场景：之前声明对象类型的时候，只读必须在声明时就进行描述同时无法修改，那么Partial登场
type User = {
  name: string;
  age: string;
  email: string;
};

type PartialUser = Partial<User>;

// 这里Partial会把User的属性都变成可选的不用一个个去标记
const newUser: PartialUser = {
  name: "XwenHaHa",
  age: "18",
};

// 那么有可选就会有必选，这时候Required就出场了
type RequireUser = Required<User>;

// 这里Required会把对象里的属性全部变为必选
const newUser1: RequireUser = {
  name: "XwenHaHa",
  age: "18",
  email: "xwenhaha@qq.com",
};

// 除此之外，还有readonly修饰
type ReadonlyUser = Readonly<User>;

const newUser2: ReadonlyUser = {
  name: "XwenHaHa",
  age: "18",
  email: "<EMAIL>",
};

// 无法为“name”赋值，因为它是只读属性。
// newUser2.name = "a";
