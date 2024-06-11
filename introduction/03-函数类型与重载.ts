// 使用函数的时候，我们需要传递给函数需要的入参-函数进行计算-使用函数的返回值
// 所以我们真正关注的也只有函数的入参和返回值
function sum(a: number, b: number): number {
  return a + b;
}

type Sum = (a: number, b: number) => number;

const sum1: Sum = function (a, b) {
  return a + b;
};

// 如果函数无返回值,没有显示的return语句要使用void而不是undefined
function handler1(): void {}

// 函数重载，如果一个函数的入参有多种组合，函数重载会这么写
function sumFunc(x, y) {
  if (typeof x === "number" && typeof y === "number") {
    return x + y;
  } else if (Array.isArray(x) && typeof y === "number") {
    return x.map((num) => num + y);
  } else if (typeof x === "number" && Array.isArray(y)) {
    return y.map((num) => num + x);
  } else if (Array.isArray(x) && Array.isArray(y)) {
    if (x.length !== y.length) {
      throw new Error("Arrays must have the same length");
    }
    return x.map((num, index) => num + y[index]);
  } else {
    throw new Error("Invalid arguments");
  }
}
