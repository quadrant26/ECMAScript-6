"use strict";

// class

class Chef{
    constructor(food){
        this.food = food;
    }

    cook(){
        console.log(this.food);
    }
}

let k = new Chef('苹果');
k.cook();
