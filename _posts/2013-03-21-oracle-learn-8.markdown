---
layout: post
title: "Oracle系列:[8]存储过程"
date: 2013-03-21 21:06
comments: true
categories: IT技术
---
###存储过程的创建###
创建前先确保当前用户有创建存储过程的权限。
```
grant create procedure to username;
```
创建存储过程：
```
create or replace procedure myproc(id in number)
is
tpub varchar2(10);
begin
select pub into tpub from ss where no=id;
dbms_output.put_line(tpub);
end myproc;
/
```

<!-- more -->

存储过程的执行：
```
execute myproc(1);
```
也可以这样：
```
begin
myproc(1);
end;
/
```
当要传递变量时，这样：
```
declare
id number;
begin
myproc(id);
end;
/
```
查看存储过程是否有编译错误：
```
show error procedure procedurename;
```

（完）
