---
title: Expression Index in RDBMS
toc: true
thumbnail: expression-index-in-rdbms/kolar-io-lRoX0shwjUQ-unsplash.jpg
categories:
  - 技術文章
tags:
  - rdbms
  - index
---

What is the expression index?

According to the description from [Wikipedia](https://en.wikipedia.org/wiki/Expression_index)

> An expression index, also known as a function based index, is a database index that is built on a generic expression, rather than one or more columns. This allows indexes to be defined for common query conditions that depend on data in a table, but are not actually stored in that table.

When you query on something that is **computed from other columns frequently** and want to speed it up, you will need this.

I will use **PostgreSQL** as an example in this article because it is my favorite database.

<!-- more -->

I have a `profiles` table which has a `name` column to store the name of users, and I already created an index for the `name` column

Then I want to select some profiles where lowercase name is xxx, so the query looks like below:

```sql
SELECT * FROM profiles WHERE lower(name) = 'aaron yang';
```

## Create Index

It is very simple to create an index, we need to use `(` and `)` to wrap the expression

```sql
CREATE INDEX index_profiles_on_lower_name ON profiles (lower(name));
```

After that we created an expression index, with condition is `(lower((name)::text))`

{% asset_img 'expression-index.png' %}

## Explain Query

To make sure the index has been used.

`EXPLAIN` query before the expression index created

```sql
EXPLAIN SELECT * FROM profiles WHERE lower(name) = 'aaron yang';
```

{% asset_img 'explain-before-index-created.png' %}

As you may have noticed `Seq Scan on profiles`, it is a **full table scan**

Let's try again, the same `EXPLAIN` query after expression index created

```sql
EXPLAIN SELECT * FROM profiles WHERE lower(name) = 'aaron yang';
```

{% asset_img 'explain-after-index-created.png' %}

Yeah, the query is using the expression index.

> If your query still using the `Seq Scan`, that is because the rows of the table are too small, Postgres estimate seq scan will faster than using an index, see more [here](https://stackoverflow.com/a/52833441/9762797) or [here](https://blog.niclin.tw/2018/06/14/%E7%82%BA%E4%BB%80%E9%BA%BC-postgres-%E4%B8%8D%E9%81%B8%E6%93%87-index-scan-%E5%8D%BB%E9%81%B8%E6%93%87-seq-scan/)

## Databases Compatibility

In 2020, most of the relation database supported this feature, but name it differently: **expression index**, **function index**

Some of the databases unsupported this feature, but there is a workaround for them.

### Supported ✅

you can create an expression index directly.

|Database|Feature name|Supported Version|References|
|---|---|---|---|
|PostgreSQL|Indexes on Expressions|**9.5.0** and the above|[docs](https://www.postgresql.org/docs/current/indexes-expressional.html)|
|SQLite|Indexes on Expressions|**3.9.0** and the above|[docs](https://www.sqlite.org/expridx.html)|
|Oracle|Function-Based Indexes|**8i** and the above|[docs](https://docs.oracle.com/en/database/oracle/oracle-database/20/adfns/indexes.html#GUID-44AD4D28-A056-4977-B2F7-AC1BC50EDC87)|
|MySQL|Functional Key Parts|**8.0.13** and the above|[docs](https://dev.mysql.com/doc/refman/8.0/en/create-index.html#create-index-functional-key-parts)|

> The feature name of databases is interesting, do you see the pattern? it shows PostgreSQL and SQLite are closer, and Oracle and MySQL are closer.

---

### Unsupported ❌

but you can work around by creating a computed column then create an index on it.

|Database|Feature name|Supported Version||References|
|---|---|---|---|
|MariaDB|Indexes on Generated columns|**10.2.3** and above support index on virtual column|[docs](https://mariadb.com/kb/en/generated-columns/)|
|SQL Server|Indexes on Computed column|still can't index on virtual but persisted column|[docs](https://docs.microsoft.com/zh-tw/sql/relational-databases/indexes/indexes-on-computed-columns?view=sql-server-ver15)|

Hello SQL Server?

---

## References

- <https://www.postgresql.org/docs/current/indexes-expressional.html>
- <https://www.sqlite.org/expridx.html>
- <https://docs.oracle.com/en/database/oracle/oracle-database/20/adfns/indexes.html#GUID-44AD4D28-A056-4977-B2F7-AC1BC50EDC87>
- <https://dev.mysql.com/doc/refman/8.0/en/create-index.html#create-index-functional-key-parts>
- <https://mariadb.com/kb/en/generated-columns/>
- <https://docs.microsoft.com/zh-tw/sql/relational-databases/indexes/indexes-on-computed-columns?view=sql-server-ver15>
