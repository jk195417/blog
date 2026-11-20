/* global hexo */
'use strict';

// Helpers for the calendar theme: reading time, a minute-stamped table of
// contents ("本頁行程"), and the post dates the month calendar marks.

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];
const MONTHS = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];

function plain(html) {
  return String(html || '')
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ');
}

// About 400 CJK characters or 200 English words a minute.
function minutesOf(html) {
  const text = plain(html);
  const cjk = (text.match(/[㐀-鿿豈-﫿]/g) || []).length;
  const words = (text.replace(/[㐀-鿿豈-﫿]/g, ' ').match(/[A-Za-z0-9]+/g) || []).length;
  return cjk / 400 + words / 200;
}

hexo.extend.helper.register('cal_read_minutes', function (post) {
  return Math.max(1, Math.round(minutesOf(post.content)));
});

hexo.extend.helper.register('cal_weekday', function (date) {
  return '星期' + WEEKDAYS[date.day()];
});

hexo.extend.helper.register('cal_month_name', function (date) {
  return MONTHS[date.month()] + '月';
});

hexo.extend.helper.register('cal_pad', function (n) {
  return String(n).padStart(2, '0');
});

// Headings of the post (h2, or h3 when there are none), each with the minute
// of reading at which its section starts.
hexo.extend.helper.register('cal_schedule', function (post) {
  const html = String(post.content || '');
  const level = /<h2[\s>]/i.test(html) ? 2 : 3;
  const re = new RegExp(`<h${level}[^>]*id="([^"]+)"[^>]*>([\\s\\S]*?)<\\/h${level}>`, 'gi');
  const items = [];
  let match;
  while ((match = re.exec(html))) {
    items.push({
      id: match[1],
      text: plain(match[2]).replace(/\s+/g, ' ').trim(),
      minute: Math.floor(minutesOf(html.slice(0, match.index))),
    });
  }
  return items;
});

// Every post date, for the client-side month calendar.
hexo.extend.helper.register('cal_post_days', function () {
  const { url_for } = this;
  return JSON.stringify(
    this.site.posts
      .sort('-date')
      .map((post) => ({ d: post.date.format('YYYY-MM-DD'), t: post.title, u: url_for(post.path) }))
  );
});

// Posts published on the same day as the given one.
hexo.extend.helper.register('cal_same_day', function (post) {
  const day = post.date.format('YYYY-MM-DD');
  return this.site.posts.filter((p) => p._id !== post._id && p.date.format('YYYY-MM-DD') === day).toArray();
});

// Index pages for /categories/ and /tags/, which Hexo does not generate itself.
hexo.extend.generator.register('calendar_term_lists', function () {
  return [
    { path: 'categories/index.html', layout: ['categories'], data: { title: '分類', __term_list: 'categories' } },
    { path: 'tags/index.html', layout: ['tags'], data: { title: '標籤', __term_list: 'tags' } },
  ];
});
