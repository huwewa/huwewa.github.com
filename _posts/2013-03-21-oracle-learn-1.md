---
layout: post
title: Oracle系列:[1]Oracle基本认识
date: 2013-03-21 20:40
comments: true
categories: IT技术
---
### **O**racle的三种结构

- 物理结构
    
    一个库中有控制文件(\*.CTL)、数据文件(\*.DBF)、重做日志文件(\*.LOG)

- 内存结构

    一个系统全局区(SGA)服务于一个实例。一个系统全局区包含高速数据缓冲区、共享池、大共享区、重做日志缓冲区和固定SGA等。
    
- 逻辑结构
    
    一个数据库由表空间组成。表空间存储的对像叫段。段由区组成。区的大小可以不同。区的大小是数据块大小的整数。数据块是数据库中最小的I/O单位，也是内存数据缓冲区的单位，及数据库的存储单位。

<!-- more -->

### Oracle数据库(11g)安装要注意的事项

- 安装结束后在服务中找不到oracle服务，SQL Plus登录不上

    造成这个问题的原因可能是没有创建oracle实例。运行`database configuration assistant`创建实例。创建成功后登录`SQL Plus`，用户名：`SYS as SYSDBA`，密码：xxx
    
- Win 7 64位旗舰版注意事项

    如果是win7 64位旗舰版系统，则需要把`refhost.xml`文件中的
    
```
    <!--Microsoft Windows Vista-->
    <OPERATING_SYSTEM>
      <VERSION VALUE="6.0"/>
    </OPERATING_SYSTEM>
```

修改为

```
    <!--Microsoft Windows Vista-->
    <OPERATING_SYSTEM>
      <VERSION VALUE="6.1"/>
    </OPERATING_SYSTEM>
```


### Oracle实例与数据库的区别

- Oracle实例是临时的，代表数据库某一状态。`Oracle实例　= 进程 + 进程所使用的内存(SGA)`。数据库是永久的。`数据库　= 控制文件 + 重做文件 + 数据文件 + 临时文件组成`。

### 联机日志与归档日志

- 一个数据库有多个联机重做日志。比如有两个，分别是１和２。当１写满时，会切换到２,此时１会被归档。当２被写满时，又重新切换回１。此时２会被归档。


（完）
