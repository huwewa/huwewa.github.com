---
layout: post
title: "Oracle系列:[9]视图同义词及序列"
date: 2013-03-21 21:08
comments: true
categories: IT技术
---
###视图###
创建视图前先确保当前用户有创建视图的权限。
```
grant create view to username;
```
一个例子：
```
create or replace view myview
as
select * from ss;
```
使用视图：
```
select * from myview;
```

<!-- more -->

使用视图插入数据：
```
insert into myview(no) values(4);
```
有限制条件的视图：
```
create or replace view myview
as
select * from ss where no>2
with check option;
```
这样通过视图不能插入no<=2的数据。

只可以读，不可以写的视图：
```
create or replace view myview
as
select * from ss
with read only;
```

###同义词###
创建前先确保当前用户有创建同义词的权限：
```
grant create synonym to username;
```
创建同义词：
```
create synonym ss for huwewa.ss;
```
使用同义词：
```
select * from ss;
```
效果等同于：
```
select * from huwewa.ss;
```
删除同义词：
```
drop synonym synonymname;
```
公共同义词：
```
create public synonym ss for huwewa.ss;
```
创建公共同义词后所有用户都可以使用。

###序列###
创建序列前先确保有创建的权限：
```
grant create sequence to username;
```
创建序列：
```
create sequence myseq
start with 1
increment by 1
order
nocycle;
```
使用序列：
```
select myseq.nextval from dual;
```
在表中应用序列：
```
insert into ss(no) values(myseq.currval);
```
修改序列的递增量：
```
alter sequence myseq
increment by 3;
```
序列的递增量可以修改，但是当前值不能修改。

（完）
