# Hong Xin's Blog

部落格用 [hexo](https://github.com/hexojs/hexo) 搭建
主題為 [hexo-theme-icarus](https://github.com/ppoffice/hexo-theme-icarus)
部屬於 Github Pages 上：<https://blog.yang-hong-xin.com>

## Usage

需要 Node.js 22 以上（建議使用 `.nvmrc` 指定的版本）

啟動 localhost server

```bash
npm install
npm start
```

連同草稿一起預覽

```bash
npm run start:draft
```

產生靜態檔案

```bash
npm run build
```

## Deployment

push 到 `main` 後，GitHub Actions 會自動 build 並部屬至 `gh-pages` branch。

也可以在本機手動部屬

```bash
npm run deploy
```
