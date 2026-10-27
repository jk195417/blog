---
title: '記一次 Boot Menu 找不到 Windows Boot Manager'
date: 2019-09-14 02:01:48
toc: true
thumbnail: windows-boot-manager-missing-from-boot-menu/image-1.png
categories:
  - 技術文章
tags:
  - boot-configuration-data
  - windows-boot-error
  - windows
---

> 本文原發表於 [Medium](https://medium.com/%E4%BA%BA%E7%94%9F%E6%AF%94%E5%AF%AB-code-%E9%9B%A3%E4%B8%80%E9%BB%9E%E9%BB%9E/%E8%A8%98%E4%B8%80%E6%AC%A1-boot-menu-%E6%89%BE%E4%B8%8D%E5%88%B0-windows-boot-manager-d6e509124100)，2026-10-27 搬移至此。

#### 記一次中秋節大家在烤肉 😭，我關在 lab 修電腦 😭

{% asset_img image-1.png %}

Photo by [Danny Gallegos](https://unsplash.com/@dannysgallegos?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)

應教授所託將 [dcard-crawler](https://github.com/jk195417/dcard-crawler) 安裝在 lab 的電腦上，於是我在這台原本就已經安裝好 Windows 10 的電腦上安裝 Ubuntu 18.04 作為第二個作業系統。

做好 USB 開機碟，分割完磁碟，安裝 Ubuntu，但不知為何安裝失敗：

```
The 'grub-efi-amd64-signed' package failed to install into / target/. Without the GRUB boot loader, the installed system will not boot.
```

重開機打算再用開機碟安裝一次時，系統卻出現錯誤訊息：

```
Failed to open \EFI\BOOT\mmx64.efi - Not Found  
Failed to load image \EFI\BOOT\mmx64.efi: Not Found  
Failed to start MokManager: Not Fond  
Something has gone seriously wrong: import_mok_state() failed
```

搜尋到[這篇](https://askubuntu.com/questions/1085550/cant-install-ubuntu-18-10-on-xps-15-efi-boot-mmx64-efi-not-found)文章，成功解決問題，再來安裝一次還是失敗了。

此時回到 BIOS 中的 Boot Menu 中，我發現 硬碟(Windows) 的選項消失了，取而代之的是硬碟的 Boot 選項，透過這個硬碟選項 Boot 只能進入 BIOS，無窮迴圈。

照著[這篇](https://www.ptt.cc/bbs/hardware/M.1403853763.A.F7E.html)文章的做法：

```
bootrec /fixmbr  
bootrec /fixboot  
bootrec /rebuildbcd
```

還是遇到問題：

1. bootrec /fixboot 系統存取被拒。
2. bootrec /rebuildbcd 有找到 C 槽中的 Win 10，但找不到要求的系統裝置。

最終跟著[這篇](https://www.ptt.cc/bbs/Storage_Zone/M.1456323159.A.D51.html)：

bcdboot c:\windows /s c:終於成功建立的開機檔案。

今天中秋節，本來想說很快就能搞定，所以女朋友就跟來 lab 看我灌，結果一個悲劇 Ubuntu 18.04 沒灌成功，連眾多資料的 Windows 10 都無法開機，HDD 重開機跟安裝作業系統真的慢到一個靠腰，搞了 9 個小時才救回 Windows BCD（對女友感到非常的抱歉），絕望到想跑路。
