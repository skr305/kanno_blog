---
title: Grm-轻量级的Npm源管理工具
meta:
  - name: grm-minialist-npm-source-manager
    content: grm-minialist-npm-source-manager
    date: '2022-04-02T08:00:54.189Z'
---

Grm 是一个十分轻量级的`npm`源管理工具。

平常我在使用`npm`管理工具往往是`nrm`。但是在安装环境的时候,`nrm`过长的下载速度实在是让人失望。究其原因还是因为包的功能太多体积太大
然后用户受限于网络传输速度导致安装过久。

由于我不是深度的`Nrm`用户,在使用时仅仅只是使用了`current`,`ls`,`set`这些指令。因此我用 go 编写了一个轻量级的工具去支持这些功能。

### 安装 Grm

```bash
$ go install github.com/XeryYue/grm@latest
```

安装成功后我们可以使用`grm help`确认是否安装完毕。

<fe-img  src="https://user-images.githubusercontent.com/52351095/161373885-cfa3045b-7cd0-46c0-abcc-50cecc35be8c.png"></fe-img>

看起来很酷不是吗?
