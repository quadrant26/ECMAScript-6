"use srtict";

// ... 操作符
function breakfast(dessert, drink, ...values){
  console.log(dessert, drink, ...values);
};

breakfast('🍎', '🍐', '芒果', '🍌')
