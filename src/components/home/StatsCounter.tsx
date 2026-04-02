"use client";

import { useEffect, useRef, useState } from "react";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";

const stats = [
  { value: 50000, suffix: "+", label: "товаров" },
  { value: 200, suffix: "+", label: "городов" },
  { value: 15000, suffix: "+", label: "отзывов" },
  { value: 4.8, suffix: "★", label: "рейтинг", isFloat: true },
];

function CountUp({ target, suffix, isFloat = false }: { target: number; suffix: string; isFloat?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * target);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref}>
      <span className="font-heading text-3xl font-bold text-foreground lg:text-4xl">
        {isFloat ? count.toFixed(1) : Math.round(count).toLocaleString("ru-RU")}
        {suffix}
      </span>
    </div>
  );
}

export function StatsCounter() {
  return (
    <AnimateOnScroll>
      <div className="mt-13 grid grid-cols-2 gap-4 rounded-2xl border border-brand-border bg-white px-6 py-8 lg:grid-cols-4 lg:px-10 lg:py-10">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <CountUp target={stat.value} suffix={stat.suffix} isFloat={stat.isFloat} />
            <div className="mt-1.5 text-sm text-brand-muted">{stat.label}</div>
          </div>
        ))}
      </div>
    </AnimateOnScroll>
  );
}
