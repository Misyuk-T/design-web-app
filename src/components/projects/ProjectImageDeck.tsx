"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type {
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  CSSProperties,
} from "react";
import type { Locale } from "@/lib/locale-shared";
import styles from "./ProjectImageDeck.module.css";

type ProjectImageDeckProps = {
  images: readonly string[];
  title: string;
  locale: Locale;
  mode: "editorial" | "cinematic";
  sizes: string;
  aspectRatio?: string;
  className?: string;
};

const COPY = {
  uk: {
    gallery: "Галерея проєкту",
    previous: "Попередній кадр",
    next: "Наступний кадр",
    frame: "Кадр",
    drag: "Гортайте",
  },
  en: {
    gallery: "Project gallery",
    previous: "Previous frame",
    next: "Next frame",
    frame: "Frame",
    drag: "Swipe",
  },
} as const;

export function ProjectImageDeck({
  images,
  title,
  locale,
  mode,
  sizes,
  aspectRatio,
  className = "",
}: ProjectImageDeckProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStartRef = useRef<number | null>(null);
  const copy = COPY[locale];
  const slideCount = images.length;

  function showPrevious() {
    setActiveIndex((index) => (index - 1 + slideCount) % slideCount);
  }

  function showNext() {
    setActiveIndex((index) => (index + 1) % slideCount);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("button")) return;
    pointerStartRef.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function completeSwipe(clientX: number) {
    if (pointerStartRef.current === null) return;
    const distance = clientX - pointerStartRef.current;
    pointerStartRef.current = null;

    if (Math.abs(distance) < 36) return;
    if (distance < 0) showNext();
    else showPrevious();
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    completeSwipe(event.clientX);
  }

  function handleMouseDown(event: MouseEvent<HTMLDivElement>) {
    if (pointerStartRef.current !== null) return;
    if ((event.target as HTMLElement).closest("button")) return;
    pointerStartRef.current = event.clientX;
  }

  function handleMouseUp(event: MouseEvent<HTMLDivElement>) {
    completeSwipe(event.clientX);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  }

  if (slideCount === 0) return null;

  const deckStyle = {
    aspectRatio,
    "--deck-progress": (activeIndex + 1) / slideCount,
  } as CSSProperties;

  return (
    <div
      className={[styles.deck, className].join(" ")}
      style={deckStyle}
      data-mode={mode}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${copy.gallery}: ${title}`}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onPointerCancel={() => {
        pointerStartRef.current = null;
      }}
      onKeyDown={handleKeyDown}
    >
      {images.map((image, index) => (
        <Image
          key={`${image}-${index}`}
          src={image}
          alt={index === activeIndex ? `${title} — ${copy.frame} ${index + 1}` : ""}
          fill
          sizes={sizes}
          draggable={false}
          className={styles.slide}
          data-active={index === activeIndex}
          aria-hidden={index !== activeIndex}
        />
      ))}

      {slideCount > 1 ? (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.button}
            onClick={showPrevious}
            aria-label={`${copy.previous}: ${title}`}
          >
            ←
          </button>
          <div className={styles.progress} aria-live="polite">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className={styles.rail} aria-hidden="true">
              <span />
            </span>
            <span>
              {String(slideCount).padStart(2, "0")} · {copy.drag}
            </span>
          </div>
          <button
            type="button"
            className={styles.button}
            onClick={showNext}
            aria-label={`${copy.next}: ${title}`}
          >
            →
          </button>
        </div>
      ) : null}
    </div>
  );
}
