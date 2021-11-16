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
