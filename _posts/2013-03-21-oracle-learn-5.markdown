---
layout: post
title: "Oracle系列:[5]PL/SQL基本知识"
date: 2013-03-21 20:58
comments: true
categories: IT技术
---
###PL/SQL的块结构###

```
declare
...
begin
...
exception
...
end;
/
```

一个实例:

```
declare
a number:=2;
begin
dbms_output.put_line('a的值为:'||a);
end;
/
```

<!-- more -->

此时控制台不会有输出。需要先打开控制台输出：

```
set serveroutput on size 100000
```

###PL/SQL的注释###
- 行注释

使用`--`注释行。如：

```
declare
--a number:=2;
a number:=10;
begin
dbms_output.put_line('a='||a);
end;
/
```

- 块注释

使用

```
/*
...
*/
```

注释块。如：

```
declare
/*
a number:=2;
a number:=5;
*/
a number:=10;
begin
dbms_output.put_line('a='||a);
end;
/
```

###if分支###

```
if ... then
...
elsif ... then
...
else
...
end if;
```

如：

```
declare
a number:=2;
b varchar2(10);
begin
if a=1 then
b:='A';
elsif a=2 then
b:='B';
else
b:='C';
end if;
dbms_output.put_line('b的值是:'||b);
end;
/
```

###case分支##

```
case
when ... then ...
else ...
end case;
```

如：

```
declare
a number:=2;
b varchar2(10);
begin
case
when a=1 then b:='A';
when a=2 then b:='B';
else b:='C';
end case;
dbms_output.put_line('b的值是:'||b);
end;
/
```

（完）
