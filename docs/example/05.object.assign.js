"use srtict";

// Object.assign // 复制一个对象的属性和方法
let breakfast = {};

Object.assign(
    breakfast,
    {drink: '🍺'},
    {drink: '茶'}    // 会覆盖之前的内容
);

console.log(breakfast);
