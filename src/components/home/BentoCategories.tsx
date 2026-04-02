"use client";

import { useState } from "react";
import Link from "next/link";
import { bentoCategories } from "@/data/categories";
import type { Category } from "@/types";

const gridAreas = `"a b c c e" "d f g g e"`;
const areaKeys = ["a", "b", "c", "e", "d", "f", "g"];

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

      {/* Desktop: bento grid (lg+) */}
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

      {/* Tablet: 3 columns (md–lg) */}
      <div className="hidden gap-3 md:grid lg:hidden" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {bentoCategories.map((cat, i) => (
          <MobileCard key={i} cat={cat} />
        ))}
      </div>

      {/* Mobile: 2 columns (< md) */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {bentoCategories.map((cat, i) => (
          <MobileCard key={i} cat={cat} />
        ))}
      </div>
    </div>
  );
}

function MobileCard({ cat }: { cat: Category }) {
  const slug = categorySlugMap[cat.name] || "divany-i-kresla";

  return (
    <Link
      href={`/catalog/${slug}`}
      className="relative h-[140px] overflow-hidden rounded-2xl"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={cat.img}
        alt=""
        className="h-full w-full object-cover"
      />
      {cat.style !== "lifestyle" && (
        <div className="absolute inset-0 bg-gradient-to-b from-white/55 to-white/25" />
      )}
      {/* B04b: stronger text backdrop for lifestyle cards */}
      <div
        className="absolute bottom-0 left-0 right-0 p-3"
        style={
          cat.style === "lifestyle"
            ? { background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }
            : undefined
        }
      >
        <div
          className={`font-bold ${
            cat.style === "lifestyle"
              ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
              : "text-foreground"
          } text-sm`}
        >
          {cat.name}
        </div>
        {cat.cta && (
          <span className="mt-1.5 inline-block rounded-full border border-brand-border bg-white/85 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-[6px]">
            {cat.cta}
          </span>
        )}
      </div>
      {cat.badge && (
        <span className="absolute right-2.5 top-2.5 rounded-lg bg-amber-500 px-2.5 py-1 text-xs font-bold text-white">
          {cat.badge}
        </span>
      )}
    </Link>
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
      {cat.style !== "lifestyle" && (
        <div className="absolute inset-0 bg-gradient-to-b from-white/55 to-white/25" />
      )}
      {/* B04b: stronger text backdrop for lifestyle cards */}
      <div
        className="absolute bottom-0 left-0 right-0 p-[18px]"
        style={
          cat.style === "lifestyle"
            ? { background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }
            : undefined
        }
      >
        <div
          className={`font-bold ${
            cat.style === "lifestyle" ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" : "text-foreground"
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
