---
title: "Win10 WSL Combo : Terminus + Ubuntu + Oh My Zsh + Powerlevel10k"
thumbnail: win10-wsl-combo-terminus-ubuntu-oh-my-zsh-powerlevel10k/microsoft-store.png
toc: true
categories:
  - 技術文章
tags:
  - windows
  - wsl
---

<!-- TODO: 簡介與成果圖 -->

<!-- more -->

1. 安裝 WSL，直接透過 Microsoft Store 安裝 [Ubuntu 18.04 LTS](https://www.microsoft.com/store/apps/9N9TNGVNDL3Q)，見此[文件](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
   - 若公司有擋 Microsoft Store 則下載 distros 版的 Linux 安裝檔 [Ubuntu 18.04](https://aka.ms/wsl-ubuntu-1804)，見此[文件](https://docs.microsoft.com/en-us/windows/wsl/install-manual)
   - 若公司有擋預設安裝路徑，將剛下載的 `CanonicalGroupLimited.Ubuntu18.04onWindows_1804.2018.817.0_x64__79rhkp1fndgsc.Appx` 改成 `Ubuntu 18.04.zip`，解壓縮至 `C:\WSL\Ubuntu 18.04`，進入此資料夾執行 `.exe` 檔 ，見此[文件](https://docs.microsoft.com/en-us/windows/wsl/install-on-server)
2. 安裝 [Terminus](https://github.com/Eugeny/terminus)
3. 用 Terminus 打開 Cmd 輸入指令

   ```sh
   wsl
   ```

  進入 Ubuntu 18.04

4. 安裝 [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh)
5. 安裝 [Powerlevel10k](https://github.com/romkatv/powerlevel10k)
6. 回到 Windows 設定 Terminus 的字型與配色
