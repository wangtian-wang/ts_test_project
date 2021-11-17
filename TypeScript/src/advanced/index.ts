/* 🚩    keyof   🚩    */
/*   🌿 (1)  数组 返回数组原型方法的字面量联合类型  */
interface IPerson {
  name: string;
  age: number;
}

type PersonType = keyof IPerson[];
type ArrayType = keyof number[];
/**
 * PersonType 的实际类型
 type PersonType = number | "length" | "toString" | "toLocaleString" | "pop" | "push" | "concat" | "join" | "reverse" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | ... 14 more ... | "includes"
 */

/*   🌿 ('2') keyof 接口或者类 返回接口或者类中共有属性的联合类型   */
type PersonType1 = keyof IPerson;
/**
 type PersonType1 = "name" | "age"
 */
class Person {
  private address: string = "shang hai";
  public phone: number = 123;
  constructor(public name: string, public age: number) {
    this.name = name;
    this.age = age;
  }
}
type PersonType2 = keyof Person;
// type PersonType2 = "name" | "age" | "number"

/*   🌿 ('3')  接口 [keyof 接口]     返回接口的属性值的联合类型   */
type PersonType3 = IPerson[keyof IPerson];
// type PersonType3 = string | number

/* 🚩   交叉类型  🚩    */

/*   🌿 ('1') 接口交叉，相同键 的属性值 类型不相同 则该键的类型为 所有类型组成的交叉类型    */

interface IAnimal {
  type: string;
  height: number;
  food: string;
}
interface IAnimals {
  color: string;
  type: any;
}
type animalType = IAnimal & IAnimals;
const dog: animalType = {
  type: "",
  height: 129,
  food: "meat",
  color: "black and white",
};

/* 🚩   extends 关键字  🚩    */
/*   🌿 ('1')   用于接口 表示接口之间的继承  支持多重继承 
                如果用type实现继承 可使用交叉类型

*/
type s = string;
type n = string[];
type all = s & n;

/*   🌿 ('1')  条件类型   用于条件判断  - 简单类型 
简单的条件判断， 直接判断前面的类型是 否可分配给 后面的类型
*/

type A = "x" | "y" extends "x" ? 1 : 2; // type A = 2
type A1 = "x" | "x" extends "x" ? 1 : 2; // type A1 = 1

/*   🌿 ('2')   条件类型   用于条件判断  - 泛型  
        传入的泛型为联合类型时，依次遍历所有的子类型进行条件判断 ，最终将所有的结果组成新的联合类型
*/

type B = "x" | "y";
type C<T> = T extends "x" ? 1 : 2;
type C1 = C<B>; // type C1 = 1 | 2

/*   🌿 ('3') 阻止extends对于联合类型的分发特性    */
type P<T> = [T] extends ["x"] ? 1 : 2;
type P1 = P<"x" | "y">; // type P1 = 2

/* 🚩    【'类型兼容性'】   🚩    */

/*   🌿 ('1')  子类型 能赋值给 父类型   
        集合论中，如果一个集合A的所有元素在集合B中都存在  则A是B的子集
       

*/

/* 🚩    【 infer】   🚩    

1： infer  关键字的 作用是 告诉ts自己去推测 变量的类型  那如果编辑器推导类型失败 会发生怎样的事情呢？
2： 只能和extends 条件类型上使用 不能在其他地方上使用

说继承 或者是说分配也好 本质上是一种怎样的关系呢？ 
A 继承 B 那B 是父类  A 的类型更加具体 B 的类型更加宽泛
                   



*/

/*   🌿 ('1') infer 推导逆变    

逆变 是infer推导的接口 里面都是函数类型 推导结果为交叉类型

*/

//  猜想   这里的u 代表 ts 自己推断的参数的类型变量   U 的值必须是唯一的 确定的类型吗？ 当在testBar  testBar3 里面测试返回never的时候
type Bar<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void }
  ? U
  : never;

type testBar = Bar<{ a: (x: string) => void; b: (x: number) => void }>; // never

