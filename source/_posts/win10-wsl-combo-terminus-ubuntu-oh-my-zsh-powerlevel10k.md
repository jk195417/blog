---
title: 'Win10 WSL combo : Terminus + Ubuntu + Oh My Zsh + Powerlevel10k'
tags:
  - windows
  - wsl
thumbnail: win10-wsl-combo-terminus-ubuntu-oh-my-zsh-powerlevel10k/microsoft-store.png
toc: true
categories:
  - 技術文章
date: 2020-02-16 22:45:52
---


## 簡介

想在 Windows 上使用潮潮的 Linux 命令列嗎？

本篇將教你如何使用 WSL Ubuntu + [Terminus](https://github.com/Eugeny/terminus) + [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh) + [Powerlevel10k](https://github.com/romkatv/powerlevel10k) 連續技，達到爽度十足的開發環境

{% asset_img powerlevel10k.png %}

<!-- more -->

## 安裝 WSL

直接透過 Microsoft Store 安裝 [Ubuntu 18.04 LTS](https://www.microsoft.com/store/apps/9N9TNGVNDL3Q)，見此[文件](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

{% asset_img microsoft-store.png %}

若公司有擋 Microsoft Store 則下載 distros 版的 Linux 安裝檔 [Ubuntu 18.04](https://aka.ms/wsl-ubuntu-1804)，見此[文件](https://docs.microsoft.com/en-us/windows/wsl/install-manual)

若公司有擋預設安裝路徑，則將剛下載的 `CanonicalGroupLimited.Ubuntu18.04onWindows_1804.2018.817.Appx` 改成 `Ubuntu 18.04.zip`，解壓縮至 `C:\WSL\Ubuntu 18.04`，進入此資料夾執行 `.exe` 檔 ，見此[文件](https://docs.microsoft.com/en-us/windows/wsl/install-on-server)

## 安裝 Terminus

[Terminus](https://github.com/Eugeny/terminus) 是款跨平台的命令列工具，本次會選擇這個工具的原因有二

1. 它附帶了字型與顏色，還有著漂亮的 GUI 設定介面，非常適合懶人直接安裝使用

2. 我的 Windows 版本尚未升級到 Win 10 1903，所以不能使用 [Windows Terminal](https://github.com/microsoft/terminal)

到 [releases](https://github.com/Eugeny/terminus/releases/latest) 選擇 **setup.exe** 下載並執行

## 安裝 Oh My Zsh

用 Terminus 打開 Cmd 輸入指令

```sh
wsl
```

進入 Ubuntu 18.04 subsystem 後用 `curl` 或 `wget` 下載 [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh) 並執行

- curl

  ```sh
  sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
  ```

- wget

  ```sh
  sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
  ```

## 安裝 Powerlevel10k

[Powerlevel10k](https://github.com/romkatv/powerlevel10k) 原是 fork 自 [powerlevel9k](https://github.com/Powerlevel9k/powerlevel9k)，比起 9k 的穩定，10k 更著重於效能與新功能，所有的程式碼都已完全重寫與 9k 不同了。

10k 的官網上也有與 9k 的速度比較的影片，我自己感覺 10k 的確是比 9k 的反應更加靈敏快速。

[![asciicast](https://asciinema.org/a/249531.svg)](https://asciinema.org/a/249531)

一樣是在 subsystem 內操作

用 Oh My Zsh 安裝 [Powerlevel10k](https://github.com/romkatv/powerlevel10k#oh-my-zsh)

```sh
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git $ZSH_CUSTOM/themes/powerlevel10k
```

打開 `~/.zshrc.` 將 **ZSH_THEME** 設定成 **powerlevel10k**

```.zshrc
ZSH_THEME="powerlevel10k/powerlevel10k"
```

重新進入 wsl 讓 zsh 讀取剛剛的設定

接著透過互動式命令列來設定 **powerlevel10k**

```sh
p10k configure
```

## 設定字型與配色

回到 Windows，打開 **Terminus** > **Setting** > **Appearance** 設定 Terminus 的字型與配色

- Font: `SauceCodePro Nerd Font`
- Color Scheme: `OneHalfDark`

{% asset_img terminus-setting.png %}

這樣就大功告成啦~
