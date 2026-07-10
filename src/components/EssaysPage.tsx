'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

/* 随笔数据 */
type Essay = {
  id: number;
  date: string;
  title: string;
  content: string;
  markdown?: string;
  tags: string[];
};

const AI_NOTES_MD = `# 1. 机器学习
机器学习就是从数据中获得规律，通过人对规律进行标注，然后人将这个规律写成一套算法，使算法能够准确判断或识别出对应物体。

# 2. 深度学习
深度学习在机器学习的基础上，不需要人对规律进行总结，其内部会将输入的数据总结、分析规律、形成一套算法，从而识别或判断出对应物体。

![机器学习vs深度学习](/ml-vs-dl.png)

# 3. 神经网络
机器模拟人类大脑神经元工作的一种算法，input输入经过多层参数线性运算的叠加，最终得到一个output输出，下图为简单的三层神经网络的模型。

![神经网络模型](/neural-network.png)

# 4. 大语言模型(LLM)
大语言模型是深度学习领域专门设计用于自然语言处理领域特殊的深度神经网络。规模大，训练数据大，算力大，参数规模大，故称之为大语言模型。`;

const PYTHON_REVIEW_MD = `# print函数
### print(values, sep=" ", end="\\n", file=None, flush=False)
- sep内赋值的内容将作为每个元素输出的间隔符。
- end内赋值的内容将作为value结束末尾的换行。
- file内可选择对文件的打开方式。常见有r：只读。w：只写。a：追加。添加+表示允许读写。
- flush可选True和False两种选择，True代表每运行一步屏幕就立刻显示一步，False则是最后一起在屏幕显示出来。
# 格式化输出
### 格式化字符
- %c：字符
- %s：字符串
- %d：十进制整数
- %f：浮点数
### 格式化输出模板
### 基本格式化输出：使用%
\`\`\`python

print('我的名字是%s，年龄是%d岁' % ("01", 18))

\`\`\`
#### format()格式化输出
\`\`\`python

print("我的名字是：{}，年龄为：{}岁".format("01", 18))

\`\`\`
#### f表达式格式化输出(常用)
\`\`\`python

name, age = "01", 18

print(f"名字是{name}，今年{age}岁")

\`\`\`
# 对象
### python对象的三要素
  - \`id\`：对象的唯一标识符。
  - \`type\`：对象的类型。
  - \`value\`：对象的值。
# input函数
可以自己输入需要的元素，默认以字符串形式返回，但可使用int以及其他类型进行强制转换。
\`\`\`python
a=int(input("请输入"))
print(a)
\`\`\``;

const essays: Essay[] = [
  { id: 2, date: '2026-07-03', title: '滤波器与 PID 是一对', content: '控制课上讲 PID 整定，突然反应过来：滤波器和 PID 其实是一对，前者收拾信号，后者收拾误差。机器视觉里这俩谁也躲不掉，算是把专业课串起来了。', tags: ['控制工程', '学习'] },
  { id: 3, date: '2026-06-22', title: '最小可运行 Agent 跑通了', content: '跟着教程搭了个最小可运行的 Agent，工具调用跑通的那一刻有点上头。下一步想接 MediaPipe，让它真的"看得见"——这才对得起"机器视觉"这个方向。', tags: ['AI Agent', 'MediaPipe'] },
  { id: 4, date: '2026-06-12', title: 'INFJ 的试错方式', content: 'INFJ 的苦恼：方案没想清楚前不想开口，可 vibe coding 又要求快速试错。和解的办法是——先在代码里试，试完再讲。代码不撒谎，比口头推演省事。', tags: ['随想'] },
  { id: 5, date: '2026-06-01', title: '博客迁到 Next.js', content: '把博客从 Hexo 迁到 Next.js，折腾了一整个周末。静态导出 + Cloudflare Pages，零成本上线，研究生钱包友好。绿点也保住了，值。', tags: ['博客', '部署'] },
  {
    id: 6,
    date: '2026-07-09',
    title: 'AI 概念学习笔记',
    content: '机器学习、深度学习、神经网络和大语言模型的概念梳理——从数据中获得规律，到不需要人工标注规律，再到模拟大脑神经元结构。',
    markdown: AI_NOTES_MD,
    tags: ['AI', '学习笔记'],
  },
  {
    id: 7,
    date: '2026-07-10',
    title: 'Python 语法回顾',
    content: '温习 Python 基础：print 函数的参数、三种字符串格式化方式（% / format / f-string）、对象三要素与 input 函数。',
    markdown: PYTHON_REVIEW_MD,
    tags: ['Python', '学习笔记'],
  },
];

