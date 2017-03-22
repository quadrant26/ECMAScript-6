"use strict";

// { value:1, done:true/false}

function chef(foods) {
    let i = 0;
    return {
        next(){

            let done = (i >= foods.length);
            let value = !done ? foods[i++] : undefined;

            return {
                value:value,
                done:done
            }
        }
    }
}

let k = chef(['🍎', '🍐']);
console.log(k.next());
console.log(k.next());
console.log(k.next());
