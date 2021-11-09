// 这是一个关于 ts 高级类型学习的 例子 可以拷贝整个示例的代码 到当前文件夹下面 ts 文件运行

// 类型保护 类型断言 的区别 使用场景
const valueList = [123, "abc"];
const getRandomValue = () => {
  const number = Math.random() * 10;
  if (number < 5) {
    return valueList[0];
  } else {
    return valueList[1];
  }
};
const item = getRandomValue();

// 报错
/**
   if (item.length) {
  console.log(item.length);
  } else {
  console.log(item.toFixed());
  }
   */

/**
  
   */

// 类型断言 as 后面是明确的类型 缺点： 太麻烦
if ((item as string).length) {
  console.log((item as string).length);
} else {
  console.log((item as number).toFixed());
}
// typeof 能精确的判断类型 但是只有使用 == 或者 ！== 去精确判断两种类型是和否相等
// 但是 typeof 出来的值只能是一下几种 string number boolean symbol
if (typeof item === "string") {
  console.log(item.toString());
} else {
  console.log(item.toFixed());
}
// 使用类型保护 适用于复杂的代码逻辑 返回值的类型为 boolean 也是 OK 的
function isString(value: number | string): value is string {
  return typeof value === "string";
}
// 确定代码块 if 里面的类型 else 就是其他的类型 ts 进行类型的推断 只要能准确推断 TODO 编译就通过
if (isString(item)) {
  console.log("is string");
} else {
  console.log("is number");
}
// instanceof

// null undefined 是所有类型的子类型 意思是 声明一个变量 当没有给定类型时 ts 会自动推断类型 ；这个时候 可以将已经赋值的变量赋值为 null 或者 undefined

// null 和 undefined 是严格区分的
// null undefined 是两种不同的类型 string | null | undefined 是单独的类型

// 编译器无法识别嵌套函数的 null 所以需要手动处理

function getStr(str: number | null): string {
  function getRes(prefix: string) {
    return prefix + str!.toFixed().toString();
  }
  str = str || 0.1;
  return getRes("lion-");
}
getStr(123);

function getStr1(str: number | null): string {
  function getRes(prefix: string) {
    return prefix + str!.toFixed().toString();
  }
  str = str || 0.1;
  return getRes("lion-");
}
getStr1(123);

// 类型别名
type StringType = string;
type PositionType<T> = { a: T; b: T };
// 泛型的使用： 1 先确定 T 的类型，根据类型给变量赋值
const positionLeft: PositionType<number> = {
  a: 1,
  b: 2,
};
const positionRight: PositionType<string> = {
  a: "a",
  b: "b",
};

// 类型别名只能将类型别名自己 作为属性值来使用自己 否则就会报错
type Animals<T> = {
  food: T;
  children?: Animals<T>;
};

let dog: Animals<string> = {
  food: "meat",
  children: {
    food: "meat",
  },
};

//当接口 使用类型别名时 不能使用 extends implements

// 类型别名 有时候和 接口可以兼容 仅仅当定义的类型成员相同时

// 字面量类型 指定类型为一个具体的值
// 字符串字面量 和字符串字面量类型并不相同

// 字符串字面量包括 数字字符串 | 字符串字面量
// 字符串字面量
type Name = "per";
const person: Name = "per";
// const person1: Name = "perper";

// 可辨识联合 要点 定义的每个 interface 需要有 一个相同的属性 type 2： type shape = SquareInterface | Rectangle 3 实现一个根据 type 去判断返回 shape 面积的函数

/_完整性检查 _/;
// strictullChecks 指定返回值类型 会自动检查有那种 type 没有被检查到
// 使用 never 类型;
// 当一个函数返回值为错误 或者不可能有返回值的时候 可以使用 never

interface SquareInterface {
  type: "square";
  width: number;
}
interface Rectangle {
  type: "rectangle";
  width: number;
  heigth: number;
}
interface Circle {
  type: "circle";
  radius: number;
}

type Shape = SquareInterface | Rectangle | Circle;
function assertNever(value: never): never {
  throw new Error("unexpected error");
}
function getArea(shape: Shape): number {
  switch (shape.type) {
    case "square":
      return shape.width * shape.width;
      break;
    case "rectangle":
      return shape.heigth * shape.width;
      break;
    case "circle":
      return Math.PI * shape.radius * 2;
      break;
    default:
      return assertNever(shape); // 编译阶段提醒我们 没有判断到的情况
  }
}

/*  this 类型 */

// 子类继承父类 在父类中 return 的 this 可以使子类链式调用父类的方法

class Counter {
  constructor(public count: number = 0) {
    this.count = count;
  }
  add(x: number, y: number) {
    console.log(x + y);
    return this;
  }
}
class ChindCounter extends Counter {
  constructor(public count: number = 0) {
    super(count);
  }
  substract(x: number, y: number) {
    console.log(x - y);
    return this;
  }
}

const cCounter = new ChindCounter(3);
cCounter.add(2, 3).substract(4, 2);

