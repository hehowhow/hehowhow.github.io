---
permalink: /blog/
title: "Blog"
excerpt: "博文列表"
author_profile: true
---

# 📝 Blog

按时间倒序展示博文列表，点击标题可阅读全文。

<style>
/* 全屏时移除 prefix 产生的左边距，使内容与侧边栏对齐 */
.page--blog { margin-left: 0 !important; padding-left: 0 !important; }
.blog-archive { margin-left: 0 !important; padding-left: 0 !important; text-align: left !important; }
.blog-archive .archive__item { margin-left: 0 !important; padding-left: 0 !important; text-align: left !important; }
</style>

<div class="archive blog-archive">
{% for post in site.posts %}
  <div class="archive__item">
    <h3 class="archive__item-title">
      <a href="{{ post.url }}">{{ post.title }}</a>
    </h3>
    <p class="page__meta">{{ post.date | date: "%Y-%m-%d" }}</p>
  </div>
{% endfor %}
</div>

{% if site.posts.size == 0 %}
<p>暂无博文，敬请期待。</p>
{% endif %}
