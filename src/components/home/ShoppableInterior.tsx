"use client";

import { useState } from "react";
import { shoppablePins } from "@/data/categories";

export function ShoppableInterior() {
  const [activePin, setActivePin] = useState<number | null>(null);

  return (
    <div className="mt-13">
      <div className="mb-5 flex items-baseline justify-between">
        <div>
          <h2 className="font-heading text-3xl font-bold text-foreground max-sm:text-2xl">
            Готовые интерьеры
          </h2>
          <p className="mt-1.5 text-sm text-brand-muted">
            Нажмите на точку — узнаете о товаре
          </p>
        </div>
        <a
          href="#"
          className="shrink-0 text-sm font-medium text-terracotta hover:underline"
        >
          Все интерьеры →
        </a>
      </div>

      <div className="relative h-[420px] overflow-hidden rounded-[20px] max-sm:h-[280px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&h=700&fit=crop"
          alt=""
          className="h-full w-full object-cover"
        />

        {/* Pins */}
        {shoppablePins.map((pin, i) => (
          <div
            key={i}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            onClick={() => setActivePin(activePin === i ? null : i)}
          >
            {/* Pin dot */}
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-terracotta bg-white/90 backdrop-blur-[8px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-transform duration-300"
              style={{ transform: activePin === i ? "scale(1.2)" : "scale(1)" }}
            >
              <div className="h-2 w-2 rounded-full bg-terracotta" />
            </div>

            {/* Popup */}
            {activePin === i && (
              <div className="absolute left-1/2 top-[calc(100%+12px)] min-w-[180px] -translate-x-1/2 rounded-[14px] bg-white/97 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.15)] backdrop-blur-[12px] animate-[fadeUp_0.2s_ease]">
                <style>{`@keyframes fadeUp{from{opacity:0;transform:translateX(-50%) translateY(6px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>
                <div className="text-sm font-semibold text-foreground">
                  {pin.name}
                </div>
                <div className="mt-1 text-base font-bold text-terracotta">
                  {pin.price}
                </div>
                <div className="mt-1.5 text-xs font-medium text-terracotta">
                  Подробнее →
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
