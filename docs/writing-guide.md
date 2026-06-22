# Blue Blog 写文章指南

## 准备工作

你只需要：**一个浏览器**，打开 GitHub 就行。不需要安装任何软件，不需要记任何命令。

---

## 项目目录结构（你在 GitHub 上看到的样子）

进入 https://github.com/yaoshi1103/blog 看到的就是这个结构：

```
blog/                          ← 仓库根目录
├── docs/
│   └── writing-guide.md       ← 📖 本指南（你现在正在看的）
│
├── public/
│   └── favicon/               ← 🖼️ 网站图标图片
│
├── src/
│   ├── assets/
│   │   └── images/            ← 头像、横幅图片存放处
│   │
│   ├── components/            ← 页面组件（通常不用管）
│   │
│   ├── config.ts              ← ⭐ 博客设置核心文件
│   │     siteConfig → 标题/副标题/主题色
│   │     profileConfig → 作者名/头像/简介/社交链接
│   │     navBarConfig → 导航栏链接
│   │
│   ├── content/
│   │   ├── config.ts          ← 文章格式定义（不用管）
│   │   ├── posts/             ← ⭐ 你的文章放这里！
│   │   │   └── .gitkeep       ←   空文件，删掉文章后就剩这个
│   │   └── spec/
│   │       └── about.md       ← ⭐ 关于页面内容
│   │
│   ├── layouts/               ← 页面布局（通常不用管）
│   ├── pages/                 ← 路由页面（通常不用管）
│   ├── styles/                ← 样式文件（通常不用管）
│   └── ...其他文件夹           ← 主题内部文件，不用管
│
├── astro.config.mjs           ← ⭐ 站点 URL 等 Astro 配置
├── wrangler.jsonc             ← Cloudflare 部署配置（不用管）
├── package.json               ← 项目信息（不用管）
├── .gitignore                 ← git 忽略规则（不用管）
└── 其他配置文件                ← 都不用管
```

> **你只需要关注 4 个地方：**
> 1. `src/content/posts/` → 文章
> 2. `src/config.ts` → 博客基本设置
> 3. `src/content/spec/about.md` → 关于页面
> 4. `docs/writing-guide.md` → 本指南

---

## 写新文章（5 步）

### 第一步：打开文章目录

浏览器访问：

```
https://github.com/yaoshi1103/blog/tree/main/src/content/posts
```

### 第二步：创建新文件

点右上角 **Add file** → **Create new file**

### 第三步：填文件名和内容

在 **Name your file...** 处填文件名，例如 `hello-world.md`（英文或拼音，不要用中文文件名）。

在下方编辑器里粘贴以下模板，把内容换成你自己的：

```markdown
---
title: Hello World
published: 2026-06-22
description: 这是我的第一篇文章
tags: [随笔]
category: 生活
draft: false
---

正文从这里开始。

可以写**加粗**、*斜体*、`代码`。

## 二级标题

段落内容。

- 列表项 1
- 列表项 2
```

### 第四步：提交（发布）

拉到页面底部：
1. **Commit message** 填：`新文章：Hello World`
2. 选择 **Commit directly to main branch**
3. 点绿色按钮 **Commit changes**

### 第五步：等 2-3 分钟

Cloudflare 会自动检测到新内容，构建并部署。之后访问 `https://blog.to-lunastra.workers.dev/` 就能看到新文章了。

---

## 修改已有文章

在 `src/content/posts/` 目录下找到文章文件，点一下打开，然后点右上角的 ✏️ **编辑图标**。

改完后拉到页面底部，同样点 **Commit changes**。

---

## 修改博客设置

| 想改什么 | 访问哪个文件 |
|---------|------------|
| 博客标题、副标题、主题色 | [`src/config.ts`](https://github.com/yaoshi1103/blog/blob/main/src/config.ts) → `siteConfig` |
| 作者名、头像、简介、社交链接 | [`src/config.ts`](https://github.com/yaoshi1103/blog/blob/main/src/config.ts) → `profileConfig` |
| 导航栏链接 | [`src/config.ts`](https://github.com/yaoshi1103/blog/blob/main/src/config.ts) → `navBarConfig` |
| 关于页面 | [`src/content/spec/about.md`](https://github.com/yaoshi1103/blog/blob/main/src/content/spec/about.md) |

改完后同样拉到页面底部点 **Commit changes**，等 2-3 分钟线上生效。

---

## 小技巧

- **不想立刻发布**：把 `draft: false` 改成 `draft: true`，推上去后文章不会显示。想发布时改回 `false` 再 commit 一次
- **配图**：把图片上传到 `public/images/` 目录（在 GitHub 上点 Add file → Upload files），文章里用 `![说明](/images/xxx.jpg)` 引用
- **预览效果**：改完后想确认没问题再发布？可以在文件里设 `draft: true` 推送上去看看效果，确认没问题了再改成 `false`
- **文件名**：用英文或拼音，不要中文。例如 `my-first-post.md` 或 `di-yi-pian-wen-zhang.md`

---

## 文章模板（复制用）

```markdown
---
title: 文章标题
published: 2026-06-22
description: 文章简介，显示在列表里
tags: [标签1, 标签2]
category: 分类名
draft: false
---

正文在这里。
```
