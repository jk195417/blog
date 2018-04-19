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

先 Fork <https://github.com/litten/hexo-theme-yilia> 到 <https://github.com/jk195417/hexo-theme-yilia>

添加成 git submodule 到專案的 `themes/yilia`

```bash
$ git submodule add https://github.com/jk195417/hexo-theme-yilia.git themes/yilia
```

安裝 yilia 的相依

```bash
$ yarn add hexo-generator-json-content
```

`_config.yml` 加上

```yaml
theme: yilia

# yilia
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
