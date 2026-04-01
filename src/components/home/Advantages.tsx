import { Truck, Shield, CreditCard, Wrench } from "lucide-react";
import { advantages } from "@/data/categories";
import type { Advantage } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  truck: Truck,
  shield: Shield,
  "credit-card": CreditCard,
  wrench: Wrench,
};

export function Advantages() {
  return (
    <div className="mt-13 grid gap-3.5 grid-cols-2 lg:grid-cols-4">
      {advantages.map((item, i) => (
        <AdvantageCard key={i} item={item} />
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
          size={28}
          className="text-terracotta"
          strokeWidth={1.5}
        />
      </div>
      <div className="mb-1 text-[15px] font-bold text-foreground">
        {item.title}
      </div>
      <div className="text-[13px] text-brand-muted">{item.subtitle}</div>
    </div>
  );
}
