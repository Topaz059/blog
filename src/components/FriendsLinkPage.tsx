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
      className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-white/40 cursor-pointer hover:bg-white/85 hover:shadow-md transition-colors"
      style={{
        padding: 'clamp(10px, 1.6cqw, 22px)',
      }}
    >
      <div className="flex" style={{ gap: 'clamp(8px, 1.1cqw, 16px)' }}>
        <div
          className="rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 shadow-sm"
          style={{
            background: getAvatarGradient(friend.name),
            width: 'clamp(30px, 4.2cqw, 60px)',
            height: 'clamp(30px, 4.2cqw, 60px)',
            fontSize: 'clamp(13px, 2.1cqw, 28px)',
          }}
        >
          {getAvatarInitial(friend.name)}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="font-bold text-gray-800 truncate leading-tight"
            style={{ fontSize: 'clamp(12px, 1.85cqw, 19px)' }}
          >
            {friend.name}
          </h3>
          <p
            className="text-gray-400 truncate leading-tight"
            style={{ fontSize: 'clamp(10px, 1.35cqw, 14px)', marginTop: '2px' }}
          >
            {getDisplayUrl(friend.url)}
          </p>
          <p
            className="text-gray-500 leading-snug"
            style={{
              fontSize: 'clamp(10px, 1.35cqw, 14px)',
              marginTop: 'clamp(4px, 0.7cqw, 10px)',
            }}
            title={friend.description}
          >
            {friend.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function FriendsLinkPage() {
  return (
    <div
      className="friends-scroll h-full overflow-y-auto"
      style={{
        background: 'radial-gradient(at 40% 20%, #1E90FF 0px, transparent 50%), radial-gradient(at 80% 50%, #00BFFF 0px, transparent 50%), radial-gradient(at 20% 80%, #1E90FF 0px, transparent 50%), radial-gradient(at 60% 100%, #00BFFF 0px, transparent 50%), linear-gradient(135deg, #0a3d6b, #1e5c8a)',
        padding: '12px 0',
      }}
    >
      <div
        className="grid grid-cols-3 mx-auto"
        style={{
          containerType: 'inline-size',
          width: '100%',
          maxWidth: '1100px',
          gap: 'clamp(10px, 1.3cqw, 22px)',
          padding: 'clamp(10px, 1.3cqw, 22px)',
        }}
      >
        {friendsData.map((friend, index) => (
          <FriendCard key={friend.id} friend={friend} index={index} />
        ))}
      </div>
    </div>
  );
}
