"use client";

import { useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const RESOLUTION = 26;

type Spark = { x: number; y: number; life: number; maxLife: number };

type AutomatonState = {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  cols: number;
  rows: number;
  grid: number[][];
  cellAge: number[][];
  sparks: Spark[];
  animating: boolean;
  frameId: number;
  timeoutId: ReturnType<typeof setTimeout> | undefined;
};

function createGrid(cols: number, rows: number) {
  return Array.from({ length: cols }, () => Array(rows).fill(0));
}

function createAgeGrid(cols: number, rows: number) {
  return Array.from({ length: cols }, () => Array(rows).fill(0));
}

export function HeroPixelCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const stateRef = useRef<AutomatonState | null>(null);

  const setup = useCallback((canvas: HTMLCanvasElement) => {
    const parent = canvas.parentElement;
    if (!parent) return null;

    const w = parent.clientWidth;
    const h = parent.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cols = Math.floor(w / RESOLUTION);
    const rows = Math.floor(h / RESOLUTION);
    const grid = createGrid(cols, rows);
    const cellAge = createAgeGrid(cols, rows);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = Math.random() > 0.82 ? 1 : 0;
        cellAge[i][j] = grid[i][j];
      }
    }

    return { ctx, w, h, cols, rows, grid, cellAge };
  }, []);

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const initial = setup(canvas);
    if (!initial) return;

    const state: AutomatonState = {
      ...initial,
      sparks: [],
      animating: true,
      frameId: 0,
      timeoutId: undefined,
    };
    stateRef.current = state;

    const countNeighbors = (grid: number[][], x: number, y: number) => {
      let sum = 0;
      const { cols, rows } = state;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (i === 0 && j === 0) continue;
          const col = (x + i + cols) % cols;
          const row = (y + j + rows) % rows;
          sum += grid[col][row];
        }
      }
      return sum;
    };

    const nextGen = (grid: number[][], cellAge: number[][]) => {
      const next = createGrid(state.cols, state.rows);
      const nextAge = createAgeGrid(state.cols, state.rows);
      for (let i = 0; i < state.cols; i++) {
        for (let j = 0; j < state.rows; j++) {
          const neighbors = countNeighbors(grid, i, j);
          const alive = grid[i][j] === 1;
          if (!alive && neighbors === 3) {
            next[i][j] = 1;
            nextAge[i][j] = 1;
          } else if (alive && (neighbors < 2 || neighbors > 3)) {
            next[i][j] = 0;
            nextAge[i][j] = 0;
          } else {
            next[i][j] = alive ? 1 : 0;
            nextAge[i][j] = alive ? cellAge[i][j] + 1 : 0;
          }
        }
      }
      return { next, nextAge };
    };

    const draw = () => {
      const { ctx, w, h, cols, rows, grid, cellAge, sparks } = state;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (grid[i][j] === 1) {
            const age = cellAge[i][j];
            const hue = 205 + Math.min(age * 2, 40);
            const light = 48 + Math.min(age * 2, 28);
            ctx.fillStyle = `hsla(${hue}, 88%, ${light}%, 0.75)`;
            ctx.fillRect(i * RESOLUTION, j * RESOLUTION, RESOLUTION, RESOLUTION);
          }
        }
      }

      for (let s = sparks.length - 1; s >= 0; s--) {
        const spark = sparks[s];
        spark.life -= 1;
        if (spark.life <= 0) {
          sparks.splice(s, 1);
        } else {
          const opacity = spark.life / spark.maxLife;
          ctx.fillStyle = `hsla(192, 100%, 72%, ${opacity})`;
          ctx.fillRect(spark.x * RESOLUTION, spark.y * RESOLUTION, RESOLUTION, RESOLUTION);
        }
      }
    };

    const loop = () => {
      if (!state.animating) return;
      const { next, nextAge } = nextGen(state.grid, state.cellAge);
      state.grid = next;
      state.cellAge = nextAge;
      draw();
      state.timeoutId = setTimeout(() => {
        state.frameId = requestAnimationFrame(loop);
      }, 220);
    };

    loop();

    const onResize = () => {
      const fresh = setup(canvas);
      if (!fresh || !stateRef.current) return;
      Object.assign(state, {
        ...fresh,
        sparks: state.sparks,
        animating: state.animating,
      });
    };

    const onVisibility = () => {
      state.animating = !document.hidden;
      if (state.animating) loop();
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      state.animating = false;
      cancelAnimationFrame(state.frameId);
      clearTimeout(state.timeoutId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      stateRef.current = null;
    };
  }, [reduced, setup]);

  const addSpark = useCallback((clientX: number, clientY: number) => {
    if (reduced || !stateRef.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const col = Math.floor(x / RESOLUTION);
    const row = Math.floor(y / RESOLUTION);
    stateRef.current.sparks.push({ x: col, y: row, life: 50, maxLife: 50 });
  }, [reduced]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ x: number; y: number }>).detail;
      if (detail) addSpark(detail.x, detail.y);
    };
    window.addEventListener("hero-pixel-spark", handler);
    return () => window.removeEventListener("hero-pixel-spark", handler);
  }, [addSpark]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      id="hero-pixel-canvas"
      className="hero-pixel-canvas absolute inset-0 z-[1] h-full w-full"
      aria-hidden
    />
  );
}
