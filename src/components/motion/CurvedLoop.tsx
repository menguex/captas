"use client";

import {
  useRef,
  useEffect,
  useState,
  useMemo,
  useId,
  useCallback,
  Fragment,
  type RefObject,
} from "react";
import { useLenis } from "@/providers/LenisProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  buildMarqueeMeasureText,
  type HeroMarqueeSegment,
} from "@/content/hero-marquee";

export type CurvedLoopProps = {
  marqueeText?: string;
  segments?: HeroMarqueeSegment[];
  segmentColor?: (segment: HeroMarqueeSegment) => string;
  separatorColor?: string;
  speed?: number;
  className?: string;
  containerClassName?: string;
  svgClassName?: string;
  curveAmount?: number;
  direction?: "left" | "right";
  interactive?: boolean;
  scrollDriven?: boolean;
  scrollMultiplier?: number;
  scrollScrubRef?: RefObject<HTMLElement | null>;
  scrubLoops?: number;
  /** Borde del shelf curvo (tono más oscuro bajo el marquee) */
  curveStroke?: boolean;
  /** Desplazamiento Y en viewBox hacia abajo respecto al texto */
  curveStrokeOffset?: number;
  /** Relleno bajo el arco (p. ej. var(--c-ink) hacia el manifiesto) */
  curveShelfFill?: string;
  /** Borde del corte curvo entre superficie clara y relleno */
  curveStrokeColor?: string;
  /** Texto sobre la línea de corte (no flotando arriba del arco) */
  curveTextOnCut?: boolean;
  /** Altura del viewBox cuando hay shelf (default 168) */
  viewBoxHeight?: number;
};

function buildCurvePath(curveAmount: number, baseY = 40) {
  return `M-100,${baseY} Q500,${baseY + curveAmount} 1540,${baseY}`;
}

function buildShelfPath(curveAmount: number, baseY: number, viewBottom: number) {
  return `${buildCurvePath(curveAmount, baseY)} L 1540,${viewBottom} L -100,${viewBottom} Z`;
}

function wrapOffset(value: number, spacing: number) {
  let o = value;
  while (o <= -spacing) o += spacing;
  while (o > 0) o -= spacing;
  return o;
}

