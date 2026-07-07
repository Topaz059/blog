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
      className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-white/40 p-2.5 cursor-pointer hover:bg-white/85 hover:shadow-md transition-colors"
    >
      <div className="flex gap-2.5">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm"
          style={{ background: getAvatarGradient(friend.name) }}
        >
          {getAvatarInitial(friend.name)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-bold text-gray-800 truncate leading-tight">
            {friend.name}
          </h3>
          <p className="text-[10px] text-gray-400 truncate leading-tight mt-0.5">
            {getDisplayUrl(friend.url)}
          </p>
          <p className="text-[10px] text-gray-500 leading-snug mt-1.5" title={friend.description}>
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
      className="friends-scroll h-full overflow-y-auto p-3"
      style={{
        background: 'linear-gradient(160deg, #e3f6e9 0%, #d0ebd8 50%, #c3e0cb 100%)',
      }}
    >
      <div className="grid grid-cols-3 gap-3">
        {friendsData.map((friend, index) => (
          <FriendCard key={friend.id} friend={friend} index={index} />
        ))}
      </div>
    </div>
  );
}
