'use client';

import React from 'react';
import { menuLinks } from '@/lib/constants';

interface MenuBarProps {
  onNavigate?: (iconId: string) => void;
}

export default function MenuBar({ onNavigate }: MenuBarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-10 z-50 flex items-center px-4 select-none backdrop-blur border-b border-gray-200" style={{ background: 'rgba(232, 234, 240, 0.9)' }}>
      {/* Left: Logo */}
      <div className="flex items-center gap-2 mr-8">
        <img src="/touxiang.jpg" alt="Topaz Blog" className="w-5 h-5 rounded-full object-cover" />
        <span className="text-gray-900 font-bold text-sm tracking-wide">Topaz Blog</span>
      </div>

      {/* Center: Navigation */}
      <nav className="hidden md:flex items-center gap-4 absolute left-1/2 -translate-x-1/2">
        {menuLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => {
              if (onNavigate && link.iconId) {
                e.preventDefault();
                onNavigate(link.iconId);
              }
            }}
            className="text-gray-600 hover:text-gray-900 px-4 py-1 text-sm rounded transition-colors hover:bg-gray-100 cursor-pointer"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}