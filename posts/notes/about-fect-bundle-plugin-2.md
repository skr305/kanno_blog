---
title: 浅谈Bundle插件模式-2
meta:
  - name: 'about-fect-bundle-plugin-2'
    content: 'about-fect-bundle-plugin-2'
    date: 2022-03-10T03:19:59.996Z
---

接上文,在<fe-link to="/notes/about-fect-bundle-plugin-1">`浅谈Bundle插件模式-1`</fe-link>,我们初步实现了一个`Bundle`类,他能进行一些读写操作。同时我们也介绍了对外暴露的函数设计。这篇章节将会介绍如何实现我们的插件机制。

### 生命周期

在谈到设计插件之前我们要思考插件是为了解决什么问题,纵观插件设计例如 webpack`tap`这样的或者其他的都是让用户去编写一个类或者方法。我们可以把他当作`DSL`的一种模式。插件的设计模式是根据工程体量进行设计的这里我们会采用方法的模式去设计,既然是插件,插件就会拥有自己的生命周期。这时候我们可以粗略的设计`buildStart`,`transform`,`buildEnd`3 个周期。

```js
export default function myPlugin() {
  return {
    name: 'non-plugin-my-test',
    buildStart() {},
    transform(stdin, id) {
      return {
        id,
        stdout: stdin
      }
    },
    buildEnd() {}
  }
}
```

以上便是一个完整的插件既然每个插件都有参数,那么我们会很容易的想到我们可以使用`apply`,`call`去调用这些方法然传入形参。于是我们开始设计了我们的插件。

### Dirver

为了方便调用我们需要使用一些魔法。我们可以设计一个类似于`x.hookParallel(hookName,arguments)`这样的操作。

```js
class PluginDirver {
  constructror(plugins) {
    this.plugins = plugins
  }
  hookParallel(hookName, args) {
    const promises = []
    for (const plugin of this.plugins) {
      const hook = this.runHook(hookName, args, plugin)
      if (!hook) continue
      promises.push(hook)
    }
    return Promise.all(promises)
  }
  runHook(hookName, args, plugin) {
    const hook = plugin[hookName]
    if (!hook) return
    const context = plugin
    return Promise.resolve().then(() => {
      if (typeof hook !== 'function') {
        return console.error(`[LifeCycle]: ${hookName} should be function`)
      }
      const hookResult = hook.apply(context, args)
      if (!hookResult || !hookResult.then) {
        return hookResult
      }
      const promise = Promise.resolve(hookResult)
      return promise
    })
  }
}
```

这样我们便完成了一个调用的方法,我们传入了对应的生命周期并且通过了`apply`绑定了形参这样用户在使用的时候就会被调用同时拿到这些参数了。

回到之前的`bundle` 既然是`transom`我们就需要在每次读取文件的时候调用这个 hook 让我们把之前的逻辑稍加修改

### Transform

```js
class Bundle {
  constructor(config) {
    this.plugins = new PluginDirver(config.plugins)
  }

  async process() {
    //  ... same logic

    const promises = []
    this.files.forEach((value, key) => {
      const { content, path: id } = value
      promises.push(this.plugins.hookParallel('transform', [content.toString(), id]))
    })
    const result = await Promise.all(promises)
    result.forEach((item) => {
      if (item) {
        this.files.set(item.key, { content: Buffer.from(item.stdout), path: item.id })
      }
    })
  }
}
```

这样我们便完成了一个`trasnform`的生命周期。

下文...
