import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface HeroDotFieldProps {
  className?: string;
}

/**
 * HeroDotField provides a dense, crisp interactive micro-dot field
 * with localized pointer proximity shading and an independent organic ambient wave.
 *
 * Implements high-DPI canvas rendering, IntersectionObserver lifecycle pausing,
 * and zero React state updates per frame for 60fps performance.
 */
export const HeroDotField: React.FC<HeroDotFieldProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  // Pointer position and interaction state in refs to avoid React re-renders per frame
  const mouseRef = useRef<{ x: number; y: number; active: boolean; currentAlpha: number }>({
    x: -1000,
    y: -1000,
    active: false,
    currentAlpha: 0,
  });

  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check reduced motion & coarse pointer
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const isInteractive = !prefersReducedMotion && !isCoarsePointer;

    let animationFrameId: number = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // V4 Grid configuration: 1.6x higher density and legible localized proximity
    const pitch = 22; // spacing between dots in CSS px (increased density)
    const dotRadius = 1.15; // base dot radius in CSS px
    const proximityRadius = 125; // local influence reach in CSS px

    // Calibrated contrast thresholds per V4 specification
    // Light: baseline ~0.16 -> hovered ~0.72
    // Dark: baseline ~0.18 -> hovered ~0.82
    const baseAlpha = resolvedTheme === 'dark' ? 0.18 : 0.16;
    const cursorGain = resolvedTheme === 'dark' ? 0.64 : 0.56;

    // Precomputed dot grid
    let dots: { x: number; y: number }[] = [];

    const updateDimensions = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Rebuild stable dot grid
      dots = [];
      const cols = Math.ceil(width / pitch);
      const rows = Math.ceil(height / pitch);
      const offsetX = (width - (cols - 1) * pitch) / 2;
      const offsetY = (height - (rows - 1) * pitch) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            x: offsetX + c * pitch,
            y: offsetY + r * pitch,
          });
        }
      }

      // If static / reduced motion or coarse pointer, draw once
      if (!isInteractive) {
        drawStatic();
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = resolvedTheme === 'dark';
      const r = isDark ? 255 : 20;
      const g = isDark ? 255 : 20;
      const b = isDark ? 255 : 20;
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${baseAlpha.toFixed(3)})`;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // IntersectionObserver to pause rendering when hero is offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting && isInteractive && !animationFrameId) {
            lastTime = performance.now();
            animationFrameId = requestAnimationFrame(render);
          }
        });
      },
      { threshold: 0.05 }
    );

    const parent = canvas.parentElement;
    if (parent) {
      observer.observe(parent);
    }

    // Page Visibility API listener
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisibleRef.current = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      } else {
        isVisibleRef.current = true;
        if (isInteractive) {
          lastTime = performance.now();
          animationFrameId = requestAnimationFrame(render);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Pointer event listeners attached to parent container
    const handlePointerMove = (e: PointerEvent) => {
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = false;
    };

    if (isInteractive && parent) {
      parent.addEventListener('pointermove', handlePointerMove, { passive: true });
      parent.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    }

    // ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    if (parent) {
      resizeObserver.observe(parent);
    }
    updateDimensions();

    // Animation Loop
    let lastTime = performance.now();
    let waveTime = 0;

    const render = (now: number) => {
      if (!isVisibleRef.current) {
        animationFrameId = 0;
        return;
      }

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      waveTime += delta;

      // Smoothly interpolate cursor intensity in/out
      const targetMouseAlpha = mouseRef.current.active ? 1 : 0;
      mouseRef.current.currentAlpha += (targetMouseAlpha - mouseRef.current.currentAlpha) * Math.min(1, delta * 10);

      ctx.clearRect(0, 0, width, height);

      const isDark = resolvedTheme === 'dark';
      const r = isDark ? 255 : 20;
      const g = isDark ? 255 : 20;
      const b = isDark ? 255 : 20;

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const mouseGainFactor = mouseRef.current.currentAlpha;

      // Draw all dots with localized proximity and independent ambient wave
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        // 1. Independent ambient wave (period ~11s, subtle amplitude 0.035)
        const ambientWave = Math.sin(dot.x * 0.014 + dot.y * 0.016 - waveTime * 0.55) * 0.035;

        // 2. Localized cursor proximity with smooth cubic smoothstep falloff
        let proximityGain = 0;
        if (mouseGainFactor > 0.005) {
          const dx = dot.x - mouseX;
          const dy = dot.y - mouseY;
          const dist = Math.hypot(dx, dy);

          if (dist < proximityRadius) {
            const normalized = 1 - dist / proximityRadius;
            // Smooth cubic easing: 3p^2 - 2p^3
            const smoothed = normalized * normalized * (3 - 2 * normalized);
            proximityGain = smoothed * cursorGain * mouseGainFactor;
          }
        }

        const alpha = Math.max(0.04, Math.min(0.88, baseAlpha + ambientWave + proximityGain));

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    if (isInteractive) {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (parent) {
        parent.removeEventListener('pointermove', handlePointerMove);
        parent.removeEventListener('pointerleave', handlePointerLeave);
      }
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none -z-10 ${className}`}
      aria-hidden="true"
    />
  );
};
