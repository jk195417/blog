---
title: 手把手帶你使用 baidu-aip 的情緒分析服務
date: 2019-06-11 17:19:47
toc: true
thumbnail: chinese-sentiment-analysis-using-baidu-aip-service/login.png
categories:
  - 技術文章
  - 碩論
tags:
  - baidu
  - sentiment
  - nlp
---

Google 的自然語言處理雖然非常的強大，但是中文的情緒分析並非他的強項，目前中文的自然語言處理研究出處非常多是出於中國大陸，所以當需要用到中文的情緒分析時， [百度 AI 開放平台](https://ai.baidu.com/) 就成為我們的首選啦。

平台目前的收費非常的便宜，例如本次介紹的 **情感傾向分析接口**，提供了 **5QPS** 免費額度，每秒免費請求 5 次超佛心的啊！根本就相當於不用錢。

> 注意！要註冊百度帳號必須要有 +86 開頭的中國手機門號喔。

使用百度 AI 開放平台的情緒分析服務很簡單，步驟就 4 個。

1. 註冊帳號
2. 創建 **自然語言處理** 應用
3. 獲取 `access_token`
4. 使用 **情感傾向分析接口**

<!-- more -->

# 註冊帳號

需要 **中國手機門號** 作認證

{% asset_img login.png %}

註冊成功後完成信箱驗證，即可開始使用百度 AI 開放平台的服務啦。

* * *

# 創建自然語言處理應用

{% asset_img nav.png %}

從左邊的導覽列選擇，產品服務 > 人工智能 > 自然語言處理，就能來到自然語言處理應用程式的管理介面。

{% asset_img dashboard.png %}

點選創建應用

{% asset_img new-app.png %}

勾選想使用的服務，填入應用程式的描述。

{% asset_img keys.png %}

待會會使用到 `API Key`與 `Secret Key`，把它記起來並小心保管，這就相當是使用此服務的帳號密碼囉。

* * *

# 獲取 access_token

`access_token`有效期為 1 個月，過期就得再次索取。

`POST` 到 <https://aip.baidubce.com/oauth/2.0/token>

- `grant_type` 值填 `grant_type`
- `client_id` 值填你的 `api_key`
- `client_secret` 值填你的 `secret_key`

以 curl 為例

```sh
curl -i -X POST "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=your_api_key&client_secret=your_secret_key"
```

索取 `access_token` 成功會得到回應：

```json
{  
  "refresh_token": "25.b55fe1d287227ca97aab219bb249b8ab.315360000.1798284651.282335-8574074",  
  "expires_in": 2592000,  
  "scope": "public wise_adapt",  
  "session_key": "9mzdDZXu3dENdFZQurfg0Vz8slgSgvvOAUebNFzyzcpQ5EnbxbF+hfG9DQkpUVQdh4p6HbQcAiz5RmuBAja1JJGgIdJI",  
  "access_token": "24.6c5e1ff107f0e8bcef8c46d3424a0e78.2592000.1485516651.282335-8574074",  
  "session_secret": "dfac94a3489fe9fca7c3221cbf7525ff"  
}
```

錯誤會看見這個：

```json
{  
    "error": "invalid_client",  
    "error_description": "unknown client id"  
}
```

> 參考 <http://ai.baidu.com/docs#/Auth/top>

# 使用情感傾向分析接口

`POST` 到 <https://aip.baidubce.com/rpc/2.0/nlp/v1/sentiment_classify>

- HTTP header `Content-Type` 用 `application/json`
- `access_token` 填入你的 `access_token`
- `charset` 填入 `UTF-8`
- HTTP body 帶一個 json：

```json
{  
  "text": "你想要分析的文字，最多能帶2048個字元"  
}
```

以 curl 為例

```sh
curl -i -X POST -H "Content-Type: application/json" -d '{"text" : "剛剛那家餐廳蠻好吃的，我們下次再約個時間來吃第二次吧！"}' "https://aip.baidubce.com/rpc/2.0/nlp/v1/sentiment_classify?charset=UTF-8&access_token=your_access_token"
```

就能收到情緒分析啦

```json
{  
  "log_id": 4703034185884062249,  
  "text": "剛剛那家餐廳蠻好吃的，我們下次再約個時間來吃第二次吧！",  
  "items": [  
    {  
      "positive_prob": 0.566052,
      "confidence": 0.0356713,
      "negative_prob": 0.433948,
      "sentiment": 2
    }  
  ]  
}
```

> 參考 <https://ai.baidu.com/docs#/NLP-Apply-API/955c17f6>
