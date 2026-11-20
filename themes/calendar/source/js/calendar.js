// 日曆紙: today's date in the header, the flippable month calendar,
// the reading-schedule highlight, and click-to-load Disqus.
(function () {
  'use strict';

  var WEEK = ['日', '一', '二', '三', '四', '五', '六'];
  var MONTH = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
  var now = new Date();
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var key = function (y, m, d) { return y + '-' + pad(m + 1) + '-' + pad(d); };
  var todayKey = key(now.getFullYear(), now.getMonth(), now.getDate());

  // Header: today's date.
  var text = document.querySelector('[data-today-text]');
  if (text) text.textContent = '今天是 ' + now.getFullYear() + ' 年 ' + (now.getMonth() + 1) + ' 月 ' + now.getDate() + ' 日 星期' + WEEK[now.getDay()];
  var day = document.querySelector('[data-today-day]');
  if (day) day.textContent = pad(now.getDate());

  // Month calendar.
  var days = {};
  try {
    JSON.parse(document.getElementById('post-days').textContent).forEach(function (p) {
      (days[p.d] = days[p.d] || []).push(p);
    });
  } catch (e) { /* no data: an empty calendar still renders */ }
  var months = Object.keys(days).map(function (d) { return d.slice(0, 7); }).sort();
  var first = months[0];
  var last = months[months.length - 1];

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }

  document.querySelectorAll('.month[data-month]').forEach(function (box) {
    var parts = box.getAttribute('data-month').split('-');
    var y = +parts[0];
    var m = +parts[1] - 1;
    var mark = box.getAttribute('data-mark');
    var grid = box.querySelector('[data-month-grid]');

    function render() {
      var ym = y + '-' + pad(m + 1);
      box.querySelector('[data-month-label]').textContent = MONTH[m] + '月';
      box.querySelector('[data-year-label]').textContent = y;
      box.querySelector('[data-flip="-1"]').disabled = !first || ym <= first;
      box.querySelector('[data-flip="1"]').disabled = !last || ym >= last;
      var html = WEEK.map(function (w) { return '<span class="h">' + w + '</span>'; }).join('');
      var start = new Date(y, m, 1).getDay();
      var count = new Date(y, m + 1, 0).getDate();
      for (var i = 0; i < start; i++) html += '<span></span>';
      for (var d = 1; d <= count; d++) {
        var k = key(y, m, d);
        var cls = [];
        if ((start + d - 1) % 7 === 0) cls.push('su');
        if (k === mark) cls.push('on');
        if (k === todayKey) cls.push('td');
        var posts = days[k];
        if (posts) {
          cls.push('p');
          var title = posts.map(function (p) { return p.t; }).join('\n');
          html += '<a class="' + cls.join(' ') + '" href="' + esc(posts[0].u) + '" title="' + esc(title) + '" aria-label="' + (m + 1) + ' 月 ' + d + ' 日：' + esc(title) + '">' + d + '</a>';
        } else {
          html += '<span class="' + cls.join(' ') + '">' + d + '</span>';
        }
      }
      grid.innerHTML = html;
    }

    box.querySelectorAll('[data-flip]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var step = +btn.getAttribute('data-flip');
        // Jump to the nearest month that has posts in that direction.
        var ym = y + '-' + pad(m + 1);
        var target = step > 0
          ? months.filter(function (x) { return x > ym; })[0]
          : months.filter(function (x) { return x < ym; }).pop();
        if (!target) return;
        y = +target.slice(0, 4);
        m = +target.slice(5, 7) - 1;
        render();
      });
    });
    render();
  });

  // Reading schedule: highlight the section being read.
  var links = Array.prototype.slice.call(document.querySelectorAll('[data-toc]'));
  if (links.length) {
    var heads = links.map(function (a) { return document.getElementById(a.getAttribute('data-toc')); }).filter(Boolean);
    var queued = false;
    var update = function () {
      queued = false;
      var current = heads[0];
      heads.forEach(function (h) { if (h.getBoundingClientRect().top < 120) current = h; });
      links.forEach(function (a) { a.classList.toggle('on', !!current && a.getAttribute('data-toc') === current.id); });
    };
    window.addEventListener('scroll', function () {
      if (!queued) { queued = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  // Disqus only loads when asked, so the page stays light.
  var thread = document.getElementById('disqus_thread');
  var load = thread && thread.querySelector('.load-comments');
  if (load) {
    load.addEventListener('click', function () {
      window.disqus_config = function () {
        this.page.url = thread.getAttribute('data-url');
        this.page.identifier = thread.getAttribute('data-id');
      };
      load.remove();
      var s = document.createElement('script');
      s.src = 'https://' + thread.getAttribute('data-shortname') + '.disqus.com/embed.js';
      s.setAttribute('data-timestamp', String(+new Date()));
      document.body.appendChild(s);
    });
  }
})();
