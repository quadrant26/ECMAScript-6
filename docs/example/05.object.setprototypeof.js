    "use srtict";

// Object.setPrototypeOf
let breakfast = {
    getDrink (){
        return 'tea';
    }
}

let dinner = {
    getDrink(){
        return '🍺';
    }
}

let sundy = Object.create(breakfast);
console.log(sundy.getDrink());
console.log(Object.getPrototypeOf(sunday) === breakfast); // true

Object.setPrototypeOf(sunday, dinner);
console.log(sundy.getDrink());
console.log(Object.getPrototypeOf(sunday) === dinner); // true
