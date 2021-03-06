/* ð©    keyof   ð©    */
/*   ð¿ (1)  æ°ç» è¿åæ°ç»ååæ¹æ³çå­é¢éèåç±»å  */
interface IPerson {
  name: string;
  age: number;
}

type PersonType = keyof IPerson[];
type ArrayType = keyof number[];
/**
 * PersonType çå®éç±»å
 type PersonType = number | "length" | "toString" | "toLocaleString" | "pop" | "push" | "concat" | "join" | "reverse" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | ... 14 more ... | "includes"
 */

/*   ð¿ ('2') keyof æ¥å£æèç±» è¿åæ¥å£æèç±»ä¸­å±æå±æ§çèåç±»å   */
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

/*   ð¿ ('3')  æ¥å£ [keyof æ¥å£]     è¿åæ¥å£çå±æ§å¼çèåç±»å   */
type PersonType3 = IPerson[keyof IPerson];
// type PersonType3 = string | number

/* ð©   äº¤åç±»å  ð©    */

/*   ð¿ ('1') æ¥å£äº¤åï¼ç¸åé® çå±æ§å¼ ç±»åä¸ç¸å åè¯¥é®çç±»åä¸º ææç±»åç»æçäº¤åç±»å    */

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

/* ð©   extends å³é®å­  ð©    */
/*   ð¿ ('1')   ç¨äºæ¥å£ è¡¨ç¤ºæ¥å£ä¹é´çç»§æ¿  æ¯æå¤éç»§æ¿ 
                å¦æç¨typeå®ç°ç»§æ¿ å¯ä½¿ç¨äº¤åç±»å
                3: ç¨äºè¡¨ç¤ºæ³åççº¦æ
                4ï¼ è¡¨ç¤ºæ¡ä»¶æ§å¶ T extends U ? 'x' : 'y'
                5:  æ¡ä»¶åå    T extends U å½ Tä¸ºä¸ä¸ªèåç±»åçæ¶å ä¼è¿è¡æ¡ä»¶åå  çðð»çä¸¾ä¾

*/
type s = string;
type n = string[];
type all = s & n;

/*   ð¿ ('1')  æ¡ä»¶ç±»å   ç¨äºæ¡ä»¶å¤æ­  - ç®åç±»å 
ç®åçæ¡ä»¶å¤æ­ï¼ ç´æ¥å¤æ­åé¢çç±»åæ¯ å¦å¯åéç» åé¢çç±»å
*/

type A = "x" | "y" extends "x" ? 1 : 2; // type A = 2
type A1 = "x" | "x" extends "x" ? 1 : 2; // type A1 = 1

/*   ð¿ ('2')   æ¡ä»¶ç±»å   ç¨äºæ¡ä»¶å¤æ­  - æ³å  
        ä¼ å¥çæ³åä¸ºèåç±»åæ¶ï¼ä¾æ¬¡éåææçå­ç±»åè¿è¡æ¡ä»¶å¤æ­ ï¼æç»å°ææçç»æç»ææ°çèåç±»å
*/

type B = "x" | "y";
type C<T> = T extends "x" ? 1 : 2;
type C1 = C<B>; // type C1 = 1 | 2

/*   ð¿ ('3') é»æ­¢extendså¯¹äºèåç±»åçååç¹æ§    */
type P<T> = [T] extends ["x"] ? 1 : 2;
type P1 = P<"x" | "y">; // type P1 = 2

//
type union = string | number;
type isNumber<T> = T extends number ? "isNumber" : "isString";
type testIsNumber = isNumber<union>; //type testIsNumber = "isNumber" | "isString"

/* ð©    ã'ç±»åå¼å®¹æ§'ã   ð©    */

/*   ð¿ ('1')  å­ç±»å è½èµå¼ç» ç¶ç±»å   
        éåè®ºä¸­ï¼å¦æä¸ä¸ªéåAçææåç´ å¨éåBä¸­é½å­å¨  åAæ¯Bçå­é
       

*/

