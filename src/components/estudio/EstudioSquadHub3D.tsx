"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { SquadRingScene, type SquadRingSceneProps } from "@/components/estudio/SquadRingScene";

export type EstudioSquadHub3DProps = SquadRingSceneProps;

export function EstudioSquadHub3D(props: EstudioSquadHub3DProps) {
  return (
    <div className="absolute inset-0" aria-hidden>
      <Canvas
        className="!touch-none"
        camera={{ position: [0, 2.4, 3.35], fov: 42, near: 0.1, far: 24 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} color="#a8d8ff" />
          <directionalLight position={[2, 4, 3]} intensity={0.55} color="#eef4fc" />
          <pointLight position={[-2, 1, -1]} intensity={0.45} color="#007aff" />
          <pointLight position={[1.5, 0.5, 2]} intensity={0.25} color="#5b61ff" />
          <SquadRingScene {...props} />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,transparent_35%,rgba(15,18,24,0.55)_100%)]" />
    </div>
  );
}
