---
title: NodeJS异步编程与IO-2
meta:
  - name: asyn-program-and-io-2
    content: asyn-program-and-io-2
---

接上文,在<fe-link to="/notes/asyn-program-and-io-1">`NodeJS异步编程与IO-1`</fe-link>中,我们聊到了异步带来的好处。包括用户体验、资源分配、基础的线程池认知,我们也明白了`NodeJs`不单单只是一门
"单线程语言",他也有其他的线程在运作我们的`IO`服务。

### 事件循环

在`NodeJS`中我们看到的大部分异步`API`都是基于`callback`的方式进行调用。所有的基础模块都依赖于此。因此我们可以看到了`NodeJS`的自身模型是采用了事件循环。

当进程启动时,`Node`便会创建一个类似于`while(true)`的循环,每一次的执行我们称之为`Trick`。在每次`Trick`中都会查看是否有事件待处理,如果有就取出该事件的回调并执行,然后进入下个`Trick`。直至事件全部执行完毕退出进程。

```js
const fs = require('fs')

fs.readFile('./1.txt', 'utf8', (err, data) => {
  if (err) console.log(err)
  console.log(data)
})
```

就像我们在上文说的`fs.readFile`这个`API`。我们在执行任务的时候先执行了`fs.readFile`。但是这时候这个`Trick`又是如何判断是否有事件要处理呢?这里我们就需要使用到观察者。就像上文所说的我们拿到的是一个文件描述符,在拿到结果前我们会不断轮询,那么这个时候就需要我们向这些观察者询问是否有数据返回。一个事件循环可以有多个观察者在`NodeJS`中有网络观察者,IO 观察者,这些观察者将这些事件进行了具体的分类。

事件循环就是一个经典的生产者/消费者模式,在网络请求中,我们给`NodeJS`不断提供了网络事件,这些网络生产者被传输到了网络观察者上,事件循环从观察者里面取出来这些事件并处理。
在接着描述异步调用执行前我们需要明白`NodeJs`的调用过程。

### 一个简易的调用模型

<fe-grid justify="center" style="display:flex;">
<fe-img src="https://user-images.githubusercontent.com/52351095/153703763-92d94f27-5c0b-4d8a-b06e-6c8db160f83c.png" skeleton width="100%" height="400px"></fe-img>
</fe-grid>

上图便是一个简单的`NodeJs`调用模型,我们可以清楚的看到调用`fs.readFile`的时候我们经过了核心模块到内建`c++`模块的过程,这里不会阐述过多关于`c++`内建模块的内容,我们只需要知道在调用
内建`c++`模块时,我们的这个任务便通过`libuv`加入线程池等待执行至此第一阶段调用结束,`Js`便可以继续执行其他任务。至此我们达成了异步的目的。

### 执行事件

通过调用内建模块我们得到了一个重要产物叫请求对象,请求对象涵盖了当前任务的所有状态以及一系列事件。既然上文所说的纳入线程池等待执行是第一部分,那么触发事件执行便是第二部分。线程池
中的 I/O 操作调用完毕以后会通知`ICOP`(输入输出完成端口)告知当前的对象已经执行完毕,在这个过程中事件循环的 I/O 观察者在每次`Trick`中检查是否执行完毕,如果执行完成则加入队列等待处理。
至此当我们执行完毕以后结果通过回调函数传递参数并且执行调用。

<fe-grid justify="center" style="display:flex;">
<fe-img src="https://user-images.githubusercontent.com/52351095/153705377-966aded7-f5cd-41e9-abbe-3ad37b80e8c2.png" skeleton width="100%" height="400px"></fe-img>
</fe-grid>

下文...
