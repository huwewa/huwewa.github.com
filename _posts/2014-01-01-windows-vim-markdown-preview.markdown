---
layout: post
title: "Windows下使用gvim编写可预览的markdown"
date: 2014-01-01 13:08
comments: true
categories: IT技术
---
本文是以我在我的pc上安装为例子，至于安装路径什么的，可自行修改。
### 安装python
我python的安装路径在`D:\Python27`。确保python命令已加入系统环境变量。
### 安装Markdown(python实现)

下载python实现的[Markdown](https://pypi.python.org/pypi/Markdown).

<!-- more -->

安装Markdown. 使用以下命令或者参考`http://pythonhosted.org/Markdown/install.html`

```
C://path/to/python.exe setup.py install
```

### 配置`_vimrc`文件
在文件中加上以下配置

```
:nnoremap <F2> :!cmd /c d:\Python27\python d:\Python27\Scripts\markdown_py %:t -e utf-8 > %:r.html<CR>
:nnoremap \e :!cmd /c start ./%:r.html<CR>
```

注意上面的`-e utf-8`.如果md文件不是utf-8格式编码的，那么按`F2`键把md文件转换成html文件时会失败。可以在`_vimrc`文件中使用`set fileencoding=utf-8`设置新建文件以utf8格式编码。

### 使用说明
按`F2`把md文件转换为html，然后依次按下`\`和`e`这两个键以默认浏览器打开html文件。

效果如下：
![](http://pic.yupoo.com/huwewa/DpTleVlC/medish.jpg)

![](http://pic.yupoo.com/huwewa/DpTleLzD/medish.jpg)

（完）
