# Hong Xin's Blog

部落格用 [hexo](https://github.com/hexojs/hexo) 搭建
主題是放在 repo 裡的自製主題「日曆紙」（`themes/calendar`）：

- 首頁是最新一篇的日曆頁，其他文章是撕下來的舊頁；側邊月曆用圓點標出有發文的日子
- 文章 front-matter 可以加 `yi`（宜）和 `ji`（忌），各寫一句重點與提醒，不寫就不顯示
- 文章頁側邊的「本頁行程」是目錄，標出每一節大約從第幾分鐘開始讀
- 只有 front-matter 寫了 `updated:` 才會顯示更新日期
- 主題設定在 `themes/calendar/_config.yml`，站台自己的覆寫放在 `_config.calendar.yml`
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
