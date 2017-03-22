"use strict";

// generators

function* chef() {
    yield '🍎';
    yield '🍐';
};

let k = chef()

console.log(k.next()); // 🍎
console.log(k.next()); // 🍐
console.log(k.next()); // undefined

function* chef2(foods){
    for(var i = 0; i < foods.length; i++){
        yield foods[i];
    }
}

let k2 = chef2(['🍎', '🍐'])
console.log(k2.next());
console.log(k2.next());
console.log(k2.next());
