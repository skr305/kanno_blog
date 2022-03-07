---
title: 浅谈Fect
meta:
  - name: 'about-fect-ux'
    content: 'about-fect-ux'
    date: 2022-03-07T11:49:13.602Z
---

这几个月`fect`的迭代进入平稳期,主要是我想在`1.3.x`解决掉现有的一些问题以及完成一些功能的精简。合理的`API`会为日后的`UX`设计提供更好的拓展方向。说说这1-2周的成果吧。

### 我为什么选择transform

`Fect`的体积也不是一开始就这么精简的他也是从庞然大物到现在`1.34`MB的大小,这里我会说下我为什么选择`transform`而不是`bundle`。因为你可以参照下`antd`系列的库无一例外选择了
`bundle`。`bundle`以后的代码虽然精简了但是你需要提供更为庞大的`sourcemap`定位当前组件的`logic`。既然在二次打包的时候用户会压缩代码。那么我们为什么要提供`bundle`包而不是使用
`babel`进行`transform`呢？显然这一点在vant这样的库就是这么做的。更小的体积在安装的时候更轻量远离了sourcemap也可也调试代码。这么看这样的做法是更值得称赞的。

熟悉`fect/cli`的朋友可能会知道`fect/cli`的`compile`逻辑并没有像现在这样精简。`compile`参照了早期的`vant`进行transform。但是问题是我们真的需要这么写代码吗？为什么不能用现有库来
优化我们冗余的逻辑在结合插件机制来优化`bundle`呢?为此我们有了今天的主题可重用的插件指令。

### 插件化

看过v1.3.7版本开始的朋友应该注意到了`compile`目前调用的是`bundle`这个函数进行逻辑转换。相较于之前手动递归目录更改文件对`disk`进行`I/O`,采用了一种更为优秀的模式那就是将内容写入内存在内存进行修改然后`pipe`到`disk`上。
这么做的好处我们可以看到1份内存解决了之前分别copy到`cjs`和`esm`的烦恼。相较于之前,现有的插件机制可以结合`transfrom`以及`buildEnd`钩子对不同阶段的内存进行操作。

以上便是目前`fect-cli/compile`的核心思路,说完核心思路我们就该思考怎么构建一个类似的工具。


### 初始化

既然要读取文件不能在采用之前手动递归目录的模式了,我们可以使用`fast-glob`这个包进行快速的读取并且提他供过滤文件的能力,这样我们在操作文件的时候便可以解决我们`transform`生命周期的困扰。

```js

import fg from 'fast-glob'
import path from 'path'

class Bundle {
  constructor(config) {
    this.parrents = config.parrents
    this.dotFile = config.dotFile
    this.files = new Map()
  }
  async process() {
    const allStats = await fg(normalizePath(path.join(this.parrents, '**', '*')), {
      dot: this.dotFile,
      stats: true
    })
    if (!allStats.length) {
      throw new Error(`Can't found any file in this ${this.parrents} dir.`)
    }
    await Promise.all(
      allStas.map((stats) => {
        const absolutePath = path.resolve(this.parrents, stats.path)
        const relativePath = path.relative(this.parrents, stats.path)
        const content = fs.readFileSync(absolutePath)
        this.files.set(stats.path, { content, path: relativePath })
      })
    )
  }
}


```


上述的代码我们使用了`fast-glob`完成了快速的读取文件并且把他们加入到内存中。接下来我们便要思考接下来的操作。我们该如何把他们写入到`disk`中呢。这时候我们可以想想看在`node`环境中我们有个叫`write`的方法这种流的方式
对写入内存是十分友好的。那么我们就可以用他进行磁盘的写入。


```js

import fs from 'fs-extra'

class Bundle extends EventEmitter {
  constructor(){
    super()
    // ... same logic
  }
  // ... samle logic
  async dest(dest: string, clean = false) {
    const destPath = normalizePath(dest)

    if (clean) {
      await fs.remove(destPath)
    }

    await this.writeFileTree(destPath)
  }

  async writeFileTree(destPath: string) {
    this.files.forEach((ctx, key) => {
      const { content, path: relativePath } = ctx
      const target = path.join(destPath, relativePath)
      this.emit('write', key, target)
      fs.ensureDir(path.dirname(target)).then(() => fs.writeFile(target, content))
    })
  }
}


```

以上我们便完成了一个精简的磁盘写入与读取。接下来我们就得思考如何实现我们的插件了。


### 指令驱动周期

在我们谈插件实现之前我们要看下我们期望的`API`调用方式首先是`Bundle`类,在函数即功能的时代下提供一个类给使用者显然不够方便。因为我们可以参照`webpack`和`rollup`他们的`JS`API是十分精简的那么我们也得提供这么一个简单的API
代码设计如下

```js

const transform = (userConfig) => {
  return transformInternal(userConfig)
}

const transformInternal = async (options) => {
  const bundle = new Bundle({
    parrents: options.input,
    dotFile: true,
    plugins: options.plugins
  })

  await bundle.process()

  const context = {
    async write(stdoutOption) {
      const { dir, clean = true } = stdoutOption
      return bundle.dest(dir, clean)
    }
  }

  return context
}


```


既然我们设计完了调用的方法,我们可以看到`transform`这个API方便我们传入配置文件然后返回一个`write`方法写入到`disk`这个过程对用户是无感知的。


下文...