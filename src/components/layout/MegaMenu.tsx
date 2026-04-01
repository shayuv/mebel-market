"use client";

import { useState } from "react";
import { menuData } from "@/data/categories";
import type { MenuCategory } from "@/types";

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
  if (!open) return null;

  const active: MenuCategory = menuData[activeIdx] ?? menuData[0];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[90] bg-black/30"
        onClick={onClose}
      />

      {/* Menu panel */}
      <div className="absolute left-0 right-0 top-full z-[91] flex overflow-hidden rounded-b-[20px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] animate-[menuSlide_0.25s_ease]">
        <style>{`@keyframes menuSlide{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>

        {/* Left sidebar */}
        <div className="w-[280px] shrink-0 border-r border-brand-border bg-surface-light py-3">
          {menuData.map((cat, i) => (
            <div
              key={i}
              onMouseEnter={() => setActiveIdx(i)}
              className={`flex cursor-pointer items-center gap-3 border-r-[3px] px-6 py-[11px] transition-all duration-150 ${
                i === activeIdx
                  ? "border-r-terracotta bg-white font-semibold text-foreground"
                  : "border-r-transparent font-normal text-brand-muted"
              }`}
            >
              <span className="w-7 text-center text-xl">{cat.icon}</span>
              <span className="text-sm">{cat.name}</span>
              <span className="ml-auto text-xs text-brand-muted">›</span>
            </div>
          ))}
        </div>

        {/* Right content */}
        <div className="flex-1 px-9 py-7">
          <div className="font-heading mb-1 text-xl font-bold text-foreground">
            {active.icon} {active.name}
          </div>
          <div className="mb-5 cursor-pointer text-[13px] font-medium text-terracotta">
            Смотреть все →
          </div>
          <div className="grid grid-cols-3 gap-x-8">
            {active.subs.map((sub, j) => (
              <a
                key={j}
                href="#"
                className="block border-b border-brand-border py-2.5 text-sm text-foreground transition-colors duration-150 hover:text-terracotta"
              >
                {sub}
              </a>
            ))}
          </div>

          {/* Promo inside mega menu */}
          <div className="mt-6 flex items-center justify-between rounded-[14px] bg-gradient-to-br from-terracotta-light to-[#FDE8D8] px-[22px] py-[18px]">
            <div>
              <div className="text-sm font-bold text-terracotta">
                Распродажа {active.name.toLowerCase()}
              </div>
              <div className="mt-1 text-[13px] text-brand-muted">
                Скидки до 40% до конца апреля
              </div>
            </div>
            <button className="cursor-pointer rounded-[10px] border-none bg-terracotta px-[18px] py-2 text-[13px] font-semibold text-white">
              Смотреть
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
