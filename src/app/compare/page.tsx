"use client";

import { useCompare } from "@/lib/context/CompareContext";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { formatPrice } from "@/lib/formatters";
import { ArrowsLeftRight } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

export default function ComparePage() {
  const { items, clear } = useCompare();
  const [showDiffOnly, setShowDiffOnly] = useState(false);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[1280px] px-6 pb-20 md:pb-8">
        <Breadcrumbs items={[{ label: "Сравнение" }]} />
        <div className="flex flex-col items-center py-20 text-center">
          <ArrowsLeftRight size={64} weight="regular" className="text-brand-border" />
          <h1 className="mt-6 font-heading text-2xl font-bold text-foreground">Нет товаров для сравнения</h1>
          <p className="mt-2 text-brand-muted">Добавьте товары, нажав на иконку сравнения</p>
          <Link
            href="/catalog"
            className="mt-6 rounded-xl bg-terracotta px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-terracotta/90"
          >
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  const allSpecs = items.map((p) => Object.keys(p.specs ?? {}));
  const specKeys = [...new Set(allSpecs.flat())];

  const getSpecValues = (key: string) => items.map((p) => p.specs?.[key] ?? "—");
  const isSpecDifferent = (key: string) => {
    const values = getSpecValues(key);
    return new Set(values).size > 1;
  };

  const displayKeys = showDiffOnly ? specKeys.filter(isSpecDifferent) : specKeys;

  return (
    <div className="mx-auto max-w-[1280px] px-6 pb-20 md:pb-8">
      <Breadcrumbs items={[{ label: "Сравнение" }]} />

      <div className="flex items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Сравнение <span className="text-brand-muted">({items.length}/4)</span>
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowDiffOnly(!showDiffOnly)}
            className={`rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
              showDiffOnly ? "border-terracotta bg-terracotta-light text-terracotta" : "border-brand-border text-foreground hover:border-terracotta"
            }`}
          >
            {showDiffOnly ? "Все характеристики" : "Только различия"}
          </button>
          <button onClick={clear} className="text-sm text-brand-muted hover:text-red-500">
            Очистить
          </button>
        </div>
      </div>

      {/* Desktop table */}
      <div className="mt-6 hidden md:block">
        <div className="overflow-x-auto rounded-2xl border border-brand-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-brand-border bg-surface-light">
                <th className="p-4 text-left text-sm font-semibold text-foreground">Характеристика</th>
                {items.map((p) => (
                  <th key={p.id} className="p-4 text-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt={p.name} className="mx-auto mb-2 h-20 w-20 rounded-xl object-cover" />
                    <div className="text-sm font-semibold text-foreground">{p.name}</div>
                    <div className="mt-1 text-base font-bold text-foreground">{formatPrice(p.price)}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayKeys.map((key) => {
                const values = getSpecValues(key);
                const different = isSpecDifferent(key);
                return (
                  <tr key={key} className="border-b border-brand-border last:border-0">
                    <td className="p-4 text-sm text-brand-muted">{key}</td>
                    {values.map((val, i) => (
                      <td key={i} className={`p-4 text-center text-sm ${different ? "font-medium text-foreground" : "text-brand-muted"}`}>
                        {val}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="mt-6 flex gap-4 overflow-x-auto pb-2 md:hidden" style={{ scrollbarWidth: "none" }}>
        {items.map((p) => (
          <div key={p.id} className="min-w-[220px] shrink-0 rounded-2xl border border-brand-border bg-white p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.img} alt={p.name} className="mb-3 h-32 w-full rounded-xl object-cover" />
            <div className="text-sm font-semibold text-foreground">{p.name}</div>
            <div className="mt-1 text-base font-bold text-foreground">{formatPrice(p.price)}</div>
            <div className="mt-3 space-y-1.5">
              {displayKeys.map((key) => (
                <div key={key} className="flex justify-between text-xs">
                  <span className="text-brand-muted">{key}</span>
                  <span className="text-foreground">{p.specs?.[key] ?? "—"}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
