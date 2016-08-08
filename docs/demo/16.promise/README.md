1. Promise的含义

    对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称Fulfilled）和Rejected（已失败）

    一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从Pending变为Resolved和从Pending变为Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。就算改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果

    Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

2. 基本用法

    ES6规定，Promise对象是一个构造函数，用来生成Promise实例

    Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由JavaScript引擎提供，不用自己部署

    resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从Pending变为Resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从Pending变为Rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去

    Promise实例生成以后，可以用then方法分别指定Resolved状态和Reject状态的回调函数

3. Promise.prototype.then()

    then方法的第一个参数是Resolved状态的回调函数，第二个参数（可选）是Rejected状态的回调函数

4. Promise.prototype.catch()

    Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数

    Promise对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获

    不要在then方法里面定义Reject状态的回调函数（即then的第二个参数），总是使用catch方法

        promise
            .then(function(data) { //cb
                // success
            })
            .catch(function(err) {
                // error
            });

    catch方法返回的还是一个Promise对象，因此后面还可以接着调用then方法
        
5. Promise.all()

    Promise.all方法用于将多个Promise实例，包装成一个新的Promise实例

    Promise.all方法接受一个数组作为参数，p1、p2、p3都是Promise对象的实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为Promise实例，再进一步处理。（Promise.all方法的参数可以不是数组，但必须具有Iterator接口，且返回的每个成员都是Promise实例。）

    p的状态由p1、p2、p3决定，分成两种情况。

        1. 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

        2. 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数

6. Promise.race()

    var p = Promise.race([p1,p2,p3]);

    只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的Promise实例的返回值，就传递给p的回调函数

7. Promise.resolve()

    有时需要将现有对象转为Promise对象，Promise.resolve方法就起到这个作用

    Promise.resolve方法的参数分成四种情况

        1. 参数是一个Promise实例

            Promise.resolve将不做任何修改、原封不动地返回这个实例

        2. 参数是一个thenable对象

            thenable对象指的是具有then方法的对象
            Promise.resolve方法会将这个对象转为Promise对象，然后就立即执行thenable对象的then方法

        3. 参数不是具有then方法的对象，或根本就不是对象

            如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的Promise对象，状态为Resolved

        4. 不带有任何参数

            Promise.resolve方法允许调用时不带参数，直接返回一个Resolved状态的Promise对象。

	        如果希望得到一个Promise对象，比较方便的方法就是直接调用Promise.resolve方法

8. Promise.reject()

    它的参数用法与Promise.resolve方法完全一致

9. 两个有用的附加方法

    done()

        Promise对象的回调链，不管以then方法或catch方法结尾，要是最后一个方法抛出错误，都有可能无法捕捉到（因为Promise内部的错误不会冒泡到全局）。因此，我们可以提供一个done方法，总是处于回调链的尾端，保证抛出任何可能出现的错误

    finally()

        finally方法用于指定不管Promise对象最后状态如何，都会执行的操作。它与done方法的最大区别，它接受一个普通的回调函数作为参数，该函数不管怎样都必须执行