type TabKey = 'day' | 'week' | 'month' | 'year' | 'category';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'day', label: '日' },
  { key: 'week', label: '周' },
  { key: 'month', label: '月' },
  { key: 'year', label: '年' },
  { key: 'category', label: '分类' },
];

function getWeekRange(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00');
  const day = (d.getDay() + 6) % 7;
  const monday = new Date(d);
  monday.setDate(d.getDate() - day);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return { monday, sunday };
}

function fmtRange(a: Date, b: Date) {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(a.getMonth() + 1)}.${p(a.getDate())}-${p(b.getMonth() + 1)}.${p(b.getDate())}`;
}

function mmdd(dateStr: string) {
  const [, m, d] = dateStr.split('-');
  return `${m}-${d}`;
}

type Group = { key: string; title: string; items: Essay[] };

function computeGroups(tab: TabKey, arts: Essay[]): Group[] {
  if (tab === 'category') {
    const map = new Map<string, Essay[]>();
    for (const a of arts) {
      for (const t of a.tags) {
        if (!map.has(t)) map.set(t, []);
        map.get(t)!.push(a);
      }
    }
    return Array.from(map.entries())
      .map(([tag, items]) => ({
        key: tag,
        title: `#${tag}`,
        items: items.slice().sort((x, y) => y.date.localeCompare(x.date)),
      }))
      .sort((a, b) => b.items.length - a.items.length);
  }
  const map = new Map<string, { title: string; items: Essay[] }>();
  for (const a of arts) {
    const [y, m, d] = a.date.split('-');
    let key = '';
    let title = '';
    if (tab === 'day') {
      key = a.date;
      title = `${Number(m)}月${Number(d)}日`;
    } else if (tab === 'week') {
      const { monday, sunday } = getWeekRange(a.date);
      key = `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, '0')}-${String(monday.getDate()).padStart(2, '0')}`;
      title = fmtRange(monday, sunday);
    } else if (tab === 'month') {
      key = `${y}-${m}`;
      title = `${y}年${Number(m)}月`;
    } else {
      key = y;
      title = `${y}年`;
    }
    if (!map.has(key)) map.set(key, { title, items: [] });
    map.get(key)!.items.push(a);
  }
  return Array.from(map.entries())
    .map(([key, g]) => ({
      key,
      title: g.title,
      items: g.items.slice().sort((x, y) => y.date.localeCompare(x.date)),
    }))
    .sort((a, b) => b.key.localeCompare(a.key));
}

const ACCENT = '#0078d4';

function EssayRow({
  essay,
  isLast,
  hovered,
  onHoverChange,
  onSelect,
}: {
  essay: Essay;
  isLast: boolean;
  hovered: boolean;
  onHoverChange: (hover: boolean) => void;
  onSelect?: () => void;
}) {
  const clickable = !!essay.markdown;
  const fs = 'clamp(11px, 1.5cqw, 13px)';
  return (
    <div
      className={`flex items-stretch gap-2.5 ${clickable ? 'cursor-pointer' : 'cursor-default'}`}
      style={{ padding: 'clamp(7px, 0.9cqw, 11px) 0' }}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      onClick={clickable ? onSelect : undefined}
    >
      {/* 时间线节点列 */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: 14 }}>
        <div className="flex-1" style={{ width: 0, borderLeft: '1px dashed #d1d5db' }} />
        <div className="flex items-center justify-center" style={{ width: 14, height: 8, overflow: 'visible' }}>
          <div
            className="transition-all duration-200"
            style={
              hovered
                ? { width: 4, height: 24, borderRadius: 2, background: ACCENT }
                : { width: 8, height: 8, borderRadius: '50%', background: '#d1d5db' }
            }
          />
        </div>
        <div className="flex-1" style={{ width: 0, borderLeft: isLast ? 'none' : '1px dashed #d1d5db' }} />
      </div>
      {/* 日期 */}
      <span
        className="font-medium text-gray-700 tabular-nums flex-shrink-0 self-center"
        style={{ fontSize: fs, width: 'clamp(38px, 5cqw, 50px)' }}
      >
        {mmdd(essay.date)}
      </span>
      {/* 标题 + 内容预览 */}
      <div className="flex-1 min-w-0 self-center">
        <span
          className="block truncate transition-all duration-200"
          style={{
            fontSize: fs,
            color: hovered ? ACCENT : '#374151',
            transform: hovered ? 'translateX(5px) scale(1.03)' : 'translateX(0) scale(1)',
            transformOrigin: 'left center',
          }}
        >
          {essay.title}
          {clickable && <span className="text-gray-300 ml-1.5">›</span>}
        </span>
        <p className="text-gray-400 truncate" style={{ fontSize: 'clamp(10px, 1.3cqw, 12px)' }}>
          {essay.content}
        </p>
      </div>
      {/* 标签 */}
      <span
        className="text-gray-400 ml-auto flex-shrink-0 whitespace-nowrap self-center"
        style={{ fontSize: fs }}
      >
        {essay.tags.map((t) => `#${t}`).join('  ')}
      </span>
    </div>
  );
}

