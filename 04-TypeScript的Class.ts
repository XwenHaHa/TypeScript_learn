class Person {
  private name: string;
  private age: number;
  constructor(personName: string, personAge: number) {
    this.name = personName;
    this.age = personAge;
  }
  public getDesc(): string {
    return `${this.name} at ${this.age} years old`;
  }
  public getName(): string {
    return this.name;
  }
  public getUpperCaseName(): string {
    return this.name.toLocaleUpperCase();
  }
  // Class里面的方法也支持重载
  feedPet(catFood: string): void;
  feedPet(dogFood: number): void;
  feedPet(rabbitFood: boolean): void;
  feedPet(food: string | number | boolean): void {}
}

const person = new Person("Xwen", 18);
console.log(person.getDesc());
console.log(person.getName());
console.log(person.getUpperCaseName());
// console.log(person.name); // 属性“name”为私有属性，只能在类“Person”中访问

// 标记为静态成员之后，可以不实例化这个类就可以访问里面这个成员
export class DateUtils {
  static isSameDate() {}
  static diffDate() {}
}
