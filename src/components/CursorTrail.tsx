'use client';

import { useEffect, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  time: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

const MAX_AGE = 900; // 拖尾点存活时间（ms），更长更连贯
const CAPTURE_INTERVAL = 4; // 鼠标采样间隔（ms），更密集
const MAX_POINTS = 160; // 最大保留点数，更多更连贯
const BASE_WIDTH = 6; // 基础线宽（CSS 像素），更粗减少断裂感
const PARTICLE_COUNT = 50;
const COLORS = {
  bright: '#00c8e0', // 主色调：柔和的青蓝色
  mid: '#00a2c6', // 中段颜色
  deep: '#006b85', // 较深处
  glow: 'rgba(0, 160, 192, 0.45)', // 发光颜色，透明度降低
  fade: 'rgba(0, 160, 192, 0)',
  particle: 'rgba(0, 180, 210, 0.12)',
};

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<TrailPoint[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const lastCaptureRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const dprRef = useRef<number>(1);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      dprRef.current = dpr;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const debouncedResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 150);
    };

    const initParticles = () => {
      const rect = container.getBoundingClientRect();
      const particles: Particle[] = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          life: Math.random() * 3000,
          maxLife: 3000 + Math.random() * 4000,
          size: 0.5 + Math.random() * 1.5,
        });
      }
      particlesRef.current = particles;
    };

    const toLocalPoint = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const addPoint = (x: number, y: number, now: number) => {
      const points = pointsRef.current;
      const prev = points[points.length - 1];

      if (prev) {
        const dx = x - prev.x;
        const dy = y - prev.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const step = 6; // 每 6 像素插一个中间点
        if (dist > step) {
          const steps = Math.floor(dist / step);
          for (let i = 1; i < steps; i++) {
            const t = i / steps;
            points.push({
              x: prev.x + dx * t,
              y: prev.y + dy * t,
              time: now - (1 - t) * CAPTURE_INTERVAL,
            });
          }
        }
      }

      points.push({ x, y, time: now });
      if (points.length > MAX_POINTS) {
        pointsRef.current = points.slice(-MAX_POINTS);
      }
    };

    const handleMove = (clientX: number, clientY: number) => {
      const local = toLocalPoint(clientX, clientY);
      mouseRef.current = local;
      const now = performance.now();
      if (now - lastCaptureRef.current < CAPTURE_INTERVAL) return;
      lastCaptureRef.current = now;
      addPoint(local.x, local.y, now);
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    const drawParticles = () => {
      const rect = container.getBoundingClientRect();
      const particles = particlesRef.current;
      ctx.fillStyle = COLORS.particle;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life += 16;

        if (p.life > p.maxLife) {
          p.x = Math.random() * rect.width;
          p.y = Math.random() * rect.height;
          p.life = 0;
          p.maxLife = 3000 + Math.random() * 4000;
        }

        const opacity = 0.15 * Math.sin((p.life / p.maxLife) * Math.PI);
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const drawTrail = (now: number) => {
      const points = pointsRef.current;
      if (points.length < 2) return;

      // 过滤过期点
      while (points.length > 0 && now - points[0].time > MAX_AGE) {
        points.shift();
      }
      if (points.length < 2) return;

      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // 使用二次贝塞尔中点法绘制平滑曲线
      let prevMidX = (points[0].x + points[1].x) / 2;
      let prevMidY = (points[0].y + points[1].y) / 2;

      for (let i = 1; i < points.length - 1; i++) {
        const p = points[i];
        const nextP = points[i + 1];
        const midX = (p.x + nextP.x) / 2;
        const midY = (p.y + nextP.y) / 2;

        const life = 1 - Math.max(0, Math.min(1, (now - p.time) / MAX_AGE));
        const width = BASE_WIDTH * (Math.sin(life * Math.PI) * 0.85 + 0.3);

        // 渐变：从透明到青蓝，再到亮青蓝，不用白色
        const gradient = ctx.createLinearGradient(prevMidX, prevMidY, midX, midY);
        gradient.addColorStop(0, COLORS.fade);
        gradient.addColorStop(0.45, `rgba(0, 162, 198, ${0.35 + life * 0.3})`);
        gradient.addColorStop(1, COLORS.bright);

        ctx.beginPath();
        ctx.moveTo(prevMidX, prevMidY);
        ctx.quadraticCurveTo(p.x, p.y, midX, midY);

        ctx.lineWidth = width;
        ctx.strokeStyle = gradient;
        ctx.shadowBlur = 14 + life * 6;
        ctx.shadowColor = COLORS.glow;
        ctx.stroke();

        prevMidX = midX;
        prevMidY = midY;
      }

      ctx.restore();
    };

    const render = () => {
      if (!isVisibleRef.current) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      const rect = container.getBoundingClientRect();
      const now = performance.now();

      ctx.clearRect(0, 0, rect.width, rect.height);

      drawParticles();
      drawTrail(now);

      rafRef.current = requestAnimationFrame(render);
    };

    const onVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
    };

    // 初始化
    resize();
    initParticles();

    // 事件监听
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('resize', debouncedResize);
    document.addEventListener('visibilitychange', onVisibilityChange);

    // 启动渲染循环
    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', debouncedResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 top-10 pb-9 pointer-events-none"
      style={{ zIndex: 10 }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
