'use client';

import React from 'react';
import { motion } from 'framer-motion';

/* 文章数据 */
type Article = {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
};

const articles: Article[] = [
  {
    id: 1,
    title: '从零搭建个人数字桌面',
    date: '2026-07-08',
    excerpt: '用 Next.js + Tailwind 模拟 Windows 桌面，记录从图标设计到窗口交互的完整开发过程。',
    tags: ['Next.js', '前端', '设计'],
  },
  {
    id: 2,
    title: 'AI Agent 开发入门笔记',
    date: '2026-06-25',
    excerpt: '梳理 AI Agent 的核心概念、工具调用机制与多步推理流程，附最小可运行示例。',
    tags: ['AI', 'Agent', '学习笔记'],
  },
  {
    id: 3,
    title: 'Vibe Coding 实践心得',
    date: '2026-06-10',
    excerpt: '与 AI 结对编程的节奏把控：何时放手让 AI 写、何时介入修正，以及如何写好 prompt。',
    tags: ['AI', '工作流'],
  },
  {
    id: 4,
    title: '控制工程与机器视觉交叉记',
    date: '2026-05-20',
    excerpt: '工科研究生视角下，控制理论与视觉感知如何在机器人系统中协作的思考。',
    tags: ['控制工程', '机器视觉'],
  },
];

function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
      className="bg-white rounded-2xl border border-gray-100 cursor-pointer hover:border-[#0078d4]/30 hover:shadow-md transition-colors w-full"
      style={{
        padding: 'clamp(14px, 2cqw, 24px)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      }}
    >
      {/* 日期 */}
      <div
        className="text-[#0078d4] mb-2"
        style={{ fontSize: 'clamp(11px, 1.5cqw, 13px)' }}
      >
        {article.date}
      </div>
      {/* 标题 */}
      <h3
        className="font-semibold text-gray-800 leading-tight mb-2"
        style={{ fontSize: 'clamp(15px, 2.2cqw, 19px)' }}
      >
        {article.title}
      </h3>
      {/* 分隔线 */}
      <div
        className="mb-3"
        style={{
          width: 'clamp(28px, 4cqw, 40px)',
          height: '1.5px',
          background: 'linear-gradient(90deg, transparent, #0078d4, transparent)',
        }}
      />
      {/* 摘要 */}
      <p
        className="text-gray-500 leading-snug mb-3"
        style={{ fontSize: 'clamp(11px, 1.5cqw, 14px)' }}
      >
        {article.excerpt}
      </p>
      {/* 标签 */}
      <div className="flex flex-wrap gap-1.5">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="text-[#0078d4] bg-[#0078d4]/8 rounded-full px-2 py-0.5"
            style={{ fontSize: 'clamp(10px, 1.3cqw, 12px)' }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function ArticlesPage() {
  return (
    <div
      className="h-full w-full flex flex-col items-center overflow-y-auto"
      style={{ background: '#fbfbfb' }}
    >
      <div className="flex-1 flex flex-col items-center w-full px-8 pt-10 pb-6" style={{ containerType: 'inline-size' }}>
        {/* 标题 */}
        <h2
          className="font-semibold text-gray-800"
          style={{ fontSize: 'clamp(20px, 3.4cqw, 28px)' }}
        >
          文章
        </h2>

        {/* 分隔线 */}
        <div
          className="mt-3 mb-8"
          style={{
            width: 'clamp(60px, 10cqw, 90px)',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #0078d4, transparent)',
          }}
        />

        {/* 文章列表 */}
        <div
          className="flex flex-col w-full mx-auto"
          style={{
            gap: 'clamp(12px, 1.8cqw, 20px)',
            maxWidth: '600px',
          }}
        >
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>

      {/* 底部签名 */}
      <div
        className="w-full text-center py-3 text-gray-400 flex-shrink-0"
        style={{ fontSize: 'clamp(10px, 1.4cqw, 12px)' }}
      >
        © 2026 Topaz · 记录与分享
      </div>
    </div>
  );
}
