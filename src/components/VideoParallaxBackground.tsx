'use client';

import { useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

// 视差配置：鼠标从屏幕中心移到左右边缘时，视频最多水平平移 15px（仅左右，无上下）
const PARALLAX_RANGE_PX = 15;
// 防露边：仅放大水平方向，垂直比例保持原样
const SCALE_X = 1.12;

// Spring 配置：低弹跳、柔和追逐
const SPRING_CONFIG = {
  stiffness: 120,
  damping: 22,
  mass: 0.6,
};

export default function VideoParallaxBackground() {
  const reduceMotion = useReducedMotion();

  // 归一化鼠标 X 坐标 [-1, 1]，0 为屏幕中心
  const mx = useMotionValue(0);

  // Spring 平滑追逐
  const sx = useSpring(mx, SPRING_CONFIG);

  // 映射到水平像素位移 [-15, 15]，clamp 默认开启防过冲
  const pxX = useTransform(sx, [-1, 1], [-PARALLAX_RANGE_PX, PARALLAX_RANGE_PX]);

  useEffect(() => {
    if (reduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      mx.set(nx);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reduceMotion, mx]);

  return (
    <motion.video
      className="absolute inset-0 w-full h-full object-cover"
      poster="/poster.jpg"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      style={{
        x: reduceMotion ? 0 : pxX,
        scaleX: SCALE_X,
        willChange: 'transform',
      }}
    >
      <source
        src="/yasuo.mp4"
        type="video/mp4"
      />
    </motion.video>
  );
}
