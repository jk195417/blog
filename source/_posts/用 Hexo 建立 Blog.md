---
title: 用 Hexo 建立 Blog
date: 2018-04-18 20:44:32
tags:
- 程式
- hexo
---

# 安裝 Hexo

```bash
$ yarn global add hexo-cli
```

建立 blog 專案

```bash
$ hexo init blog
```

# 主題設定

用 git submodule 管理主題，這裡使用 [yilia](https://github.com/litten/hexo-theme-yilia)

<!-- more -->

先 Fork <https://github.com/litten/hexo-theme-yilia> 到 <https://github.com/jk195417/hexo-theme-yilia>

添加成 git submodule 到專案的 `themes/yilia`

```bash
$ git submodule add https://github.com/jk195417/hexo-theme-yilia.git themes/yilia
```

修改`_config.yml`

```yaml
theme: yilia
```

# 安裝外掛

## hexo-generator-json-content

```bash
$ yarn add hexo-generator-json-content
```

`_config.yml` 加上

```yaml
# hexo-generator-json-content
jsonContent:
    meta: false
    pages: false
    posts:
      title: true
      date: true
      path: true
      text: false
      raw: false
      content: false
      slug: false
      updated: false
      comments: false
      link: false
      permalink: false
      excerpt: false
      categories: false
      tags: true
```

## hexo-generator-sitemap

```bash
$ yarn add hexo-generator-sitemap
```

`_config.yml` 加上

```yaml
sitemap:
  path: sitemap.xml
```

## hexo-generator-feed

```bash
$ yarn add hexo-generator-feed
```

`_config.yml` 加上

```yaml
feed:
  type: atom
  path: atom.xml
  limit: 20
```

再到 `themes/yilia/_config.yml` 修改
```yaml
subnav:
  rss: '/atom.xml'
```
