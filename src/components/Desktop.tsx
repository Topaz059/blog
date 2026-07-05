'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DesktopIcon from './DesktopIcon';
import Dock from './Dock'; // Windows-style taskbar
import { leftIcons, rightIcons } from '@/lib/constants';

export default function Desktop() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openWindows, setOpenWindows] = useState<string[]>([]);

  const handleIconClick = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  const handleIconDoubleClick = useCallback((id: string) => {
    setOpenWindows((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w !== id));
  }, []);

  const getIconLabel = (id: string): string => {
    const allIcons = [...leftIcons, ...rightIcons];
    const found = allIcons.find((i) => i.id === id);
    return found?.label || id;
  };

  return (
    <div className="fixed inset-0 top-12 pb-11 overflow-hidden" style={{ backgroundColor: '#1a1a2e' }}>
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/bizhi.mp4" type="video/mp4" />
      </video>

      {/* Center Illustration removed */}

      {/* Left column icons */}
      <div className="absolute left-4 md:left-6 top-3 flex flex-col gap-4 md:gap-5 z-20">
        {leftIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon}
            isSelected={selectedId === icon.id}
            onClick={handleIconClick}
            onDoubleClick={handleIconDoubleClick}
          />
        ))}
      </div>

      {/* Right column icons */}
      <div className="absolute right-4 md:right-6 top-3 flex flex-col gap-4 md:gap-5 z-20">
        {rightIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon}
            isSelected={selectedId === icon.id}
            onClick={handleIconClick}
            onDoubleClick={handleIconDoubleClick}
          />
        ))}
      </div>

      {/* Open windows (simulated) */}
      <AnimatePresence>
        {openWindows.map((windowId, index) => (
          <motion.div
            key={windowId}
            className="absolute bg-white rounded-lg shadow-2xl border border-gray-300 overflow-hidden z-30"
            style={{
              width: '600px',
              height: '500px',
              left: '50%',
              top: '50%',
              marginLeft: '-300px',
              marginTop: '-250px',
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {/* Window title bar - Windows 11 style */}
            <div className="flex items-center justify-between h-9 px-2 bg-white border-b border-gray-200">
              {/* Left: icon + title */}
              <div className="flex items-center gap-2 px-1 min-w-0">
                <div className="w-3.5 h-3.5 bg-blue-500 rounded-sm flex-shrink-0" />
                <span className="text-xs font-medium text-gray-700 truncate">
                  {getIconLabel(windowId)}
                </span>
              </div>
              {/* Right: window controls */}
              <div className="flex items-center h-full flex-shrink-0">
                {/* Minimize */}
                <button
                  className="flex items-center justify-center w-11 h-full hover:bg-gray-200/70 transition-colors"
                  aria-label="Minimize"
                  title="Minimize"
                >
                  <svg className="w-2.5 h-2.5 text-gray-700" viewBox="0 0 10 10" fill="none">
                    <path d="M0 5 H10" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </button>
                {/* Maximize */}
                <button
                  className="flex items-center justify-center w-11 h-full hover:bg-gray-200/70 transition-colors"
                  aria-label="Maximize"
                  title="Maximize"
                >
                  <svg className="w-2.5 h-2.5 text-gray-700" viewBox="0 0 10 10" fill="none">
                    <rect x="0.5" y="0.5" width="9" height="9" stroke="currentColor" strokeWidth="1" fill="none" />
                  </svg>
                </button>
                {/* Close */}
                <button
                  onClick={() => closeWindow(windowId)}
                  className="flex items-center justify-center w-11 h-full hover:bg-red-500 text-gray-700 hover:text-white transition-colors"
                  aria-label="Close"
                  title="Close"
                >
                  <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none">
                    <path d="M0 0 L10 10 M10 0 L0 10" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Window content */}
            <div className="p-4 text-sm text-gray-500">
              <p>This is a placeholder for the <strong>{getIconLabel(windowId)}</strong> page.</p>
              <p className="mt-2">Content will be added later.</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Windows-style Taskbar */}
      <Dock />
    </div>
  );
}