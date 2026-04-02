"use client";

import { Truck, ShieldCheck, CreditCard, Wrench } from "@phosphor-icons/react";
import { advantages } from "@/data/categories";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import type { Advantage } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  truck: Truck,
  shield: ShieldCheck,
  "credit-card": CreditCard,
  wrench: Wrench,
};

export function Advantages() {
  return (
    <div className="mt-13 grid gap-3.5 grid-cols-2 lg:grid-cols-4">
      {advantages.map((item, i) => (
        <AnimateOnScroll key={i} delay={i * 0.1}>
          <AdvantageCard item={item} />
        </AnimateOnScroll>
      ))}
    </div>
  );
}

function AdvantageCard({ item }: { item: Advantage }) {
  const Icon = iconMap[item.icon] ?? Truck;

  return (
    <div className="rounded-2xl border border-brand-border bg-white px-5 py-6 text-center">
      <div className="mb-2.5 flex justify-center">
        <Icon
          size={32}
          weight="duotone"
          color="#C4704B"
        />
      </div>
      <div className="mb-1 text-[15px] font-bold text-foreground">
        {item.title}
      </div>
      <div className="text-[13px] text-brand-muted">{item.subtitle}</div>
    </div>
  );
}