// 索引类型
// 查询 keyof
interface PersonInfo {
  name: string;
  age: number;
  sex: null;
  adress: undefined;
  job: never;
}
let personA: keyof PersonInfo;
personA = "name";
personA = "age";

// keyof 结合 type 使用 当接口的属性值为 never 时 属性不能作为字面量联合类型

type GPerson = PersonInfo[keyof PersonInfo]; // type GPerson = string | number | null | undefined

// 总结： keyof 可以实现将 接口的属性 作为 变量的字面量联合类型 相当于 type person = name | age let personA : person
// 访问

function getValues<T, K extends keyof T>(obj: T, names: K[]): Array<T[K]> {
  // Array<T[K]> == obj[k] K[] == [obj 的属性 name，obj 的属性 suger] K extends keyof T == k === obj 的属性 name |obj 的属性 suger
  return names.map((n) => obj[n]);
}

const fruits = {
  name: "apple",
  suger: "12",
};

let fruitInfo: Array<string | number> = getValues(fruits, ["name", "suger"]);

// [] 索引访问操作符 用来访问属性的类型
interface fruitF {
  name: string;
  suger: number;
}

type SuperAnimals = fruitF["name"]; // type SuperAnimals = string

/*
定义一个接口 假若该接口的 key 是 string 类型 那实现接口的时候 key 可以设置为 number 对象的属性名会自动转字符串 假若 key 是 number 类型 那实现的时候 key 必须为 number
*/

interface peach {
  [price: string]: number;
}
let ppp: peach = {
  price: 12,
};
interface peach1 {
  [price: number]: number;
}
/* 
        let ppp1: peach1 = {
           price: 12,
        }; 
*/
let pm: peach["price"];

// 映射类型
// ts 内置了两种映射类型 ReadOnly Partial
interface Goods {
  price: number;
  count: number;
  brand: string;
}
// 只读属性 ReadOnly
type ReadOnlyGoods<T> = {
  readonly [p in keyof T]: T[p]; // keyof T = {price count brand} for (key in goods) { readOnly key : goods[key]}
};
// 可选参数 Partial
type ReadOnlyGoodsChoose<T> = {
  readonly [p in keyof T]?: T[p];
};
type ReadOnlyGoods1 = ReadOnlyGoods<Goods>;
let infoGoods: ReadOnlyGoods1 = {
  price: 100,
  count: 12,
  brand: "new b",
};
// infoGoods.brand = "qqwqww";

// Pick 原来类型上的 一部分属性名 组成的新的类型

interface GoodsF {
  price: number;
  count: number;
  brand: string;
}
const goodsF: GoodsF = {
  price: 12,
  count: 10,
  brand: "none",
};
function pick<T, K extends keyof T>(obj: T, key: K[]): Pick<T, K> {
  const res: any = {};
  key.map((m) => {
    res[m] = obj[m];
  });
  return res;
}
const goodsQ = pick(goodsF, ["brand", "count"]);

// Record 将一个对象中属性值转换为其他类型 返回的对象的属性值和原来的不一样
// record 隐射出的对象的属性值是新的 和输入的不一样 所以是非同态的
const goodsW = {
  price: "height",
  count: "many",
  brand: "none",
};
function mapObjects<K extends string | number, T, U>(
  obj: Record<K, T>,
  f: (x: T) => U
): Record<K, U> {
  const res: any = {};
  for (const k in obj) {
    res[k] = f(obj[k]);
  }
  return res;
}
const lengths = mapObjects(goodsW, (s) => s.length);

// 同态是啥 ？
// 两个相同类型的代数的结构保持映射; record
// 拆包 由映射类型 推断为原始类型
type Proxy<T> = {
  get(): T;
  set(value: T): void;
};
type Proxify<T> = {
  [P in keyof T]: Proxy<T[P]>;
};
// 包装原始对象
function proxify<T>(obj: T): Proxify<T> {
  let res = {} as Proxify<T>;
  for (const k in obj) {
    res[k] = {
      get: () => obj[k],
      set: (value) => (obj[k] = value),
    };
  }
  return res;
}
let props = {
  name: "leo",
  age: 12,
};
let proxyProps = proxify(props);
proxyProps.name.get();

// 变为原始对象
function unProxify<T>(obj: Proxify<T>): T {
  const res = {} as T;
  for (const k in obj) {
    res[k] = obj[k].get();
  }
  return res;
}
let originalObj = unProxify(proxyProps);

// + - 号修饰符 用于增加 或者取消 属性前面的修饰符

type ReadOnlyType<T> = {
  +readonly [P in keyof T]: T[P];
};
type ReadOnlyInfos = ReadOnlyType<Goods>;
let infos: ReadOnlyInfos = {
  price: 12,
  brand: "none",
  count: 13,
};
type RemoveReadOnlyInfos<T> = {
  -readonly [P in keyof T]: T[P];
};
type NoReadonlyType = RemoveReadOnlyInfos<ReadOnlyInfos>;

// number symbol 类型 可以作为 接口 或者类型别名的属性

const idx1 = "a";
const idx2 = 1;
const idx3 = Symbol();

