"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { brandValueBackground } from "@/content/brand-value";

type BrandValueBackgroundProps = {
  reduced?: boolean;
};

export const BrandValueBackground = forwardRef<HTMLVideoElement, BrandValueBackgroundProps>(
  function BrandValueBackground({ reduced = false }, ref) {
    return (
      <div className="brand-value-background" aria-hidden>
        <Image
          src={brandValueBackground.poster}
          alt=""
          fill
          sizes="100vw"
          className="brand-value-background__poster"
          style={{ objectPosition: brandValueBackground.videoPosition }}
          priority
        />
        {!reduced && (
          <video
            ref={ref}
            className="brand-value-background__video"
            style={{ objectPosition: brandValueBackground.videoPosition }}
            src={brandValueBackground.video}
            poster={brandValueBackground.poster}
            muted
            playsInline
            preload="auto"
          />
        )}
        <div className="brand-value-background__scrim" />
      </div>
    );
  }
);
