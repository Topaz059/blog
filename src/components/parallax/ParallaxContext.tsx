'use client';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useMotionValue, useSpring, MotionValue, useReducedMotion } from 'framer-motion';

interface ParallaxContextValue {
  /** 平滑后的归一化鼠标 X，范围 [-1, 1]，左负右正 */
  mx: MotionValue<number>;
  /** 平滑后的归一化鼠标 Y，范围 [-1, 1]，上负下正 */
  my: MotionValue<number>;
  /** 是否启用视差（reduced motion 时为 false） */
  enabled: boolean;
}

const ParallaxContext = createContext<ParallaxContextValue | null>(null);

// Spring 参数：低 stiffness + 适中 damping = 柔和跟随，无振荡
const SPRING_CONFIG = { stiffness: 60, damping: 18, mass: 0.8 };

export function ParallaxProvider({ children }: { children: ReactNode }) {
  const rawMx = useMotionValue(0);
  const rawMy = useMotionValue(0);
  const mx = useSpring(rawMx, SPRING_CONFIG);
  const my = useSpring(rawMy, SPRING_CONFIG);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    // reduced motion 时不绑定监听，mx/my 保持 0，视差静默关闭
    if (shouldReduce) return;

    const onMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      rawMx.set(nx);
      rawMy.set(ny);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [shouldReduce, rawMx, rawMy]);

  return (
    <ParallaxContext.Provider value={{ mx, my, enabled: !shouldReduce }}>
      {children}
    </ParallaxContext.Provider>
  );
}

export function useParallax(): ParallaxContextValue {
  const ctx = useContext(ParallaxContext);
  if (!ctx) throw new Error('useParallax must be used within ParallaxProvider');
  return ctx;
}
