"use client";

import { useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="flex flex-col-reverse gap-3 lg:flex-row">
      <div className="hidden lg:flex lg:flex-col lg:gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
              i === current
                ? "border-terracotta"
                : "border-transparent hover:border-brand-border"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img}
              alt={`${title} — фото ${i + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      <div className="relative aspect-square flex-1 overflow-hidden rounded-2xl bg-surface-light">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[current]}
          alt={title}
          className="h-full w-full object-cover"
        />

        <button
          onClick={() => setCurrent((c) => (c - 1 + images.length) % images.length)}
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow backdrop-blur-sm lg:hidden"
        >
          <CaretLeft size={18} weight="regular" />
        </button>
        <button
          onClick={() => setCurrent((c) => (c + 1) % images.length)}
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow backdrop-blur-sm lg:hidden"
        >
          <CaretRight size={18} weight="regular" />
        </button>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 lg:hidden">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current
                  ? "w-6 bg-terracotta"
                  : "w-2 bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
