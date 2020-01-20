---
title: Port 被佔用了？
date: 2019-06-11 10:43:21
thumbnail: port-is-already-in-used/i-will-find-you.jpg
categories:
  - 技術文章
tags:
  - kill
  - pid
---

有看過即刻救援嗎？我們只需要像史上最強老爸一樣，即可解決此問題。

這邊使用 port 3000 當做例子

<!-- more -->

# 找到它

```sh
# 列出 port 3000 的行程
lsof -i:3000
# 列出 port 3000 行程的 pid
lsof -t -i:3000
```

# 幹掉它

```sh
# 透過 pid 清除行程
kill $(lsof -t -i:3000)
# or 使用 -9 option
kill -9 $(lsof -t -i:3000)
```

> 使用 -9 option 的差異在於作業系統發送的中斷訊號不同。
