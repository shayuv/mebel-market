"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { products, categoryPages } from "@/data/products";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { SortBar } from "@/components/catalog/SortBar";
import { FilterSidebar } from "@/components/catalog/FilterSidebar";
import { FilterDrawer } from "@/components/catalog/FilterDrawer";
import { ProductCard } from "@/components/product/ProductCard";
import type { FilterState, SortOption, GridView } from "@/types";

const defaultFilters: FilterState = {
  priceMin: 0,
  priceMax: 200000,
  brands: [],
  materials: [],
  colors: [],
  inStock: false,
  onSale: false,
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.category as string;
  const category = categoryPages.find((c) => c.slug === slug);

  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sort, setSort] = useState<SortOption>("popular");
  const [gridView, setGridView] = useState<GridView>("grid-3");
  const [showCount, setShowCount] = useState(12);

  const categoryProducts = useMemo(
    () => products.filter((p) => p.catSlug === slug),
    [slug]
  );

  const filtered = useMemo(() => {
    return categoryProducts.filter((p) => {
      if (filters.priceMin > 0 && p.price < filters.priceMin) return false;
      if (filters.priceMax < 200000 && p.price > filters.priceMax) return false;
      if (filters.brands.length > 0 && p.brand && !filters.brands.includes(p.brand)) return false;
      if (filters.materials.length > 0 && p.material && !filters.materials.includes(p.material)) return false;
      if (filters.inStock && !p.inStock) return false;
      if (filters.onSale && !p.oldPrice) return false;
      return true;
    });
  }, [categoryProducts, filters]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      switch (sort) {
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "rating": return b.rating - a.rating;
        case "new": return (b.badge === "Новинка" ? 1 : 0) - (a.badge === "Новинка" ? 1 : 0);
        default: return b.reviews - a.reviews;
      }
    });
  }, [filtered, sort]);

  if (!category) {
    return (
      <div className="mx-auto max-w-[1280px] px-6 py-20 text-center">
        <h1 className="font-heading text-2xl font-bold text-foreground">Категория не найдена</h1>
        <a href="/catalog" className="mt-4 inline-block text-terracotta hover:underline">Вернуться в каталог</a>
      </div>
    );
  }

  const visibleProducts = sorted.slice(0, showCount);
  const gridClass =
    gridView === "grid-2"
      ? "grid-cols-2"
      : gridView === "grid-3"
        ? "grid-cols-2 md:grid-cols-3"
        : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  return (
    <div className="mx-auto max-w-[1280px] px-6 pb-20 md:pb-8">
      <Breadcrumbs
        items={[
          { label: "Каталог", href: "/catalog" },
          { label: category.name },
        ]}
      />

      <h1 className="font-heading text-2xl font-bold text-foreground lg:text-3xl">
        {category.icon} {category.name}
      </h1>
      <p className="mt-1 text-sm text-brand-muted">{category.description}</p>

      {/* Subcategory chips */}
      <div className="mt-5 flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {category.subcategories.map((sub) => (
          <button
            key={sub.slug}
            className="flex shrink-0 items-center gap-2 rounded-full border border-brand-border bg-white px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-terracotta hover:text-terracotta"
          >
            <span>{sub.icon}</span>
            {sub.name}
          </button>
        ))}
      </div>

      <div className="mt-6 flex gap-8">
        {/* Desktop sidebar */}
        <div className="hidden w-[260px] shrink-0 lg:block">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(defaultFilters)}
          />
        </div>

        {/* Main content */}
        <div className="flex-1">
          <FilterDrawer
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(defaultFilters)}
          />
          <SortBar
            total={sorted.length}
            sort={sort}
            onSortChange={setSort}
            gridView={gridView}
            onGridChange={setGridView}
          />
          <div className={`grid gap-4 ${gridClass}`}>
            {visibleProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {visibleProducts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-brand-muted">Товары не найдены</p>
              <p className="mt-2 text-sm text-brand-muted">Попробуйте изменить фильтры</p>
            </div>
          )}
          {showCount < sorted.length && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowCount((c) => c + 6)}
                className="rounded-xl border border-brand-border bg-white px-8 py-3 text-sm font-semibold text-foreground transition-colors hover:border-terracotta hover:text-terracotta"
              >
                Показать ещё ({sorted.length - showCount} осталось)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