type objSuper = {
  [idx1]: string;
  [idx2]: number;
  [idx3]: symbol;
};
type SuperTypes = keyof objSuper; // type SuperTypes = "a" | 1 | typeof idx3

type ReadSuperTypes<T> = {
  readonly [P in keyof T]: T[P];
};
let objSuper1: ReadSuperTypes<objSuper> = {
  a: "123",
  1: 11,
  [idx3]: Symbol(),
};
// objSuper1[idx3] = Symbol();

// 元祖或者数组的映射类型 会生成新的隐射类型

type Tuple = [number, string, boolean];
type MapingPromise<T> = {
  [K in keyof T]: Promise<T[K]>;
};
type PromiseTuple = MapingPromise<Tuple>;
let promiseTurple: PromiseTuple = [
  new Promise((resolve) => resolve(1)),
  new Promise((resolve) => resolve("1")),
  new Promise((resolve) => resolve("false")),
];

// unknow
// [1]任何类型都可以赋值给 unknow
// [2]如果没有类型断言或者基于控制流的类型细化时， 不能赋值给某个变量
let value1: unknown;
// let value2: string = value1;
// value1 = value2;
// [3]如果没有类型断言或者基于控制流的类型细化时， 不能在 unknown 上面进行任何操作
let value3: unknown;
// value3++;
// [4] unknow 与任何其他类型组成的交叉类型 最后都等于其他类型
type type1 = unknown & string;
// [5] unknow 与任何其他类型(除了 any),组成的 联合 **类型** 最后都等于 unknown 类型
type type5 = unknown | string | string[];
// [6] never 类型是 unknown 类型的子类型
type type6 = never extends unknown ? true : false;
// [7] keyof unknow 等于类型 never
// [8] 只能对 unknow 进行等或者不等的操作 不能进行其他操作
// [9] unknow 类型的值 不能访问他的属性，不能作为函数调用；不能作为类创建实例
let value9: unknown;
/* 
value9.age;
value9();
new value9();
*/

// [10] 使用映射类型时 如果遍历的是 unknow 类型，则不会映射任何属性
type type10<T> = {
  [P in keyof T]: T[P];
};
type type100 = type10<any>;
type type1000 = type10<unknown>;
type type10000 = type10<number>;

// 条件类型
type typeQ<T> = T extends string ? string : number;
let result: typeQ<"false">;

// 分布式联合类型
// string number 是 any 的子类型
type TypeName<T> = T extends any ? T : never;
type typeTest = TypeName<string | number>;
type TypeName1<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T extends undefined
  ? undefined
  : T extends Function
  ? () => void
  : object;
type type111 = TypeName1<() => void>;
type type1111 = TypeName1<string[]>;
type typeUnin<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
interface part {
  id: number;
  name: string;
  subparts: () => void;
}
type type12 = typeUnin<part>; // [keyof T] 返回一个接口中 属性值类型不为 never 的属性

// infer 条件类型类型推断

//demo 是数组 返回数组元素的类型 否则传入啥类型返回啥类型 T[number] will return type of T array element
type inferType<T> = T extends any[] ? T[number] : T;
type itypes = inferType<(string | number)[]>;
type itypes1 = inferType<string>;

type InferType<T> = T extends Array<infer U> ? U : T;
type Itypes = inferType<(string | number)[]>;
type Ttypes1 = inferType<string>;

// 内置的条件类型
// Exclude<T, U> 当 params 的元素和 params2 中有相同的类型时 返回两个类型中的差集
type ExcludeTypes = Exclude<"a" | "b" | "c", "c">;

// Exclude<T, U> 当 params 的元素和 params2 中没有相同的类型时 返回 params1 中的参数
type ExcludeTypes1 = Exclude<"string" | "function" | "boolean", "symbol">;

// Extract<T, U> 返回 T 中 可以赋值给 U 的类型 返回两个类型中相交的类型

type ExtractType = Extract<"string" | "boolean" | "symbol", "symbol">;

// NonNullable<T> 去掉 T 中的 null 和 undefined 了类型

// ReturnType<T> 获取函数返回值的类型
type TypeR = ReturnType<() => number>;

// InstanceType<T> 获取构造函数的实例类型

class AClass {
  constructor() {}
}

type T1 = InstanceType<typeof AClass>;
type T2 = InstanceType<any>;
// type T3 = InstanceType<string>;

// 类型推断和兼容性
// export 对外导出的是接口 （声明的变量） 外界通过这个变量去获取值 动态导出 export 必须作为模块全局的对象 不能放在块级作用域内
// as const 类型断言
/*
 不会编译通过 （应该有 2 个参数，但获得的参数大于 0 没有提供参数 y 的变量）
  let arr = [1, 2];
 Math.atan2(...arr);
 会编译通过
 let arr = [1, 2] as const;
 Math.atan2(...arr);
 等同于
 let arr:readnoly[1,2,3,4] 编译器自动推断为只读类型的 元素个数不可变的数组 类似于元祖 ；Math.atan2(...arr) 只需要 2 个参数 所以编译通过

as const 等同于将这个变量 变为 readOnly 的类型
*/
