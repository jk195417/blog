---
title: migrate-primary-key-type-from-integer-to-bigint-in-upgraded-rails-and-postgres
toc: true
thumbnail: 
tags:
  - rails
  - ruby
  - postgres
categories:
  - 技術文章
---

在 Rails 5.1 以前，我們使用 migration `create_table` 時，預設使用 `integer` 作為 **id** 欄位的型態，此時 **db/schema.rb** 內看到的內容大概長這樣

```ruby
create_table 'users', id: :serial, force: :cascade do |t|
  t.string 'email', default: '', null: false
  t.string 'encrypted_password', default: '', null: false
  t.datetime 'created_at', null: false
  t.datetime 'updated_at', null: false
  t.index ['email'], name: 'index_users_on_email', unique: true
end

create_table 'profiles', id: :serial, force: :cascade do |t|
  t.string 'name'
  t.string 'sex'
  t.date 'birth'
  t.string 'phone'
  t.string 'address'
  t.integer 'user_id'
  t.datetime 'created_at', null: false
  t.datetime 'updated_at', null: false
  t.index ['user_id'], name: 'index_profiles_on_user_id'
end
```
<!-- more -->

## References

<https://github.com/rails/rails/pull/26266>

- <https://www.mccartie.com/tech/2016/12/05/rails-5.1.html>
- <https://stackoverflow.com/questions/56844082/altering-mysql-table-column-type-from-int-to-bigint>
- <https://ruby-china.org/topics/37745>
