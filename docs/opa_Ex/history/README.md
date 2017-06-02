Histoty API

1. method

    Histoty.pushState(state object, title, url)

        state object: 状态对象是一个由 pushState()方法创建的、与历史纪录相关的JS对象。当用户定向到一个新的状态时，会触发popstate事件。事件的state属性包含了历史纪录的state对象。

        title: 火狐浏览器已忽略该属性， 可以传 null 代替

        url: 记录新历史记录的地址（参数可选） 新URL必须和当前URL在同一个源下

    Histoty.replaceState() 替换浏览器历史堆栈的当前历史记录为设定的url。需要注意的是，replaceState不会改动浏览器历史堆栈的当前指针。

        参数与 pushState 一样

    Histoty.state  只读属性

        返回一个表示历史堆栈顶部的状态的值。这是一种可以不必等待popstate 事件而查看状态而的方式。

2. event

    onpopstate

        window.addEventListener("popstate", function (e){}, false)
