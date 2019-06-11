---
title: Install ruby on mac
date: 2019-06-11 11:17:22
categories:
  - 技術文章
tags:
  - ruby
  - rvm
  - mac
---

{% asset_img ruby-icon.png %}

Mac OS X 內建的 Ruby 版本並非最新版，只安裝了維持系統運行，最低需求版本的 Ruby，所以要安裝最新版本的 Ruby 就得額外安裝。

# Install Ruby

## Via Homebrew

    $ brew install ruby

## Via [Ruby Version Manager (RVM)](https://rvm.io/)

如果開發環境有安裝多個版本的 Ruby 的需求，就使用 RVM 來安裝與管理 Ruby 吧，可以透過 RVM 自由切換使用的 Ruby 版本與 Gemset，保持開發環境的乾淨。

詳情見 <https://rvm.io/>

```sh
# Install GPG keys:  
$ gpg2 --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB

# Install RVM:  
$ curl -sSL https://get.rvm.io | bash -s stable
```

<!-- more -->

```sh
# 常用指令

# 列出所有版本的 Ruby  
$ rvm list known

# 安裝 Ruby 2.6  
$ rvm install 2.6

# 切換 Ruby 版本成 2.6  
$ rvm use 2.6

# 設定 Ruby 預設版本為 2.6  
$ rvm --default use 2.6
```

# Gem

Gem 就是 Ruby 開發者共享的函式庫，Rails 也是 Ruby 的一個 Gem， 見 [https://rubygems.org](https://rubygems.org/?locale=zh-TW) 查看這些 Gems。

{% asset_img rubygems.png %}

設定安裝 Gem 時不要安裝文檔，於 `~/.gemrc` 加上這行 :

```gemrc
# .gemrc
gem: --no-rdoc --no-ri
```

使用 gemset 讓開發環境可以隔離不互相干擾，每個 RVM 安裝的 Ruby 版本預設使用 `default` gemset，我們也可以自己建立 gemset `project`

```sh
# 建立 gemset project  
$ rvm gemset create project

# 切換成 gemset project   
$ rvm use 2.6@project

# 切回預設的 gemset  
$ rvm use 2.6@default
```
