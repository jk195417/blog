---
title: 在 Mac 上 安裝 Docker for Mac
tags:
  - docker
  - mac
toc: true
thumbnail: install-docker-on-mac/docker-app-drag.png
categories:
  - 技術文章
date: 2020-03-29 23:58:39
---


## Install

目前 [Docker for Mac](https://docs.docker.com/docker-for-mac/) 最方便的安裝方法就是使用 [Homebrew Cask](https://github.com/Homebrew/homebrew-cask/blob/master/Casks/docker.rb) 安裝，打開 Terminal，輸入：

```sh
brew cask install docker
```

{% asset_img 'brew-cask-install-docker.png' %}

安裝成功後打開 `Docker.app`

{% asset_img 'first-open-docker-app.png' %}

第一次打開時會需要你的作業系統密碼，安裝額外的套件，提供完整的功能

{% asset_img 'first-open-docker-app-2.png' %}

當安裝完成後，我們就能在右上角的工具欄看到鯨魚 🐳 icon

<!-- more -->

打開 Docker dashboard 看看，嗯，目前是空的，沒有任何的 container 在執行

{% asset_img 'docker-dashboard.png' %}

---

## Run

接著執行一個 Redis 的 container 作為我們的 hello world

```sh
docker run -d --name redis redis
```

`-d` 背景執行此 container，`--name redis` 將此 container 命名為 redis

{% asset_img 'docker-run-redis.png' %}

`Unable to find image 'redis:latest' locally` 因此它自動從 [Docker Hub](https://hub.docker.com/) pull 一個最新的 Redis image 下來，做成 container 執行

看看電腦上有哪些 docker images 吧

```sh
docker image ls
```

{% asset_img 'docker-image-ls.png' %}

現在電腦上有 Redis 的 image 了

接著檢查一下 有哪些 container 正在執行吧

```sh
docker container ls
```

{% asset_img 'docker-container-ls.png' %}

可以看到剛剛安裝的 Redis container 正在執行中

也可以從 Docker dashboard 的 GUI 確認

{% asset_img 'docker-dashboard-2.png' %}

至此我們就 onboard Docker 囉

## References

- <https://docs.docker.com/docker-for-mac/install/>
- <https://github.com/Homebrew/homebrew-cask/blob/master/Casks/docker.rb>
- <https://yeasy.gitbooks.io/docker_practice/install/mac.html>
