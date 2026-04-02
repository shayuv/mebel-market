"use client";

import { useState } from "react";
import { X, SlidersHorizontal } from "@phosphor-icons/react";
import type { FilterState } from "@/types";
import {
  FilterSidebar,
  ActiveFilterTags,
} from "@/components/catalog/FilterSidebar";

interface FilterDrawerProps {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  onReset: () => void;
}

export function FilterDrawer({
  filters,
  onChange,
  onReset,
}: FilterDrawerProps) {
  const [open, setOpen] = useState(false);

  const activeCount =
    filters.brands.length +
    filters.materials.length +
    filters.colors.length +
    (filters.inStock ? 1 : 0) +
    (filters.onSale ? 1 : 0);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl border border-brand-border bg-white px-4 py-2 text-sm font-medium text-foreground lg:hidden"
      >
        <SlidersHorizontal size={16} weight="regular" />
        Фильтры
        {activeCount > 0 && (
          <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-terracotta px-1 text-[11px] font-bold text-white">
            {activeCount}
          </span>
        )}
      </button>

      <ActiveFilterTags
        filters={filters}
        onRemove={(key, value) => {
          if (key === "brands" && value) {
            onChange({
              ...filters,
              brands: filters.brands.filter((b) => b !== value),
            });
          } else if (key === "materials" && value) {
            onChange({
              ...filters,
              materials: filters.materials.filter((m) => m !== value),
            });
          } else if (key === "colors" && value) {
            onChange({
              ...filters,
              colors: filters.colors.filter((c) => c !== value),
            });
          } else if (key === "inStock") {
            onChange({ ...filters, inStock: false });
          } else if (key === "onSale") {
            onChange({ ...filters, onSale: false });
          } else {
            onChange({
              ...filters,
              priceMin: 0,
              priceMax: 200000,
            });
          }
        }}
      />

      {open && (
        <div
          className="fixed inset-0 z-[200] bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className="fixed bottom-0 left-0 right-0 z-[201] max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] transition-transform duration-300 lg:hidden"
        style={{
          transform: open ? "translateY(0)" : "translateY(100%)",
          visibility: open ? "visible" : "hidden",
        }}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-brand-border" />
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-surface"
          >
            <X size={18} weight="regular" />
          </button>
        </div>

        <FilterSidebar
          filters={filters}
          onChange={onChange}
          onReset={onReset}
        />

        <button
          onClick={() => setOpen(false)}
          className="mt-4 w-full rounded-xl bg-terracotta py-3 text-sm font-semibold text-white"
        >
          Показать результаты
        </button>
      </div>
    </>
  );
}
