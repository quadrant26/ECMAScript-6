"use srtict";

// __proto__

let breakfast = {
    getDrink (){
        return 'tea';
    }
}

let dinner = {
    getDrink(){
        return '啤酒';
    }
}

let sunday = {
    __proto__ : breakfast
}

console.log(sunday.getDrink());
console.log(Object.getPrototypeOf(sunday) === breakfast)

sunday.__proto__ = dinner
console.log(sunday.getDrink());
console.log(Object.getPrototypeOf(sunday) === dinner)
