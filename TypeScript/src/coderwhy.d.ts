/*
    declare 关键字的意义是 ： 声明一个全局变量，并且加上类型注解
    如果不使用declare ：
    哪些情况下需要使用 declare


 */

// 声明模块
declare module "lodash" {
  export function join(arr: any[]): void;
}

// 声明变量/函数/类
declare let whyName: string;
declare let whyAge: number;
declare let whyHeight: number;

declare function whyFoo(): void;

declare class Person {
  name: string;
  age: number;
  constructor(name: string, age: number);
}

// 声明文件
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";
declare module "*.svg";
declare module "*.gif";

// 声明命名空间
declare namespace $ {
  export function ajax(settings: any): any;
}

// declare module '*.vue' {
//     import Vue from 'vue'；
//     export default Vue
// }

declare module "*.css" {
  const content: any;
  export default content;
}
