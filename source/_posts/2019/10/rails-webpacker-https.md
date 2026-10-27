---
title: 'Rails Webpacker 的 HTTPS 設定'
date: 2019-10-08 14:49:32
toc: true
thumbnail: rails-webpacker-https/image-1.png
categories:
  - 技術文章
tags:
  - webpack-dev-server
  - https
  - rails
  - webpacker
  - ssl
---

> 本文原發表於 [Medium](https://medium.com/%E4%BA%BA%E7%94%9F%E6%AF%94%E5%AF%AB-code-%E9%9B%A3%E4%B8%80%E9%BB%9E%E9%BB%9E/rails-webpacker-%E7%9A%84-https-%E8%A8%AD%E5%AE%9A-104d8ae7ee9)，2026-10-27 搬移至此。

#### 到底誰沒事會在開發環境用上 HTTPS Part 2

{% asset_img image-1.png %}

[**Rails 6.0**](https://edgeguides.rubyonrails.org/6_0_release_notes.html) 後 [**Webpacker**](https://github.com/rails/webpacker) 已經取代 [Asset Pipeline](https://github.com/rails/sprockets-rails)成為預設的前端打包方案，安裝方法 Webpacker Github 上的 README 有很詳盡的說明：

[rails/webpacker](https://github.com/rails/webpacker)

上一篇文章中，介紹了如何在 Rails development 環境中使用 HTTPS 連線至 localhost server，並啟用 [**HSTS**](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security)。

{% post_link enable-https-in-rails-development %}

此時用預設的 config/webpacker.yml 下去啟用 webpack-dev-server，**其**編譯後的 JavaScript 依然以 HTTP 提供。

但 Rails server 的 HSTS 設定會把  
[http://localhost:3000/packs/js/application-2be7c5d587f23021bfe9.js](https://localhost:3000/packs/js/application-2be7c5d587f23021bfe9.js)   
轉換成請求  
<https://localhost:3000/packs/js/application-2be7c5d587f23021bfe9.js>   
這下就發生找不到資源的錯誤了：

```
GET https://localhost:3000/packs/js/application-2be7c5d587f23021bfe9.js net::ERR_ABORTED 500 (Internal Server Error)  
localhost/:10
Failed to load resource: the server responded with a status of 500 (Internal Server Error)  
application-2be7c5d587f23021bfe9.js:1
Rack app error handling request { GET /packs/js/application-47a01f2c35f03c5131aa.js }  
#<EOFError: end of file reached># ORPuma caught this error: end of file reached (EOFError)
# OR
GET https://localhost:3035/sockjs-node/info?t=1570436376957 net::ERR_SSL_PROTOCOL_ERROR  
sockjs.js:1796
Failed to load resource: net::ERR_SSL_PROTOCOL_ERROR  
:3035/sockjs-node/info?t=1570436373828:1
```

### webpack-dev-server

#### 啟用 HTTPS

修改 config/webpacker.yml 將 **development.dev\_server.https** 設為 **true**

{% asset_img image-2.png %}

config/webpacker.yml

重啟 rails server 與 ./bin/webpacker-dev-server 後，還是**錯的！**

```
# HTTPS 憑證錯誤
Failed to load resource: net::ERR_CERT_AUTHORITY_INVALID  
:3035/sockjs-node/info?t=1570452520941:1
GET https://localhost:3035/sockjs-node/info?t=1570452524158 net::ERR_CERT_AUTHORITY_INVALID
```

#### 指定憑證

webpack-dev-server 指定憑證的方式可以看

[DevServer | webpack](https://webpack.js.org/configuration/dev-server/#devserverhttps)

在{% post_link enable-https-in-rails-development %}我們將 [mkcert](https://github.com/FiloSottile/mkcert) 自簽的憑證放在 config/ssl/ 下，於是我們必須修改 config/webpacker.yml 指定 **development.dev\_server.https.cert 與 development.dev\_server.https.key** 使用憑證，如下：

{% asset_img image-3.png %}

config/webpacker.yml

你以為成功了嗎？重啟 rails server 與 ./bin/webpacker-dev-server 後，還是**錯的！**

原因在於 4.0.7 版的 [**Webpacker**](https://github.com/rails/webpacker) 忽略了我們傳入的 https 參數，只 care 是否為 true。

[./bin/webpack-dev-server command line arguments are ignored · Issue #2000 · rails/webpacker](https://github.com/rails/webpacker/issues/2000)

直到這個 PR 才修正了這個錯誤。

[coerce https yaml config to boolean by hwhelchel · Pull Request #2251 · rails/webpacker](https://github.com/rails/webpacker/pull/2251/files)

因此，我們至少需要指定 Gem Webpacker 版本號到 commit [d577bab](https://github.com/rails/webpacker/commit/d577babc0b6c045f0db0bec9993b11148d4226b0) 以後，直到 4.0.8 版釋出：

```
# Gemfile
gem "webpacker", git: 'https://github.com/rails/webpacker.git', ref: 'd577bab'
```

bundle 安裝更新套件，重啟 rails server 與 ./bin/webpacker-dev-server 後，就能成功囉！

但如果你的 Content Security Policy 像我一樣設定錯誤，忘了加上 **https://** 與 **wss://** 的話，我只能說：「革命尚未成功，同志仍需努力。」

```
# Content Security Policy 設定錯誤
Refused to connect to 'wss://localhost:3035/sockjs-node/661/ghika1m3/websocket' because it violates the following Content Security Policy directive: "connect-src 'self' https: http://localhost:3035 ws://localhost:3035".  
sockjs.js:1887
```

#### 設定 Content Security Policy

到 config/initializers/content\_security\_policy.rb 下  
添加**https://localhost:3035** 與 **wss://localhost:3035** 到 **policy.connect\_src** 中：

{% asset_img image-4.png %}

這下總算是成功在 development 環境下全面啟用 SSL 囉！

有人問我說為何我不直接把成功的設定分享給讀者，要帶著讀者一起錯過來，原因有三：

1. 這樣讀者能夠理解是哪個部分導致錯誤
2. 把常遇到的相關錯誤記錄下來，方便同踩此坑的兄弟們 Google
3. 我花了 6 個小時 debug，你們直接過，我心裡不平衡啦
