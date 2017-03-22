"use strict";

// class
// get set

class Chef{
    constructor(food){
        this.food = food;
        this.dish = [];
    }

    get menu(){
        return this.dish;
    }

    set menu(dish){
        this.dish.push(dish);
    }

    cook(){
        console.log(this.food);
    }
}

let k = new Chef('苹果');
k.cook();

k.menu = '1'
k.menu = '2'
k.menu = '3'
console.log(k.menu);
