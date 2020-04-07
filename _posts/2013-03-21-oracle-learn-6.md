---
layout: post
title: Oracle系列:[6]PL/SQL基本知识续
date: 2013-03-21 21:01
comments: true
categories: IT技术
---
### 基本循环loop

```
loop
... (退出条件)
end loop;
```

一个例子：

```
declare
i number:=1;
begin
loop
dbms_output.put_line('内i的值是:'||i);
i:=i+1;
if i>3 then
exit;
end if;
end loop;
dbms_output.put_line('外i的值是:'||i);
end;
/
```

<!-- more -->

退出条件也可以这样写：

```
declare
i number:=1;
begin
loop
dbms_output.put_line('内i的值是:'||i);
i:=i+1;
exit when i>3;
end loop;
dbms_output.put_line('外i的值是:'||i);
end;
/
```

### while循环

```
while expression loop
...
end loop;
```

一个例子：

```
declare
i number:=1;
begin
while i<4 loop
dbms_output.put_line('i的值是：'||i);
i:=i+1;
end loop;
end;
/
```

### for循环

```
for counter in [reverse] start_value..end_value loop
...
end loop;
```

一个例子：

```
declare
begin
for i in 1..5 loop
dbms_output.put_line('i的值是：'||i);
end loop;
end;
/
```

倒序时需要加上`reverse`.如：

```
declare
begin
for i in reverse 1..5 loop
dbms_output.put_line('i的值是：'||i);
end loop;
end;
/
```

### goto循环

```
<<tag>>
...
goto tag;
```

一个例子：

```
declare
i number:=1;
begin
<<tag>>
dbms_output.put_line('内i的值是：'||i);
i:=i+1;
if i<5 then
goto tag;
end if;
dbms_output.put_line('外i的值是：'||i);
end;
/
```

### 异常

```
exception
when ... then
...
```

一个例子：

```
declare
tpub varchar2(30);
begin
select pub into tpub from ss where pub='rubyy';
dbms_output.put_line(tpub);
exception
when no_data_found then
dbms_output.put_line('没有找到数据。');
end;
/
```

### 自定义异常

一个例子：

```
declare
tpub varchar2(30);
e exception;
begin
select pub into tpub from ss where no=1;
if tpub<>'ruby' then
raise e;
end if;
dbms_output.put_line(tpub);
exception
when e then
dbms_output.put_line('抛出了异常');
end;
/
```

### 复合变量：记录

```
type record_name is record(
a valuetype,
...
b valuetype);
valuename record_name;
```

一个例子：

```
declare
type rec is record(
price number,
pub varchar2(30));
myrec rec;
begin
select price,pub into myrec from ss where no=1;
dbms_output.put_line(myrec.price||','||myrec.pub);
end;
/
```

### 记录中变量类型匹配表中的字段类型

```
declare
type rec is record(
price ss.price%type,
pub varchar2(30));
myrec rec;
begin
select price,pub into myrec from ss where no=1;
dbms_output.put_line(myrec.price||','||myrec.pub);
end;
/
```

### 记录匹配表中的所有列

```
declare
myrec ss%rowtype;
begin
select * into myrec from ss where no=1;
dbms_output.put_line(myrec.pub);
end;
/
```

（完）
