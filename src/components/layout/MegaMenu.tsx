"use client";

import { useState } from "react";
import Link from "next/link";
import { CaretRight, X } from "@phosphor-icons/react";
import {
  Armchair,
  Door,
  Bed,
  CookingPot,
  Chair,
  Baby,
  Bathtub,
  CoatHanger,
  PaintBrush,
  Lightning,
} from "@phosphor-icons/react";
import { menuData } from "@/data/categories";
import type { MenuCategory } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  armchair: Armchair,
  door: Door,
  bed: Bed,
  "cooking-pot": CookingPot,
  chair: Chair,
  baby: Baby,
  bathtub: Bathtub,
  "coat-hanger": CoatHanger,
  "paint-brush": PaintBrush,
  lightning: Lightning,
};

function CategoryIcon({ iconKey }: { iconKey: string }) {
  const Icon = iconMap[iconKey];
  if (!Icon) return <span className="w-7 text-center text-xl">📦</span>;
  return <Icon size={22} weight="duotone" color="#C4704B" />;
}

interface MegaMenuProps {
  open: boolean;
  onClose: () => void;
  activeIdx: number;
  setActiveIdx: (idx: number) => void;
}

export function MegaMenu({
  open,
  onClose,
  activeIdx,
  setActiveIdx,
}: MegaMenuProps) {
  const [mobileSubIdx, setMobileSubIdx] = useState<number | null>(null);

  if (!open) return null;

  const active: MenuCategory = menuData[activeIdx] ?? menuData[0];
  const mobileActive = mobileSubIdx !== null ? menuData[mobileSubIdx] : null;

  return (
    <>
      <div
        className="fixed inset-0 z-[90] bg-black/30"
        onClick={onClose}
      />

      <div className="absolute left-0 right-0 top-full z-[91] hidden overflow-hidden rounded-b-[20px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] animate-[menuSlide_0.25s_ease] md:flex">
        <style>{`@keyframes menuSlide{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>

        <div className="w-[280px] shrink-0 border-r border-brand-border bg-surface-light py-3">
          {menuData.map((cat, i) => (
            <Link
              key={i}
              href={`/catalog/${cat.slug}`}
              onClick={onClose}
              onMouseEnter={() => setActiveIdx(i)}
              className={`flex items-center gap-3 border-r-[3px] px-6 py-[11px] transition-all duration-150 ${
                i === activeIdx
                  ? "border-r-terracotta bg-white font-semibold text-foreground"
                  : "border-r-transparent font-normal text-brand-muted"
              }`}
            >
              <span className="flex w-7 justify-center">
                <CategoryIcon iconKey={cat.icon} />
              </span>
              <span className="text-sm">{cat.name}</span>
              <span className="ml-auto text-xs text-brand-muted">›</span>
            </Link>
          ))}
        </div>

        <div className="flex-1 px-9 py-7">
          <div className="font-heading mb-1 flex items-center gap-2 text-xl font-bold text-foreground">
            <CategoryIcon iconKey={active.icon} />
            {active.name}
          </div>
          <Link
            href={`/catalog/${active.slug}`}
            onClick={onClose}
            className="mb-5 block text-[13px] font-medium text-terracotta hover:underline"
          >
            Смотреть все →
          </Link>
          <div className="grid grid-cols-3 gap-x-8">
            {active.subs.map((sub, j) => (
              <Link
                key={j}
                href={`/catalog/${active.slug}`}
                onClick={onClose}
                className="block border-b border-brand-border py-2.5 text-sm text-foreground transition-colors duration-150 hover:text-terracotta"
              >
                {sub}
              </Link>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between rounded-[14px] bg-gradient-to-br from-terracotta-light to-[#FDE8D8] px-[22px] py-[18px]">
            <div>
              <div className="text-sm font-bold text-terracotta">
                Распродажа {active.name.toLowerCase()}
              </div>
              <div className="mt-1 text-[13px] text-brand-muted">
                Скидки до 40% до конца апреля
              </div>
            </div>
            <Link
              href={`/catalog/${active.slug}`}
              onClick={onClose}
              className="rounded-[10px] border-none bg-terracotta px-[18px] py-2 text-[13px] font-semibold text-white"
            >
              Смотреть
            </Link>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 z-[91] overflow-y-auto bg-white md:hidden">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-brand-border bg-white px-4 py-3">
          <h2 className="text-lg font-bold text-foreground">
            {mobileActive ? (
              <button
                onClick={() => setMobileSubIdx(null)}
                className="flex items-center gap-2 text-foreground"
              >
                <CaretRight size={18} weight="regular" className="rotate-180" />
                {mobileActive.name}
              </button>
            ) : (
              "Каталог"
            )}
          </h2>
          <button
            onClick={() => { onClose(); setMobileSubIdx(null); }}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-foreground"
          >
            <X size={22} weight="regular" />
          </button>
        </div>

        {!mobileActive ? (
          <div className="py-2">
            {menuData.map((cat, i) => (
              <button
                key={i}
                onClick={() => setMobileSubIdx(i)}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors active:bg-surface"
              >
                <span className="flex w-8 justify-center">
                  <CategoryIcon iconKey={cat.icon} />
                </span>
                <span className="flex-1 text-[15px] font-medium text-foreground">{cat.name}</span>
                <CaretRight size={18} weight="regular" className="text-brand-muted" />
              </button>
            ))}
          </div>
        ) : (
          <div className="py-2">
            <Link
              href={`/catalog/${mobileActive.slug}`}
              onClick={() => { onClose(); setMobileSubIdx(null); }}
              className="flex items-center gap-3 border-b border-brand-border px-4 py-3.5 text-[15px] font-semibold text-terracotta"
            >
              Смотреть все {mobileActive.name.toLowerCase()}
            </Link>
            {mobileActive.subs.map((sub, j) => (
              <Link
                key={j}
                href={`/catalog/${mobileActive.slug}`}
                onClick={() => { onClose(); setMobileSubIdx(null); }}
                className="block border-b border-brand-border px-4 py-3.5 text-[15px] text-foreground active:bg-surface"
              >
                {sub}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
