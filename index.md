##  1. 兼容问题

```
IE 下svg 不显示问题
给svg嵌套个父级并写上高度，就显示正常
```



## 2.1 简单解释

　　简单来说，escape是对字符串(string)进行编码(而另外两种是对URL)，作用是让它们在所有电脑上可读。
　　编码之后的效果是%XX或者%uXXXX这种形式。
　　其中 ASCII字母、数字、@*/+ ，这几个字符不会被编码，其余的都会。
　　最关键的是，当你需要对URL编码时，请忘记这个方法，这个方法是针对字符串使用的，不适用于URL。

## 2.2 encodeURI和encodeURIComponent

　　对URL编码是常见的事，所以这两个方法应该是实际中要特别注意的。
　　它们都是编码URL，唯一区别就是编码的字符范围，其中
　　encodeURI方法不会对下列字符编码 ASCII字母、数字、~!@#$&*()=:/,;?+'
　　encodeURIComponent方法不会对下列字符编码 ASCII字母、数字、~!*()'
也就是encodeURIComponent编码的范围更广，会将http://XXX中的//也编码，会导致URL不可用。(其实java中的URLEncoder.encode(str,char)也类似于这个方法，会导致URL不可用)

## 3  vue的watch监听数组和对象，监听到的新值旧值一样解决办法

```javascript
// 数组 注意监听数组的变更不需要 deep: true
watch: {
    messageData(newVal,oldVal) {
        console.log('newVal,oldVal', newVal, oldVal)
    }
},

computed: {
    messageData() {
        return [...this.messageList]
    }
}


// 对象 
// deep: true 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
watch: {
	messageData: {
		handler(newVal, oldVal) {
			console.log('newVal,oldVal', newVal, oldVal)
		},
		deep: true
	}
}

computed: {
    messageData() {
        return Json.parse(JSON.stringify(xxx))
    }
}
```
## 4 apply、call

在 javascript 中，call 和 apply 都是为了改变某个函数运行时的上下文（context）而存在的，换句话说，就是为了改变函数体内部 this 的指向。
JavaScript 的一大特点是，函数存在「定义时上下文」和「运行时上下文」以及「上下文是可以改变的」这样的概念。

```
function fruits() {}
 
fruits.prototype = {
    color: "red",
    say: function() {
        console.log("My color is " + this.color);
    }
}
 
var apple = new fruits;
apple.say();    //My color is red
```

但是如果我们有一个对象banana= {color : "yellow"} ,我们不想对它重新定义 say 方法，那么我们可以通过 call 或 apply 用 apple 的 say 方法：

```
banana = {
    color: "yellow"
}
apple.say.call(banana);     //My color is yellow
apple.say.apply(banana);    //My color is yellow
```

所以，可以看出 call 和 apply 是为了动态改变 this 而出现的，当一个 object 没有某个方法（本栗子中banana没有say方法），但是其他的有（本栗子中apple有say方法），我们可以借助call或apply用其它对象的方法来操作。

## apply、call 区别

对于 apply、call 二者而言，作用完全一样，只是接受参数的方式不太一样。例如，有一个函数定义如下：

```
var func = function(arg1, arg2) {
     
};
```

就可以通过如下方式来调用：

```
func.call(this, arg1, arg2);
func.apply(this, [arg1, arg2])
```

其中 this 是你想指定的上下文，他可以是任何一个 JavaScript 对象(JavaScript 中一切皆对象)，call 需要把参数按顺序传递进去，而 apply 则是把参数放在数组里。　

## apply、call、bind比较

那么 apply、call、bind 三者相比较，之间又有什么异同呢？何时使用 apply、call，何时使用 bind 呢。简单的一个栗子：

```
var obj = {
    x: 81,
};
 
var foo = {
    getX: function() {
        return this.x;
    }
}
 
console.log(foo.getX.bind(obj)());  //81
console.log(foo.getX.call(obj));    //81
console.log(foo.getX.apply(obj));   //81
```

三个输出的都是81，但是注意看使用 bind() 方法的，他后面多了对括号。

也就是说，区别是，当你希望改变上下文环境之后并非立即执行，而是回调执行的时候，使用 bind() 方法。而 apply/call 则会立即执行函数。

再总结一下：

- apply 、 call 、bind 三者都是用来改变函数的this对象的指向的；
- apply 、 call 、bind 三者第一个参数都是this要指向的对象，也就是想指定的上下文；
- apply 、 call 、bind 三者都可以利用后续参数传参；
- bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 。
