"use client";

import { useState } from "react";
import type { ReactNode } from "react";

type MotionTickerProps = {
  children: ReactNode;
  className: string;
  controlClassName: string;
  label: string;
  playLabel?: string;
  pauseLabel?: string;
};

export function MotionTicker({
  children,
  className,
  controlClassName,
  label,
  playLabel = "Play",
  pauseLabel = "Pause",
}: MotionTickerProps) {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className={className}
      data-paused={paused ? "true" : "false"}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        className={controlClassName}
        aria-label={`${paused ? playLabel : pauseLabel} ${label}`}
        aria-pressed={paused}
        onClick={() => setPaused((current) => !current)}
      >
        {paused ? playLabel : pauseLabel}
      </button>
      <div aria-hidden="true">{children}</div>
    </div>
  );
}
