---
title: Rails 的 sidekiq 設置筆記
date: 2019-06-11 15:47:59
toc: true
thumbnail: setup-sidekiq-on-rails/sidekiq.png
categories:
  - 技術文章
tags:
  - ruby
  - rails
  - sidekiq
---

[Sidekiq](https://github.com/mperham/sidekiq) 是一個能夠並發處理 Ruby 任務的套件，大致上的運作方法是：將任務 push 至 redis 的 queue 中，sidekiq 的 workers 再到 queue 一個個 pop 任務出來運算。

# 安裝

```Gemfile
# Gemfile
gem 'sidekiq'
```

```sh
bundle install
```

<!-- more -->

# 設置

## Sidekiq

見 <https://github.com/mperham/sidekiq/wiki/Advanced-Options>。

ActiveJob 使用的 redis queue 名稱預設為 `default`，ActionMailer 使用的 redis queue 名稱預設為 `mailers`。

`concurrency` 參數需要小於或等於 `config/database.yml`中的 `pool` 值。

```yml
# config/sidekiq.yml

:concurrency: 16
:queues: — default
  — mailers
```

## ActiveJob 使用  Sidekiq

見 <https://github.com/mperham/sidekiq/wiki/Active-Job>，在 `environments/development.rb` 與 `environments/production.rb` 中填入：

```ruby
config.active_job.queue_adapter = :sidekiq
```

## 設置 Sidekiq  管理介面

Sidekiq 提供了一個管理介面，見 [https://github.com/mperham/sidekiq/wiki/Monitoring](https://github.com/mperham/sidekiq/wiki/Monitoring#devise)，要將此管理介面放入既有的 Rails 專案，只需要在 `config/routes.rb`中加入：

```ruby
# config/routes.rb
require 'sidekiq/web'
mount Sidekiq::Web => '/sidekiq'
```

為 sidekiq 管理介面做權限控管，只讓 admin 可以查看管理介面，使用 `devise` + `cancancan`做例子：

```ruby
# config/routes.rb
require 'sidekiq/web'
authenticate :user, ->(u) { Ability.new(u).can? :manage, :admin } do
 mount Sidekiq::Web => 'admin/sidekiq'
end
```

`authenticate :user, ->(u) { condition }` 這個式子中的 `condition`是 `true` 即可通過驗證。

# 執行

```sh
sidekiq -C config/sidekiq.yml
```
