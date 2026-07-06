'use client';

import React from 'react';
import { PostHogLogo } from './icons';
import { menuLinks } from '@/lib/constants';

interface MenuBarProps {
  onNavigate?: (iconId: string) => void;
}

export default function MenuBar({ onNavigate }: MenuBarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-12 z-50 flex items-center px-4 select-none backdrop-blur border-b border-gray-200" style={{ background: 'rgba(232, 234, 240, 0.9)' }}>
      {/* Left: Logo */}
      <div className="flex items-center gap-2 mr-8">
        <PostHogLogo className="w-5 h-5" />
        <span className="text-gray-900 font-bold text-sm tracking-wide">Topaz Blog</span>
      </div>

      {/* Center: Navigation */}
      <nav className="hidden md:flex items-center gap-1 flex-1">
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
            className="text-gray-600 hover:text-gray-900 px-3 py-1 text-sm rounded transition-colors hover:bg-gray-100 cursor-pointer"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Search */}
        <button className="text-gray-400 hover:text-gray-600 p-1.5 rounded transition-colors hover:bg-gray-100">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Notifications */}
        <button className="text-gray-400 hover:text-gray-600 p-1.5 rounded transition-colors hover:bg-gray-100">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        {/* User */}
        <button className="text-gray-400 hover:text-gray-600 p-1 rounded transition-colors hover:bg-gray-100">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </header>
  );
}