type testBar1 = Bar<{ a: (x: number) => void; b: (x: number) => void }>; // number

type testBar2 = Bar<{ a: (x: string) => void; b: (x: string) => void }>; // string

type testBar3 = Bar<{ a: (x: string) => void }>; // never

/*   🌿 ('1') infer 推导协变    
协变 是infer推导的接口 里面都是普通类型  推导结果为联合类型( 直白理解 方便记忆)
infer 推导的 名称相同 并且都处于 协变的位置 则推导的结果将会是 联合类型

*/
type Foo<T> = T extends { a: infer U; b: infer U } ? U : never;
type testFoo = Foo<{ a: string }>; // never
type testFoo1 = Foo<{ b: string }>; // never
type testFoo2 = Foo<{ a: string; b: number; c: number }>; // string | number      注意📢 ： 接口的key必须相同
type testFoo3 = Foo<{ a: string; c: number }>; // never

/* 🚩    【'Omit'】 Omit<T, U> 从T中剔除U属性   🚩    
                            U 是 T中属性的字面量类型
                            U为联合类型  所有联合的类型全部剔除
                            U 为交叉类型 返回的是never 因为Omit<T, never>  返回的完整的T类型
                            字面量的交叉类型 返回的是never类型
*/

type pens = {
  brand: string;
  color: string;
  price: number;
};
type pencils = "brand";
type omitType = Omit<pens, pencils>;
// type omitType = {
//     color: "red";
//     price: number;
// }
type pencils1 = "brand" & "price"; // never
type omitType1 = Omit<pens, never>;

/* 🚩    【   ReturnType   】   🚩    */
/* 🚩    【   Parameters  】   🚩    */

/*   🌿   都是获取函数的返回值或者参数的类型 放在一个元祖中  [arg1:string; arg2：number]    */

type returnFnType = (param1: string, param2: number) => [string, number];
const returnFn: returnFnType = (
  param1: string,
  param2: number
): [string, number] => {
  return [param1, param2];
};

type Return = ReturnType<returnFnType>; // [string, number]
type Parameter = Parameters<returnFnType>; // type Parameter = [param1: string, param2: number]

/* 🚩    【   ConstructorParameters  】  获取类的构造函数参数的类型 🚩    */

interface ErrorCtr {
  new (message?: string): Error;
  (message?: string): Error;
  readonly prototype: Error;
}
type ctrType = ConstructorParameters<ErrorCtr>; //type ctrType = [message?: string]
class PersonStr {
  constructor(public name: string, public age: number) {}
}
type personType = ConstructorParameters<typeof PersonStr>; //type personType = [name: string, age: number]

/* 🚩    【  typeof class 和class直接作为类型的区别  】  获取类的构造函数参数的类型 🚩    */
/*   🌿 ('1')    people: People  = new person()  
 因为  用类作为类型 该类型获取的是该类上的实例属性和实例方法（也叫原型方法） 
 所以 该类型的满足条件是  等号右边必须是该类的实例  */
/*   🌿 ('2')    typeof People = People   
 因为  用typeof 类作为类型 该类型获取的是该类上的静态属性和方法
 所以  该类型的满足条件是  等号右边必须是该类自己
*/

class People {
  name: string;
  age: number;
  constructor() {}
}
const people: People = new People();
// const people1: People = People; //    等号右边报错          类型 "typeof People" 中缺少属性 "age"，但类型 "People" 中需要该属性。
// const people2: typeof People = new People();people2 报错   类型 "People" 中缺少属性 "prototype"，但类型 "typeof People" 中需要该属性
const people3: typeof People = People;

/* 🚩    【 never】   🚩    */
/*   🌿 (1) never 可以是任何类型的子类型 既 never可以赋值给任何类型 但是只有never类型可以赋值给never类型    */
/*   🌿 (2) 类型保护和类型检测的主要思想是 尝试检测属性 方法 或者原型 已确定如何处理值                      */
/*   🌿 (3) is 是类型别谓词 type predicate                      */
