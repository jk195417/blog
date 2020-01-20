---
title: Heroku 上執行 Rails app 的定時任務（Scheduled Task）
date: 2019-06-11 16:00:11
toc: true
thumbnail: running-rails-scheduled-task-on-heroku/config.png
categories:
  - 技術文章
tags:
  - ruby
  - rails
  - heroku
---

一般 Rails app 的定時任務是把 `ActiveJob` 包成一個 `rake task` 並透過 `crontab` 執行。這種架構的適合用在分鐘級別以上的定時任務。

但是 Heroku 並沒有提供 `crontab` 指令，在 Heroku 上運行定時任務必須用到一個 addon：[Heroku Scheduler](https://devcenter.heroku.com/articles/scheduler)

### Heroku Scheduler

1. 到 Heroku App dashboard
2. Resouces 頁籤
3. 新增一個 Heroku Scheduler 的 addon
4. Add new job
5. 輸入指令 ，並設定執行頻率。這邊以每月 25 號寄送生日通知信為例 ( `rails mail:birth_notification` )，我設定頻率為每天，它每天都會檢查今天是不是 25 日，是則執行後面的指令

```sh
# every months 25th do this rake task
if [ "$(date +%d)" = 25 ]; then rails mail:birth_notification; fi
```

{% asset_img config.png %}

Heroku Scheduler 最小只提供間距為 10 分鐘級別的定時任務，若要更精細，只能使用應用層級的定時排程了例如:

- <https://github.com/mperham/sidekiq/wiki/Scheduled-Jobs>
- <https://github.com/moove-it/sidekiq-scheduler>
- <https://github.com/ondrejbartas/sidekiq-cron>
