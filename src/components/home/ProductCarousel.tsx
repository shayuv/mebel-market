"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

const tabs = [
  { key: "hits", label: "Хиты продаж" },
  { key: "new", label: "Новинки" },
  { key: "sale", label: "Со скидкой" },
] as const;

export function ProductCarousel() {
  const [activeTab, setActiveTab] = useState<string>("hits");

  return (
    <div className="mt-13">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex rounded-[14px] bg-surface p-[3px]">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="rounded-[11px] border-none px-5 py-2.5 text-sm font-semibold transition-all duration-250"
              style={{
                background:
                  activeTab === tab.key ? "#FFFFFF" : "transparent",
                color:
                  activeTab === tab.key ? "#2D2926" : "#8A8580",
                boxShadow:
                  activeTab === tab.key
                    ? "0 2px 8px rgba(0,0,0,0.05)"
                    : "none",
                cursor: "pointer",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <Link
          href="/catalog"
          className="shrink-0 text-sm font-medium text-terracotta hover:underline"
        >
          Смотреть все →
        </Link>
      </div>

      {/* Horizontal scroll */}
      <div
        className="flex gap-4 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
