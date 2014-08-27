---
layout: post
title: "Oracle系列:[2]Sql Plus的基本使用"
date: 2013-03-21 20:44
comments: true
categories: IT技术
---
###创建表空间###

- 运行sql plus，登录
```
sys/password as sysdba
```
- 新建用户
```
create user username identified by password
```
- 新建表空间
```
create tablespace tablespacename datafile 'f:\xxx.dbf' size xxxm
```
- 将空间分配给用户
```
alter user username default tablespace tablespacename
```

<!-- more -->

- 给用户授予权限
```
grant create session,create table,unlimited tablespace to username
```
- 使用新建的用户连接
```
conn username/password
```
- 新建一张数据表并插入数据
```
create table books(no number(5) not null,name varchar2(30) not null,constraint pk_connectdb primary key(no));
insert into books(no,name) values(1,'java');
insert into books(no,name) values(2,'ruby');
insert into books(no,name) values(3,'java');
```

###数据库的启动和关闭###
使用`shutdown immediate`命令关闭数据库时，要重新打开数据库的话要使用以下命令
```
sys/password as sysdba
startup
conn username/password
```

###sql plus帮助文档###
使用`help index`查看sql plus支持的命令。要查看具体某个命令的用法，使用`? 要查年的命令名`

###打开空格行支持###
```
set blanklines on
```

###替代变量的使用###
```
select * from books where no=&tt
```
运行时会要求输入tt变量的值，并显示结果。

###缓冲区的使用###
使用`l`(list)查看缓冲区内容。查看缓冲区的某行时使用`l 要查看的行`。查看指定某几行时使用`l 起始行 结束行`。

编辑缓冲区内容时使用`edit`,windows下会默认打开记事本编辑。

`save f:\xx.txt`保存缓冲区内容到指定文件。

`get f:\xx.txt`在缓冲区获取指定文件内容。

`@ f:\xx.txt`执行指定文件内容。

`\`执行缓冲区内容。

`a 要追加的内容`在缓冲区追加内容。

`c /要更改的内容/更改后的内容`

###sql plus对报表的支持###
- 对某一列起别名

`col 要起别名的列 heading "别名"`

- 设置报表页眉

```
set linesize 50
ttitle center "My Title" skip 1 left "Test Report" right "Page" sql.pno skip 2
```

设置行宽为50,`skip`空出多少行。

- 关闭报表效果
```
ttitle off
```

- 某列重复的只显示一行
```
break on 要显示效果的列
```

- 导出查询结果到文件
```
spool f:\xx.txt
select * from books
spool off
```

（完）
