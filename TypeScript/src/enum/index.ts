/**
  枚举成员的编号 永远从0开始;
  相邻的两个成员编号 总是依次递增
 */
enum Drections {
  left,
  right = 2,
  up,
  down = 5,
  west,
}
console.log(Drections.up); // 3
console.log(Drections.west); // 6

/** 若枚举的某个成员 使用了变量作为编号；那该成员的邻居 必须设置初始编号 */
const index = 2;
enum DrectionsCopy {
  left,
  right = index,
  up = 0,
  down,
}
/** 反向映射  通过编号 找到值 */
enum DrectionsCopys {
  left,
  right = index,
  up = 0,
  down,
}
console.log(DrectionsCopys[0]); // up

/** 字符串字面量枚举 */
/** 字符串枚举值 不能使用常量 或者 函数 或者 其他枚举成员的值  */
enum Message {
  success = " wow ! good",
  error = "ohh no!!!",
  info = error,
}
console.log(Message.info); //ohh no!!!
/** 枚举可以作为类型的实例1
  枚举的成员的初始编号 或者默认编号 都为数值型
*/
enum Colors {
  red,
  yellow,
  green,
  black,
}
interface IColors {
  color: Colors.green;
  color1: Colors.black;
}
const color1: IColors = {
  color: Colors.green, //   因为接口定义的类型为 Colors.green  所以 属性值  可以使用 枚举对应的属性 或者数值类型的值
  color1: Colors.black,
};
console.log(color1);

/** 枚举作为联合类型使用 */
enum Status {
  On,
  Off,
}
interface Istatus {
  status: Status;
}
const s1: Istatus = {
  status: Status.On, // status: 1 也是OK的 因为 Status.on 默认是number类型的
};

/** 运行时的枚举类型使用  因为枚举类型在编译完成后是对象形式的代码块 可以直接在编译后打印这个枚举*/
console.log(Status);
/** 枚举类型的属性都是只读属性 不能在外部修改 */

/** const 类型： 类似于定义的常量 仅仅用于隐射 编译后 的结果是 值 不能打印这个枚举 */
const enum StatusCode {
  success = 200,
  error = 500,
}
let code = 200;
if (code == StatusCode.success) {
  console.log(StatusCode.error); // 报错
}
