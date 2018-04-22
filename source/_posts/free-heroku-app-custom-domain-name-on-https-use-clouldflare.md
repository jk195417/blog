---
title: 幫 Free Dyno Heroku App 自訂網址再透過 CloudFlare 加上 https
date: 2018-04-22 16:06:39
tags:
- heroku
- cloudflare
- ssl
- dns
- https
- free
toc: true
---

近年來資安漏洞頻傳，透過 http 明文傳送機敏資訊造成的傷害也早已不是什麼新聞了，替網站加上 https 是勢在必行。

{% asset_img https-green-lock.png %}
瀏覽器網址列旁的綠色鎖頭有沒有帶來一種安全的感覺。

# 如何免費得到 https 保護呢？

-   [Let's Encrypt](https://letsencrypt.org/) - 自行申請免費的 SSL
-   [CloudFlare](https://www.cloudflare.com/) - 與他人共用 CloudFlare 免費提供的 SSL

本次的目標網站是架設在 [Heroku](https://www.heroku.com/) 上的 Free Dyno 型應用程式，Free Dyno 其實已經有提供免費的 https 給預設的 `<app-name>.herokuapp.com`

<!-- more -->

{% asset_img default-herokuapp-ssl.png %}

但是如果想幫 Free dyno 類型的網站加上 SSL 支援，沒有辦法使用方法 1 的 Let's Encrypt 簽發憑證這個方式，只好透過方法 2 CloudFlare 來處理：

> 對於架在 Heroku 上的網站來說，把 free dyno 升級成 hobby dyno，就會附贈免費的 Heroku SSL，其實是最省時省力的 <https://blog.heroku.com/announcing-automated-certificate-management>

# 需要

-   一個 Free Dyno Heroku App
-   一個 Domain Name
-   註冊 CloudFlare

# 步驟

## Heroku 設定 Custom Domain

到 [Heroku Dashboard](https://dashboard.heroku.com) 選擇目標網站應用程式的 Setting 頁籤

{% asset_img heroku-app-setting.png %}

Domains and certificates 設定的地方點選 Add domain，填入你的網域

{% asset_img heroku-app-domain-setting.png %}

## CloudFlare 設定 DNS

到 [CloudFlare](https://www.cloudflare.com/a/add-site) 輸入你的網域

{% asset_img cloudflare-add-site.png %}

接者 CloudFlare 會去調出你的網域的 Nameserver 供應商的 DNS 設定

新增 `CNANE`，`Name` 填入子網域如 `www` 或根網域 `@`，`Value` 填入 Heroku 預設的網址 `<app-name>.herokuapp.com`。記得要讓要用的 Record 們的橘燈都亮起來喔。

{% asset_img cloudflare-dns-setting.png %}

>  根網域通常需要 A Record 填入 IP Address，Heroku App 提供的網址為浮動 IP，只能透過 Heroku 提供的網址用 CNAME flattening 動態指向過去，才能指定根網域。
>  CloudFlare 剛好有提供 [CNAME flattening](https://support.cloudflare.com/hc/en-us/articles/200169056-CNAME-Flattening-RFC-compliant-support-for-CNAME-at-the-root)，想要讓根網域直接對應到 Heroku app，新增 `CNANE`，`Name` 填入 `@`，`Value` 一樣填入 Heroku 預設的網址 `<app-name>.herokuapp.com`。

## CloudFlare 選擇方案 Free

{% asset_img cloudflare-free-plan.png %}

不解釋

## 更改網域 NS

把網域的 Nameservers 改成 CloudFlare 提供的 Nameservers（DNS 頁籤往下翻），這樣一來，剛剛在 CloudFlare 設定的 DNS 才會生效。

> NS 設成 CloudFlare：流量 -> CloudFlare -> Heroku

{% asset_img cloudflare-nameservers.png %}

到當初買網址的網域供應商平台上做設定，EX: Godaddy, Gandi.net, Namecheap, Hover ...

{% asset_img hover-edit-nameservers.png %}

以 Hover 為例

設定成功後會在 Overview 看到 `Status: Active` 如：

{% asset_img cloudflare-status.png %}

## 啟用 SSL

點 CloudFlare Crypto 頁籤，SSL 的部分 `Off` 設定為 `Full` 或 `Flexible`

**先說結論：選 `Full`**

{% asset_img cloudflare-ssl-setting.png %}

憑證通過需要一點時間，當看到 `Status Active Certificate` 恭喜你，已經能透過 https 訪問網址了!（通過的時間約15分至1天不等）

> 官方表示免費方案憑證發行等24小時都是正常情況，不想等就花錢啊，15分讓你上線。 <https://support.cloudflare.com/hc/en-us/articles/203267234-Can-I-speed-up-the-activation-of-the-free-SSL-option>

在本頁 Status 的地方可以看到目前憑證發行的進度。

> 進度順序：Initializing Certificate -> Authorizing Certificate -> Issuing Certificate -> Active Certificate

### 等 SSL 憑證發行太久

用 Chrome 瀏覽會噴錯誤訊息：
```
這個網站無法提供安全連線
<domain> 使用了不支援的通訊協定。
ERR_SSL_VERSION_OR_CIPHER_MISMATCH`
```
{% asset_img chrome-err.png %}

如果超過一天了憑證還是沒有發下來，你可以：

1.  檢查設定有沒有出錯 <https://support.cloudflare.com/hc/en-us/articles/200170566-Why-isn-t-SSL-working-for-my-site>
2.  CloudFlare > Select Website > Overview > Advanced > Delete，然後把 Nameservers 改回預設值，再重新跑一次 [CloudFlare 設定 DNS](## CloudFlare 設定 DNS)，等了三天 **親測有效!**
3.  到 Support 發票，然後到官方論壇 <https://community.cloudflare.com/t/ssl-delays-authorizing-certificate/3682> 求救，許多前輩的過關案例在此。

## 把 http 請求全部導向 https（選擇性）

**等憑證發下來在用**

CloudFlare > Select Website > Crypto > Always use HTTPS > On

{% asset_img cloudflare-always-use-https.png %}

# 參考資料

-   <https://devcenter.heroku.com/articles/custom-domains#configuring-dns-for-root-domains>
-   <https://support.cloudflare.com/hc/en-us/articles/205893698>
-   <https://robots.thoughtbot.com/set-up-cloudflare-free-ssl-on-heroku>
-   <https://support.cloudflare.com/hc/en-us/articles/203445970-What-does-SSL-Authorizing-mean-after-activating-free-Universal-SSL>
