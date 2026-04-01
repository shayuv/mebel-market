"use client";

import { Grid2X2, Grid3X3, LayoutGrid, ArrowUpDown } from "lucide-react";
import type { SortOption, GridView } from "@/types";

interface SortBarProps {
  total: number;
  sort: SortOption;
  onSortChange: (s: SortOption) => void;
  gridView: GridView;
  onGridChange: (g: GridView) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "popular", label: "Популярные" },
  { value: "price-asc", label: "Дешёвые" },
  { value: "price-desc", label: "Дорогие" },
  { value: "new", label: "Новинки" },
  { value: "rating", label: "По рейтингу" },
];

const gridIcons: { value: GridView; icon: React.ElementType }[] = [
  { value: "grid-2", icon: Grid2X2 },
  { value: "grid-3", icon: Grid3X3 },
  { value: "grid-4", icon: LayoutGrid },
];

export function SortBar({
  total,
  sort,
  onSortChange,
  gridView,
  onGridChange,
}: SortBarProps) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <span className="text-sm text-brand-muted">
        Найдено <strong className="text-foreground">{total}</strong> товаров
      </span>

      <div className="flex items-center gap-3">
        {/* Sort */}
        <div className="flex items-center gap-1.5">
          <ArrowUpDown size={15} className="text-brand-muted" />
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="rounded-lg border border-brand-border bg-white px-3 py-1.5 text-sm text-foreground outline-none focus:border-terracotta cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Grid toggle — desktop only */}
        <div className="hidden items-center gap-1 rounded-lg border border-brand-border p-0.5 lg:flex">
          {gridIcons.map(({ value, icon: Icon }) => (
            <button
              key={value}
              onClick={() => onGridChange(value)}
              className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                gridView === value
                  ? "bg-surface text-foreground"
                  : "text-brand-muted hover:text-foreground"
              }`}
            >
              <Icon size={15} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
