"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides, sidePromos } from "@/data/categories";

export function HeroSlider() {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = heroSlides.length;

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(
      () => setCur((c) => (c + 1) % total),
      5000
    );
    return () => clearInterval(timer);
  }, [paused, total]);

  const go = (dir: number) => setCur((c) => (c + dir + total) % total);

  return (
    <div className="flex gap-3.5 mt-5 max-xl:flex-col max-xl:h-auto">
      {/* Main slider */}
      <div
        className="relative flex-1 overflow-hidden rounded-[20px] h-[400px] max-xl:h-[300px] max-sm:h-[240px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-all duration-700"
            style={{
              opacity: i === cur ? 1 : 0,
              transform: i === cur ? "scale(1)" : "scale(1.03)",
              pointerEvents: i === cur ? "auto" : "none",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.img}
              alt=""
              className="h-full w-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(45,41,38,0.78)] via-[rgba(45,41,38,0.3)] to-transparent" />

            {/* Content */}
            <div className="absolute bottom-12 left-12 max-w-[420px] max-sm:left-6 max-sm:bottom-6">
              <div className="mb-3.5 inline-block rounded-lg bg-white/15 px-3.5 py-[5px] text-[13px] font-medium text-white/90 backdrop-blur-[8px]">
                {slide.price}
              </div>
              <h1 className="font-heading text-4xl font-extrabold leading-tight text-white whitespace-pre-line max-sm:text-2xl">
                {slide.title}
              </h1>
              <p className="mt-3.5 text-base leading-relaxed text-white/80 max-sm:text-sm">
                {slide.sub}
              </p>
              <Link
                href="/catalog"
                className="mt-5 inline-block cursor-pointer rounded-xl border-none bg-terracotta px-8 py-3.5 text-[15px] font-semibold text-white shadow-[0_4px_24px_rgba(196,112,75,0.4)]"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button
          onClick={() => go(-1)}
          className="absolute top-1/2 left-4 z-[5] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-none bg-white/85 shadow-[0_4px_16px_rgba(0,0,0,0.1)] backdrop-blur-[8px] max-sm:h-10 max-sm:w-10"
        >
          <ChevronLeft size={20} className="text-foreground" />
        </button>
        <button
          onClick={() => go(1)}
          className="absolute top-1/2 right-4 z-[5] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-none bg-white/85 shadow-[0_4px_16px_rgba(0,0,0,0.1)] backdrop-blur-[8px] max-sm:h-10 max-sm:w-10"
        >
          <ChevronRight size={20} className="text-foreground" />
        </button>

        {/* Dots + counter */}
        <div className="absolute bottom-5 left-12 z-[5] flex items-center gap-2.5 max-sm:left-6">
          <span className="text-[13px] font-medium tabular-nums text-white/70">
            {String(cur + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
          <div className="flex gap-1.5">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCur(i)}
                className="h-2 rounded-full border-none transition-all duration-350"
                style={{
                  width: i === cur ? 28 : 8,
                  background:
                    i === cur ? "#FFFFFF" : "rgba(255,255,255,0.4)",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 z-[5] h-[3px] bg-white/15">
          {!paused && (
            <div
              key={cur}
              className="h-full rounded-sm bg-terracotta"
              style={{ animation: "progress 5s linear forwards" }}
            />
          )}
          <style>{`@keyframes progress{from{width:0%}to{width:100%}}`}</style>
        </div>
      </div>

      {/* Side promo cards */}
      <div className="flex w-[300px] shrink-0 flex-col gap-3.5 max-xl:w-full max-xl:flex-row">
        {sidePromos.map((promo, i) => (
          <SidePromoCard key={i} promo={promo} />
        ))}
      </div>
    </div>
  );
}

function SidePromoCard({
  promo,
}: {
  promo: (typeof sidePromos)[number];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/catalog"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-[20px] p-[22px] transition-transform duration-300 max-xl:flex-1"
      style={{
        background: promo.color,
        transform: hovered ? "scale(0.98)" : "scale(1)",
        display: "block",
      }}
    >
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={promo.img}
        alt=""
        className="pointer-events-none absolute -right-5 -bottom-2.5 h-[110%] w-[55%] object-cover opacity-20 transition-transform duration-400"
        style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
      />

      <div className="relative flex h-full flex-col justify-between">
        <div>
          <div
            className="font-heading text-xl font-bold leading-tight"
            style={{ color: promo.accent }}
          >
            {promo.title}
          </div>
          <div className="mt-2 whitespace-pre-line text-sm leading-relaxed text-brand-muted">
            {promo.sub}
          </div>
        </div>
        <span
          className="mt-3 w-fit rounded-[10px] border-[1.5px] px-[18px] py-2 text-[13px] font-semibold transition-all duration-200"
          style={{
            borderColor: promo.accent,
            color: hovered ? "#FFFFFF" : promo.accent,
            background: hovered ? promo.accent : "transparent",
          }}
        >
          Подробнее
        </span>
      </div>
    </Link>
  );
}
