---
layout: post
title: 问与答
date: 2015-04-14 18:05:00
categories: IT技术
tags:
---

##Struts##

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

###Q:怎样在vim中关掉所有buff,且保留窗口?###

A:使用命令`:bufdo bdelete`

###Q:为什么我的Tomcat日志`catalina.out`没有按天分割?###

A:可能是没有安装`cronolog`并在`catalina.sh`做分割配置.

###Q:xshell中tail后怎么清屏?###

A:点击右键出来的菜单里面有。多看软件操作选项。
