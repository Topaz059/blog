'use client';

import React from 'react';
import { motion } from 'framer-motion';

/* 项目数据 */
type Project = {
  id: number;
  title: string;
  date: string;
  content: string;
  tags: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: '虚拟角色交互系统',
    date: '2026-07-01',
    content: '控制工程视角的虚拟角色系统：MediaPipe 做手势识别，卡尔曼滤波平滑信号，PID 闭环驱动立绘响应。不做 LLM 对话层，先把"识别→处理→平滑输出"这条闭环跑通，这才是控制工程该干的事。',
    tags: ['MediaPipe', 'PID闭环', 'OpenCV'],
  },
  {
    id: 2,
    title: '数字桌面',
    date: '2026-06-28',
    content: '用 Next.js + framer-motion 搭了一个仿 macOS 桌面环境，窗口拖拽、Dock 动效、毛玻璃面板全手写。spring 参数靠自己手感调，教程抄不来。算是把前端的动画系统摸了一遍。',
    tags: ['Next.js', 'framer-motion', '前端'],
  },
  {
    id: 3,
    title: '最小可运行 Agent',
    date: '2026-06-22',
    content: '跟着教程搭了个最小可运行的 AI Agent，工具调用跑通的那一刻有点上头。下一步想接 MediaPipe，让它真的"看得见"——这才对得起"机器视觉"这个方向。',
    tags: ['AI Agent', '工具调用'],
  },
  {
    id: 4,
    title: '博客迁移：Hexo → Next.js',
    date: '2026-06-01',
    content: '把博客从 Hexo 迁到 Next.js，静态导出 + Cloudflare Pages，零成本上线。Next.js 的 App Router 和静态导出踩了不少坑，最终跑通了。研究生钱包友好方案，值。',
    tags: ['博客', 'Cloudflare Pages', '部署'],
  },
  {
    id: 5,
    title: 'MediaPipe 手势识别初探',
    date: '2026-05-15',
    content: '跑了 MediaPipe Hands 的官方 demo，21 个关键点实时跟踪。接下来要做的是把关键点坐标喂给滤波器，再驱动 PID——这是虚拟角色系统的第一层。识别精度够用，延迟在可接受范围。',
    tags: ['MediaPipe', '机器视觉', '手势识别'],
  },
  {
    id: 6,
    title: 'PID 控制器可视化',
    date: '2026-04-20',
    content: '用 Python + matplotlib 把 PID 三项的作用可视化出来：P 消除稳态误差，I 消除余差，D 抑制超调。调参的时候对着图看比对着公式想直观太多了，控制工程果然还是得可视化。',
    tags: ['PID', 'Python', '控制工程'],
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
      className="bg-white rounded-2xl border border-gray-100 cursor-default hover:border-[#0078d4]/30 hover:shadow-md transition-colors w-full"
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
        {project.date}
      </div>
      {/* 标题 */}
      <h3
        className="font-semibold text-gray-800 leading-tight mb-2"
        style={{ fontSize: 'clamp(15px, 2.2cqw, 19px)' }}
      >
        {project.title}
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
      {/* 正文 */}
      <p
        className="text-gray-600 leading-relaxed mb-3"
        style={{ fontSize: 'clamp(12px, 1.7cqw, 15px)' }}
      >
        {project.content}
      </p>
      {/* 标签 */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
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

export default function ProjectsPage() {
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
          项目
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

        {/* 项目列表 */}
        <div
          className="flex flex-col w-full mx-auto"
          style={{
            gap: 'clamp(12px, 1.8cqw, 20px)',
            maxWidth: '600px',
          }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      {/* 底部签名 */}
      <div
        className="w-full text-center py-3 text-gray-400 flex-shrink-0"
        style={{ fontSize: 'clamp(10px, 1.4cqw, 12px)' }}
      >
        © 2026 Topaz · 正在做和做过的事
      </div>
    </div>
  );
}
