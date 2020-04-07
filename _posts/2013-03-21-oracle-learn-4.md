---
layout: post
title: Oracle系列:[4]SQL基本知识续
date: 2013-03-21 20:54
comments: true
categories: IT技术
---
### 分组查询
- group by

```
select sum(price*num) total,pub from books group by pub;
```

select后面不能再跟除group by后面的单独列。

- having

```
select sum(price*num) total,pub from books group by pub having sum(price*num)>4;
```

- 模糊查询

```
select * from books where like pub='i_';
```

查找i后匹配一个字符。

<!-- more -->

```
select * from books where like pub='_i';
```

查找i前匹配一个字符。

```
select * from books where like pub='%i';
```

查找i前匹配多个字符。

```
select * from books where like pub='i%';
```

查找i后匹配多个字符。

```
select * from books where like pub='_i_';
```

查找i前和i后各匹配一个字符。

```
select * from books where like pub='%i%';
```

查找i前和i后各匹配多个字符。

### 表的连接
- 内连接

只查询两个或多个表中的匹配部分。

```
select ss.no,ww.name from ss,ww where ss.price=ww.price;
```

也可以这样写：

```
select ss.no,ww.name from ss join ww on ss.price=ww.price;
```

- 外连接

左外连接：左边的表不匹配的部分也显示出来。

右外连接：右边的表不区配的部分也显示出来。

左外连接这样写：

```
select ss.no,ww.name from ss join ww on ss.price=ww.price(+);
```

也可以这样写：

```
select ss.no,ww.name from ss,ww where ss.price=ww.price(+);
```

右外连接这样写：

```
select ss.no,ww.name from ss join ww on ss.price(+)=ww.price;
```

也可以这样写：

```
select ss.no,ww.name from ss,ww where ss.price(+)=ww.price;
```

### 子查询
- 无关子查询

```
select * from ss where no in(select price from ww);
```

- 相关子查询

```
select * from ss where price in(select price from ww where ss.price=ww.price);
```

### 合并

```
select price from ss union select price from ww;
```

### 根据已有表创建表

```
create table gg as select price from ss;
```

（完）
