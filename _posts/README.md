# 博文目录说明

每篇博文使用**独立子文件夹**，便于管理 Markdown 与配图。

## 目录结构

```
_posts/
  <英文-slug>/              # 与下方 assets 中的 slug 保持一致
    YYYY-MM-DD-标题.md      # 博文正文（文件名必须以日期开头）

assets/images/posts/
  <英文-slug>/              # 该篇博文用到的图片放这里
    图1.png
```

## 为什么图片不放在 `_posts` 里？

Jekyll 默认**不会**把 `_posts` 下的非 Markdown 文件复制到生成站点里，图片会丢失。因此图片统一放在 `assets/images/posts/<slug>/`，在正文里用站点根路径引用，例如：

```markdown
![说明](/assets/images/posts/my-post/screenshot.png)
```

文件名含空格时，可用 URL 编码：`Pasted%20image%20xxx.png`。

## 与 Obsidian 的配合

若从 Obsidian 粘贴了 `![[xxx.png]]`，请改为标准 Markdown，并把图片复制到 `assets/images/posts/<slug>/`。
