---
title: 好用的軟體 for Mac OSX （一般使用者）
date: 2018-04-30 16:32:02
toc: true
tags:
- mac
- free
- software
- brew
---

每個軟體會附上官網連結，有支援透過 [Homebrew](https://brew.sh/) 一行指令安裝的話會一起把指令附上。

# 前言

感謝家人在我升大學的那年，讓我買了這台 13" MacBook Air。年少無知，一開始買 MacBook 的原因真的是因為看起來很潮。

> 輕薄，高續航，順暢的使用者體驗等等優點都是矇到的。

網路上連文都沒爬，就下手買了個硬碟 256G，Ram 4G 的機型。

> 也就沒有看到各種無用的跑分數據，或是遊戲支援度超低這些缺點啦

好險當初只有做錯這麼一個選擇：Ram 沒升 8G。

萌新拿到電腦的第一件事居然是去圖書館翻 Mac 的使用說明書，結果誤觸 Xcode，程式生涯從此開始。

廢話完了，進入正題。

<!-- more -->

因為軟體實在是太多了，所以這裏分成 3 篇系列文章來說

# 導覽

{% post_link recommend-mac-softwares %}

[影音](#影音)                 | [音樂](#音樂)       | [繪圖](#繪圖)             | [遊戲](#遊戲)
------------------------------|---------------------|---------------------------|--------------------
[Popcorn Time](#Popcorn-Time) | [Spotify](#Spotify) | [Paintbrush](#Paintbrush) | [OpenEmu](#OpenEmu)
[IINA](#IINA)                 | [Vox](#Vox)         |                           | [PPSSPP](#PPSSPP)
[Shazam](#Shazam)             |                     |                           |

[通訊](#通訊)                         | [筆記](#筆記)           | [團隊溝通](#團隊溝通)
--------------------------------------|-------------------------|----------------------
[Telegram Desktop](#Telegram-Desktop) | [Bear](#Bear)         | [Slack](#Slack)
[Franz](#Franz)                       | [Evernote](#Evernote) | [Flowdock](#Flowdock)
[Station](#Station)                   |                         | [Jandi](#Jandi)                                  

好用的軟體 for Mac OSX （進階使用者）撰寫中...

-   遠端連線
-   輔助工具
-   系統管理

好用的軟體 for Mac OSX （程式設計師）撰寫中...

-   編輯器
-   資料庫
-   HTTP Client
-   套件管理
-   Git
-   文檔
-   虛擬機
-   終端機

# 影音

## Popcorn Time

<https://popcorntime.sh/>

透過 P2P 看電影，無廣告或病毒，操作便利。

{% asset_img popcorn-time.png %}

## IINA

<https://lhc70000.github.io/iina/>

```bash
$ brew cask install iina
```

現代化的影片播放器，基於 MPV，UI 簡潔。

{% asset_img iina.png %}

# 音樂

## Spotify

<https://www.spotify.com/>

```bash
$ brew cask install spotify
```

大家都知道的串流音樂，免費版聽個30分鐘左右會插個短短的廣告，還算可以接受，提供高音質的音樂，社群功能，協作播放清單這些已經非常優秀了，最令人驚豔的是其 **推薦系統**，除了能夠準確的推薦喜歡聽的曲風外，偶爾還會推薦些嚐鮮式的音樂，讓聽習慣這種風格的人還是能夠去嘗試發掘其他的還沒愛上的曲風。

{% asset_img spotify.png %}

## Vox

<https://vox.rocks/mac-music-player>

```bash
$ brew cask install vox
```

在 Mac 上放歌除了 Apple Music 使用者以外應該不會打開 itunes 吧，Vox 是個輕量音樂播放器，你看看開起來的流暢性，管理音樂存放的位置也相對的比較自由，讓音樂播放器回歸音樂播放器。

{% asset_img vox.png %}

## Shazam

<https://www.shazam.com/>

大名鼎鼎的歌曲辨識軟體，會在背景聆聽周遭音樂，辨識並且記錄下來是哪首曲子。建議 **沒有要用的時候就把它關掉** 吧，不然多增加能耗跟個人隱私的疑慮（背景收音）。

{% asset_img shazam.png %}

# 通訊

## Telegram Desktop

<https://desktop.telegram.org/>

```bash
$ brew cask install telegram-desktop
```

自由、技術力 Max、無敵的通訊平台，可惜的是在台灣還沒大紅大紫，缺點就是朋友還沒開始用的 Telegram，等你們都加入後就沒有缺點啦！
快來加我好友救我脫離邊緣人QQ <https://t.me/hong_xin>

{% asset_img telegram-desktop.png %}

## Franz

<https://meetfranz.com/>

```bash
$ brew cask install franz
```

{% asset_img franz.png %}

## Station

<https://getstation.com/>

```bash
$ brew cask install station
```

{% asset_img station.png %}


# 繪圖

## Paintbrush

<https://paintbrush.sourceforge.io/>

```bash
$ brew cask install paintbrush
```

修圖軟體 > Paintbrush > 預覽程式。有時候需要一些簡單的繪圖功能，又不想請出 Photoshop 之類的 **牛刀**，這種小畫家類型的軟體絕對是首選！

{% asset_img paintbrush.png %}

# 筆記

## Bear

<http://www.bear-writer.com/>

{% asset_img bear.png %}

## Evernote

<https://evernote.com/>

```bash
$ brew cask install evernote
```

{% asset_img evernote.png %}

# 團隊溝通

## Slack

<https://slack.com/>

```bash
$ brew cask install slack
```

{% asset_img slack.png %}

## Flowdock

<https://www.flowdock.com/>

```bash
$ brew cask install flowdock
```

{% asset_img flowdock.png %}

## Jandi

<https://www.jandi.com/landing/zh-tw>

```bash
$ brew cask install jandi
```

{% asset_img jandi.png %}

# 遊戲

## OpenEmu

<https://openemu.org/>

```bash
$ brew cask install openemu
```

管理遊戲與遊戲模擬器核心，可以透過這個軟體快速下載其他模擬器或一些開源遊戲。

{% asset_img openemu.png %}

## PPSSPP

<https://www.ppsspp.org/>

```bash
$ brew install ppsspp
```

PSP 模擬器，可以在 Mac 上順暢的玩 PSP 遊戲。

{% asset_img ppsspp.png %}
