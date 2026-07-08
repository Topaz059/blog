'use client';

import React, { useState } from 'react';
import { FolderIcon } from './icons';

/* ---------- Inline SVG icons (shared with ThisPCPage style) ---------- */

const IconBack: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 3 L4 8 L10 13" />
  </svg>
);
const IconForward: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3 L12 8 L6 13" />
  </svg>
);
const IconUp: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10 L8 5 L13 10" />
  </svg>
);
const IconRefresh: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 8 A5 5 0 1 1 8 3" />
    <path d="M13 3 L13 6 L10 6" />
  </svg>
);
const IconChevron: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4 L10 8 L6 12" />
  </svg>
);
const IconSearch: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
    <circle cx="7" cy="7" r="4" />
    <path d="M10 10 L13 13" />
  </svg>
);
const IconNew: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
    <path d="M8 3 L8 13 M3 8 L13 8" />
  </svg>
);
const IconCut: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="4" cy="11" r="1.6" />
    <circle cx="12" cy="11" r="1.6" />
    <path d="M5.2 9.8 L13 2 M10.8 9.8 L3 2" />
  </svg>
);
const IconCopy: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="5" width="8" height="9" rx="1" />
    <path d="M3 11 V3 a1 1 0 0 1 1-1 H10" />
  </svg>
);
const IconRename: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 13 L11 5 L13 7 L5 15 Z" />
    <path d="M11 5 L12.5 3.5 a1 1 0 0 1 1.5 0 L14.5 4 a1 1 0 0 1 0 1.5 L13 7" />
  </svg>
);
const IconShare: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="4" cy="8" r="1.6" />
    <circle cx="12" cy="4" r="1.6" />
    <circle cx="12" cy="12" r="1.6" />
    <path d="M5.5 7.2 L10.5 4.8 M5.5 8.8 L10.5 11.2" />
  </svg>
);
const IconDelete: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 4 H13 M6 4 V3 a1 1 0 0 1 1-1 H9 a1 1 0 0 1 1 1 V4 M5 4 V13 a1 1 0 0 0 1 1 H10 a1 1 0 0 0 1-1 V4" />
  </svg>
);
const IconSort: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 5 H13 M5 8 H11 M7 11 H9" />
  </svg>
);
const IconView: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="4" height="4" />
    <rect x="9" y="3" width="4" height="4" />
    <rect x="3" y="9" width="4" height="4" />
    <rect x="9" y="9" width="4" height="4" />
  </svg>
);
const IconMore: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <circle cx="3" cy="8" r="1.3" />
    <circle cx="8" cy="8" r="1.3" />
    <circle cx="13" cy="8" r="1.3" />
  </svg>
);
const IconStar: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="#ffb300" stroke="#c88700" strokeWidth="0.7" strokeLinejoin="round">
    <path d="M8 2 L10 6 L14.2 6.4 L11 9.2 L12 13.2 L8 11 L4 13.2 L5 9.2 L1.8 6.4 L6 6 Z" />
  </svg>
);
const IconHome: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="#0078d4" stroke="#005a9e" strokeWidth="0.7" strokeLinejoin="round">
    <path d="M8 2 L14 7 V13 a1 1 0 0 1 -1 1 H10 V10 H6 V14 H3 a1 1 0 0 1 -1 -1 V7 Z" />
  </svg>
);
const IconThisPCMini: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
    <rect x="2" y="3" width="12" height="8" rx="0.6" fill="#7eb8e0" stroke="#2a3a4c" />
    <path d="M6 13 H10 M5 13 H11" stroke="#3a4858" />
    <path d="M6 11 L5.5 13 M10 11 L10.5 13" stroke="#3a4858" />
  </svg>
);
const IconRecycleMini: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round">
    <path d="M4 5 H12 M6 5 V4 a1 1 0 0 1 1-1 H9 a1 1 0 0 1 1 1 V5" />
    <path d="M5 5 L5.5 13 a1 1 0 0 0 1 1 H9.5 a1 1 0 0 0 1-1 L11 5" />
    <path d="M7 7 V11 M9 7 V11" />
  </svg>
);
const IconNetwork: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
    <path d="M2.5 8.5 a7 7 0 0 1 11 0" />
    <path d="M4.5 10.5 a4.5 4.5 0 0 1 7 0" />
    <circle cx="8" cy="12.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const IconDesktop: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
    <rect x="2" y="3" width="12" height="8" rx="0.6" fill="#cfe8fc" />
    <path d="M6 13 H10 M8 11 V13" />
    <path d="M4 9 H12" stroke="#7a7a7a" />
  </svg>
);
const IconDownload: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2 V10 M5 7 L8 10 L11 7" />
    <path d="M3 13 H13" />
  </svg>
);
const IconDoc: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
    <path d="M4 2 H9 L12 5 V14 H4 Z" fill="#fff" />
    <path d="M9 2 V5 H12" />
    <path d="M6 8 H10 M6 10 H10 M6 12 H9" stroke="#4a90d9" />
  </svg>
);