/* ð©    ã inferã   ð©    

1ï¼ infer  å³é®å­ç ä½ç¨æ¯ åè¯tsèªå·±å»æ¨æµ åéçç±»å  é£å¦æç¼è¾å¨æ¨å¯¼ç±»åå¤±è´¥ ä¼åçææ ·çäºæå¢ï¼
2ï¼ åªè½åextends æ¡ä»¶ç±»åä¸ä½¿ç¨ ä¸è½å¨å¶ä»å°æ¹ä¸ä½¿ç¨
3ï¼ å¯¹æ»¡è¶³çæ³åç±»åè¿è¡å­ç±»åæ½å
è¯´ç»§æ¿ æèæ¯è¯´åéä¹å¥½ æ¬è´¨ä¸æ¯ä¸ç§ææ ·çå³ç³»å¢ï¼ 
A ç»§æ¿ B é£B æ¯ç¶ç±»  A çç±»åæ´å å·ä½ B çç±»åæ´å å®½æ³
                   



*/

/*   ð¿ ('1') infer æ¨å¯¼éå    

éå æ¯inferæ¨å¯¼çæ¥å£ éé¢é½æ¯å½æ°ç±»å æ¨å¯¼ç»æä¸ºäº¤åç±»å

*/

//  çæ³   è¿éçu ä»£è¡¨ ts èªå·±æ¨æ­çåæ°çç±»ååé   U çå¼å¿é¡»æ¯å¯ä¸ç ç¡®å®çç±»ååï¼ å½å¨testBar  testBar3 éé¢æµè¯è¿åneverçæ¶å
type Bar<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void }
  ? U
  : never;

type testBar = Bar<{ a: (x: string) => void; b: (x: number) => void }>; // never

type testBar1 = Bar<{ a: (x: number) => void; b: (x: number) => void }>; // number

type testBar2 = Bar<{ a: (x: string) => void; b: (x: string) => void }>; // string

type testBar3 = Bar<{ a: (x: string) => void }>; // never

/*   ð¿ ('1') infer æ¨å¯¼åå    
åå æ¯inferæ¨å¯¼çæ¥å£ éé¢é½æ¯æ®éç±»å  æ¨å¯¼ç»æä¸ºèåç±»å( ç´ç½çè§£ æ¹ä¾¿è®°å¿)
infer æ¨å¯¼ç åç§°ç¸å å¹¶ä¸é½å¤äº ååçä½ç½® åæ¨å¯¼çç»æå°ä¼æ¯ èåç±»å

*/
type Foo<T> = T extends { a: infer U; b: infer U } ? U : never;
type testFoo = Foo<{ a: string }>; // never
type testFoo1 = Foo<{ b: string }>; // never
type testFoo2 = Foo<{ a: string; b: number; c: number }>; // string | number      æ³¨æð¢ ï¼ æ¥å£çkeyå¿é¡»ç¸å
type testFoo3 = Foo<{ a: string; c: number }>; // never

/* ð©    ã'Omit'ã Omit<T, U> ä»Tä¸­åé¤Uå±æ§   ð©    
                            U æ¯ Tä¸­å±æ§çå­é¢éç±»å
                            Uä¸ºèåç±»å  ææèåçç±»åå¨é¨åé¤
                            U ä¸ºäº¤åç±»å è¿åçæ¯never å ä¸ºOmit<T, never>  è¿åçå®æ´çTç±»å
                            å­é¢éçäº¤åç±»å è¿åçæ¯neverç±»å
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

/* ð©    ã   ReturnType   ã   ð©    */
/* ð©    ã   Parameters  ã   ð©    */

/*   ð¿   é½æ¯è·åå½æ°çè¿åå¼æèåæ°çç±»å æ¾å¨ä¸ä¸ªåç¥ä¸­  [arg1:string; arg2ï¼number]    */

