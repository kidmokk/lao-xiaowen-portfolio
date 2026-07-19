"use client";

import { useEffect, useRef } from "react";

type DotGridProps = {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  maxSpeed?: number;
  resistance?: number;
  returnDuration?: number;
};

type Dot = {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type PointerState = {
  x: number;
  y: number;
  previousX: number;
  previousY: number;
  previousTime: number;
  inside: boolean;
};

const parseHex = (hex: string) => {
  const value = hex.replace("#", "");
  const normalized = value.length === 3
    ? value.split("").map((character) => character + character).join("")
    : value.padEnd(6, "0").slice(0, 6);

  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  };
};

export default function DotGrid({
  dotSize = 8,
  gap = 32,
  baseColor = "#000000",
  activeColor = "#EAB308",
  proximity = 150,
  speedTrigger = 200,
  shockRadius = 220,
  shockStrength = 4,
  maxSpeed = 3000,
  resistance = 700,
  returnDuration = 1.5,
}: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef<PointerState>({
    x: -9999,
    y: -9999,
    previousX: -9999,
    previousY: -9999,
    previousTime: 0,
    inside: false,
  });
  const shockRef = useRef({ x: 0, y: 0, start: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const interactionTarget = parent.closest<HTMLElement>(".hero") ?? parent;

    const context = canvas.getContext("2d");
    if (!context) return;

    const base = parseHex(baseColor);
    const active = parseHex(activeColor);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let animationId = 0;
    let previousFrame = performance.now();
    let previousDraw = 0;
    let previousImpulse = 0;
    let visible = false;

    const rebuildGrid = () => {
      const rect = parent.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.25);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const columns = Math.ceil(width / gap) + 2;
      const rows = Math.ceil(height / gap) + 2;
      const offsetX = (width - (columns - 1) * gap) / 2;
      const offsetY = (height - (rows - 1) * gap) / 2;
      dotsRef.current = [];

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const x = offsetX + column * gap;
          const y = offsetY + row * gap;
          dotsRef.current.push({ baseX: x, baseY: y, x, y, vx: 0, vy: 0 });
        }
      }
    };

    const resizeObserver = new ResizeObserver(rebuildGrid);
    resizeObserver.observe(parent);
    rebuildGrid();

    const applyImpulse = (centerX: number, centerY: number, radius: number, strength: number) => {
      if (reducedMotion) return;

      for (const dot of dotsRef.current) {
        const dx = dot.x - centerX;
        const dy = dot.y - centerY;
        const distance = Math.hypot(dx, dy) || 1;
        if (distance > radius) continue;

        const force = (1 - distance / radius) * strength;
        dot.vx += (dx / distance) * force;
        dot.vy += (dy / distance) * force;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const inside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
      const now = performance.now();
      const pointer = pointerRef.current;

      if (inside && pointer.inside && pointer.previousTime > 0) {
        const elapsed = Math.max(1, now - pointer.previousTime) / 1000;
        const velocityX = (x - pointer.previousX) / elapsed;
        const velocityY = (y - pointer.previousY) / elapsed;
        const speed = Math.min(maxSpeed, Math.hypot(velocityX, velocityY));

        if (speed > speedTrigger && now - previousImpulse > 32) {
          const strength = ((speed - speedTrigger) / Math.max(1, maxSpeed - speedTrigger)) * shockStrength * 75;
          applyImpulse(x, y, proximity, strength);
          previousImpulse = now;
        }
      }

      pointer.x = x;
      pointer.y = y;
      pointer.previousX = x;
      pointer.previousY = y;
      pointer.previousTime = now;
      pointer.inside = inside;
    };

    const handlePointerDown = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;

      shockRef.current = { x, y, start: performance.now() };
      applyImpulse(x, y, shockRadius, shockStrength * 90);
    };

    const handlePointerLeave = () => {
      pointerRef.current.inside = false;
    };

    interactionTarget.addEventListener("pointermove", handlePointerMove, { passive: true });
    interactionTarget.addEventListener("pointerdown", handlePointerDown, { passive: true });
    interactionTarget.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    const draw = (timestamp: number) => {
      if (!visible) return;
      animationId = requestAnimationFrame(draw);
      const frameInterval = reducedMotion ? 1000 / 20 : 1000 / 45;
      if (timestamp - previousDraw < frameInterval) return;
      previousDraw = timestamp;
      const delta = Math.min(0.033, Math.max(0.001, (timestamp - previousFrame) / 1000));
      previousFrame = timestamp;
      context.clearRect(0, 0, width, height);

      const pointer = pointerRef.current;
      const shockAge = timestamp - shockRef.current.start;
      const shockProgress = Math.min(1, Math.max(0, shockAge / 700));
      const shockWaveRadius = shockRadius * shockProgress;
      const spring = 42 / Math.max(0.35, returnDuration * returnDuration);
      const damping = Math.exp(-delta * resistance / 115);

      for (const dot of dotsRef.current) {
        if (!reducedMotion) {
          dot.vx += (dot.baseX - dot.x) * spring * delta;
          dot.vy += (dot.baseY - dot.y) * spring * delta;
          dot.vx *= damping;
          dot.vy *= damping;

          const velocity = Math.hypot(dot.vx, dot.vy);
          if (velocity > maxSpeed) {
            dot.vx = (dot.vx / velocity) * maxSpeed;
            dot.vy = (dot.vy / velocity) * maxSpeed;
          }

          dot.x += dot.vx * delta;
          dot.y += dot.vy * delta;
        }

        const pointerDistance = pointer.inside ? Math.hypot(dot.x - pointer.x, dot.y - pointer.y) : Infinity;
        const proximityAmount = Math.max(0, 1 - pointerDistance / proximity);
        const shockDistance = Math.hypot(dot.x - shockRef.current.x, dot.y - shockRef.current.y);
        const waveAmount = shockAge < 700
          ? Math.max(0, 1 - Math.abs(shockDistance - shockWaveRadius) / 38)
          : 0;
        const activity = Math.max(proximityAmount, waveAmount);
        const red = Math.round(base.r + (active.r - base.r) * activity);
        const green = Math.round(base.g + (active.g - base.g) * activity);
        const blue = Math.round(base.b + (active.b - base.b) * activity);

        context.globalAlpha = 0.38 + activity * 0.62;
        context.fillStyle = `rgb(${red} ${green} ${blue})`;
        context.beginPath();
        context.arc(dot.x, dot.y, dotSize / 2, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
    };

    const startAnimation = () => {
      if (animationId || !visible) return;
      previousFrame = performance.now();
      previousDraw = 0;
      animationId = requestAnimationFrame(draw);
    };
    const stopAnimation = () => {
      if (animationId) cancelAnimationFrame(animationId);
      animationId = 0;
    };
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
        if (visible) startAnimation();
        else stopAnimation();
      },
      { rootMargin: "120px" },
    );
    visibilityObserver.observe(parent);

    return () => {
      stopAnimation();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      interactionTarget.removeEventListener("pointermove", handlePointerMove);
      interactionTarget.removeEventListener("pointerdown", handlePointerDown);
      interactionTarget.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [activeColor, baseColor, dotSize, gap, maxSpeed, proximity, resistance, returnDuration, shockRadius, shockStrength, speedTrigger]);

  return <canvas ref={canvasRef} className="dot-grid-canvas" aria-hidden="true" />;
}
