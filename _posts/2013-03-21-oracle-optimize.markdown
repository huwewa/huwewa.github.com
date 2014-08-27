---
layout: post
title: "Oracle的优化"
date: 2013-03-21 21:18
comments: true
categories: IT技术
---
###truncate与delete###
- truncate
    
truncate是DDL语言，自动提交，不可回滚。truncate作用于table。如：

```
truncate table ww;
```

那么表`ww`的所有数据将会被删除。但是会保留表。

- delete

delete是DML语言，不会自动提交，可以回滚。delete可以删除表中的全部数据，也可以删除表中的部分数据。

总结：truncate是DDL语言，删除全部表数据时速度快，占用资源少，不可以回滚。delete是DML语言，可删除表中的部分数据或全部数据，可以回滚，速度相对来说慢。truncate与delete都不会删除表中的结构，如表的主键和索引。

###多表查询的问题###
执行的时候是从右往左的。所以在多表的时候，把记录最少的表放在最右边，以提高执行效率。

###多使用commit###
尽量多使用commit，以释放资源，但是要注意事务的完整性。

（完）
