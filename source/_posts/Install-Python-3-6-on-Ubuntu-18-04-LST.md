---
title: 為 Ubuntu 18.04 LST 安裝 Python 3.6
date: 2019-03-13 12:42:13
categories:
- 技術文章
tags:
- python 3
- ubuntu
---

原則上，Ubuntu 18.04.1 LTS 已經內建 Python 3 了，保險起見先檢查一下：

```sh
sudo apt update
sudo apt upgrade
python3 -v
```

此時的 Python 的版本應有 3.6 以上，我的版本為 3.6.7。

# 安裝 pip 3

<!-- more -->

接著安裝 Python 的套件管理模組 pip，和一些常用的開發工具：

```sh
sudo apt install python3-pip
sudo apt install build-essential libssl-dev libffi-dev python3-dev
```

# 安裝 Python 3 Virtual Environment

Virtual Environment 可以把特定的 Python 套件安裝在此環境下，避免全域安裝，搞亂系統的 Python 環境：

```bash
sudo apt install python3-venv
```

設置虛擬環境：

```sh
mkdir ~/py3venv
cd ~/py3venv
python3 -m venv pip_set
```

此時會建立一個資料夾位於 `~/py3venv/pip_set/`，接著使用下列指令開關虛擬環境：

```sh
# 啟用 dcard_crawler 這個 virtual environment
source ~/py3venv/pip_set/bin/activate
# 關閉
deactivate
```
