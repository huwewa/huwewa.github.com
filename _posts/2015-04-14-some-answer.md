---
layout: post
title: 问与答
date: 2015-04-14 18:05:00
categories: IT技术
tags:
---

##Web Dev##

***

###Q:为什么Struts的Action中接收过来的字段中文乱码?###

A:可能是在Tomcat的配置文件`server.xml`中没有配置`URIEncoding="utf-8"`

原:

```
<Connector port="9876" protocol="HTTP/1.1" connectionTimeout="20000" redirectPort="8443" />
```

修改后:

```
<Connector port="9876" protocol="HTTP/1.1" connectionTimeout="20000" redirectPort="8443" URIEncoding="utf-8" />
```

###Q:为什么我的Tomcat日志`catalina.out`没有按天分割?###

A:可能是没有安装`cronolog`并在`catalina.sh`做分割配置.

##Tools##

***

###Q:怎样在vim中关掉所有buff,且保留窗口?###

A:使用命令`:bufdo bdelete`

###Q:xshell中tail后怎么清屏?###

A:点击右键出来的菜单里面有。多看软件操作选项。

###Q:在Windows中怎样轻松创建USB启动盘?###

A:使用[Rufus](https://rufus.akeo.ie/?locale=zh_CN)一键创建。[Rufus项目地址](https://github.com/pbatard/rufus)

###Q:`sudo apt-get install ia32-libs`出错是为什么？###

A:有可能是有些依赖条件不满足。输入以下命令
```
sudo dpkg --add-architecture i386
sudo apt-get update
sudo apt-get install ia32-libs
```

###Q:Gvim中使用不了fcitx输入法怎么办?###

A:可能是因为输入法的快捷键和Gvim中的快捷键冲突了。禁用`fcitx`里全局配置里的`额外的激活输入法快捷键`.

###Q:怎样在eclipse中使用vi?###

A:安装`viPlugin`插件。配置`Path to vim executable`选项到外部安装的`vim`。执行命令`:vim`可在eclipse中调用外部vim。[人穷志不短 :(](http://lshang.diandian.com/post/2014-03-22/40061318328)

###Q:如何在Debian上简单地安装并使用shadowsocks客户端？###

A:安装`pip`

```
apt-get install python-pip
```

接着安装`shadowsocks`

```
pip install shadowsocks
```

启动`shadowsocks`客户端

```
sslocal -s server_ip -p server_port  -l 1080 -k password -m rc4-md5
```

其中`server_ip`为服务器地址，`server_port`为端口，`1080`为本地端口，`password`为密码，`rc4-md5`为加密方式。

###Q:如何在vim中使用正则表达式进行匹配替换?###

A:例 

```
http://124.com/
```

更改成

```
http://abc.cn/
```

执行

```
:%s/[0-9]*.com/abc.cn/g
```

###Q:Debian上怎样移除卸载`lantern`后在桌面遗留的程序图标？###

A:删除`/usr/share/applications/lantern.desktop`.

###Q:怎样在python中把时间戳转换为日期?###

A:

```
import datetime
print(datetime.datetime.fromtimestamp(int("1284101485")).strftime('%Y-%m-%d %H:%M:%S'))
```

###Q:linux中如何根据文件内容查找文件?###

A:例

```
find / -name '*.txt' | xargs grep 'bjl_texas'
```

###Q:在git中怎样查看一个文件的修改记录?###

A: 查看文件的修改记录

```
git log -p filename
```

查看目前文件每一行是哪个提交最后的改动

```
git blame filename
```
