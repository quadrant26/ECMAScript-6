"use srtict";

// destructuring parameters

 function superfast(desert, drink, {location, restaurant} = {}){
     console.log(desert, drink, location, restaurant);
 }

superfast("🎂", "tea", {"location":"武汉", "restaurant":"黄鹤楼"})
