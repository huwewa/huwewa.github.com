---
layout: post
title: "Oracle系列:[10]触发器"
date: 2013-03-21 21:10
comments: true
categories: IT技术
---
###行触发器###
触发器和视图一样，不接受参数。创建触发器前先确保当前用户有创建触发器的权限。
```
grant create trigger to username;
```
一个例子：
```
create or replace trigger mytri
after delete on ww
for each row
begin
delete from ss where price=:old.price;
end;
/
```

<!-- more -->

`old`表和`new`表出现在触发器中。`old`作用于`delete`和`update`。`new`作用于`insert`和`update`。

`commit`和`rollback`不允许出现在触发器中，当在触发器中要做限制时可以这样写：
```
create or replace trigger mytri
after delete on ww
for each row
begin
if :old.price=1 then
raise_application_error(-20000,'不允许删除');
end if;
end;
/
```
当删除`ww`表中的price=1的记录时会报错。`-20000`是定义的错误码，取值范围是`-29999~-20000`。

###语句触发器###
可以用来记录日志。先创建一个日志表：
```
create table mylog(curr_user varchar2(20),curr_date date,act char(1));
```
利用触发器记录表`ww`的操作日志：
```
create or replace trigger mytri
after delete or update or insert on ww
begin
if deleting then
insert into mylog values(user,sysdate,'d');
elsif updating then
insert into mylog values(user,sysdate,'u');
else
insert into mylog values(user,sysdate,'i');
end if;
end;
/
```
###触发器和序列的结合使用###
一个例子：
```
create or replace trigger mytri
before insert on ww
for each row
declare
sn number;
begin
select myseq.nextval into sn from dual;
:new.price:=sn;
end;
/
```
在`ww`表中插入记录时：
```
insert into ww(name) values('aa');
```
`price`字段已经被自动写到记录中了。

###替代触发器###
只可以应用于视图上，解决不能通过视图更新两个或两个以上的表的问题。一个例子：
```
create or replace trigger mytri
instead of insert on myview
for each row
begin
insert into ss(no,ss.price,pub) values(:new.no,10,:new.pub);
insert into ww(ww.price,name) values(10,:new.name);
end;
/
```
使用视图插入数据：
```
insert into myview(no,name,pub) values(9,'dd','php');
```

（完）
