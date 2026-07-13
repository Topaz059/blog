'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { essays, type Essay } from '@/lib/essaysData';

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
  h3: ({ children }) => (
    <h3 className="font-medium text-gray-800 mt-4 mb-2" style={{ fontSize: 'clamp(14px, 2cqw, 18px)' }}>
      {children}
    </h3>
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
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto">
      <table
        className="border-collapse w-full"
        style={{ fontSize: 'clamp(12px, 1.8cqw, 15px)', border: '1px solid #e5e7eb' }}
      >
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th
      className="font-semibold text-gray-700 bg-[#f8fafc]"
      style={{ border: '1px solid #e5e7eb', padding: '8px 12px', textAlign: 'left' }}
    >
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="text-gray-600" style={{ border: '1px solid #e5e7eb', padding: '8px 12px' }}>
      {children}
    </td>
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

interface EssaysPageProps {
  /** 由外部（如任务栏搜索）指定要打开的随笔 id，设置后会自动进入该随笔详情 */
  focusEssayId?: number | null;
  /** focusEssayId 被消费后的回调，外部用以清空焦点 */
  onFocusConsumed?: () => void;
}

export default function EssaysPage({ focusEssayId, onFocusConsumed }: EssaysPageProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('month');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const groups = useMemo(() => computeGroups(activeTab, essays), [activeTab]);
  const selectedEssay = essays.find((e) => e.id === selectedId);

  // 外部深链：搜索点击随笔后，直接进入该随笔详情
  useEffect(() => {
    if (focusEssayId != null) {
      setSelectedId(focusEssayId);
      onFocusConsumed?.();
    }
  }, [focusEssayId, onFocusConsumed]);

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
              © 2026 Topaz · 记录学习笔记和一些想法
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
