---
title: 部署你的 rails 應用程式至 Heroku
date: 2019-06-11 14:57:54
toc: true
thumbnail: deploy-your-rails-app-to-heroku/heroku.png
categories:
  - 技術文章
tags:
  - heroku
  - ruby
  - rails
  - deploy
---

Heroku 是一個 platform as a service 平台，可以部署專案在此，使用上非常方便的，當然方便的代價是價格，他的單位計算資源價格會高於 AWS。

# 安裝 heroku-cli

見 <https://devcenter.heroku.com/articles/heroku-cli>

```sh
# 將 heroku 加入 brew 的來源  
brew tap heroku/brew && brew install heroku
```

<!-- more -->

登入 Heroku 帳號

```sh
heroku login
```

> 一般我們使用 git 來部署應用程式至 Heroku，在下個步驟前，確認你的專案已經使用 git 做版本控制了。

# 設定 git remote

新建一個專案叫 `app_name`:

```sh
heroku create app_name
```

已經在Heroku 上建立專案了則使用：

```sh
# set git remote heroku to https://git.heroku.com/app_name.git
heroku git:remote -a app_name
```

# 設定 Rails app

使用 Postgres 作為資料庫，將下列這行加入 `Gemfile` :

```ruby
# Gemfile
gem 'pg'
```

設定資料庫連線資訊：

```yml
# config/database.yml
production:  url: <%= ENV['DATABASE_URL'] %>
```

在 `config/environments/production.rb` 中對 assets 與 log 做設定

```ruby
# config/environments/production.rb
config.public_file_server.enabled = ENV['RAILS_SERVE_STATIC_FILES'].present?if ENV["RAILS_LOG_TO_STDOUT"].present?  logger           = ActiveSupport::Logger.new(STDOUT)  logger.formatter = config.log_formatter  config.logger = ActiveSupport::TaggedLogging.new(logger)end
```

指定使用的 Ruby 版本，新增檔案 `.ruby-version`填入：

```
# .ruby-version
ruby-2.6.0
```

在專案的根目錄下建立一個 `Procfile` 檔案 (`$ touch Procfile`)，並填入以下內容：

```procfile
# Procfile
web: bundle exec puma -C config/puma.rb
sidekid: bundle exec sidekiq -C config/sidekiq.yml
```

# 設定 Heroku

在 [Heroku 管理介面](https://dashboard.heroku.com/apps/) > `app_name` > Settings > Reveal Config Vars，`DATABASE_URL` 這個環境變數，填入的是你的 production database 的連線位址與帳號密碼，Heroku 會預設幫你填入他提供的 Postgres 資料庫。

接著 Add buildpack，加入 `heroku/nodejs` buildpack 並放在 `heroku/ruby` 之前：

{% asset_img heroku-buildpacks.png %}

> 有需要 node_modules 者才需要做這個步驟

# 部署

在部署前 `git commit` 把要部署的專案放置在 master 分支下，然後：

```sh
# push master 分支到 heroku remote  
git push heroku master
```

有新的 database migrations 時執行：

```sh
# heroku run + 要運行的指令，這次要做 database migrate  
heroku run rails db:migrate
```
