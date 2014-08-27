---
layout: post
title: 从Octopress迁移到Hexo
date: 2014-01-15 10:59:59
categories: IT技术
tags:
---
###安装hexo###
具体参考[这里](http://zespia.tw/hexo/docs/)。

###安装light主题###
安装过程参考[这里](https://github.com/hexojs/hexo-theme-light)。

light主题没有如图的右侧按年月的归档。

<!-- more -->

![](http://pic.yupoo.com/huwewa/DsL1qraS/fNwZ5.png)

这个可以自己签加。新建文件`archive.ejs`。内容如下：

```
<% if (site.posts.length){ %>
  <div class="widget tag">
    <h3 class="title">Archives</h3>
    <ul class="entry">
      <li><%- list_archives() %></li>
    </ul>
    </div>
  </div>
<% } %>
```

把这个文件拷贝到`..\themes\light\layout\_widget`。此时还要修改一个文件，不然的话文章数目紧跟着归档日期，并没有用括号括起来。

把到`../hexo/lib/plugins/helper/list.js`文件，然后找到里面的`exports.list_archives`方法，再在该方法里找到`var item = function(href, name, length)`。在这个函数体里加上一句`length = '<small>' + length + '</small>';`。

修改前：

```
  var item = function(href, name, length){
    if (style === 'list'){
      arr.push('<li class="' + className + '-list-item">' +
        '<a class="' + className + '-list-link" href="' + root + archiveDir + '/' + href + '">' + name + '</a>' +
        (showCount ? '<span class="' + className + '-list-count">' + length + '</span>' : '') +
        '</li>')
    } else {
      arr.push('<a class="' + className + '-link" href="' + root + archiveDir + '/' + href + '">' +
        name +
        (showCount ? '<span class="' + className + '-count">' + length + '</span>' : '') +
        '</a>');
    }
  };
```

修改后：

```
  var item = function(href, name, length){
    length = '<small>' + length + '</small>';
    if (style === 'list'){
      arr.push('<li class="' + className + '-list-item">' +
        '<a class="' + className + '-list-link" href="' + root + archiveDir + '/' + href + '">' + name + '</a>' +
        (showCount ? '<span class="' + className + '-list-count">' + length + '</span>' : '') +
        '</li>')
    } else {
      arr.push('<a class="' + className + '-link" href="' + root + archiveDir + '/' + href + '">' +
        name +
        (showCount ? '<span class="' + className + '-count">' + length + '</span>' : '') +
        '</a>');
    }
  };

```

###个性化配置###
个性化配置文件有两个。一个是主程序的`..\_config.yml`，一个是主题的`\themes\light\_config.yml`。

###博文markdown文件的迁移###
参考[这里](http://zespia.tw/hexo/docs/migration.html)。

###迁移后博客的版本控制###
在Octopress中，提交到github时后有一个source分支，里面托管的是博客的源文件。而在Hexo中`hexo d`后，提交到github上只有生成后的站点文件。为了解决这个问题，我在github上新建了一个仓库(不是站点文件仓库`username.github.com`)。然后把整个博客目录都托管到github上面。这样在不同的电脑上就可以重复部署了。

（完）
