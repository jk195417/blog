---
title: Homebrew — mac 必裝的套件管理
date: 2019-06-11 10:57:00
categories:
  - 技術文章
tags:
  - mac
  - brew
---

就像 Ubuntu 上的 apt，可以透過命令列安裝套件，更新套件。

官網 <https://brew.sh/>，Github <https://github.com/Homebrew/brew/>

{% asset_img brew-icon.png %}

# 安裝

進 <https://brew.sh/> 看其安裝說明，在終端機輸入：

    $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

<!-- more -->

# 常用指令

```sh
# 查看套件資訊  
$ brew info something

# 安裝套件  
$ brew install something

# 更新套件  
$ brew update

# 解除安裝套件  
$ brew uninstall something

# 重新安裝套件  
$ brew reinstall something

# 把套件連結至 bin  
$ brew link something

# 檢查 brew 有沒有缺少什麼  
$ brew doctor

# 升級 brew  
$ brew upgrade

# 查看可透過 brew 啟用的 services  
$ brew services list

# 啟用 service  
$ brew services start something

# 停用 service  
$ brew services stop something
```

# Brew Cask

brew 除了套件也可以安裝應用程式，以 [atom](https://atom.io/) 為例：

```sh
$ brew cask install atom
```

## Cakebrew : Brew GUI

[Cakebrew](https://www.cakebrew.com/) (<https://github.com/brunophilipe/Cakebrew>) 是一款 brew 的 GUI，我們可以透過熟悉的應用程式介面來安裝套件。

透過 brew 來安裝 cakebrew：

```sh
$ brew cask install cakebrew
```
