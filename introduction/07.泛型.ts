// 类型别名还能充当函数的作用，但是函数怎能没有入参？
type Status<T> = "success" | "failure" | "pending" | T;
type CompleteStatus = Status<"offline">;
// 这里的CompleteStatus其实等价于type CompleteStatus = 'success' | 'failure' | 'pending' | 'offline';

// 那么泛型的存在感是不是一个默默无闻的参数呢？那是因为这里展示的是主动赋值的做法，自动推导才是它实际的王牌
// 如果有这样一个函数，给个字符串就返回字符串类型，给个数字就返回数字类型
function factory(input: string | number): string | number {
  // ...
}

// 且不说这样对不对，那如果入参又多了一个布尔类型，难道又加一次？慢慢到10几个类型可想而知
// 泛型就是为了解决这个而生的
function factory1<T>(input: T): T {}

// function factory1<number[]>(input: number[]): number[]
factory1([1, 2, 3]);

export { Status, CompleteStatus };
