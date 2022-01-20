---
title: 如何参与一个开源项目
meta:
  - name: open-source-project
    content: best-practices-for-open-source-project
---

参与开源项目是一种提升自己的手段,那么作为新手该如何参与项目并从中学习到思想呢?本文将从作者我的角度去阐述我参与开源的一些经验,通过
这篇文章你会收获一些经验并加以实践内化为自己的知识。

### 入手项目

这里已经假设你找到了你自己想要参与的项目,我们可以先通过项目里面的`README.md`简单的过一遍知道这个库是干嘛的,
这里以<fe-link href="https://github.com/fay-org/fect" color target="_blank">`fect`</fe-link>举例.
一个健壮的开源项目那么他的`REAME.md`一定是可读的,我们可以从这作为切入口获取我们想要的功能点类似于一个导航,我们可以看到`Contributing Guide`
于是我们点进去阅读。便得以知道项目的操作规范流程。他是一份操作指南。当然了,有一些项目他是没这些东西的。这时候的我们就得从`commit-message`去
探寻这个项目的规范比如提交记录

### 提交规范

- 现在`github`上的流行项目基本遵循**angular**团队的提交规范<fe-link herf="https://github.com/conventional-changelog/commitlint/blob/master/%40commitlint/config-conventional/README.md" color icon target="_blank">文档地址</fe-link>
  一个富有语义化的提交记录方便代码的管理以及方便后续的人参与加入,试想一下一个不友好的提交记录对代码的可维护性的破坏是不可逆的。
- 提交功能的时候,一定要拉取源仓库的代码并且在你本地新建分支推送到你`fork`出来的派生仓库,切勿在本地的`master/main`主分支进行功能的编写,如果项目要求有代码测试确保在本地测试完毕在 github 上发起`pr`
- 一个健壮的项目的提交记录应该是`linear historical`,以我个人的经验给出的结论是多在本地`rebase`,不要再主干分支操作`rebase`变基。拉取代码的时候应该`git fetch update/stream` 然后 采用`git rebase -i update/stream/xxx`的方式进行合并
- 一个参与开源项目的好习惯就是采用`gpg`密钥,这样可以确保代码的提交记录为可信的。
- `pr`的时候应该尽可能的描述你所作的功能以及为什么这么做,这样可以节省`code Reviewer`的时间,同时节省你自己的时间达到正反馈。

### 重心放在`package.json`

在拿到项目的时候应该先去看`package.json`的依赖包以及`script`命令和版本号,方便我们对整个项目的管理有个清晰的认知。

### 发布自己的包

#### 1. 在遵循语义化版本的基础上手动更改

所谓语义化版本即是按约定对版本号进行约束与声明，与多数人采用同一套规则来升级版本，具体规则可以参考 Semver version。也就是大家熟悉的主-次-修订：

  <p>
    <fe-dot type="error">
      <b>MAJOR</b>
    </fe-dot>
    不兼容升级
  </p>
  <p>
    <fe-dot type="warning">
      <b>MINOR</b>
    </fe-dot>
    向下兼容的功能性升级
  </p>
  <p>
    <fe-dot>
      <b>PATCH</b>
    </fe-dot>
    向下兼容的问题修复
  </p>
  <p>
    <fe-dot type="success">
      <b>pre-release</b>
    </fe-dot>
    先行版本
  </p>

每次 Release 新版本时参考所有的修改内容决定下个版本号，再进行修改

#### 2. 分析自己的包的性质

如果考虑到包未来的体量会很大这里推荐采用`lerna`管理项目**monorepo**作为一种大型项目的管理方式已经在 2021 年可以说是必备的技能,如果在人手不够的情况下
我更推荐采用传统的方式进行包管理。

#### 3. 使用 CI 管理项目

你需要借助服务器来自动完成编译或运行脚本的过程，这里以 `travis-ci` 为例

- 使用 travis.rb 初始化项目并生成密钥信息
- 如果发布在 github 你可以在 Github/token 页面自行生成 token，但仍旧需要 `travis.rb` 进行加密。配置信息可以参考 travis-deployment，发布在 npm 则需要 npm 的登录信息。
  关于 travis 是如何加密你的敏感信息，可以参见<fe-link href="https://docs.travis-ci.com/user/encryption-keys/" target="_blank" color>这篇文章</fe-link>
