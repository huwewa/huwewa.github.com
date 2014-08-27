---
layout: post
title: "Oracle系列:[7]游标"
date: 2013-03-21 21:04
comments: true
categories: IT技术
---
###显式游标###
一个例子：
```
declare
cursor mycur is
select * from ss;
myrecord ss%rowtype;
begin
open mycur;
fetch mycur into myrecord;
while mycur%found loop
dbms_output.put_line(myrecord.pub);
fetch mycur into myrecord;
end loop;
close mycur;
end;
/
```

<!-- more -->

带参数的游标。例子：
```
declare
cursor mycur(id number) is
select * from ss where no=id;
myrecord ss%rowtype;
begin
open mycur(1);
loop
fetch mycur into myrecord;
exit when mycur%notfound;
dbms_output.put_line(myrecord.pub);
end loop;
close mycur;
end;
/
```
值得注意的是带参数的游标，参数只给出类型就行了，不需要给出长度。

使用for循环游标时不需要写：
```
...
open 游标
...
close 游标
...
```
一个例子：
```
declare
cursor mycur is
select * from ss;
myrecord ss%rowtype;
begin
for cur in mycur loop
dbms_output.put_line(cur.pub);
end loop;
end;
/
```

游标的属性`%rowcount`，表示当前第几条记录。例：
```
declare
cursor mycur is
select * from ss;
myrecord ss%rowtype;
begin
for cur in mycur loop
dbms_output.put_line('第'||mycur%rowcount||'条记录：'||cur.pub);
end loop;
end;
/
```

###隐式游标###
```
declare
begin
for cur in(select * from ss) loop
dbms_output.put_line(cur.pub);
end loop;
end;
/
```

###使用游标修改数据###
```
declare
cursor mycur is
select pub from ss for update;
begin
for cur in mycur loop
update ss set pub=cur.pub||'_t' where current of mycur;
end loop;
end;
/
```
`for update`指明是要修改数据。`current of cursorname`指明修改游标当前记录。

（完）
