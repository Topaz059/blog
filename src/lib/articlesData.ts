/* 文章数据 — Topaz 人设，扩充覆盖 2026 年 2-7 月 + 2025 年 */
import { ARTICLES_MARKDOWN } from './articlesContent';

export type Article = {
  id: number;
  date: string; // 'YYYY-MM-DD'
  title: string;
  tags: string[];
  markdown?: string; // 正文（Markdown 字符串），有则文章列表可点击打开详情
};

export const articles: Article[] = [
  { id: 1, date: '2026-07-13', title: '从零搭建个人数字桌面', tags: ['Next.js', '前端'], markdown: ARTICLES_MARKDOWN[1] },
  { id: 2, date: '2026-07-03', title: '动效参数的手感', tags: ['vibe coding', '前端'] },
  { id: 3, date: '2026-06-25', title: 'AI Agent 开发入门笔记', tags: ['AI', 'Agent'] },
  { id: 4, date: '2026-06-10', title: 'Vibe Coding 实践心得', tags: ['AI', '工作流'] },
  { id: 5, date: '2026-05-20', title: '控制工程与机器视觉交叉记', tags: ['控制工程', '机器视觉'] },
  { id: 6, date: '2026-05-08', title: 'MediaPipe 手势识别初探', tags: ['机器视觉', 'MediaPipe'] },
  { id: 7, date: '2026-04-22', title: 'PID 整定的工程直觉', tags: ['控制工程', '学习'] },
  { id: 8, date: '2026-04-10', title: '卡尔曼滤波直觉理解', tags: ['控制工程', '滤波'] },
  { id: 9, date: '2026-03-15', title: '状态空间模型入门', tags: ['控制工程', '学习'] },
  { id: 10, date: '2026-03-02', title: 'INFJ 研究生的时间管理', tags: ['随想', '成长'] },
  { id: 11, date: '2026-02-14', title: '从 Hexo 到 Next.js 迁移记', tags: ['博客', '部署'] },
  { id: 12, date: '2026-02-04', title: '滤波器选型对比笔记', tags: ['滤波', '信号处理'] },
  { id: 13, date: '2025-12-02', title: '研0入学准备', tags: ['研究生', '规划'] },
  { id: 14, date: '2025-10-18', title: '本科毕业设计复盘', tags: ['毕设', '控制工程'] },
  { id: 15, date: '2025-07-05', title: 'C 语言指针难点梳理', tags: ['C', '学习笔记'] },
];
