"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Float, Line, RoundedBox, Sphere } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function DesignOrbitScene() {
  const root = useRef<THREE.Group>(null);
  const wireTorus = useRef<THREE.Mesh>(null);

  const orbitPoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 80; i++) {
      const t = (i / 80) * Math.PI * 2;
      pts.push(
        new THREE.Vector3(
          Math.cos(t) * 1.55,
          Math.sin(t * 2) * 0.14,
          Math.sin(t) * 1.55
        )
      );
    }
    return pts;
  }, []);

  const nodePositions = useMemo(() => {
    return [0, 2, 4, 6].map((i) => orbitPoints[i * 20] ?? orbitPoints[0]);
  }, [orbitPoints]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (root.current) root.current.rotation.y = t * 0.12;
    if (wireTorus.current) wireTorus.current.rotation.z = t * 0.08;
  });

  return (
    <group ref={root}>
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.4}>
        <mesh>
          <icosahedronGeometry args={[0.72, 1]} />
          <meshPhysicalMaterial
            color="#5b61ff"
            metalness={0.9}
            roughness={0.12}
            transparent
            opacity={0.42}
            envMapIntensity={0.8}
          />
          <Edges color="#7dd3fc" threshold={12} scale={1.02} />
        </mesh>
      </Float>

      <mesh ref={wireTorus} rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[1.28, 0.018, 12, 96]} />
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.55} />
      </mesh>

      <mesh rotation={[1.05, 0.65, 0.35]}>
        <torusGeometry args={[0.95, 0.012, 8, 64]} />
        <meshBasicMaterial color="#5b61ff" wireframe transparent opacity={0.28} />
      </mesh>

      <Line
        points={orbitPoints}
        color="#64d2ff"
        transparent
        opacity={0.45}
        lineWidth={1}
      />

      {nodePositions.map((pos, i) => (
        <Sphere key={i} position={pos} args={[0.05, 12, 12]}>
          <meshBasicMaterial color={i % 2 === 0 ? "#7dd3fc" : "#5b61ff"} />
        </Sphere>
      ))}

      <Float speed={2} floatIntensity={0.25} rotationIntensity={0.1}>
        <RoundedBox
          args={[0.55, 0.38, 0.04]}
          radius={0.04}
          smoothness={4}
          position={[0.95, 0.35, 0.45]}
          rotation={[0.2, -0.5, 0.1]}
        >
          <meshPhysicalMaterial
            color="#eae8e4"
            metalness={0.2}
            roughness={0.35}
            transparent
            opacity={0.18}
          />
          <Edges color="#64d2ff" threshold={20} scale={1.05} />
        </RoundedBox>
      </Float>
    </group>
  );
}

export function ManifestoDesignOrbit3D() {
  const reduced = useReducedMotion();

  if (reduced) {
    return <ManifestoDesignOrbitFallback />;
  }

  return (
    <div className="manifesto-design-orbit-3d" aria-hidden>
      <div className="manifesto-design-orbit-glow" />
      <Canvas
        className="manifesto-design-orbit-canvas"
        camera={{ position: [2.4, 1.1, 3.1], fov: 38, near: 0.1, far: 24 }}
        dpr={[1, 1.35]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.45} color="#c4d4f0" />
        <pointLight position={[3, 2, 2]} intensity={0.9} color="#5b61ff" />
        <pointLight position={[-2, 0.5, 1]} intensity={0.55} color="#0ea5e9" />
        <directionalLight position={[0, 4, 2]} intensity={0.35} color="#eae8e4" />
        <DesignOrbitScene />
      </Canvas>
    </div>
  );
}

/** Fallback estático para reduced-motion */
export function ManifestoDesignOrbitFallback() {
  return (
    <div className="manifesto-design-orbit-fallback" aria-hidden>
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <defs>
          <linearGradient id="mf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5b61ff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.35" />
          </linearGradient>
          <filter id="mf-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="100" cy="100" r="62" fill="none" stroke="url(#mf-grad)" strokeWidth="1" opacity="0.5" />
        <circle
          cx="100"
          cy="100"
          r="78"
          fill="none"
          stroke="#64d2ff"
          strokeWidth="1"
          strokeDasharray="5 9"
          opacity="0.35"
        />
        <polygon
          points="100,52 138,118 62,118"
          fill="none"
          stroke="url(#mf-grad)"
          strokeWidth="1.2"
          filter="url(#mf-glow)"
          opacity="0.7"
        />
        <circle cx="100" cy="100" r="4" fill="#7dd3fc" opacity="0.8" />
      </svg>
    </div>
  );
}