export function CurvedLoop({
  marqueeText = "",
  segments,
  segmentColor,
  separatorColor = "rgba(61,85,108,0.28)",
  speed = 2,
  className = "",
  containerClassName = "",
  svgClassName = "",
  curveAmount = 400,
  direction = "left",
  interactive = true,
  scrollDriven = false,
  scrollMultiplier = 2.5,
  scrollScrubRef,
  scrubLoops = 3,
  curveStroke = false,
  curveStrokeOffset = 12,
  curveShelfFill,
  curveStrokeColor = "rgba(20, 24, 30, 0.11)",
  curveTextOnCut = false,
  viewBoxHeight = 168,
}: CurvedLoopProps) {
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const animSpeed = reduced || scrollDriven ? 0 : speed;
  const canInteract = interactive && !reduced && !scrollDriven;

  const plainText = useMemo(() => {
    if (segments?.length) return buildMarqueeMeasureText(segments);
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, "") : marqueeText) + "\u00A0";
  }, [marqueeText, segments]);

  const measureRef = useRef<SVGTextElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const offsetRef = useRef(0);
  const scrubBaseRef = useRef(0);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);

  const uid = useId().replace(/:/g, "");
  const pathId = `curve-${uid}`;
  const strokeBaseY = 40 + curveStrokeOffset;
  const cutY = curveTextOnCut && curveShelfFill ? strokeBaseY : 40;
  const pathD = buildCurvePath(curveAmount, cutY);
  const strokePathD = buildCurvePath(curveAmount, strokeBaseY);
  const shelfPathD = curveShelfFill
    ? buildShelfPath(curveAmount, strokeBaseY, viewBoxHeight)
    : null;
  const hasShelf = Boolean(curveShelfFill && shelfPathD);

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);
  const lastScrollRef = useRef(0);

  const ready = spacing > 0;
  const repeatCount = spacing ? Math.ceil(1800 / spacing) + 2 : 1;

  const applyOffset = useCallback(
    (next: number, syncState = false) => {
      if (!spacing || !textPathRef.current) return;
      const wrapped = wrapOffset(next, spacing);
      offsetRef.current = wrapped;
      textPathRef.current.setAttribute("startOffset", `${wrapped}px`);
      if (syncState) setOffset(wrapped);
    },
    [spacing]
  );

  useEffect(() => {
    dirRef.current = direction;
  }, [direction]);

  useEffect(() => {
    const measure = () => {
      if (measureRef.current) {
        setSpacing(measureRef.current.getComputedTextLength());
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [plainText, className, svgClassName]);

  useEffect(() => {
    if (!spacing) return;
    scrubBaseRef.current = -spacing;
    applyOffset(-spacing, true);
    lastScrollRef.current = lenis?.scroll ?? window.scrollY;
  }, [spacing, lenis, applyOffset]);

  useEffect(() => {
    if (!scrollDriven || !scrollScrubRef?.current || !spacing || !ready || reduced) {
      return;
    }

    let trigger: { kill: () => void } | null = null;
    let cancelled = false;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled || !scrollScrubRef.current) return;

      gsap.registerPlugin(ScrollTrigger);
      const travel = spacing * scrubLoops;

      trigger = ScrollTrigger.create({
        trigger: scrollScrubRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.45,
        onUpdate: (self) => {
          if (dragRef.current) return;
          applyOffset(scrubBaseRef.current - self.progress * travel);
        },
      });

      ScrollTrigger.refresh();
    };

    void init();

    return () => {
      cancelled = true;
      trigger?.kill();
    };
  }, [
    scrollDriven,
    scrollScrubRef,
    spacing,
    ready,
    reduced,
    scrubLoops,
    applyOffset,
  ]);

  useEffect(() => {
    if (!scrollDriven || scrollScrubRef || !spacing || !ready || reduced) return;

    let frame = 0;

    const tick = () => {
      if (!dragRef.current) {
        const current = lenis?.scroll ?? window.scrollY;
        const delta = current - lastScrollRef.current;
        lastScrollRef.current = current;

        let move = 0;
        if (delta !== 0) move -= delta * scrollMultiplier;
        if (lenis && Math.abs(lenis.velocity) > 0.05) move -= lenis.velocity * 18;
        if (move !== 0) applyOffset(offsetRef.current + move);
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [
    scrollDriven,
    scrollScrubRef,
    spacing,
    ready,
    reduced,
    scrollMultiplier,
    lenis,
    applyOffset,
  ]);

  useEffect(() => {
    if (!spacing || !ready || animSpeed === 0) return;

    let frame = 0;
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === "right" ? animSpeed : -animSpeed;
        applyOffset(offsetRef.current + delta);
      }
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, animSpeed, ready, applyOffset]);

  const renderSegmentLoop = () => {
    if (!segments?.length || !segmentColor) return null;

    return Array.from({ length: repeatCount }).flatMap((_, r) =>
      segments.map((seg, i) => {
        const color = segmentColor(seg);
        // The hero marquee uses `tone` for color, but some labels need to be bold
        // even when they are visually "secondary" (e.g. Foto / Motion / Web).
        const isBold = seg.tone === "primary" || ["motion", "foto", "web"].includes(seg.id);
        return (
          <Fragment key={`${r}-${seg.id}`}>
            {i > 0 || r > 0 ? (
              <tspan fill={separatorColor} opacity={0.85}>
                {" \u00B7 "}
              </tspan>
            ) : null}
            <tspan fill={color} fontWeight={isBold ? 700 : 500}>
              {`\u2002\u2002${seg.label}`}
            </tspan>
          </Fragment>
        );
      })
    );
  };

  const cursorClass = canInteract ? (dragging ? "cursor-grabbing" : "cursor-grab") : "";

  return (
    <div
      className={`flex w-full items-center justify-center ${cursorClass} ${containerClassName}`}
      style={{ visibility: ready ? "visible" : "hidden" }}
      onPointerDown={(e) => {
        if (!canInteract) return;
        dragRef.current = true;
        setDragging(true);
        lastXRef.current = e.clientX;
        velRef.current = 0;
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!canInteract || !dragRef.current) return;
        const dx = e.clientX - lastXRef.current;
        lastXRef.current = e.clientX;
        velRef.current = dx;
        applyOffset(offsetRef.current + dx);
      }}
      onPointerUp={() => {
        if (!canInteract) return;
        dragRef.current = false;
        setDragging(false);
        dirRef.current = velRef.current > 0 ? "right" : "left";
      }}
      onPointerLeave={() => {
        if (!canInteract) return;
        dragRef.current = false;
        setDragging(false);
        dirRef.current = velRef.current > 0 ? "right" : "left";
      }}
    >
      <svg
        className={`block w-full select-none overflow-visible font-bold uppercase leading-none ${
          hasShelf ? "aspect-[100/17]" : "aspect-[100/12]"
        } ${svgClassName}`}
        viewBox={`0 0 1440 ${hasShelf ? viewBoxHeight : 120}`}
        aria-hidden={!plainText}
      >
        <text
          ref={measureRef}
          xmlSpace="preserve"
          className={`${svgClassName} ${className}`.trim()}
          style={{ visibility: "hidden", opacity: 0, pointerEvents: "none" }}
        >
          {plainText}
        </text>
        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        {ready && hasShelf ? (
          <path d={shelfPathD!} fill={curveShelfFill} aria-hidden />
        ) : null}
        {ready && curveStroke ? (
          <path
            d={strokePathD}
            fill="none"
            stroke={curveStrokeColor}
            strokeWidth="1"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            aria-hidden
          />
        ) : null}
        {ready && (
          <text xmlSpace="preserve" className={className}>
            <textPath
              ref={textPathRef}
              href={`#${pathId}`}
              startOffset={`${offset}px`}
              xmlSpace="preserve"
            >
              {segments?.length
                ? renderSegmentLoop()
                : Array(repeatCount).fill(plainText).join("")}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
}
