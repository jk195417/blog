---
title: 為 Ubuntu 18.04 LTS 安裝 Nvidia GPU driver
date: 2019-03-11 20:12:50
categories:
- 技術文章
tags:
- nvidia gpu driver
- ubuntu
---
列出支援的顯示卡驅動：

```bash
ubuntu-drivers devices
```

我這邊使用 Nvidia GTX 1060 6G，當前的驅動版本為 415，若是列出的版本太舊(390)，請執行下面這行把 Nvidia Driver 加入 apt 的來源中：

```sh
sudo add-apt-repository ppa:graphics-drivers/ppa
sudo apt-get update
ubuntu-drivers devices
```

看看是否有更新的驅動程式版本可以使用。

<!-- more -->

接著安裝執行`ubuntu-drivers devices`所列出來 recommended 的驅動程式，安裝完畢後重新開機：

```sh
sudo apt install nvidia-driver-415
sudo apt install nvidia-settings
sudo reboot
```

檢查當前的顯示卡驅動：

```sh
nvidia-smi
```
