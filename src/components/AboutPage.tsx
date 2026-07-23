'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { articles } from '@/lib/articlesData';
import { essays } from '@/lib/essaysData';

/* 个人介绍数据 */
const introLines: string[] = [
  '福建工科研究生在读',
  'INFJ · 喜欢Agent开发',
  '正在进行端侧模型部署与调优项目',
];

/* 网站起始时间：GitHub blog 仓库创建时间 2026-06-22T06:25:17Z（北京时间 14:25:17） */
const SITE_START_TIME = new Date('2026-06-22T14:25:17+08:00').getTime();

/**
 * 统计 markdown 正文字数：
 * - 去除 markdown 标记（标题井号、列表符号、代码块围栏、表格分隔、引用、图片、链接等）
 * - 中文字符按字数计
 * - 英文/数字按单词数计
 */
function countWords(md: string): number {
  if (!md) return 0;
  let text = md;
  // 去除代码块（```...```）
  text = text.replace(/```[\s\S]*?```/g, ' ');
  // 去除行内代码（`...`）
  text = text.replace(/`[^`]*`/g, ' ');
  // 去除图片 ![alt](url)
  text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ');
  // 去除链接 [text](url)，保留 text
  text = text.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');
  // 去除表格分隔行 | --- | --- |
  text = text.replace(/^\s*\|[\s:|-]+\|\s*$/gm, ' ');
  // 去除行首的标题/列表/引用符号
  text = text.replace(/^[\s>#*\-+]+/gm, '');
  // 去除表格单元格的竖线分隔符
  text = text.replace(/\|/g, ' ');
  // 去除剩余的 markdown 强调符号
  text = text.replace(/[*_~]/g, '');

  // 统计中文字符数
  const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  // 统计英文单词数（连续的字母/数字序列视为一个单词）
  const englishWords = (text.match(/[A-Za-z0-9]+/g) || []).length;

  return chineseChars + englishWords;
}

export default function AboutPage() {
  // 计算总字数（每次组件挂载时重新计算）
  const totalWords = useMemo(() => {
    const articleWords = articles.reduce(
      (sum, a) => sum + countWords(a.markdown || ''),
      0
    );
    const essayWords = essays.reduce(
      (sum, e) => sum + countWords(e.markdown || e.content || ''),
      0
    );
    return articleWords + essayWords;
  }, []);

  // 运行时间（每秒更新）
  const [uptime, setUptime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const diff = Date.now() - SITE_START_TIME;
      if (diff < 0) {
        setUptime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      setUptime({ days, hours, minutes, seconds });
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
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

        {/* 两个统计模块：左右并排 */}
        <div
          className="flex w-full mt-8 gap-3"
          style={{ maxWidth: 'clamp(280px, 60cqw, 480px)' }}
        >
          {/* 模块一：文章字数 */}
          <div
            className="flex-1 flex flex-col items-center justify-center rounded-xl px-3 py-4"
            style={{
              background: '#fff',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <div
              className="font-semibold text-[#0078d4] leading-none"
              style={{ fontSize: 'clamp(20px, 3.6cqw, 28px)' }}
            >
              {totalWords.toLocaleString()}
            </div>
            <div
              className="text-gray-500 mt-1.5"
              style={{ fontSize: 'clamp(11px, 1.8cqw, 13px)' }}
            >
              文章字数
            </div>
          </div>

          {/* 模块二：网站运行时间 */}
          <div
            className="flex-1 flex flex-col items-center justify-center rounded-xl px-3 py-4"
            style={{
              background: '#fff',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <div
              className="font-semibold text-[#0078d4] leading-none whitespace-nowrap"
              style={{ fontSize: 'clamp(15px, 2.8cqw, 22px)', marginTop: '4px' }}
            >
              {uptime.days}天 {uptime.hours}时 {uptime.minutes}分 {uptime.seconds}秒
            </div>
            <div
              className="text-gray-500"
              style={{ fontSize: 'clamp(11px, 1.8cqw, 13px)', marginTop: '7px' }}
            >
              运行时间
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
