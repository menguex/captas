"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { estudioOrbitNodes } from "@/content/estudio";

const RING_R = 1.22;

function nodePosition(angleDeg: number): [number, number, number] {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return [RING_R * Math.cos(rad), 0, RING_R * Math.sin(rad)];
}

export type SquadRingSceneProps = {
  activeIndex: number;
  progress: number;
  paused: boolean;
};

export function SquadRingScene({ activeIndex, progress, paused }: SquadRingSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const smoothPointer = useRef({ x: 0, y: 0 });

  const nodePositions = useMemo(
    () => estudioOrbitNodes.map((n) => nodePosition(n.angle)),
    []
  );

  const activeAngle = estudioOrbitNodes[activeIndex]?.angle ?? 0;
  const arcStart = ((activeAngle - 90 - 28) * Math.PI) / 180;
  const arcSpan = (56 * Math.PI) / 180;

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    if (!paused) {
      groupRef.current.rotation.y = t * 0.06;
    }
    smoothPointer.current.x += (state.pointer.x * 0.14 - smoothPointer.current.x) * 0.05;
    smoothPointer.current.y += (state.pointer.y * 0.1 - smoothPointer.current.y) * 0.05;
    groupRef.current.rotation.x = -0.52 + smoothPointer.current.y;
    groupRef.current.rotation.z = smoothPointer.current.x * 0.12;
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[RING_R, 0.014, 12, 96]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.09} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
        <ringGeometry args={[RING_R - 0.02, RING_R + 0.035, 80, 1, 0, Math.max(0.02, progress) * Math.PI * 2]} />
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.75} side={THREE.DoubleSide} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, arcStart]}>
        <ringGeometry args={[RING_R - 0.008, RING_R + 0.055, 40, 1, 0, arcSpan]} />
        <meshBasicMaterial color="#5b61ff" transparent opacity={0.42} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.4, 0.46, 0.1, 32]} />
        <meshStandardMaterial
          color="#14181e"
          emissive="#007aff"
          emissiveIntensity={0.4}
          metalness={0.55}
          roughness={0.32}
        />
      </mesh>
      <mesh position={[0, 0.14, 0]}>
        <sphereGeometry args={[0.2, 28, 28]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#5b61ff"
          emissiveIntensity={0.65}
          transparent
          opacity={0.92}
        />
      </mesh>

      {nodePositions.map((pos, i) => {
        const on = i === activeIndex;
        return (
          <group key={estudioOrbitNodes[i].id}>
            <Line
              points={[
                [0, 0.04, 0],
                [pos[0], pos[1] + 0.02, pos[2]],
              ]}
              color={on ? "#64d2ff" : "#007aff"}
              transparent
              opacity={on ? 0.85 : 0.22}
              lineWidth={on ? 2 : 1}
            />
            <mesh position={[pos[0], pos[1] + (on ? 0.07 : 0.03), pos[2]]}>
              <sphereGeometry args={[on ? 0.075 : 0.042, 16, 16]} />
              <meshStandardMaterial
                color={on ? "#64d2ff" : "#4a5568"}
                emissive={on ? "#007aff" : "#1e293b"}
                emissiveIntensity={on ? 1.4 : 0.15}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
