"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Heart, Share2, ShoppingCart, Minus, Plus, CreditCard } from "lucide-react";
import { products, reviews } from "@/data/products";
import { formatPrice } from "@/lib/formatters";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Stars } from "@/components/shared/Stars";
import { Badge } from "@/components/shared/Badge";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductTabs } from "@/components/product/ProductTabs";
import { ProductCard } from "@/components/product/ProductCard";

function getBadgeVariant(badge: string | null) {
  if (!badge) return null;
  if (badge === "Хит") return "hit" as const;
  if (badge === "Новинка") return "new" as const;
  if (badge.startsWith("-")) return "sale" as const;
  return "default" as const;
}

export default function ProductDetailPage() {
  const params = useParams();
  const category = params.category as string;
  const slug = params.slug as string;

  const product = products.find((p) => p.slug === slug && p.catSlug === category);

  const [selectedColor, setSelectedColor] = useState<string | null>(
    product?.colors?.[0]?.name ?? null
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes?.[0]
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="mx-auto max-w-[1280px] px-6 py-20 text-center">
        <h1 className="font-heading text-2xl font-bold text-foreground">Товар не найден</h1>
        <Link href="/catalog" className="mt-4 inline-block text-terracotta hover:underline">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  const galleryImages = [
    product.img,
    product.img.replace("w=500&h=500", "w=800&h=800"),
    product.img,
    product.img.replace("w=500&h=500", "w=1200&h=1200"),
  ];

  const economy = product.oldPrice ? product.oldPrice - product.price : 0;
  const monthlyPrice = Math.ceil(product.price / 12);
  const badgeVariant = getBadgeVariant(product.badge);

  const relatedProducts = products
    .filter((p) => p.catSlug === product.catSlug && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-[1280px] px-6 pb-20 md:pb-8">
      <Breadcrumbs
        items={[
          { label: "Каталог", href: "/catalog" },
          { label: product.cat, href: `/catalog/${product.catSlug}` },
          { label: product.name },
        ]}
      />

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
        {/* Gallery */}
        <div className="lg:w-1/2">
          <ProductGallery images={galleryImages} title={product.name} />
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3">
            {badgeVariant && <Badge variant={badgeVariant}>{product.badge}</Badge>}
            <span className="text-xs text-brand-muted">Арт. {product.id.toString().padStart(6, "0")}</span>
          </div>

          <h1 className="mt-2 font-heading text-2xl font-bold text-foreground lg:text-3xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <Stars rating={product.rating} reviews={product.reviews} />
            <a href="#reviews" className="text-xs text-terracotta hover:underline">
              {product.reviews} отзывов
            </a>
          </div>

          {/* Price */}
          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-lg text-brand-muted line-through">{formatPrice(product.oldPrice)}</span>
            )}
            {economy > 0 && (
              <span className="rounded-lg bg-terracotta-light px-3 py-1 text-sm font-bold text-terracotta">
                Экономия {formatPrice(economy)}
              </span>
            )}
          </div>

          {/* Color swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-5">
              <div className="mb-2 text-sm font-semibold text-foreground">
                Цвет: <span className="font-normal text-brand-muted">{selectedColor}</span>
              </div>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`h-9 w-9 rounded-full border-2 transition-all ${
                      selectedColor === color.name
                        ? "border-terracotta scale-110"
                        : "border-brand-border hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-5">
              <div className="mb-2 text-sm font-semibold text-foreground">Размер:</div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? "border-terracotta bg-terracotta-light text-terracotta"
                        : "border-brand-border bg-white text-foreground hover:border-terracotta"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stock status */}
          <div className="mt-5 flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${product.inStock ? "bg-success" : "bg-amber-400"}`} />
            <span className="text-sm font-medium text-foreground">
              {product.inStock ? "В наличии" : "Под заказ, 7 дней"}
            </span>
          </div>

          {/* Quantity + CTA */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-xl border border-brand-border">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-11 w-11 items-center justify-center text-foreground hover:text-terracotta"
              >
                <Minus size={16} />
              </button>
              <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex h-11 w-11 items-center justify-center text-foreground hover:text-terracotta"
              >
                <Plus size={16} />
              </button>
            </div>
            <button className="flex items-center gap-2 rounded-xl bg-terracotta px-7 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(196,112,75,0.3)] transition-colors hover:bg-terracotta/90">
              <ShoppingCart size={16} />
              В корзину
            </button>
            <button className="rounded-xl border border-brand-border bg-white px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-terracotta hover:text-terracotta">
              Купить в 1 клик
            </button>
            <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-border text-foreground hover:border-terracotta hover:text-terracotta">
              <Heart size={18} />
            </button>
            <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-border text-foreground hover:border-terracotta hover:text-terracotta">
              <Share2 size={18} />
            </button>
          </div>

          {/* Quick specs */}
          {product.specs && (
            <div className="mt-6 rounded-xl bg-surface-light p-4">
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {Object.entries(product.specs)
                  .slice(0, 5)
                  .map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-brand-muted">{key}</span>
                      <span className="font-medium text-foreground">{value}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Installment */}
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-brand-border p-4">
            <CreditCard size={20} className="text-terracotta" />
            <span className="text-sm text-foreground">
              Рассрочка от <strong>{formatPrice(monthlyPrice)}/мес</strong> на 12 месяцев
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div id="reviews" className="mt-10">
        <ProductTabs
          description={product.description ?? ""}
          specs={product.specs ?? {}}
          reviews={reviews}
          productRating={product.rating}
          productReviewsCount={product.reviews}
        />
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="font-heading text-xl font-bold text-foreground">Похожие товары</h2>
          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
