---
title: 'My Macbook Pro 13" 2019'
date: 2019-09-17 23:16:12
toc: true
thumbnail: my-macbook-pro-13-2019/image-1.png
categories:
  - 生活
tags:
  - os-x
  - macbook
---

> 本文原發表於 [Medium](https://medium.com/%E4%BA%BA%E7%94%9F%E6%AF%94%E5%AF%AB-code-%E9%9B%A3%E4%B8%80%E9%BB%9E%E9%BB%9E/my-macbook-pro-13-2019-248b4faf1f28)，2026-10-27 搬移至此。

#### Thank you my old pal!

{% asset_img image-1.png %}{% asset_img image-2.png %}{% asset_img image-3.png %}

MacBook Air 13" 2013 -> MacBook Pro 13" 2019

完成交接儀式後，起手式先安裝套件管理工具 [brew](https://brew.sh/index_zh-tw)：

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### 常用軟體

可透過 brew 安裝的有：

```
brew cask install google-chrome iina spotify telegram-desktop
```

剩下的得自行安裝：

- [The Unarchiver](https://apps.apple.com/tw/app/the-unarchiver/id425424353)
- [Spectacle](https://www.spectacleapp.com)
- [Day-O](https://shauninman.com/archive/2016/10/20/day_o_2_mac_menu_bar_clock)
- [Line](https://line.me)
- [Popcorn Time](http://popcorntime.sh)

### 終端機

iTerm2 + oh-my-zsh

#### [iTerm2](https://www.iterm2.com/)

```
brew cask install iterm2
```

下載[配色](https://github.com/mbadolato/iTerm2-Color-Schemes)：

```
git clone https://github.com/mbadolato/iTerm2-Color-Schemes.git
```

至 Preferences > Profiles > Colors > Color Presets... > Import  
選擇剛 clone 下來的 iTerm2-Color-Schemes/schemas/OneHalfDark.itermcolors 當作配色方案。

{% asset_img image-4.png %}

下載[字型](https://github.com/Homebrew/homebrew-cask-fonts) ：

```
# 新增來源  
brew tap caskroom/fonts
# 安裝字型 robotomono-nerd-font  
brew cask install font-robotomono-nerd-font
```

至 Preferences > Profiles > Text   
將 Font 與 Non-ASCII Font 設為RobotoMono Nerd Font

{% asset_img image-5.png %}

#### [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)

```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

#### [**powerlevel9k**](https://github.com/Powerlevel9k/powerlevel9k)

```
git clone https://github.com/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k
```

開啟.zshrc文件設定 theme 為 powerlevel9k/powerlevel9k ：

```
ZSH_THEME="powerlevel9k/powerlevel9k"
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(user dir vcs)
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(status root_indicator background_jobs history time)
```

### 編輯器

#### [Atom](https://atom.io)

```
brew cask install atom
```

### 函式庫

#### 系統函式庫

```
brew install git pkg-config gnupg node yarn python3 mkcert postgres redis
```

#### Ruby

使用 [RVM](https://rvm.io/) 管理多版本 Ruby

```
# 確認憑證  
gpg --keyserver hkp://pool.sks-keyservers.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
# 安裝 rvm  
curl -sSL https://get.rvm.io | bash -s stable
```

安裝 Ruby

```
# 列出所有 ruby 版本  
rvm list known
# 安裝當前最新的 ruby 2.6.3  
rvm install 2.6
```
