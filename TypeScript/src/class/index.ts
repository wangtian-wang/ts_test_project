/**
  private修饰符修饰的属性 ： 私有  属性或者方法  实例不能被继承      只能在类声明里面使用
  public修饰符修饰的属性 ：  公共  属性或者方法  可以被实例继承      实例；类内部可以访问     若没有赋值 则实例不会继承public修饰的属性  声明在constructor（）参数位置的属性 无论有没有值 最终都会被实例继承
  static修饰符修饰的属性 ：  静态  属性或者方法  不能被实例继承      只有类自己能访问
  protected            1： 受保护的  属性或者方法    只能在父类或者子类中访问  
                           在ts环境中 实例访问protected的属性和方法会报错 但是在控制台可以输出 
                           也就是打印这个实例 里面有protected修饰的属性和方法
                       2：  类的constructor 前面用 protected 修饰 该类不能被new 只能被子类继承
  public | private 可以修饰 static   private 修饰 static  static变为私有静态属性 public 好像没有get到用法

 abstruct 还能标记类中的属性；方法；存取器
 get                   get 关键字 修饰的类的方法 可以看做是类的 公共属性
                       get 就好像vuex中的getter属性；对类中已有的属性进行包装
                       set 触发时 去改变get 相对应的依赖
                      get insideName(){}   获取这个属性 ：（可以看做调用这个方法；但是不加（））instance.insideName
                      就好像是访问这个实例的 insideName 属性
                      具体使用 参见下面的例子
 类的修饰符之间的顺序是怎样的呢？？？


 */

class PersonClass {
  public school: string;
  private salary: number = 1000;
  private static adress: string;
  protected hobbies: any[] = ["singing", "dancing"];
  protected color: string = "yellow";
  constructor(public name: string = "bob", public age: number = 12) {}
  get getHobbies(): any[] {
    return this.hobbies;
  }
  get insideName() {
    return this.name + "" + this.salary;
  }
  set insideName(obj: any) {
    this.name = obj.name;
    this.salary = obj.money;
  }
  set setHobbies(h: any[]) {
    this.hobbies = h;
  }
  public addSalary(s: number) {
    this.salary += s;
  }
  protected disSalary(s: number) {
    this.salary -= s;
    console.log("lose money !!! in father protected methods");
  }
  public sayHi(): void {
    console.log("hello world");
  }
}

let bobbb = new PersonClass("bbbbb", 10);

console.log(bobbb);
bobbb.insideName = { name: "xiaohong", money: 10000 };
console.log(bobbb.insideName);
class PersonChild extends PersonClass {
  constructor(name: string, age: number, public sex: string) {
    super(name, age);
  }
  set changeColor(color: string) {
    this.color = color;
  }
  protected hairColor: string = "black";
  get getHairColor() {
    return this.hairColor;
  }
  getBaseHobbies() {
    console.log(this.hobbies);
    this.disSalary(10);
  }
}
const pc = new PersonChild("litte", 18, "man");
console.log(pc);
pc.getBaseHobbies();

// 用类 实现接口 这个类的实例必须有接口中规定的属性 且均为public 修饰的属性
interface Food {
  type: string;
  brand: string;
}
class FoodClass implements Food {
  type = "fruit";
  brand = "pan pan";
  //    static brand = "pan pan";    报错 因为static修饰的属性只有类本身能访问；实例不能继承 所以报错
  static count: number;
}
//  接口继承类 会继承类中的成员  不包括实现 和成员类型 private protected 修饰的成员； 当接口继承的类中包含private protected 修饰的属性 这个接口interface只能被这个类的子类实现procted;

class A {
  protected name: string = "a";
}
interface IA extends A {}
class ChildA extends A implements IA {
  name = "child-a";
}

const createInstance = <T>(c: new () => T): T => {
  return new c();
};
class LittleP {
  public color: string;
  constructor(public name: string) {
    this.name = name;
  }
}
console.log(createInstance<LittleP>(LittleP));
