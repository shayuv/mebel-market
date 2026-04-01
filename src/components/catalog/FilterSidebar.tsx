"use client";

import { useState } from "react";
import { X, SlidersHorizontal, RotateCcw } from "lucide-react";
import type { FilterState } from "@/types";
import { brands, materials } from "@/data/categories";

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  onReset: () => void;
  className?: string;
}

const colorOptions = [
  { name: "Белый", hex: "#F5F5F5" },
  { name: "Бежевый", hex: "#C4B9A8" },
  { name: "Серый", hex: "#8B8D8E" },
  { name: "Тёмный", hex: "#2D2926" },
  { name: "Коричневый", hex: "#6B4226" },
  { name: "Зелёный", hex: "#2E8B57" },
  { name: "Синий", hex: "#2C3E6B" },
  { name: "Жёлтый", hex: "#D4A017" },
];

export function FilterSidebar({
  filters,
  onChange,
  onReset,
  className,
}: FilterSidebarProps) {
  const [priceInputMin, setPriceInputMin] = useState(
    String(filters.priceMin || "")
  );
  const [priceInputMax, setPriceInputMax] = useState(
    String(filters.priceMax || "")
  );

  const toggleBrand = (brand: string) => {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onChange({ ...filters, brands: next });
  };

  const toggleMaterial = (mat: string) => {
    const next = filters.materials.includes(mat)
      ? filters.materials.filter((m) => m !== mat)
      : [...filters.materials, mat];
    onChange({ ...filters, materials: next });
  };

  const toggleColor = (color: string) => {
    const next = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    onChange({ ...filters, colors: next });
  };

  const applyPrice = () => {
    onChange({
      ...filters,
      priceMin: Number(priceInputMin) || 0,
      priceMax: Number(priceInputMax) || 200000,
    });
  };

  const activeCount =
    (filters.brands.length > 0 ? 1 : 0) +
    (filters.materials.length > 0 ? 1 : 0) +
    (filters.colors.length > 0 ? 1 : 0) +
    (filters.inStock ? 1 : 0) +
    (filters.onSale ? 1 : 0) +
    (filters.priceMin > 0 || filters.priceMax < 200000 ? 1 : 0);

  return (
    <aside className={className}>
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-foreground" />
          <span className="font-semibold text-foreground">Фильтры</span>
          {activeCount > 0 && (
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-terracotta px-1.5 text-[11px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-brand-muted hover:text-terracotta"
          >
            <RotateCcw size={12} />
            Сбросить
          </button>
        )}
      </div>

      {/* Price */}
      <FilterSection title="Цена">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="от 0"
            value={priceInputMin}
            onChange={(e) => setPriceInputMin(e.target.value)}
            onBlur={applyPrice}
            className="w-full rounded-lg border border-brand-border px-3 py-2 text-sm outline-none focus:border-terracotta"
          />
          <span className="text-brand-muted">—</span>
          <input
            type="number"
            placeholder="до 200 000"
            value={priceInputMax}
            onChange={(e) => setPriceInputMax(e.target.value)}
            onBlur={applyPrice}
            className="w-full rounded-lg border border-brand-border px-3 py-2 text-sm outline-none focus:border-terracotta"
          />
        </div>
      </FilterSection>

      {/* Brand */}
      <FilterSection title="Бренд">
        <div className="flex flex-col gap-1.5">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="h-4 w-4 rounded border-brand-border text-terracotta accent-terracotta"
              />
              <span className="text-foreground">{brand}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Material */}
      <FilterSection title="Материал">
        <div className="flex flex-col gap-1.5">
          {materials.map((mat) => (
            <label
              key={mat}
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                checked={filters.materials.includes(mat)}
                onChange={() => toggleMaterial(mat)}
                className="h-4 w-4 rounded border-brand-border text-terracotta accent-terracotta"
              />
              <span className="text-foreground">{mat}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Color */}
      <FilterSection title="Цвет">
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
                filters.colors.includes(color.name)
                  ? "border-terracotta scale-110"
                  : "border-brand-border"
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </FilterSection>

      {/* Toggles */}
      <FilterSection title="">
        <div className="flex flex-col gap-3">
          <ToggleRow
            label="В наличии"
            checked={filters.inStock}
            onChange={(v) => onChange({ ...filters, inStock: v })}
          />
          <ToggleRow
            label="Со скидкой"
            checked={filters.onSale}
            onChange={(v) => onChange({ ...filters, onSale: v })}
          />
        </div>
      </FilterSection>
    </aside>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 border-b border-brand-border pb-5">
      {title && (
        <div className="mb-3 text-sm font-semibold text-foreground">
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between">
      <span className="text-sm text-foreground">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors ${
          checked ? "bg-terracotta" : "bg-brand-border"
        }`}
      >
        <div
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform"
          style={{
            left: "2px",
            transform: checked ? "translateX(20px)" : "translateX(0)",
          }}
        />
      </button>
    </label>
  );
}

/* Active filter tags */
export function ActiveFilterTags({
  filters,
  onRemove,
}: {
  filters: FilterState;
  onRemove: (key: keyof FilterState, value?: string) => void;
}) {
  const tags: { key: keyof FilterState; value?: string; label: string }[] = [];

  filters.brands.forEach((b) =>
    tags.push({ key: "brands", value: b, label: b })
  );
  filters.materials.forEach((m) =>
    tags.push({ key: "materials", value: m, label: m })
  );
  filters.colors.forEach((c) =>
    tags.push({ key: "colors", value: c, label: c })
  );
  if (filters.inStock)
    tags.push({ key: "inStock", label: "В наличии" });
  if (filters.onSale)
    tags.push({ key: "onSale", label: "Со скидкой" });
  if (filters.priceMin > 0 || filters.priceMax < 200000)
    tags.push({
      key: "priceMin",
      label: `${filters.priceMin.toLocaleString()} – ${filters.priceMax.toLocaleString()} ₽`,
    });

  if (tags.length === 0) return null;

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <button
          key={i}
          onClick={() => onRemove(tag.key, tag.value)}
          className="flex items-center gap-1 rounded-full border border-brand-border bg-white px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-terracotta hover:text-terracotta"
        >
          {tag.label}
          <X size={12} />
        </button>
      ))}
    </div>
  );
}
