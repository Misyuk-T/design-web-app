"use client";

import { useEffect, useRef } from "react";
import type { PointerEvent, ReactNode } from "react";

type ConceptMotionShellProps = {
  children: ReactNode;
  className: string;
  page: "v1" | "v2";
  progressClassName: string;
};

/**
 * A deliberately tiny client boundary for the two concept routes.
 *
 * The pages, content, and images remain server-rendered. This layer only:
 *  - exposes normalized pointer coordinates as CSS custom properties;
 *  - progressively reveals explicitly marked elements with IntersectionObserver;
 *  - renders the route-specific reading-progress rail.
 *
 * There are no React state updates during pointer or scroll movement.
 */
export function ConceptMotionShell({
  children,
  className,
  page,
  progressClassName,
}: ConceptMotionShellProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pointerFrameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const nodes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-motion]"),
    );
    const syncMotionPreference = () => {
      reduceMotionRef.current = motionPreference.matches;
      if (!motionPreference.matches) return;
      pointerRef.current = { x: 0, y: 0 };
      root.style.setProperty("--pointer-x", "0");
      root.style.setProperty("--pointer-y", "0");
    };
    const cancelPointerFrame = () => {
      if (pointerFrameRef.current !== null) {
        cancelAnimationFrame(pointerFrameRef.current);
        pointerFrameRef.current = null;
      }
    };
    const cleanupMotionPreference = () => {
      motionPreference.removeEventListener("change", syncMotionPreference);
      cancelPointerFrame();
    };

    syncMotionPreference();
    motionPreference.addEventListener("change", syncMotionPreference);

    if (motionPreference.matches || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => {
        node.dataset.motionVisible = "true";
      });
      return cleanupMotionPreference;
    }

    const viewportThreshold = window.innerHeight * 0.94;
    nodes.forEach((node) => {
      if (node.getBoundingClientRect().top < viewportThreshold) {
        node.dataset.motionVisible = "true";
      }
    });
    root.dataset.motionReady = "true";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.motionVisible = "true";
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    nodes.forEach((node) => {
      if (node.dataset.motionVisible !== "true") observer.observe(node);
    });

    return () => {
      observer.disconnect();
      cleanupMotionPreference();
    };
  }, []);

  function commitPointer() {
    pointerFrameRef.current = null;
    const root = rootRef.current;
    if (!root) return;
    root.style.setProperty("--pointer-x", pointerRef.current.x.toFixed(4));
    root.style.setProperty("--pointer-y", pointerRef.current.y.toFixed(4));
  }

  function queuePointer(x: number, y: number) {
    pointerRef.current = { x, y };
    if (pointerFrameRef.current === null) {
      pointerFrameRef.current = requestAnimationFrame(commitPointer);
    }
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" || reduceMotionRef.current) return;
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;
    queuePointer(x, y);
  }

  function handlePointerLeave() {
    queuePointer(0, 0);
  }

  return (
    <div
      ref={rootRef}
      className={className}
      data-concept-page={page}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <span className={progressClassName} aria-hidden="true">
        <span />
      </span>
      {children}
    </div>
  );
}
