"use strict";

// Map
// Map().set(key, val)
// size
// get(key)
// delete(key)
// has(key)
// forEach
// clear

let food = new Map();

console.log(food);

let fruit = {},
    cook  = function (){},
    desset = "甜点";

food.set(fruit, '🍎');
food.set(cook, '123');
food.set(desset, 'abc');

console.log(food);
console.log(food.size);
console.log(food.get(cook));

food.delete(desset)
console.log(food.has(desset));

food.forEach((value, key) => {
    console.log(`${key}, ${value}`)
})

food.clear();

console.log(food);
