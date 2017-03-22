"use strict";

// Set
// 不能有重复的内容
// size     长度
// has()    判断是否存在某个元素
// delete() 删除某个元素
// forEach() 遍历
// clear()  清空

let desserts = new Set('123');
desserts.add('5');
desserts.add('5');

console.log(desserts.size);      // 4
console.log(desserts.has('2')); // true
console.log(desserts.delete('2'));
console.log(desserts);

desserts.forEach(dessert => {
    console.log(dessert);
})

desserts.clear();

console.log(desserts);
