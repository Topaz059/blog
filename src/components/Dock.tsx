'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { iconMap } from './DesktopIcon';
import { leftIcons } from '@/lib/constants';
import StartMenu from './StartMenu';

interface TaskbarProps {
  openWindows: string[];
  minimizedWindows: string[];
  onTaskbarClick: (id: string) => void;
  getIconLabel: (id: string) => string;
  onOpen: (id: string) => void;
}

export default function Taskbar({ openWindows, minimizedWindows, onTaskbarClick, getIconLabel, onOpen }: TaskbarProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isTrayOverflowOpen, setIsTrayOverflowOpen] = useState(false);
  const trayOverflowRef = useRef<HTMLDivElement>(null);

  const searchResults = searchQuery
    ? leftIcons.filter(icon => icon.label.includes(searchQuery))
    : [];

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 托盘溢出面板：点击外部关闭
  useEffect(() => {
    if (!isTrayOverflowOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (trayOverflowRef.current && !trayOverflowRef.current.contains(e.target as Node)) {
        setIsTrayOverflowOpen(false);
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClick);
    }, 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isTrayOverflowOpen]);

  const timeStr = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' });

  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-9 z-50 flex items-center px-2"
      style={{
        background: 'rgba(232, 234, 240, 0.88)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      {/* Start Button */}
      <button
        onMouseDown={(e) => e.stopPropagation()}
        onClick={() => setIsStartMenuOpen((prev) => !prev)}
        className={`flex items-center justify-center w-10 h-8 rounded-md transition-colors mr-1 ${isStartMenuOpen ? 'bg-black/10' : 'hover:bg-black/5'}`}
        title="开始"
      >
        <svg viewBox="0 0 16 16" className="w-4 h-4" fill="#333">
          <path d="M1 2l6-1v6H1V2zm0 7h6v6l-6-1V9zm7-8l7-1v6H8V1zm0 7h7v6l-7-1V8z" />
        </svg>
      </button>

      {/* Search */}
      <div className="relative mr-4">
        <div className={`flex items-center gap-2 h-8 px-3 rounded-md transition-colors text-xs ${isSearchFocused ? 'bg-white ring-2 ring-blue-400 text-gray-700' : 'bg-black/5 hover:bg-black/10 text-gray-500'}`}>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            placeholder="Type here to search"
            className="bg-transparent outline-none text-gray-700 placeholder-gray-400 w-28"
          />
        </div>
        {/* 搜索结果下拉列表（向上弹出） */}
        {isSearchFocused && searchQuery && (
          <div className="absolute bottom-full left-0 mb-2 bg-white rounded-md shadow-lg border border-gray-200 py-1 min-w-[180px] z-50">
            {searchResults.length > 0 ? (
              searchResults.map(icon => {
                const Icon = iconMap[icon.id];
                return (
                  <button
                    key={icon.id}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      onOpen(icon.id);
                      setSearchQuery('');
                      setIsSearchFocused(false);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 hover:bg-blue-50 transition-colors text-left"
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    <span className="text-xs text-gray-700">{icon.label}</span>
                  </button>
                );
              })
            ) : (
              <div className="px-3 py-2">
                <span className="text-xs text-gray-400">无匹配结果</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-black/10 mx-1" />

      {/* Open windows - centered */}
      <div className="flex items-center gap-0.5 flex-1 justify-center">
        {openWindows.map((appId) => {
          const Icon = iconMap[appId];
          if (!Icon) return null;
          const isVisible = !minimizedWindows.includes(appId);
          const isHovered = hoveredId === appId;
          const label = getIconLabel(appId);

          return (
            <div key={appId} className="relative flex flex-col items-center">
              <button
                className="relative flex items-center justify-center w-10 h-8 rounded-md hover:bg-black/5 transition-colors"
                onMouseEnter={() => setHoveredId(appId)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onTaskbarClick(appId)}
              >
                <Icon className="w-5 h-5 drop-shadow-sm" />
              </button>
              {/* Active indicator bar: 可见=长蓝条, 最小化=短蓝条 */}
              <motion.div
                className="absolute -bottom-0.5 h-0.5 rounded-full bg-blue-500"
                animate={{
                  width: isVisible ? 12 : 4,
                  opacity: 1,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              />
              {/* Tooltip */}
              {isHovered && (
                <motion.div
                  className="absolute -top-9 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2.5 py-1 rounded whitespace-nowrap pointer-events-none"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.12 }}
                >
                  {label}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-black/10 mx-1" />

      {/* System Tray */}
      <div className="relative flex items-center gap-1">
        {/* Chevron + Overflow Panel */}
        <div className="relative">
          <button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => setIsTrayOverflowOpen((prev) => !prev)}
            className={`flex items-center justify-center w-8 h-8 rounded transition-colors ${isTrayOverflowOpen ? 'bg-black/10' : 'hover:bg-black/5'}`}
            title="显示隐藏的图标"
          >
            <svg className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isTrayOverflowOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>

          {/* Tray Overflow Panel */}
          <AnimatePresence>
            {isTrayOverflowOpen && (
              <motion.div
                ref={trayOverflowRef}
                className="absolute bottom-full mb-1 z-50 rounded-md shadow-lg border border-gray-300 overflow-hidden"
                style={{
                  left: '50%',
                  width: '192px',
                  marginLeft: '-96px',
                  background: 'rgba(240, 240, 245, 0.95)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                <div className="p-2">
                  <div className="grid grid-cols-5 grid-rows-3 gap-1 h-[104px] overflow-hidden">
                    {/* Bluetooth */}
                    <button className="flex items-center justify-center w-8 h-8 rounded hover:bg-blue-500 hover:text-white transition-colors group" title="蓝牙">
                      <svg className="w-4 h-4 text-blue-600 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.71 7.71L12 2h-1v4.29L6.29 1.59 5 2.88 11.12 9 5 15.12l1.29 1.29L11 17.71V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z"/>
                      </svg>
                    </button>
                    {/* Battery */}
                    <button className="flex items-center justify-center w-8 h-8 rounded hover:bg-blue-500 hover:text-white transition-colors group" title="电池">
                      <svg className="w-4 h-4 text-gray-600 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2 8v8h16V8H2zm2 2h12v4H4v-4z"/>
                        <rect x="19" y="10" width="2" height="4" rx="0.5" fill="currentColor"/>
                      </svg>
                    </button>
                    {/* Windows Update */}
                    <button className="flex items-center justify-center w-8 h-8 rounded hover:bg-blue-500 hover:text-white transition-colors group" title="Windows 更新">
                      <svg className="w-4 h-4 text-blue-500 group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12a8 8 0 018-8 8 8 0 016 3m2-3v3h-3M20 12a8 8 0 01-8 8 8 8 0 01-6-3m-2 3v-3h3"/>
                      </svg>
                    </button>
                    {/* OneDrive */}
                    <button className="flex items-center justify-center w-8 h-8 rounded hover:bg-blue-500 hover:text-white transition-colors group" title="OneDrive">
                      <svg className="w-4 h-4 text-blue-500 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.5 18a4.5 4.5 0 010-9 5.5 5.5 0 0110.4 1.5A3.5 3.5 0 0117 18H6.5z"/>
                      </svg>
                    </button>
                    {/* Location */}
                    <button className="flex items-center justify-center w-8 h-8 rounded hover:bg-blue-500 hover:text-white transition-colors group" title="定位">
                      <svg className="w-4 h-4 text-red-500 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
                      </svg>
                    </button>
                    {/* Open windows */}
                    {openWindows.map((appId) => {
                      const Icon = iconMap[appId];
                      if (!Icon) return null;
                      return (
                        <button
                          key={appId}
                          onClick={() => {
                            onTaskbarClick(appId);
                            setIsTrayOverflowOpen(false);
                          }}
                          className="flex items-center justify-center w-8 h-8 rounded hover:bg-blue-500 hover:text-white transition-colors group"
                          title={getIconLabel(appId)}
                        >
                          <Icon className="w-4 h-4 group-hover:text-white" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Network */}
        <button className="flex items-center justify-center w-8 h-8 rounded hover:bg-black/5 transition-colors">
          <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1a7 7 0 00-7 7h1.5A5.5 5.5 0 018 2.5V1zM8 2.5A5.5 5.5 0 012.5 8H4a4 4 0 014-4V2.5zM8 4a4 4 0 00-4 4h1.5A2.5 2.5 0 018 5.5V4zM8 5.5A2.5 2.5 0 005.5 8H7a1 1 0 011-1V5.5z" />
            <circle cx="8" cy="8" r="1.5" />
          </svg>
        </button>

        {/* Volume */}
        <button className="flex items-center justify-center w-8 h-8 rounded hover:bg-black/5 transition-colors">
          <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8.5v7a4.47 4.47 0 002.5-3.5zM14 3.23v2.06a7 7 0 010 13.42v2.06A9 9 0 0014 3.23z" />
          </svg>
        </button>

        {/* Clock */}
        <button className="flex flex-col items-center justify-center px-2 h-8 rounded hover:bg-black/5 transition-colors text-gray-700 text-xs leading-tight">
          <span>{timeStr}</span>
          <span className="text-[10px] text-gray-400">{dateStr}</span>
        </button>

        {/* Show desktop */}
        <button className="w-1.5 h-8 hover:bg-black/5 transition-colors rounded-r-sm" />
      </div>

      {/* Start Menu */}
      <AnimatePresence>
        {isStartMenuOpen && (
          <StartMenu
            onClose={() => setIsStartMenuOpen(false)}
            onOpen={onOpen}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
