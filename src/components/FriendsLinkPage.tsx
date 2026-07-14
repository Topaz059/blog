'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  friendsData,
  getAvatarGradient,
  getAvatarInitial,
  getDisplayUrl,
  type FriendLink,
} from '@/lib/friendsData';

function FriendCard({ friend, index }: { friend: FriendLink; index: number }) {
  const handleClick = () => {
    window.open(friend.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: 'easeOut' }}
      whileHover={{ scale: 1.03, transition: { duration: 0.15 } }}
      onClick={handleClick}
      className="bg-white rounded-2xl border border-gray-100 cursor-pointer hover:border-[#0078d4]/30 hover:shadow-md transition-colors"
      style={{
        padding: 'clamp(14px, 2cqw, 24px)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      }}
    >
      <div className="flex flex-col items-center text-center" style={{ gap: 'clamp(8px, 1.1cqw, 14px)' }}>
        {/* 圆形头像 */}
        <div
          className="rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 overflow-hidden"
          style={{
            background: friend.avatar ? 'transparent' : getAvatarGradient(friend.name),
            width: 'clamp(48px, 7cqw, 72px)',
            height: 'clamp(48px, 7cqw, 72px)',
            fontSize: 'clamp(18px, 2.6cqw, 28px)',
            border: '2px solid #fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          {friend.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={friend.avatar} alt={friend.name} className="w-full h-full object-cover" draggable={false} />
          ) : (
            getAvatarInitial(friend.name)
          )}
        </div>
        {/* 名称 */}
        <h3
          className="font-semibold text-gray-800 truncate leading-tight"
          style={{ fontSize: 'clamp(14px, 2cqw, 18px)' }}
        >
          {friend.name}
        </h3>
        {/* 网址 */}
        <p
          className="text-[#0078d4] truncate leading-tight"
          style={{ fontSize: 'clamp(11px, 1.5cqw, 13px)' }}
        >
          {getDisplayUrl(friend.url)}
        </p>
        {/* 分隔线 */}
        <div
          style={{
            width: 'clamp(28px, 4cqw, 40px)',
            height: '1.5px',
            background: 'linear-gradient(90deg, transparent, #0078d4, transparent)',
          }}
        />
        {/* 描述 */}
        <p
          className="text-gray-500 leading-snug"
          style={{ fontSize: 'clamp(11px, 1.5cqw, 14px)' }}
          title={friend.description}
        >
          {friend.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function FriendsLinkPage() {
  return (
    <div
      className="h-full w-full flex flex-col items-center overflow-y-auto"
      style={{ background: '#fbfbfb' }}
    >
      <div className="flex-1 flex flex-col items-center w-full px-8 pt-10 pb-6" style={{ containerType: 'inline-size' }}>
        {/* 标题 */}
        <h2
          className="font-semibold text-gray-800"
          style={{ fontSize: 'clamp(20px, 3.4cqw, 28px)' }}
        >
          友链
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

        {/* 互换友链入口（按钮，新标签页打开申请表单） */}
        <div className="flex justify-center mb-8">
          <a
            href="https://v.wjx.cn/vm/tCpUMXG.aspx#"
            target="_blank"
            rel="noopener noreferrer"
            title="互换友链"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#0078d4]/30 text-[#0078d4] hover:bg-[#0078d4] hover:text-white px-4 py-2 text-sm font-medium transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <span>互换友链</span>
          </a>
        </div>

        {/* 卡片网格 */}
        <div
          className="grid grid-cols-3 w-full mx-auto"
          style={{
            gap: 'clamp(12px, 1.8cqw, 24px)',
            maxWidth: '900px',
          }}
        >
          {friendsData.map((friend, index) => (
            <FriendCard key={friend.id} friend={friend} index={index} />
          ))}
        </div>
      </div>

      {/* 底部签名 */}
      <div
        className="w-full text-center py-3 text-gray-400 flex-shrink-0"
        style={{ fontSize: 'clamp(10px, 1.4cqw, 12px)' }}
      >
        © 2026 Topaz · 我的互联网朋友们
      </div>
    </div>
  );
}
