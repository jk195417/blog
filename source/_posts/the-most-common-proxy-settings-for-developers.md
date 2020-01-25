---
title: Developer 最常用的 Proxy 設定
date: 2020-01-25 18:30:00
toc: true
categories:
  - 技術文章
tags:
  - proxy
---

本文整理了`系統環境變數`、 `git`、`curl`、`wget`、`npm`、`bundler`、`nuget`、`brew`、`apt` 與 `chocolatey` 等多種下載工具的 proxy 設定。

## 前言

當公司有做網路控管時，對外的網路請求通常需要經由  proxy server  轉送，對內或  localhost  的可以不需要，要也沒關係就是要繞一圈比較慢。

接下來我們將用 **<http://proxy.company.com:80>**  這個  proxy server  為例，示範如何設置其他工具的 proxy。

<!-- more -->

## 系統環境變數 environment

| 變數       | 值                                |
| ---------- | -------------------------------- |
| PROXY      | <http://proxy.company.com:80>    |
| HTTP_PROXY | <http://proxy.company.com:80>    |
| HTTPS_PROXY| <http://proxy.company.com:80>    |
| ALL_PROXY  | <http://proxy.company.com:80>    |
| NO_PROXY   | localhost,127.0.0.1,.company.com |
| proxy      | <http://proxy.company.com:80>    |
| http_proxy | <http://proxy.company.com:80>    |
| https_proxy| <http://proxy.company.com:80>    |
| all_proxy  | <http://proxy.company.com:80>    |
| no_proxy   | localhost,127.0.0.1,.company.com |

### Windows

**控制台** > **系統及安全性** > **系統** > **進階系統設定** > **進階** > **環境變數** > **系統變數** > **新增**

### Ubuntu

在  `~/.profile`  中新增

```sh
PROXY="http://proxy.company.com:80"
NO_PROXY="localhost,127.0.0.1,.company.com"
export PROXY=$PROXY
export HTTP_PROXY=$PROXY
export HTTPS_PROXY=$PROXY
export ALL_PROXY=$PROXY
export NO_PROXY=$NO_PROXY
export proxy=$PROXY
export http_proxy=$PROXY
export https_proxy=$PROXY
export all_proxy=$PROXY
export no_proxy=$NO_PROXY
```

確保你使用的 shell，如 zsh，會在登入後  `source ~/.profile`

## git

下指令

```sh
git config --global http.proxy http://proxy.company.com:80
```

或是編輯 `.gitconfig`，位於

- Linux : `~/.gitconfig`
- Windows : `%USERPROFILE%\.gitconfig`

填入

```sh
[http]
  proxy = http://proxy.company.com:80
```

## curl

建議使用環境變數設定 `curl`，它預設會套用[環境變數](#系統環境變數-environment)，見[官方文件](https://ec.haxx.se/usingcurl/usingcurl-proxies#proxy-environment-variables)

或是編輯 `.curlrc`，位於

- Windows
  - `%APPDATA%\_curlrc`
  - `%USERPROFILE%\Application Data\_curlrc`
- Linux
  - `~/.curlrc`

填入

```sh
https_proxy=http://proxy.company.com:80
http_proxy=http://proxy.company.com:80
proxy=http://proxy.company.com:80
```

## wget

建議使用環境變數設定 `wget`，它預設會套用[環境變數](#系統環境變數-environment)，見[官方文件](https://www.gnu.org/software/wget/manual/html_node/Proxies.html))

或是編輯 `.wgetrc`，填入

```sh
use_proxy = on
https_proxy = http://proxy.company.com:80
http_proxy = http://proxy.company.com:80
no_proxy = localhost,127.0.0.1,.company.com
```

## npm

透過指令

```sh
npm config set https-proxy http://proxy.company.com:80
npm config set proxy http://proxy.company.com:80
npm config set noproxy localhost,127.0.0.1,.company.com
npm config set always-auth true
npm config set strict-ssl false
```

或是編輯 `.npmrc`，位於

- Windows : `%USERPROFILE%\.npmrc`
- Linux : `~/.npmrc`

## bundler

建議使用環境變數設定 `bundler`，它預設會套用[環境變數](#系統環境變數-environment)，見[官方文件](https://guides.rubygems.org/command-reference/#gem-environment)

或是編輯 gemrc，設定檔位於 `~/.gemrc`，填入

```yml
---
http_proxy: http://proxy.company.com:80
```

## nuget

建議使用環境變數設定 `nuget`，它預設會套用[環境變數](#系統環境變數-environment)，見[官方文件](https://docs.microsoft.com/zh-tw/nuget/reference/nuget-config-file#example-config-file)

透過命令列 or 編輯設定檔

```sh
nuget config -set http_proxy=http://proxy.company.com:80
nuget config -set no_proxy=localhost,127.0.0.1,.company.com
```

設定檔位於

- Windows
  - `%APPDATA%\NuGet\NuGet.Config`
  - `%USERPROFILE%\.nuget`
- Linux
  - `~/.nuget`

填入

```xml
<configuration>
  <config>
    <add key="http_proxy" value="http://proxy.company.com:80" />
    <add key="no_proxy" value="localhost,127.0.0.1,.company.com" />
  </config>
</configuration>
```

## brew

使用 `curl` 來取得軟體，因此需要設定的是 [curl](#curl)

## apt

建議使用環境變數設定 `apt`，它預設會套用[環境變數](#系統環境變數-environment)，見[官方文件](https://linux.die.net/man/5/apt.conf#http)

如需編輯設定檔，可至 `/etc/apt/apt.conf`，填入

```sh
Acquire::http::proxy "http://proxy.company.com:80";
```

注意！`apt` 會以環境變數 **http_proxy** 設定優先，所以當你有設定 http_proxy 後，`apt.conf` 內的設定就會被無視。

## chocolatey

建議使用環境變數設定 `chocolatey`，它預設會套用[環境變數](#系統環境變數-environment)，見[官方文件](https://chocolatey.org/docs/proxy-settings-for-chocolatey#existing-proxy-environment-variables)

透過指令設定 proxy

```sh
choco config set proxy http://proxy.company.com:80
choco config set proxyBypassList "'localhost,127.0.0.1,.company.com'"
```
