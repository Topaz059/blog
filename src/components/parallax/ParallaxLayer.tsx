'use client';

import React, { ReactNode } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useParallax } from './ParallaxContext';

interface ParallaxLayerProps {
  /** 视差深度系数，越大移动越多。depth * scale = 最大位移像素 */
  depth: number;
  /** 全局缩放，默认 200。depth=0.15 → 位移 30px */
  scale?: number;
  /** 层级 z-index */
  zIndex?: number;
  /** 指针事件，默认 none 不拦截点击；第二/三档扩展时传 auto */
  pointerEvents?: 'auto' | 'none';
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}

export default function ParallaxLayer({
  depth,
  scale = 200,
  zIndex,
  pointerEvents = 'none',
  className = '',
  style,
  children,
}: ParallaxLayerProps) {
  const { mx, my } = useParallax();

  // 将归一化鼠标坐标映射为本层位移像素值
  const maxOffset = depth * scale;
  const x = useTransform(mx, [-1, 1], [-maxOffset, maxOffset]);
  const y = useTransform(my, [-1, 1], [-maxOffset, maxOffset]);

  return (
    <motion.div
      className={`absolute ${className}`}
      style={{
        x,
        y,
        zIndex,
        willChange: 'transform',
        pointerEvents,
        ...style,
      }}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  );
}
