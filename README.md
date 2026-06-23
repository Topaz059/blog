# Blue Blog

我的个人博客，记录日常思考和笔记。

**网址**：[blog.to-lunastra.workers.dev](https://blog.to-lunastra.workers.dev)

---

## 技术栈

| 层面 | 技术 |
|------|------|
| 框架 | [Astro](https://astro.build) |
| 主题 | [Fuwari](https://github.com/saicaca/fuwari) |
| 样式 | [Tailwind CSS](https://tailwindcss.com) |
| 交互 | [Svelte](https://svelte.dev) + [Swup](https://swup.js.org) |
| 搜索 | [Pagefind](https://pagefind.app) |
| 部署 | [Cloudflare Workers](https://workers.cloudflare.com) |

## 功能

- 深色/浅色模式切换
- 平滑页面过渡动画
- 全文搜索
- RSS 订阅
- 响应式布局（手机/平板/桌面）
- Markdown 扩展语法（代码高亮、数学公式、GitHub 卡片等）

## 搭建过程

1. 使用 Fuwari 主题模板初始化项目
2. 修改 `src/config.ts` 配置站点信息、主题色、导航栏等
3. 通过 Cloudflare Workers 部署，连接 GitHub 仓库实现推送即自动上线

## 本地开发

```bash
pnpm install        # 安装依赖
pnpm dev            # 启动本地预览 (localhost:4321)
pnpm new-post 标题  # 创建新文章
pnpm build          # 构建生产版本
```

## License

MIT
