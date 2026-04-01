"use client";

import { useState } from "react";

export function PromoBlock() {
  const [email, setEmail] = useState("");

  return (
    <div className="mt-13 relative overflow-hidden rounded-[20px] bg-gradient-to-br from-foreground to-[#4A4340] px-11 py-10 max-sm:px-6 max-sm:py-8">
      {/* Decorative circle */}
      <div className="absolute -right-10 -top-[60px] h-[260px] w-[260px] rounded-full bg-terracotta/12" />

      <div className="relative z-[2] flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <div className="mb-2 text-[13px] font-semibold uppercase tracking-[2px] text-gold">
            Специальное предложение
          </div>
          <h2 className="font-heading text-2xl font-extrabold text-white md:text-[32px]">
            Скидка 15% на первый заказ
          </h2>
          <p className="mt-2 text-[15px] text-white/65">
            Промокод HELLO при оформлении
          </p>
        </div>
        <div className="flex gap-2.5">
          <input
            placeholder="Ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[220px] rounded-xl border-none bg-white/10 px-5 py-3 text-sm text-white outline-none placeholder:text-white/50"
          />
          <button className="cursor-pointer rounded-xl border-none bg-terracotta px-6 py-3 text-sm font-semibold text-white">
            Получить
          </button>
        </div>
      </div>
    </div>
  );
}
