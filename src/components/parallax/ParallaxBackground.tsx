'use client';

import React, { useState } from 'react';
import ParallaxLayer from './ParallaxLayer';

// 视差背景根容器：铺满 Desktop，overflow-hidden 防止层平移时露边
export default function ParallaxBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* 远层：大面积柔和光晕 */}
      <ParallaxLayer depth={0.05} zIndex={1} className="inset-[-40px]">
        <FarLayerVisual />
      </ParallaxLayer>

      {/* 中层：中等光斑 */}
      <ParallaxLayer depth={0.10} zIndex={2} className="inset-[-40px]">
        <MidLayerVisual />
      </ParallaxLayer>

      {/* 近层：细小星点 */}
      <ParallaxLayer depth={0.15} zIndex={3} className="inset-[-40px]">
        <NearLayerVisual />
      </ParallaxLayer>
    </div>
  );
}

/* ---------------- 远层：柔和光晕 ---------------- */
function FarLayerVisual() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `
          radial-gradient(ellipse 60% 50% at 20% 30%, rgba(0, 120, 212, 0.18), transparent 70%),
          radial-gradient(ellipse 50% 40% at 80% 70%, rgba(0, 200, 224, 0.14), transparent 70%),
          radial-gradient(ellipse 70% 60% at 50% 50%, rgba(59, 130, 246, 0.10), transparent 75%)
        `,
        filter: 'blur(20px)',
      }}
    />
  );
}

/* ---------------- 中层：中等光斑 ---------------- */
const MID_SPOTS = [
  { x: 15, y: 25, size: 180, color: 'rgba(0, 120, 212, 0.22)' },
  { x: 75, y: 20, size: 140, color: 'rgba(0, 200, 224, 0.18)' },
  { x: 40, y: 75, size: 200, color: 'rgba(59, 130, 246, 0.20)' },
  { x: 85, y: 85, size: 120, color: 'rgba(96, 165, 250, 0.16)' },
  { x: 10, y: 60, size: 160, color: 'rgba(0, 200, 224, 0.14)' },
  { x: 60, y: 40, size: 100, color: 'rgba(0, 120, 212, 0.24)' },
  { x: 30, y: 90, size: 130, color: 'rgba(59, 130, 246, 0.18)' },
  { x: 90, y: 50, size: 110, color: 'rgba(0, 200, 224, 0.20)' },
];

function MidLayerVisual() {
  return (
    <div className="absolute inset-0">
      {MID_SPOTS.map((spot, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${spot.x}%`,
            top: `${spot.y}%`,
            width: `${spot.size}px`,
            height: `${spot.size}px`,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${spot.color}, transparent 70%)`,
            filter: 'blur(8px)',
          }}
        />
      ))}
    </div>
  );
}

/* ---------------- 近层：细小星点 ---------------- */
// 程序生成 count 个星点的 box-shadow 字符串
function generateStarShadows(count: number): string {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    const size = Math.random() > 0.7 ? 2 : 1; // 30% 概率 2px，其余 1px
    const alpha = 0.4 + Math.random() * 0.5; // 0.4-0.9 透明度
    shadows.push(`${x}vw ${y}vh 0 ${size}px rgba(255, 255, 255, ${alpha.toFixed(2)})`);
  }
  return shadows.join(', ');
}

function NearLayerVisual() {
  // useState 初始化函数只在客户端首次渲染时执行，避免 SSR hydration mismatch
  const [starShadows] = useState(() => generateStarShadows(40));
  return (
    <div className="absolute inset-0">
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          boxShadow: starShadows,
        }}
      />
    </div>
  );
}