/* ---------- Data ---------- */

type RecycleFile = { name: string; origin: string; date: string };
const recycleFiles: RecycleFile[] = [
  { name: '废稿', origin: 'D:\\Posts', date: '2026/6/21 14:32' },
  { name: '荒废的项目', origin: 'D:\\Projects', date: '2026/5/3 09:17' },
];

/* ---------- Component ---------- */

function CommandButton({ icon: Icon, label, onClick, disabled }: {
  icon: React.FC<{ className?: string }>;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={label}
      className="flex items-center justify-center h-8 px-2 rounded-md text-gray-700 hover:bg-black/[0.06] active:bg-black/[0.1] disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}

function NavItem({ icon: Icon, label, depth = 0, active, expanded, hasChevron, onClick }: {
  icon: React.FC<{ className?: string }>;
  label: string;
  depth?: number;
  active?: boolean;
  expanded?: boolean;
  hasChevron?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`group flex items-center h-7 rounded-md cursor-pointer text-[12.5px] transition-colors ${
        active ? 'bg-[#cfe8fc] text-[#003e7e]' : 'text-[#1f1f1f] hover:bg-black/[0.05]'
      }`}
      style={{ paddingLeft: `${6 + depth * 14}px`, paddingRight: '6px' }}
    >
      {hasChevron && (
        <IconChevron className={`w-3 h-3 mr-0.5 flex-shrink-0 text-gray-500 transition-transform ${expanded ? 'rotate-90' : ''}`} />
      )}
      {!hasChevron && <span className="w-3.5 flex-shrink-0" />}
      <Icon className="w-4 h-4 mr-1.5 flex-shrink-0" />
      <span className="truncate">{label}</span>
    </div>
  );
}

export default function RecycleBinPage() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col" style={{ background: '#fbfbfb' }}>
      {/* ===== Command bar ===== */}
      <div className="flex items-center h-10 px-2 gap-0.5 border-b border-[#e5e5e5] flex-shrink-0" style={{ background: '#f5f6f7' }}>
        <CommandButton icon={IconNew} label="新建" disabled />
        <div className="w-px h-5 bg-black/10 mx-1" />
        <div className="flex items-center h-8 px-1 rounded-md hover:bg-black/[0.06] cursor-default text-[12px] text-gray-700 gap-1.5">
          <IconCut className="w-4 h-4" />
          <span className="hidden sm:inline">剪切</span>
        </div>
        <div className="flex items-center h-8 px-1 rounded-md hover:bg-black/[0.06] cursor-default text-[12px] text-gray-700 gap-1.5">
          <IconCopy className="w-4 h-4" />
          <span className="hidden sm:inline">复制</span>
        </div>
        <div className="flex items-center h-8 px-1 rounded-md hover:bg-black/[0.06] cursor-default text-[12px] text-gray-700 gap-1.5">
          <IconRename className="w-4 h-4" />
          <span className="hidden sm:inline">重命名</span>
        </div>
        <div className="flex items-center h-8 px-1 rounded-md hover:bg-black/[0.06] cursor-default text-[12px] text-gray-700 gap-1.5">
          <IconShare className="w-4 h-4" />
          <span className="hidden sm:inline">共享</span>
        </div>
        <div className="flex items-center h-8 px-1 rounded-md hover:bg-black/[0.06] cursor-default text-[12px] text-gray-700 gap-1.5">
          <IconDelete className="w-4 h-4" />
          <span className="hidden sm:inline">删除</span>
        </div>
        <div className="w-px h-5 bg-black/10 mx-1" />
        <div className="flex items-center h-8 px-1 rounded-md hover:bg-black/[0.06] cursor-default text-[12px] text-gray-700 gap-1.5">
          <IconSort className="w-4 h-4" />
          <span className="hidden sm:inline">排序</span>
        </div>
        <div className="flex items-center h-8 px-1 rounded-md hover:bg-black/[0.06] cursor-default text-[12px] text-gray-700 gap-1.5">
          <IconView className="w-4 h-4" />
          <span className="hidden sm:inline">查看</span>
        </div>
        <div className="flex-1" />
        <CommandButton icon={IconMore} label="更多" />
      </div>

      {/* ===== Address / breadcrumb bar ===== */}
      <div className="flex items-center h-9 px-2 gap-1 border-b border-[#e5e5e5] flex-shrink-0" style={{ background: '#fbfbfb' }}>
        <CommandButton icon={IconBack} label="后退" disabled />
        <CommandButton icon={IconForward} label="前进" disabled />
        <CommandButton icon={IconUp} label="向上" disabled />
        <CommandButton icon={IconRefresh} label="刷新" />
        <div className="flex items-center h-7 flex-1 ml-1 px-2 rounded-md border border-[#d0d0d0] bg-white text-[12px] text-gray-700 max-w-[440px] min-w-0">
          <IconRecycleMini className="w-4 h-4 mr-1.5 text-gray-600 flex-shrink-0" />
          <span className="truncate text-gray-700">回收站</span>
        </div>
        <div className="flex items-center h-7 px-2 ml-auto rounded-md border border-[#d0d0d0] bg-white w-[150px] flex-shrink-0">
          <IconSearch className="w-3.5 h-3.5 text-gray-500 mr-1.5" />
          <input
            type="text"
            placeholder="搜索回收站"
            className="bg-transparent outline-none text-[12px] text-gray-700 placeholder-gray-400 w-full"
          />
        </div>
      </div>

      {/* ===== Main: sidebar + content ===== */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        {/* Left navigation pane */}
        <div
          className="w-[180px] flex-shrink-0 overflow-y-auto py-1.5 px-1.5 border-r border-[#e5e5e5]"
          style={{ background: '#fafafa' }}
        >
          <NavItem icon={IconStar} label="快速访问" depth={0} hasChevron expanded />
          <NavItem icon={IconDesktop} label="桌面" depth={1} />
          <NavItem icon={IconDownload} label="下载" depth={1} />
          <NavItem icon={IconDoc} label="文档" depth={1} />
          <div className="h-1.5" />
          <NavItem icon={IconHome} label="主页" depth={0} />
          <div className="h-1.5" />
          <NavItem icon={IconThisPCMini} label="此电脑" depth={0} hasChevron />
          <div className="h-1.5" />
          <NavItem icon={IconRecycleMini} label="回收站" depth={0} active />
          <div className="h-1.5" />
          <NavItem icon={IconNetwork} label="网络" depth={0} />
        </div>

        {/* Content area */}
        <div className="flex-1 min-w-0 overflow-y-auto" style={{ background: '#fbfbfb' }}>
          <div className="p-3">
            <div className="flex items-center mb-1.5 px-1">
              <IconChevron className="w-3 h-3 mr-1 text-gray-500 rotate-90" />
              <span className="text-[13px] font-semibold text-gray-700">回收站 (D:)</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {recycleFiles.map((f) => (
                <div
                  key={f.name}
                  onClick={() => setSelectedItem(f.name)}
                  className={`flex flex-col items-center gap-1 px-2 py-3 rounded-md cursor-default transition-colors ${
                    selectedItem === f.name ? 'bg-[#cfe8fc]' : 'hover:bg-black/[0.05]'
                  }`}
                  title={`${f.name}\n原位置: ${f.origin}\n删除日期: ${f.date}`}
                >
                  <FolderIcon className="w-11 h-11 flex-shrink-0" />
                  <span className="text-[12px] text-gray-800 truncate max-w-full">{f.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== Status bar ===== */}
      <div className="flex items-center h-6 px-3 border-t border-[#e5e5e5] text-[11px] text-gray-500 flex-shrink-0" style={{ background: '#f5f6f7' }}>
        <span>{recycleFiles.length} 个项目</span>
        {selectedItem && <span className="ml-3">| 已选中 1 个项目</span>}
      </div>
    </div>
  );
}
