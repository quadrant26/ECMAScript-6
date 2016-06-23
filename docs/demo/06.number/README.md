1. 二进制和八进制的表示方法

    二进制 前缀为 0b || 0B

    八进制 前缀为 0o || 0O

    从ES5开始，在严格模式之中，八进制就不再允许使用前缀0表示，

    ES6进一步明确，要使用前缀0o表示。

    使用 Number()  将二进制和八进制的字符串转成 十进制

2. Number.isFinite()  Number.isNaN()

    Number.isFinite()用来检查一个数值是否非无穷（infinity）

    Number.isNaN()用来检查一个值是否为NaN。

    而这两个新方法只对数值有效，非数值一律返回false


3. Number.parseInt()  Number.parseFloat();

    Number.parseInt()       转成整数    

    Number.parseFloat()     转成浮点数的

4. Number.isInteger()

    Number.isInteger()用来判断一个值是否为整数。

    在JavaScript内部，整数和浮点数是同样的储存方法，所以3和3.0被视为同一个值。


5. Number.EPSILON

    ES6在Number对象上面，新增一个极小的常量Number.EPSILON

    引入一个这么小的量的目的，在于为浮点数计算，设置一个误差范围。我们知道浮点数计算是不精确的。

    但是如果这个误差能够小于Number.EPSILON，我们就可以认为得到了正确结果。


6. 安全整数 Number.isSafeInteger

    JavaScript能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值

    ES6引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限
    
    Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1     // true
    Number.MAX_SAFE_INTEGER === 9007199254740991        // true
    Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER// true
    Number.MIN_SAFE_INTEGER === -9007199254740991       // true

    Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。

    实际使用这个函数时，需要注意。验证运算结果是否落在安全整数的范围内，不要只验证运算结果，而要同时验证参与运算的每个值。

        umber.isSafeInteger(9007199254740993)   // false

        Number.isSafeInteger(990)        // true

        Number.isSafeInteger(9007199254740993 - 990)    // true

        9007199254740993 - 990

        // 返回结果 9007199254740002

        // 正确答案应该是 9007199254740003

        这是因为，这个数超出了精度范围，导致在计算机内部，以9007199254740992的形式储存


7. Math 的扩展

    7.1 Math.trunc()

        用于去除一个数的小数部分，返回整数部分。

        对于非数值，Math.trunc内部使用Number方法将其先转为数值。

        对于空值和无法截取整数的值，返回NaN。
            
            Math.trunc = Math.trunc || function (x){
                return x > 0 ? Math.ceil(x) : Math.floor(x);
            }
    
    7.2 Math.sign()

        用来判断一个数到底是正数、负数、还是零

            参数为正数，返回+1；

            参数为负数，返回-1；

            参数为0，返回0；

            参数为-0，返回-0;

            其他值，返回NaN

            Math.sign = Math.sign || function (x){
                x = +x;
                if(x === 0 || isNaN(x)){
                    return x;
                }
                return x > 0 ? 1 : -1;
            }
    
    7.3 Math.cbrt()

        用于计算一个数的立方根

        对于非数值，Math.cbrt方法内部也是先使用Number方法将其转为数值。
            
            Math.cbrt = Math.cbrt || function (x){
                var y = Math.pow(Math.abs(x), 1/3);
                return x < 0 ? -y : y;
            }

    7.4 Math.clz32()    

        使用32位二进制形式表示，Math.clz32方法返回一个数的32位无符号整数形式有多少个前导0

        左移运算符（<<）与Math.clz32方法直接相关

        对于小数，Math.clz32方法只考虑整数部分。
        
        对于空值或其他类型的值，Math.clz32方法会将它们先转为数值，然后再计算。

    7.5 Math.imul()

        返回两个数以32位带符号整数形式相乘的结果，返回的也是一个32位的带符号整数。

        大多数情况下，Math.imul(a, b)与a * b的结果是相同的，即该方法等同于(a * b)|0的效果（超过32位的部分溢出）

    7.6 Math.fround()

	    返回一个数的单精度浮点数形式。

            Math.fround = Math.fround || function (x){
                return new Float32Array([x])[0];
            }
    
    7.7 Math.hypot()
    
        返回所有参数的平方和的平方根

        如果参数不是数值，Math.hypot方法会将其转为数值。只要有一个参数无法转为数值，就会返回NaN。

8. 对数方法

    8.1 Math.expm1()     

        Math.expm1(x)返回ex - 1，即Math.exp(x) - 1

        Math.expm1 = Math.expm1 || function (x){
            return Math.exp(x) -1
        }

    8.2 Math.log1p()

        Math.log1p(x)方法返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN。

            Math.log1p = Math.log1p || function (x){
                return Math.log(1 + x);
            }
   
    8.3  Math.log10()   
        
        返回以10为底的x的对数。如果x小于0，则返回NaN

            Math.log10 = Math.log10 || function (x){
                return Math.log(x) / Math.LN10;
            }

    8.4 Math.log2()

        Math.log2(x)返回以2为底的x的对数。如果x小于0，则返回NaN

        Math.log2 = Math.log2 || function(x) {
            return Math.log(x) / Math.LN2;
        };

9. 三角函数

    ath.sinh(x) 返回x的双曲正弦（hyperbolic sine）

    Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）

    Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）

    Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）

    Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）

    Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）


10. 指数函数

    10.1 ** 

        ES7新增了一个指数运算符（**），目前Babel转码器已经支持

        指数运算符可以与等号结合，形成一个新的赋值运算符（**=）

