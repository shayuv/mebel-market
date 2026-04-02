"use client";

import { SquaresFour, Funnel } from "@phosphor-icons/react";
import type { SortOption, GridView } from "@/types";
import { pluralize } from "@/lib/formatters";

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

const gridOptions: { value: GridView }[] = [
  { value: "grid-2" },
  { value: "grid-3" },
  { value: "grid-4" },
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
        Найдено <strong className="text-foreground">{total}</strong>{" "}
        {pluralize(total, ["товар", "товара", "товаров"])}
      </span>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <Funnel size={15} weight="regular" className="text-brand-muted" />
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

        <div className="hidden items-center gap-1 rounded-lg border border-brand-border p-0.5 lg:flex">
          {gridOptions.map(({ value }) => (
            <button
              key={value}
              onClick={() => onGridChange(value)}
              className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                gridView === value
                  ? "bg-surface text-foreground"
                  : "text-brand-muted hover:text-foreground"
              }`}
            >
              <SquaresFour size={15} weight="regular" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