type returnFnType = (param1: string, param2: number) => [string, number];
const returnFn: returnFnType = (
  param1: string,
  param2: number
): [string, number] => {
  return [param1, param2];
};

type Return = ReturnType<returnFnType>; // [string, number]
type Parameter = Parameters<returnFnType>; // type Parameter = [param1: string, param2: number]

/* ð©    ã   ConstructorParameters  ã  è·åç±»çæé å½æ°åæ°çç±»å ð©    */

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

/* ð©    ã  typeof class åclassç´æ¥ä½ä¸ºç±»åçåºå«  ã  è·åç±»çæé å½æ°åæ°çç±»å ð©   
typeof è·åçæ¯ç±»çå®ä¾ä¸é¢çç±»åï¼ææ­¤åªè½ç¨å¨å·ä½çå¯¹è±¡ä¸ã

*/
/*   ð¿ ('1')    people: People  = new person()  
 å ä¸º  ç¨ç±»ä½ä¸ºç±»å è¯¥ç±»åè·åçæ¯è¯¥ç±»ä¸çå®ä¾å±æ§åå®ä¾æ¹æ³ï¼ä¹å«ååæ¹æ³ï¼ 
 æä»¥ è¯¥ç±»åçæ»¡è¶³æ¡ä»¶æ¯  ç­å·å³è¾¹å¿é¡»æ¯è¯¥ç±»çå®ä¾  */
/*   ð¿ ('2')    typeof People = People   
 å ä¸º  ç¨typeof ç±»ä½ä¸ºç±»å è¯¥ç±»åè·åçæ¯è¯¥ç±»ä¸çéæå±æ§åæ¹æ³
 æä»¥  è¯¥ç±»åçæ»¡è¶³æ¡ä»¶æ¯  ç­å·å³è¾¹å¿é¡»æ¯è¯¥ç±»èªå·±
*/

class People {
  name: string;
  age: number;
  constructor() {}
}
const people: People = new People();
// const people1: People = People; //    ç­å·å³è¾¹æ¥é          ç±»å "typeof People" ä¸­ç¼ºå°å±æ§ "age"ï¼ä½ç±»å "People" ä¸­éè¦è¯¥å±æ§ã
// const people2: typeof People = new People();people2 æ¥é   ç±»å "People" ä¸­ç¼ºå°å±æ§ "prototype"ï¼ä½ç±»å "typeof People" ä¸­éè¦è¯¥å±æ§
const people3: typeof People = People;

/* ð©    ã neverã   ð©    */
/*   ð¿ (1) never å¯ä»¥æ¯ä»»ä½ç±»åçå­ç±»å æ¢ neverå¯ä»¥èµå¼ç»ä»»ä½ç±»å ä½æ¯åªæneverç±»åå¯ä»¥èµå¼ç»neverç±»å    */
/*   ð¿ (2) ç±»åä¿æ¤åç±»åæ£æµçä¸»è¦ææ³æ¯ å°è¯æ£æµå±æ§ æ¹æ³ æèåå å·²ç¡®å®å¦ä½å¤çå¼                      */
/*   ð¿ (3) is æ¯ç±»åå«è°è¯ type predicate                      */

/* ð©    ã typeof  and keyof è¿ç¨ã   ð©    */
/*   ð¿ ('1')
                type p = keyof typeof person         ä»£ç çè¿è¡é¡ºåºä¸ºä»å³å°å·¦

*/
/*   ð¿ ('2') ä»åéæ¨å¯¼åºç±»å æ­¤æ¶çtypeof shi ä¸ä¸ªç±»åå³é®è¯ åªå¯ä»¥ç¨å¨ç±»åè¯­æ³ä¸­    */
function Print(x: string) {
  return x.length;
}
type PrintType = typeof Print; //   type PrintType = (x: string) => number

const objectPrint = {
  x: 1,
  b: true,
};
type objType = typeof objectPrint; // type objType = { x: number; b: boolean;}

