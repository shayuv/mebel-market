"use client";

import { useState } from "react";
import Link from "next/link";
import { bentoCategories } from "@/data/categories";
import type { Category } from "@/types";

const gridAreas = `"a b c c e" "d f g g e"`;
const areaKeys = ["a", "b", "c", "e", "d", "f", "g"];

// Map bento category names to catalog slugs
const categorySlugMap: Record<string, string> = {
  "Шкафы": "shkafy-i-stellazhi",
  "Комоды": "shkafy-i-stellazhi",
  "Кровати": "krovati-i-matrace",
  "Готовые кухни": "kuhni",
  "Обеденные столы": "stoly-i-stulya",
  "Диваны": "divany-i-kresla",
  "Кухонные стулья": "stoly-i-stulya",
};

export function BentoCategories() {
  return (
    <div className="mt-13">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="font-heading text-3xl font-bold text-foreground max-sm:text-2xl">
          Каталог
        </h2>
        <Link
          href="/catalog"
          className="text-sm font-medium text-terracotta hover:underline"
        >
          Все категории →
        </Link>
      </div>
      <div
        className="hidden gap-3 lg:grid"
        style={{
          gridTemplateColumns: "repeat(5, 1fr)",
          gridTemplateRows: "210px 210px",
          gridTemplateAreas: gridAreas,
        }}
      >
        {bentoCategories.map((cat, i) => (
          <BentoCard key={i} cat={cat} areaKey={areaKeys[i]} />
        ))}
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="flex gap-3 overflow-x-auto pb-2 lg:hidden" style={{ scrollbarWidth: "none" }}>
        {bentoCategories.map((cat, i) => (
          <Link
            key={i}
            href={`/catalog/${categorySlugMap[cat.name] || "divany-i-kresla"}`}
            className="relative h-[180px] w-[160px] shrink-0 overflow-hidden rounded-2xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cat.img}
              alt=""
              className="h-full w-full object-cover"
            />
            <div
              className={`absolute inset-0 ${
                cat.style === "lifestyle"
                  ? "bg-gradient-to-b from-black/0 via-black/0 to-black/50"
                  : "bg-gradient-to-b from-white/55 to-white/25"
              }`}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div
                className={`font-bold ${
                  cat.style === "lifestyle"
                    ? "text-white"
                    : "text-foreground"
                } ${cat.size ? "text-xl" : "text-base"}`}
              >
                {cat.name}
              </div>
              {cat.cta && (
                <span className="mt-2 inline-block rounded-full border border-brand-border bg-white/85 px-3.5 py-1.5 text-xs font-medium text-foreground backdrop-blur-[6px]">
                  {cat.cta}
                </span>
              )}
            </div>
            {cat.badge && (
              <span className="absolute right-3.5 top-3.5 rounded-lg bg-amber-500 px-3 py-[5px] text-xs font-bold text-white">
                {cat.badge}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

function BentoCard({
  cat,
  areaKey,
}: {
  cat: Category;
  areaKey: string;
}) {
  const [hovered, setHovered] = useState(false);
  const slug = categorySlugMap[cat.name] || "divany-i-kresla";

  return (
    <Link
      href={`/catalog/${slug}`}
      className="group relative overflow-hidden rounded-2xl bg-surface-light"
      style={{ gridArea: areaKey }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={cat.img}
        alt=""
        className="h-full w-full object-cover transition-transform duration-500"
        style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
      />
      <div
        className={`absolute inset-0 ${
          cat.style === "lifestyle"
            ? "bg-gradient-to-b from-black/0 via-black/0 to-black/50"
            : "bg-gradient-to-b from-white/55 to-white/25"
        }`}
      />
      <div className="absolute bottom-0 left-0 right-0 p-[18px]">
        <div
          className={`font-bold ${
            cat.style === "lifestyle" ? "text-white" : "text-foreground"
          } ${cat.size ? "text-xl" : "text-base"}`}
        >
          {cat.name}
        </div>
        {cat.sub && (
          <div className="mt-0.5 text-[13px] font-semibold text-brand-blue">
            {cat.sub}
          </div>
        )}
        {cat.cta && (
          <span className="mt-2 inline-block rounded-full border border-brand-border bg-white/85 px-3.5 py-1.5 text-xs font-medium text-foreground backdrop-blur-[6px]">
            {cat.cta}
          </span>
        )}
      </div>
      {cat.badge && (
        <span className="absolute right-3.5 top-3.5 rounded-lg bg-amber-500 px-3 py-[5px] text-xs font-bold text-white">
          {cat.badge}
        </span>
      )}
    </Link>
  );
}
