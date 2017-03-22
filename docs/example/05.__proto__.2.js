"use srtict";

// __proto__ super()

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
    __proto__ : breakfast,
    getDrink(){
        return super.getDrink() + '牛奶';
    }
}

console.log(sunday.getDrink());
