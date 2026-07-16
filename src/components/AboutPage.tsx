'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { articles } from '@/lib/articlesData';
import { essays } from '@/lib/essaysData';

/* 个人介绍数据 */
const introLines: string[] = [
  '福建工科研究生在读',
  'INFJ · 喜欢 vibe coding',
  '正在学习 AI Agent 开发',
];

/* 网站正式上线时间 —— GitHub 仓库 Topaz059/blog 的创建时间（UTC） */
const SITE_LAUNCH = new Date('2026-06-22T06:25:17Z');

/* 统计正文字数：去掉代码块、markdown 符号后，数字符个数（中文按字数、英文按字母数） */
function countText(text: string): number {
  let t = text.replace(/```[\s\S]*?```/g, ' '); // 去代码块
  t = t.replace(/`[^`]*`/g, ' '); // 去行内代码
  t = t.replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1'); // 去图片，保留描述
  t = t.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1'); // 去链接，保留文字
  t = t.replace(/[#>*_~|`\-]/g, ''); // 去 markdown 符号
  t = t.replace(/\s+/g, ''); // 去空白
  return t.length;
}

/* 累计「文章 + 随笔」的正文字数 */
function totalWords(): number {
  let n = 0;
  for (const a of articles) {
    if (a.markdown) n += countText(a.markdown);
  }
  for (const e of essays) {
    if (e.markdown) n += countText(e.markdown);
    else if (e.content) n += countText(e.content);
  }
  return n;
}

/* 把毫秒差格式化成「X 天 X 小时 X 分 X 秒」 */
function formatUptime(ms: number): string {
  const total = Math.floor(ms / 1000);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return `${days} 天 ${hours} 小时 ${minutes} 分 ${seconds} 秒`;
}

export default function AboutPage() {
  // 每次加载时实时计算已写文章字数
  const words = useMemo(() => totalWords(), []);

  // 网站运行时间：每秒跳动更新
  const [uptime, setUptime] = useState('');
  useEffect(() => {
    const start = SITE_LAUNCH.getTime();
    const tick = () => setUptime(formatUptime(Date.now() - start));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="h-full w-full flex flex-col items-center overflow-y-auto"
      style={{ background: '#fbfbfb' }}
    >
      <div className="flex-1 flex flex-col items-center justify-center w-full px-8 py-10" style={{ containerType: 'inline-size' }}>
        {/* 头像圆圈 */}
        <div
          className="rounded-full overflow-hidden flex-shrink-0"
          style={{
            width: 'clamp(140px, 26cqw, 210px)',
            height: 'clamp(140px, 26cqw, 210px)',
            border: '3px solid #fff',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/touxiang.jpg"
            alt="头像"
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* 姓名 */}
        <h1
          className="font-semibold text-gray-800 mt-6"
          style={{ fontSize: 'clamp(24px, 4cqw, 32px)' }}
        >
          Topaz
        </h1>

        {/* 分隔线 */}
        <div
          className="mt-3 mb-5"
          style={{
            width: 'clamp(60px, 10cqw, 90px)',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #0078d4, transparent)',
          }}
        />

        {/* 个人介绍 */}
        <div className="flex flex-col items-center gap-2.5">
          {introLines.map((line, i) => (
            <p
              key={i}
              className="text-gray-600 text-center"
              style={{ fontSize: 'clamp(14px, 2.3cqw, 18px)' }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* 数据统计模块：已写文章字数 + 网站运行时间 */}
        <div
          className="flex items-stretch justify-center gap-4 mt-7"
          style={{ width: 'clamp(280px, 64cqw, 520px)' }}
        >
          {/* 字数卡片 */}
          <div
            className="flex-1 rounded-xl px-4 py-3 text-center"
            style={{ background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}
          >
            <div
              className="font-semibold text-[#0078d4]"
              style={{ fontSize: 'clamp(20px, 4cqw, 28px)' }}
            >
              {words.toLocaleString('zh-CN')}
            </div>
            <div className="text-gray-500 mt-1" style={{ fontSize: 'clamp(11px, 1.8cqw, 13px)' }}>
              已写文章字数
            </div>
          </div>

          {/* 运行时间卡片 */}
          <div
            className="flex-1 rounded-xl px-4 py-3 text-center"
            style={{ background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}
          >
            <div
              className="font-semibold text-[#0078d4]"
              style={{ fontSize: 'clamp(12px, 2.2cqw, 15px)', lineHeight: 1.5 }}
            >
              {uptime || '计算中…'}
            </div>
            <div className="text-gray-500 mt-1" style={{ fontSize: 'clamp(11px, 1.8cqw, 13px)' }}>
              网站已运行
            </div>
          </div>
        </div>

        {/* 底部装饰小点 */}
        <div className="flex gap-1.5 mt-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0078d4]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#0078d4] opacity-50" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#0078d4] opacity-25" />
        </div>
      </div>

      {/* 底部签名 */}
      <div
        className="w-full text-center py-3 text-gray-400 flex-shrink-0"
        style={{ fontSize: 'clamp(10px, 1.4cqw, 12px)' }}
      >
        © 2026 Topaz · 欢迎来到我的数字桌面
      </div>
    </div>
  );
}