/* ð©    ã any && unknowã   ð©    */
/*   ð¿ ('1') any æèunknowä½ä¸ºç±»åé½è½éæ°è¢«èµå¼    */
/*   ð¿ ('2') any ä¸è¿è¡ç±»åæ£æ¥ï¼è¥ç±»åä»Aåä¸ºB æ­¤æ¶Bä¸è½ä½¿ç¨Aç±»åä¸é¢çæ¹æ³ ä¼åºé    */
/*   ð¿ ('3') unknow ä¼è¿è¡ç±»åæ ¡éªï¼å½ä½¿ç¨ç±»åä¸é¢çæ¹æ³çæ¶å    */

let a: any = " person";
a.length;
a = 123;
a.length; // tsç¼è¯å¨ä¸æç¤ºæ¥é

let b: unknown = "unknow";
if (typeof b === "string") {
  b.split("");
}
b = 123;
if (typeof b === "number") {
  b.toFixed();
}

/* ð©    ã æ³åã   ð©  
éæå®ä¹å¨æè°ç¨ æ¯tså¯¹èªå·±ç±»åå®ä¹çåç¼ç¨

*/
/* ð©    ãå½æ°éè½½ã   ð©    
éè½½ç­¾åï¼ åªæå½æ°åæ°åè¿åå¼çå®ä¹ï¼
å®ç°ç­¾åï¼ æå½æ°å®ç°ä½{} 
ç¹ç¹ï¼ å¦éè½½ç­¾ååå®ç°ç­¾åç¸å ï¼åå®ç°ç­¾åçå½æ°ä½éé¢ è¦å®ç° ææçå½æ°éè½½ åæ¬å½¢åçç±»åï¼è¿åå¼çç±»å
                            å¯¹äºéè½½å½æ°éé¢ç¸åçåæ°ï¼å®ç°ç­¾åçå½æ°åæ°å¯ä»¥å¢å ç±»å
                            éè½½ç­¾ååå®ç°ç­¾åçå½¢åä¸ªæ°è¦ç¸å
        
        å¤ä¸ªéè½½ç­¾åï¼ä¸ä¸ªå®ç°ç­¾å

*/
/* ð©    ãç±»åå¼å®¹ã   ð©    
A = B  å   B å¼å®¹ A   ç±»åBä¸­çææåæ° é½å¨Aä¸­è½æ¾å°å¯¹åºçåæ°
ç¬¦å·è¡¨ç°å½¢å¼æ¯ =
ä½¿ç¨éåçæ¦å¿µæ¥å° å°±æ¯ A åå« B  B åå«äºA Açèå´æ´å å®½æ³ï¼Açåæ°å¤ï¼ç±»åä¹å¤ï¼ Bçåæ°æ´å å·ä½ï¼ï¼åæ°å°ï¼


*/
/* ð©    ãç±»å  or ç±» ã   ð©
ts ä¸­çå­ç±»åæ¯åºäºç»æçå­ç±»å æ¢ ç»æå¼å®¹ å°±æ»¡è¶³å­ç±»åçæ¡ä»¶
for class 
        ç±»åA  ç±»åB    

   è¥ç±»åBåå«ææç±»åAçåæ° åA Bçç»æç¸å      ç±»åB å¯ä»¥ç§°ä½æ¯ç±»åAçå­ç±»å
          



*/

/* ð©    ãéå°ç±»åã   ð©    */
/*   ð¿  Partial<T> Readonly<T>   Pick<T, U>   Exclude<T, U>   Extract<T, U>  NonNullable<T>   ReturnType<T>  InstanceType<T>*/

/* ð©    ã window ä¸èªå®ä¹å±æ§ã ä½¿ç¨.è¯­æ³ä¼æ¥é å¯ä»¥ä½¿ç¨ããæ¥å®ä¹å±æ§ æèå£°æwindowä¸é¢æè¿ä¸ªå±æ§ .d.ts æä»¶   ð©    */
