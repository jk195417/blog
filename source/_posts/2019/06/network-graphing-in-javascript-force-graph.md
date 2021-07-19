---
title: Network graphing in JavaScript - force-graph
date: 2019-06-11 16:32:05
toc: true
thumbnail: network-graphing-in-javascript-force-graph/3d-graph.png
categories:
  - 技術文章
  - 碩論
tags:
  - javascript
  - graph
  - data visualization
---

分析網路關係，並將資料視覺化，最常見的就是 network graph。

# 常見套件

- <https://github.com/vasturiano/3d-force-graph>  
   本文主角，支援 3D 與圖互動。
- <https://github.com/vasturiano/force-graph>  
   本文主角，支援與圖互動。
- <https://github.com/jacomyal/sigma.js>  
   文檔寫在程式碼與範例中，需要參考它的範例原始碼。將圖展開可以使用它提供的 plugin [forceAtlas2](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.layout.forceAtlas2 "sigma.layout.forceAtlas2")，與圖互動需要自己 coding 擴充。
- <https://github.com/cytoscape/cytoscape.js>  
   提供許多範例可以參考。
- <https://github.com/almende/vis>  
   不只做 network graph，可上[官網](http://visjs.org/network_examples.html)參考範例。
- <https://github.com/davidpiegza/Graph-Visualization>  
   支援 3D，文檔並不齊全，需要參考它的[範例原始碼](https://github.com/davidpiegza/Graph-Visualization/tree/master/examples)

<!-- more -->

# 最易用的套件

[force-graph](https://github.com/vasturiano/force-graph) 當之無愧，因為它幫我們跳過了底層 canvas / three 繁瑣的設置，也預設了展開圖中各點的演算法 [DAG](https://en.wikipedia.org/wiki/Directed_acyclic_graph) ，開發者只需要指定要畫在哪個 html dom 上，輸入 data 就能見到一張漂亮的圖，若是要客製化某些功能，也能透過其提供的 API 設置顏色事件等等。

{% asset_img 3d-graph.png %}

詳細的 API 請見：

<https://github.com/vasturiano/force-graph>
<https://github.com/vasturiano/3d-force-graph>

# 範例

<https://codepen.io/aaron1995/pen/VNJZZE>
