'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { iconMap } from './DesktopIcon';
import { leftIcons, rightIcons } from '@/lib/constants';

interface StartMenuProps {
  onClose: () => void;
  onOpen: (id: string) => void;
}

export default function StartMenu({ onClose, onOpen }: StartMenuProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  // 所有应用项（导航 + 外链）
  const allItems = [...leftIcons, ...rightIcons];

  // 搜索过滤
  const filteredItems = searchQuery
    ? allItems.filter((item) => item.label.includes(searchQuery))
    : allItems;

  // 磁贴区：4 个主要入口。invert=false 用图标原色（GitHub 黑圆+白octocat 在黑磁贴上自然醒目），invert=true 用 brightness-0 invert 变白
  const tiles = [
    { id: 'signup', label: '文章', color: '#4a90d9', invert: true },
    { id: 'why', label: 'GitHub', color: '#1a1a1a', invert: false },
    { id: 'changelog', label: 'Bilibili', color: '#FB7299', invert: true },
    { id: 'handbook', label: '此电脑', color: '#4a5a6c', invert: true },
  ];

  // 点击外部关闭（延迟绑定，避免触发打开菜单的那次 mousedown）
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleMouseDown);
    }, 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [onClose]);

  // ESC 关闭
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleItemClick = (id: string) => {
    onOpen(id);
    onClose();
  };

  return (
    <motion.div
      ref={menuRef}
      className="fixed bottom-[38px] left-1 z-50 rounded-lg shadow-2xl border border-gray-300 overflow-hidden flex flex-col"
      style={{
        width: '440px',
        height: '460px',
        background: 'rgba(240, 240, 245, 0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {/* 顶部搜索栏 */}
      <div className="p-2 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-2 h-8 px-3 rounded-md bg-white ring-1 ring-gray-300">
          <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索应用或文件"
            className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 flex-1 min-w-0"
            autoFocus
          />
        </div>
      </div>

      {/* 主体：左列应用列表 + 右列磁贴 */}
      <div className="flex flex-1 min-h-0">
        {/* 左列：应用列表 */}
        <div className="w-40 border-r border-gray-200 overflow-y-auto py-1 flex-shrink-0">
          {filteredItems.map((item) => {
            const Icon = iconMap[item.id];
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="flex items-center gap-2 w-full px-3 py-1.5 hover:bg-blue-500 transition-colors text-left group"
              >
                {Icon && <Icon className="w-5 h-5 flex-shrink-0 group-hover:brightness-0 group-hover:invert" />}
                <span className="text-xs text-gray-700 group-hover:text-white truncate">{item.label}</span>
              </button>
            );
          })}
          {filteredItems.length === 0 && (
            <div className="px-3 py-4 text-center text-xs text-gray-400">无匹配结果</div>
          )}
        </div>

        {/* 右列：磁贴网格 */}
        <div className="flex-1 p-3 overflow-y-auto">
          <div className="text-xs text-gray-500 mb-2 font-medium">固定磁贴</div>
          <div className="grid grid-cols-2 gap-2">
            {tiles.map((tile) => {
              const Icon = iconMap[tile.id];
              return (
                <button
                  key={tile.id}
                  onClick={() => handleItemClick(tile.id)}
                  className="flex flex-col items-center justify-center gap-1.5 rounded-md p-3 hover:opacity-90 transition-opacity"
                  style={{ background: tile.color, height: '76px' }}
                >
                  {Icon && <Icon className={`w-7 h-7 ${tile.invert ? 'brightness-0 invert' : ''}`} />}
                  <span className="text-xs text-white font-medium">{tile.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 底部用户区 */}
      <div className="flex items-center justify-between px-3 h-12 border-t border-gray-200 bg-black/5 flex-shrink-0">
        <button
          type="button"
          onClick={() => { onOpen('pricing'); onClose(); }}
          className="flex items-center gap-2 min-w-0 rounded-md px-1 -mx-1 hover:bg-black/10 transition-colors cursor-pointer"
          title="查看关于"
        >
          <img src="/touxiang.jpg" alt="Topaz Blog" className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
          <span className="text-xs font-medium text-gray-700 truncate">Topaz Blog</span>
        </button>
        <button
          className="flex items-center justify-center w-8 h-8 rounded hover:bg-black/10 transition-colors flex-shrink-0"
          title="电源"
        >
          <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v9M18.36 6.64a9 9 0 11-12.72 0" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
