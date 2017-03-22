"use srtict";

// 多行字符串
let dessert = '🎂',
    drink = 'tea';

let breakfast = `今天的早餐是\n
 ${dessert} 与 ${drink} !`;

 cosnole.log(breakfast);

 /**
  * startsWith(str)   是否 str 开头
  * endsWith(str)     是否 str 结尾
  * includes(str)      字符串中是否 包含 str
  */
 console.log(
   breakfast.startsWith('🎂'),
   breakfast.endsWith('tea'),
   breakfast.includes('🎂'),
 );
