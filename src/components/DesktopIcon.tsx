'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DesktopIconData } from '@/lib/constants';
import {
  FileIcon, FolderIcon, TrashIcon, SignupIcon, PricingIcon,
  DemoIcon, DocsIcon, EmailIcon, QuestionIcon,
  ChangelogIcon, HandbookIcon, StoreIcon, WorkIcon, SwitchModeIcon, ProductOSIcon, GitHubIcon,
} from './icons';

export const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  home: FileIcon,
  signup: SignupIcon,
  'product-os': ProductOSIcon,
  'switch-mode': SwitchModeIcon,
  pricing: PricingIcon,
  customers: FolderIcon,
  demo: DemoIcon,
  docs: DocsIcon,
  talk: EmailIcon,
  question: QuestionIcon,
  why: GitHubIcon,
  changelog: ChangelogIcon,
  handbook: HandbookIcon,
  store: StoreIcon,
  work: WorkIcon,
  trash: TrashIcon,
};

interface DesktopIconProps {
  icon: DesktopIconData;
  isSelected: boolean;
  onClick: (id: string) => void;
  onDoubleClick: (id: string) => void;
}

export default function DesktopIcon({ icon, isSelected, onClick, onDoubleClick }: DesktopIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = iconMap[icon.id] || FileIcon;

  return (
    <motion.div
      className={`desktop-icon flex flex-col items-center gap-1 cursor-pointer select-none ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(icon.id)}
      onDoubleClick={() => onDoubleClick(icon.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{ width: '75px' }}
    >
      <motion.div
        className="relative"
        animate={{ y: isHovered ? -2 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <IconComponent className="w-10 h-10 md:w-11 md:h-11 drop-shadow-md" />
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-blue-500/10 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
          />
        )}
      </motion.div>
      <span
        className={`icon-label text-xs text-center leading-tight max-w-full break-words ${
          isSelected 
            ? 'text-blue-400' 
            : 'text-white'
        }`}
        style={{
          textShadow: '0 1px 3px rgba(0,0,0,0.6)',
        }}
      >
        {icon.label}
      </span>
    </motion.div>
  );
}