"use strict";

// Module
//
//

let fruit = '123';
let dessert = 'abc';

function dinner(fruit, dessert){
    console.log(`今天的晚餐是 ${fruit} and ${dessert}`);
}

export {fruit, dessert, dinner as super};
