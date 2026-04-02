"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { products, categoryPages } from "@/data/products";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ProductCard } from "@/components/product/ProductCard";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1280px] px-6 pb-20 md:pb-8">
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center gap-3 rounded-2xl border border-brand-border bg-white px-5 py-4 shadow-sm">
              <MagnifyingGlass size={20} weight="regular" className="shrink-0 text-brand-muted" />
              <div className="h-6 flex-1 animate-pulse rounded bg-surface-light" />
            </div>
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  // B05: sync query when URL changes
  useEffect(() => {
    const q = searchParams.get("q") || "";
    if (q && q !== query) setQuery(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const results = useMemo(() => {
    if (!query.trim()) return { products: [], categories: [] };
    const q = query.toLowerCase();
    return {
      products: products.filter(
        (p) => p.name.toLowerCase().includes(q) || (p.cat ?? "").toLowerCase().includes(q)
      ),
      categories: categoryPages.filter((c) => c.name.toLowerCase().includes(q)),
    };
  }, [query]);

  return (
    <div className="mx-auto max-w-[1280px] px-6 pb-20 md:pb-8">
      <Breadcrumbs items={[{ label: "Поиск" }]} />

      {/* Search input */}
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-3 rounded-2xl border border-brand-border bg-white px-5 py-4 shadow-sm">
          <MagnifyingGlass size={20} weight="regular" className="shrink-0 text-brand-muted" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Найти мебель, декор и товары для дома"
            className="flex-1 border-none bg-transparent text-base text-foreground outline-none placeholder:text-brand-muted"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-sm text-brand-muted hover:text-foreground"
            >
              Очистить
            </button>
          )}
        </div>

        {/* Category suggestions */}
        {query.trim() && results.categories.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {results.categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/catalog/${cat.slug}`}
                className="flex items-center gap-1.5 rounded-full border border-brand-border bg-white px-3 py-1.5 text-sm text-foreground transition-colors hover:border-terracotta hover:text-terracotta"
              >
                <span>{cat.icon}</span>
                {cat.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Results */}
      {query.trim() && (
        <div className="mt-8">
          <p className="text-sm text-brand-muted">
            {results.products.length > 0 ? (
              <>Найдено <strong className="text-foreground">{results.products.length}</strong> товаров по запросу &laquo;{query}&raquo;</>
            ) : (
              <>По запросу &laquo;{query}&raquo; ничего не найдено</>
            )}
          </p>

          {results.products.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {results.products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {results.products.length === 0 && (
            <div className="mt-12 flex flex-col items-center text-center">
              <MagnifyingGlass size={48} weight="regular" className="text-brand-border" />
              <p className="mt-4 text-lg text-foreground">Ничего не найдено</p>
              <p className="mt-2 text-sm text-brand-muted">
                Попробуйте изменить запрос или перейдите в каталог
              </p>
              <Link
                href="/catalog"
                className="mt-6 rounded-xl bg-terracotta px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-terracotta/90"
              >
                Перейти в каталог
              </Link>

              {/* Popular queries */}
              <div className="mt-8">
                <p className="text-sm font-semibold text-foreground">Популярные запросы:</p>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {["Диваны", "Кровати", "Кухни", "Шкафы", "Столы"].map((q) => (
                    <button
                      key={q}
                      onClick={() => setQuery(q)}
                      className="rounded-full border border-brand-border bg-white px-4 py-2 text-sm text-foreground transition-colors hover:border-terracotta hover:text-terracotta"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* No query state */}
      {!query.trim() && (
        <div className="mt-12 flex flex-col items-center text-center">
          <MagnifyingGlass size={48} weight="regular" className="text-brand-border" />
          <p className="mt-4 text-lg text-foreground">Начните поиск</p>
          <p className="mt-2 text-sm text-brand-muted">
            Введите название товара или категории
          </p>
          <div className="mt-6">
            <p className="text-sm font-semibold text-foreground">Популярные запросы:</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {["Диваны", "Кровати", "Кухни", "Шкафы", "Столы", "Комоды"].map((q) => (
                <button
                  key={q}
                  onClick={() => setQuery(q)}
                  className="rounded-full border border-brand-border bg-white px-4 py-2 text-sm text-foreground transition-colors hover:border-terracotta hover:text-terracotta"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
