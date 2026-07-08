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
  const [isVolumeSliderOpen, setIsVolumeSliderOpen] = useState(false);
  const [volume, setVolume] = useState(50);
  const volumeSliderRef = useRef<HTMLDivElement>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => new Date());
  const calendarRef = useRef<HTMLDivElement>(null);
  const [isWifiOpen, setIsWifiOpen] = useState(false);
  const [wifiOn, setWifiOn] = useState(true);
  const wifiRef = useRef<HTMLDivElement>(null);

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

  // 音量滑块：点击外部关闭
  useEffect(() => {
    if (!isVolumeSliderOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (volumeSliderRef.current && !volumeSliderRef.current.contains(e.target as Node)) {
        setIsVolumeSliderOpen(false);
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClick);
    }, 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isVolumeSliderOpen]);

  // 日历面板：点击外部关闭
  useEffect(() => {
    if (!isCalendarOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setIsCalendarOpen(false);
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClick);
    }, 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isCalendarOpen]);

  // WiFi 面板：点击外部关闭
  useEffect(() => {
    if (!isWifiOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (wifiRef.current && !wifiRef.current.contains(e.target as Node)) {
        setIsWifiOpen(false);
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClick);
    }, 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isWifiOpen]);

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

        {/* Network / WiFi */}
        <div className="relative">
          <button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => setIsWifiOpen((prev) => !prev)}
            className={`flex items-center justify-center w-8 h-8 rounded transition-colors ${isWifiOpen ? 'bg-black/10' : 'hover:bg-black/5'}`}
            title="网络"
          >
            <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {wifiOn ? (
                <>
                  <path d="M 3.5 12.1 A 10 10 0 0 1 20.5 12.1" />
                  <path d="M 6 13.6 A 7 7 0 0 1 18 13.6" />
                  <path d="M 8.5 15.1 A 4 4 0 0 1 15.5 15.1" />
                  <circle cx="12" cy="17.1" r="1.5" fill="currentColor" stroke="none" />
                </>
              ) : (
                <>
                  <path d="M 3.5 12.1 A 10 10 0 0 1 20.5 12.1" opacity="0.45" />
                  <path d="M 6 13.6 A 7 7 0 0 1 18 13.6" opacity="0.45" />
                  <path d="M 8.5 15.1 A 4 4 0 0 1 15.5 15.1" opacity="0.45" />
                  <circle cx="12" cy="17.1" r="1.5" fill="currentColor" stroke="none" opacity="0.45" />
                  <line x1="4" y1="20" x2="20" y2="4" stroke="#d83b01" strokeWidth="2.2" />
                </>
              )}
            </svg>
          </button>

          {/* WiFi Popup */}
          <AnimatePresence>
            {isWifiOpen && (
              <motion.div
                ref={wifiRef}
                className="absolute bottom-full left-1/2 mb-1 z-50 rounded-md shadow-lg border border-gray-300 overflow-hidden"
                style={{
                  marginLeft: '-120px',
                  width: '240px',
                  background: 'rgba(240, 240, 245, 0.95)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                <div className="p-3">
                  {/* WiFi toggle row */}
                  <div className="flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <svg className={`w-5 h-5 flex-shrink-0 ${wifiOn ? 'text-gray-700' : 'text-gray-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        {wifiOn ? (
                          <>
                            <path d="M 3.5 12.1 A 10 10 0 0 1 20.5 12.1" />
                            <path d="M 6 13.6 A 7 7 0 0 1 18 13.6" />
                            <path d="M 8.5 15.1 A 4 4 0 0 1 15.5 15.1" />
                            <circle cx="12" cy="17.1" r="1.5" fill="currentColor" stroke="none" />
                          </>
                        ) : (
                          <>
                            <path d="M 3.5 12.1 A 10 10 0 0 1 20.5 12.1" opacity="0.45" />
                            <path d="M 6 13.6 A 7 7 0 0 1 18 13.6" opacity="0.45" />
                            <path d="M 8.5 15.1 A 4 4 0 0 1 15.5 15.1" opacity="0.45" />
                            <circle cx="12" cy="17.1" r="1.5" fill="currentColor" stroke="none" opacity="0.45" />
                            <line x1="4" y1="20" x2="20" y2="4" stroke="#d83b01" strokeWidth="2.2" />
                          </>
                        )}
                      </svg>
                      <div className="min-w-0">
                        <div className="text-[12px] font-medium text-gray-800 truncate">WLAN</div>
                        <div className="text-[10.5px] text-gray-500 truncate">{wifiOn ? '已连接 · Topaz-5G' : '未连接'}</div>
                      </div>
                    </div>
                    {/* Toggle switch: off=white, on=blue */}
                    <button
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={() => setWifiOn((v) => !v)}
                      role="switch"
                      aria-checked={wifiOn}
                      title={wifiOn ? '关闭 WLAN' : '打开 WLAN'}
                      className={`relative flex-shrink-0 transition-colors duration-200 ${wifiOn ? 'bg-[#0078d4]' : 'bg-white border border-gray-300'}`}
                      style={{ width: '38px', height: '20px', borderRadius: '10px' }}
                    >
                      <span
                        className={`absolute top-0.5 block transition-all duration-200 ${wifiOn ? 'left-[20px] bg-white' : 'left-[2px] bg-gray-500'}`}
                        style={{ width: '16px', height: '16px', borderRadius: '50%' }}
                      />
                    </button>
                  </div>

                  <div className="h-px bg-gray-300/50 my-1.5" />

                  {/* Network list (cosmetic) */}
                  <div className="space-y-0.5">
                    {[
                      { name: 'Topaz-5G', connected: true, strength: 3 },
                      { name: 'ChinaNet-2.4G', connected: false, strength: 2 },
                      { name: 'CMCC-Web', connected: false, strength: 1 },
                    ].map((net) => (
                      <div
                        key={net.name}
                        onMouseDown={(e) => e.stopPropagation()}
                        className={`flex items-center gap-2.5 px-1.5 py-1.5 rounded cursor-default ${wifiOn ? 'hover:bg-black/5' : 'opacity-40 cursor-not-allowed'}`}
                      >
                        <svg className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          {/* strength 3: 三条弧线全显示；2: 删最外层；1: 只剩最内层 */}
                          {net.strength >= 3 && <path d="M 3.5 12.1 A 10 10 0 0 1 20.5 12.1" />}
                          {net.strength >= 2 && <path d="M 6 13.6 A 7 7 0 0 1 18 13.6" />}
                          {net.strength >= 1 && <path d="M 8.5 15.1 A 4 4 0 0 1 15.5 15.1" />}
                          {net.strength >= 1 && <circle cx="12" cy="17.1" r="1.5" fill="currentColor" stroke="none" />}
                        </svg>
                        <span className="text-[11.5px] text-gray-700 truncate flex-1">{net.name}</span>
                        {net.connected && <span className="text-[10px] text-[#0078d4] flex-shrink-0">已连接</span>}
                      </div>
                    ))}
                  </div>

                  {!wifiOn && (
                    <div className="mt-2 text-center text-[10.5px] text-gray-400">WLAN 已关闭</div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Volume + Slider */}
        <div className="relative">
          <button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => setIsVolumeSliderOpen((prev) => !prev)}
            className={`flex items-center justify-center w-8 h-8 rounded transition-colors ${isVolumeSliderOpen ? 'bg-black/10' : 'hover:bg-black/5'}`}
            title="音量"
          >
            <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8.5v7a4.47 4.47 0 002.5-3.5zM14 3.23v2.06a7 7 0 010 13.42v2.06A9 9 0 0014 3.23z" />
            </svg>
          </button>

          {/* Volume Slider Popup */}
          <AnimatePresence>
            {isVolumeSliderOpen && (
              <motion.div
                ref={volumeSliderRef}
                className="absolute bottom-full left-1/2 mb-1 z-50 rounded-md shadow-lg border border-gray-300 overflow-hidden"
                style={{
                  marginLeft: '-20px',
                  width: '40px',
                  background: 'rgba(240, 240, 245, 0.95)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                <div className="flex flex-col items-center py-2 gap-1">
                  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                    {volume === 0 ? (
                      <path d="M3 9v6h4l5 5V4L7 9H3zm18.29 3.29L19 12.59l-2.29-2.3-1.42 1.42L17.59 14l-2.3 2.29 1.42 1.42L19 15.41l2.29 2.3 1.42-1.42L20.41 14l2.3-2.29-1.42-1.42z" />
                    ) : volume < 50 ? (
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8.5v7a4.47 4.47 0 002.5-3.5z" />
                    ) : (
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8.5v7a4.47 4.47 0 002.5-3.5zM14 3.23v2.06a7 7 0 010 13.42v2.06A9 9 0 0014 3.23z" />
                    )}
                  </svg>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="cursor-pointer"
                    style={{
                      width: '24px',
                      height: '80px',
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      writingMode: 'vertical-lr' as any,
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      WebkitAppearance: 'slider-vertical' as any,
                      transform: 'rotate(180deg)',
                    }}
                  />
                  <span className="text-[10px] text-gray-600 font-medium">{volume}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Clock + Calendar */}
        <div>
          <button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => setIsCalendarOpen((prev) => !prev)}
            title="时间"
            className={`flex flex-col items-center justify-center px-2 h-8 rounded transition-colors text-gray-700 text-xs leading-tight ${isCalendarOpen ? 'bg-black/10' : 'hover:bg-black/5'}`}
          >
            <span>{timeStr}</span>
            <span className="text-[10px] text-gray-400">{dateStr}</span>
          </button>

          {/* Calendar Popup */}
          <AnimatePresence>
            {isCalendarOpen && (
              <motion.div
                ref={calendarRef}
                className="absolute bottom-full -right-1 mb-1 z-50 rounded-md shadow-lg border border-gray-300 overflow-hidden"
                style={{
                  width: '280px',
                  background: 'rgba(240, 240, 245, 0.95)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                {(() => {
                  const fullTime = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
                  const fullDate = now.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });

                  const year = calendarMonth.getFullYear();
                  const month = calendarMonth.getMonth();
                  const firstDay = new Date(year, month, 1);
                  const lastDay = new Date(year, month + 1, 0);
                  const daysInMonth = lastDay.getDate();
                  const prevMonthLastDay = new Date(year, month, 0).getDate();

                  // Monday = 0
                  let firstDayOfWeek = firstDay.getDay() - 1;
                  if (firstDayOfWeek < 0) firstDayOfWeek = 6;

                  const today = new Date();
                  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

                  const weeks = ['一', '二', '三', '四', '五', '六', '日'];
                  const cells: { day: number; isCurrent: boolean }[] = [];
                  for (let i = 0; i < firstDayOfWeek; i++) {
                    cells.push({ day: prevMonthLastDay - firstDayOfWeek + i + 1, isCurrent: false });
                  }
                  for (let d = 1; d <= daysInMonth; d++) {
                    cells.push({ day: d, isCurrent: true });
                  }
                  while (cells.length < 42) {
                    cells.push({ day: cells.length - daysInMonth - firstDayOfWeek + 1, isCurrent: false });
                  }

                  return (
                    <div className="p-3">
                      {/* 大时钟 */}
                      <div className="text-center pb-2 mb-2 border-b border-gray-300/50">
                        <div className="text-2xl font-bold text-gray-800">{fullTime}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{fullDate}</div>
                      </div>
                      {/* 月份导航 */}
                      <div className="flex items-center justify-between mb-2">
                        <button
                          onClick={() => setCalendarMonth(new Date(year, month - 1, 1))}
                          className="w-6 h-6 rounded hover:bg-black/10 flex items-center justify-center transition-colors"
                        >
                          <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <span className="text-xs font-medium text-gray-700">
                          {year}年{month + 1}月
                        </span>
                        <button
                          onClick={() => setCalendarMonth(new Date(year, month + 1, 1))}
                          className="w-6 h-6 rounded hover:bg-black/10 flex items-center justify-center transition-colors"
                        >
                          <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                      {/* 星期标签 */}
                      <div className="grid grid-cols-7 gap-0.5 mb-1">
                        {weeks.map(w => (
                          <div key={w} className="text-center text-[10px] text-gray-400 font-medium">{w}</div>
                        ))}
                      </div>
                      {/* 日期网格 */}
                      <div className="grid grid-cols-7 gap-0.5">
                        {cells.map((cell, i) => {
                          const isToday = isCurrentMonth && cell.isCurrent && cell.day === today.getDate();
                          return (
                            <div
                              key={i}
                              className={`flex items-center justify-center h-7 rounded text-[11px] transition-colors ${
                                isToday
                                  ? 'bg-blue-500 text-white font-bold'
                                  : cell.isCurrent
                                  ? 'text-gray-700 hover:bg-blue-100 cursor-default'
                                  : 'text-gray-300'
                              }`}
                            >
                              {cell.day}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
