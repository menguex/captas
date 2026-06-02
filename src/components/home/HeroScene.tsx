"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* ─────────────────────────────────────────────────────
 * Interactive particle wave field — Finder blue palette.
 * Reacts to mouse with spring-like physics.
 * Level: Immersive Garden / Active Theory tier.
 * ─────────────────────────────────────────────────── */

const COUNT = 3200;
const SPREAD = 13;

function WaveField() {
  const points = useRef<THREE.Points>(null);
  const smoothMouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const { positions, base, sizes, colors } = useMemo(() => {
    const p = new Float32Array(COUNT * 3);
    const b = new Float32Array(COUNT * 3);
    const s = new Float32Array(COUNT);
    const c = new Float32Array(COUNT * 3);

    const blue = new THREE.Color("#007AFF");
    const sky = new THREE.Color("#0EA5E9");
    const indigo = new THREE.Color("#5856D6");

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * SPREAD;
      const z = (Math.random() - 0.5) * SPREAD;
      const y = Math.sin(x * 0.5) * Math.cos(z * 0.4) * 0.35;
      p[i * 3] = x;
      p[i * 3 + 1] = y;
      p[i * 3 + 2] = z;
      b[i * 3] = x;
      b[i * 3 + 1] = y;
      b[i * 3 + 2] = z;
      s[i] = Math.random() * 2.8 + 0.5;

      // color variation
      const r = Math.random();
      const col = r < 0.5 ? blue : r < 0.8 ? sky : indigo;
      c[i * 3] = col.r;
      c[i * 3 + 1] = col.g;
      c[i * 3 + 2] = col.b;
    }
    return { positions: p, base: b, sizes: s, colors: c };
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    const attr = points.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const t = state.clock.elapsedTime;

    const mx = state.pointer.x * viewport.width * 0.5;
    const my = state.pointer.y * viewport.height * 0.5;
    smoothMouse.current.x += (mx - smoothMouse.current.x) * 0.03;
    smoothMouse.current.y += (my - smoothMouse.current.y) * 0.03;

    for (let i = 0; i < COUNT; i++) {
      const bx = base[i * 3];
      const bz = base[i * 3 + 2];

      const wave =
        Math.sin(bx * 0.5 + t * 0.25) * 0.3 +
        Math.cos(bz * 0.4 + t * 0.2) * 0.22 +
        Math.sin((bx + bz) * 0.28 + t * 0.12) * 0.15;

      const dx = bx - smoothMouse.current.x;
      const dz = bz - smoothMouse.current.y;
      const dist = Math.sqrt(dx * dx + dz * dz);
      const push = Math.max(0, 1 - dist / 3) * 1.4;

      attr.array[i * 3 + 1] = wave + push;
    }
    attr.needsUpdate = true;
    points.current.rotation.y = t * 0.01;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={COUNT} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} count={COUNT} itemSize={3} />
        <bufferAttribute attach="attributes-size" array={sizes} count={COUNT} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Dust() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const p = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i++) {
      p[i * 3] = (Math.random() - 0.5) * 18;
      p[i * 3 + 1] = (Math.random() - 0.5) * 8;
      p[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    return p;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.005;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.04) * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={400} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.008} color="#A8D8FF" transparent opacity={0.18} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export function HeroScene() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_28%_18%,rgba(61,85,108,0.22),transparent_52%),radial-gradient(ellipse_at_72%_78%,rgba(125,146,168,0.1),transparent_58%),linear-gradient(180deg,#171c24_0%,#0f1218_100%)]" />
    );
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-70"
      style={{
        maskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 85%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 85%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 2.8, 6], fov: 50, near: 0.1, far: 30 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={["#0f1218", 5, 20]} />
        <ambientLight intensity={0.2} color="#A8D8FF" />
        <directionalLight position={[3, 4, 2]} intensity={0.4} color="#EEF4FC" />
        <pointLight position={[-2, 1, -3]} intensity={0.3} color="#007AFF" />
        <pointLight position={[3, 2, 1]} intensity={0.2} color="#0EA5E9" />
        <WaveField />
        <Dust />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(61,85,108,0.07),transparent_50%)]" />
    </div>
  );
}