function GroupCard({ group, index, onSelect }: { group: Group; index: number; onSelect: (id: number) => void }) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: 'easeOut' }}
      className="bg-white rounded-2xl w-full"
      style={{ padding: 'clamp(14px, 2cqw, 22px)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
    >
      <div
        className="flex items-baseline gap-2"
        style={{
          marginBottom: 'clamp(6px, 0.8cqw, 10px)',
          paddingBottom: 'clamp(8px, 1cqw, 12px)',
          borderBottom: '1px solid #f3f4f6',
        }}
      >
        <span className="font-semibold text-gray-800" style={{ fontSize: 'clamp(14px, 2cqw, 17px)' }}>
          {group.title}
        </span>
        <span className="text-gray-300">•</span>
        <span className="text-gray-400" style={{ fontSize: 'clamp(11px, 1.5cqw, 13px)' }}>
          {group.items.length} 篇
        </span>
      </div>
      <div className="flex flex-col">
        {group.items.map((a, i) => (
          <EssayRow
            key={a.id}
            essay={a}
            isLast={i === group.items.length - 1}
            hovered={hoveredId === a.id}
            onHoverChange={(h) => setHoveredId(h ? a.id : null)}
            onSelect={() => onSelect(a.id)}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* Markdown 渲染组件样式 */
const mdComponents: Components = {
  h1: ({ children }) => (
    <h1 className="font-bold text-gray-800 mt-6 mb-3" style={{ fontSize: 'clamp(17px, 2.6cqw, 22px)' }}>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-semibold text-gray-800 mt-5 mb-2" style={{ fontSize: 'clamp(15px, 2.2cqw, 19px)' }}>
      {children}
    </h2>
  ),
  p: ({ children }) => (
    <p className="text-gray-600 leading-relaxed mb-4" style={{ fontSize: 'clamp(13px, 2cqw, 16px)' }}>
      {children}
    </p>
  ),
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === 'string' ? src : ''}
      alt={alt ?? ''}
      className="rounded-xl my-4 w-full h-auto"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
    />
  ),
  a: ({ children, href }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#0078d4] underline">
      {children}
    </a>
  ),
  code: ({ className, children }) => {
    const text = String(children ?? '').replace(/\n$/, '');
    const match = /language-(\w+)/.exec(className ?? '');
    const lang = match?.[1];
    const isBlock = !!lang || text.includes('\n');
    if (isBlock) {
      const label = lang || '';
      return (
        <div style={{ position: 'relative', margin: '16px 0' }}>
          {label && (
            <span
              style={{
                position: 'absolute',
                top: 10,
                right: 14,
                fontSize: 11,
                lineHeight: 1,
                color: '#94a3b8',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                letterSpacing: '0.04em',
                userSelect: 'none',
              }}
            >
              {label}
            </span>
          )}
          <SyntaxHighlighter
            language={lang ?? 'text'}
            style={oneLight}
            customStyle={{
              margin: 0,
              borderRadius: 10,
              padding: '16px 18px',
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              fontSize: 'clamp(12px, 1.8cqw, 14px)',
              lineHeight: 1.6,
              overflowX: 'auto',
            }}
            codeTagProps={{ style: { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' } }}
          >
            {text}
          </SyntaxHighlighter>
        </div>
      );
    }
    return (
      <code className="bg-gray-100 text-gray-700 rounded px-1.5 py-0.5" style={{ fontSize: '0.9em' }}>
        {children}
      </code>
    );
  },
  pre: ({ children }) => <>{children}</>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-gray-200 pl-4 my-4 text-gray-500 italic">
      {children}
    </blockquote>
  ),
};

function EssayDetailView({ essay, onBack }: { essay: Essay; onBack: () => void }) {
  return (
    <div className="h-full w-full overflow-y-auto" style={{ background: '#fbfbfb' }}>
      <div className="mx-auto px-8 pt-8 pb-10" style={{ maxWidth: '800px', containerType: 'inline-size' }}>
        {/* 返回按钮 */}
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-gray-500 hover:text-[#0078d4] transition-colors mb-6"
          style={{ fontSize: 'clamp(12px, 1.6cqw, 14px)' }}
        >
          ← 返回
        </button>
        {/* 日期 */}
        <div className="text-[#0078d4] mb-2" style={{ fontSize: 'clamp(12px, 1.6cqw, 14px)' }}>
          {essay.date}
        </div>
        {/* 标题 */}
        <h1
          className="font-semibold text-gray-800 mb-3"
          style={{ fontSize: 'clamp(22px, 3.4cqw, 30px)' }}
        >
          {essay.title}
        </h1>
        {/* 分隔线 */}
        <div
          className="mb-6"
          style={{
            width: 'clamp(60px, 10cqw, 90px)',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #0078d4, transparent)',
          }}
        />
        {/* Markdown 正文 */}
        {essay.markdown && (
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
            {essay.markdown}
          </ReactMarkdown>
        )}
        {/* 标签 */}
        <div className="flex flex-wrap gap-2 mt-8 pt-4" style={{ borderTop: '1px solid #f3f4f6' }}>
          {essay.tags.map((tag) => (
            <span
              key={tag}
              className="text-[#0078d4] bg-[#0078d4]/8 rounded-full px-2.5 py-1"
              style={{ fontSize: 'clamp(11px, 1.4cqw, 13px)' }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EssaysPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('month');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const groups = useMemo(() => computeGroups(activeTab, essays), [activeTab]);
  const selectedEssay = essays.find((e) => e.id === selectedId);

  return (
    <div className="h-full w-full" style={{ background: '#fbfbfb' }}>
      <AnimatePresence mode="wait">
        {selectedEssay ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="h-full"
          >
            <EssayDetailView essay={selectedEssay} onBack={() => setSelectedId(null)} />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full flex flex-col items-center overflow-y-auto"
          >
            <div className="flex-1 flex flex-col items-center w-full px-8 pt-10 pb-6" style={{ containerType: 'inline-size' }}>
              {/* 标题 */}
              <h2 className="font-semibold text-gray-800" style={{ fontSize: 'clamp(20px, 3.4cqw, 28px)' }}>
                随笔
              </h2>
              {/* 分隔线 */}
              <div
                className="mt-3 mb-6"
                style={{
                  width: 'clamp(60px, 10cqw, 90px)',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #0078d4, transparent)',
                }}
              />
              {/* tab 栏 */}
              <div
                className="flex items-center gap-1 p-1 rounded-full mb-6"
                style={{ background: 'rgba(229,231,235,0.6)' }}
              >
                {TABS.map((t) => {
                  const active = t.key === activeTab;
                  return (
                    <button
                      key={t.key}
                      onClick={() => setActiveTab(t.key)}
                      className="rounded-full transition-colors"
                      style={{
                        padding: 'clamp(5px, 0.7cqw, 7px) clamp(12px, 1.6cqw, 16px)',
                        fontSize: 'clamp(12px, 1.6cqw, 14px)',
                        background: active ? ACCENT : 'transparent',
                        color: active ? '#fff' : '#6b7280',
                        fontWeight: active ? 600 : 400,
                      }}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
              {/* 分组列表 */}
              <div
                className="flex flex-col w-full mx-auto"
                style={{ gap: 'clamp(12px, 1.8cqw, 20px)', maxWidth: '800px' }}
              >
                {groups.length === 0 ? (
                  <div className="text-center text-gray-400 py-10" style={{ fontSize: 'clamp(12px, 1.6cqw, 14px)' }}>
                    暂无内容
                  </div>
                ) : (
                  groups.map((g, i) => (
                    <GroupCard key={g.key} group={g} index={i} onSelect={setSelectedId} />
                  ))
                )}
              </div>
            </div>
            {/* 底部签名 */}
            <div
              className="w-full text-center py-3 text-gray-400 flex-shrink-0"
              style={{ fontSize: 'clamp(10px, 1.4cqw, 12px)' }}
            >
              © 2026 Topaz · 日常的碎片想法
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
