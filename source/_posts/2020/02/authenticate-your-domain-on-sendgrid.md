---
title: 在 SendGrid 上驗證你的網域
tags:
  - sendgrid
  - email
  - dns
toc: true
thumbnail: authenticate-your-domain-on-sendgrid/which-domain.png
categories:
  - 技術文章
date: 2020-02-02 22:00:18
---


## 前言

以 SendGrid 寄送 email 時，若無進行網域驗證，有些信箱會在寄件者後面帶上一個後綴提示使用者，這封 email 實際的寄送網域為何，因此會多一個**透過 sendgrid.me**的後綴 ，如

{% asset_img send-via-other-domain.png %}

這表示寄件者與實際寄送 email 的網域不同，見 <https://support.google.com/mail/answer/1311182>

<!-- more -->

---

## 移除警示

要如何將這個警示後綴拿掉呢？驗證網域，常見的方法有設定，見 <https://support.google.com/mail/answer/180707>

1. DKIM
2. SPF

而 SendGrid 有提供第三種選擇，設定 `CNAME`，本篇將依照 SendGrid 的[官方文件](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-domain-authentication/#setting-up-domain-authentication)將設置步驟記錄下來

---

### 在 SendGrid 上提出 domain 驗證的請求

登入 [SendGrid](https://app.sendgrid.com/)，我是透過 Heroku SSO 登入。

選擇側邊欄的 **Setting** > **Sender Authentication**

{% asset_img sendgrid-sidebar.png %}

選擇你 domain 的 DNS host 在哪，例如我的 **caten-church.org** host 在 CloudFlare 上，我就選 CloudFlare

{% asset_img select-your-dns-host.png %}

接著填入你的網域

{% asset_img which-domain.png %}

---

### 新增 DNS 的 CNAME

這時 SendGrid 會跳出 3 組 CNAME 的 name 與 value

{% asset_img cnames.png %}

將其加入你的 DNS record 中

{% asset_img setting-cnames.png %}

---

### 通過 SendGrid 的驗證

接著回到 SendGrid 按下 **Verify**

{% asset_img verify-domain.png %}

驗證成功！

{% asset_img domain-authenticated.png %}

只要驗證完成後，收件人收到 SendGrid 替你送出的 email 就不會有 **via sendgrid.net** 等警示在寄件人後面了
