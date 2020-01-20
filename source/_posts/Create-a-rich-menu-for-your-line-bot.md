---
title: 來為你的 Line bot 加上一個圖文選單吧！
date: 2019-06-11 17:58:53
toc: true
thumbnail: create-a-rich-menu-for-your-line-bot/dashboard.png
categories:
  - 技術文章
tags:
  - line
  - rich menu
  - chatbot
  - 彈幕教室

---

拖了好久，終於有時間幫 [彈幕教室](https://line.me/R/ti/p/%40kls1180p) chatbot 裝個圖文選單啦，照著 [官方教學](https://developers.line.biz/en/docs/messaging-api/using-rich-menus/) 做其實就沒問題囉，但還是把實作的過程紀錄下來備忘。

順便打個廣告 <https://github.com/danmu-classroom/danmu-classroom-screen>，彈幕教室客戶端，下載即用免安裝，可以透過 Line 發送彈幕到螢幕上，歡迎來玩看看喔。

{% asset_img danmu-classroom-rich-menu.jpg %}

我的 rich menu  長這樣

<!-- more -->

我們以 Messaging API 建立圖文選單時，需要能發送 http request 的工具， curl / Postman / Insomnia 選其中一個順手的用就好，待會的例子會附上 Insomnia 的畫面截圖。

# 摘要

前置任務：取得 channel access token

1. 建立 rich menu ([文件](https://developers.line.biz/en/reference/messaging-api/#create-rich-menu))
2. 上傳圖片 ([文件](https://developers.line.biz/en/reference/messaging-api/#upload-rich-menu-image))
3. 設定預設的 rich menu ([文件](https://developers.line.biz/en/reference/messaging-api/#set-default-rich-menu))

就這樣，懶得看文件的有福了，看我這篇就好。

# 取得 channel access token

登入 [Line Developers](https://developers.line.biz/en/)，進入你的 chat bot 管理介面，**Channel setting** 頁籤滑到 **Messaging settings**，把 token 複製起來等等會用到。

{% asset_img dashboard.png %}
{% asset_img token.png %}

# 建立 rich menu

API 是 `POST https://api.line.me/v2/bot/richmenu`

Auth 方法選擇 `Bearer Token`

TOKEN 處填入你的 channel access token，Request body 選 `JSON`

{% asset_img create-richmenu-1.png %}
{% asset_img create-richmenu-2.png %}

接著 Request body 填入下面的 JSON：

`size` 有兩種能選，`2500 * 843` 或是 `2500 * 1686`

`select` 設成 `true` 的話會預設展開圖文選單

`chatBarText` 的文字會顯示在

{% asset_img chat-bar-text.jpeg %}

`areas[0].bonuds` 定義按鈕區域，`areas[0].action` 定義按下去的行為

> 特別注意圖文選單的左上角座標 x, y = 0, 0 ，並非以左下角為原點

送出 request 後，會回傳一個 `richMenuId`

{% asset_img richmenu-id.png %}

等等會用到複製起來。

# 上傳圖片

API 是 `POST https://api.line.me/v2/bot/richmenu/{richMenuId}/content`

**richMenuId** 填剛剛拿到的 `richMenuId`

> 只支援  `.jpg` or `.png`

Auth 一樣是 `Bearer Token`，Body 這次選 `File`，點 **Choose File** 選擇圖片，跳出詢問更改 Header 的提示，點 **Yes**，然後送出 request

{% asset_img create-richmenu-3.png %}
{% asset_img create-richmenu-4.png %}

# 設定預設的 rich menu

API 是 `POST https://api.line.me/v2/bot/user/all/richmenu/{richMenuId}`

`richMenuId` 一樣，Auth 也一樣是 `Bearer Token`，這次 Body 留空就好，送出後就完成啦。

{% asset_img create-richmenu-5.png %}

有 rich menu 的 chat bot 感覺更厲害了呢！

{% asset_img danmu-classroom-chatbot.jpeg %}
