'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

// 桌面点击波纹：在桌面（含图标）任意位置点击，以鼠标为圆心的蓝色圆形向外扩散。
// 点在窗口 / 页面（.window-container）内部时不产生波纹。
export default function DesktopRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const counter = useRef(0);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      // 在打开的窗口 / 页面里点击，不产生波纹
      if (target && target.closest('.window-container')) return;

      const id = counter.current++;
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 950);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <div className="ripple-layer fixed inset-0 z-[25] pointer-events-none" aria-hidden>
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: r.x,
            top: r.y,
            width: 0,
            height: 0,
            transform: 'translate(-50%, -50%)',
            border: '3px solid rgba(59,130,246,0.95)',
            animation: 'icon-ripple 0.9s ease-out forwards',
          }}
        />
      ))}
    </div>
  );
}
