"use client";

import { useCart } from "@/lib/context/CartContext";
import { formatPrice } from "@/lib/formatters";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Minus, Plus, Trash, Heart, ShoppingBag } from "@phosphor-icons/react";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalCount, totalPrice, totalOldPrice, totalDiscount } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[1280px] px-6 pb-20 md:pb-8">
        <Breadcrumbs items={[{ label: "Корзина" }]} />
        <div className="flex flex-col items-center py-20 text-center">
          <ShoppingBag size={64} weight="regular" className="text-brand-border" />
          <h1 className="mt-6 font-heading text-2xl font-bold text-foreground">Ваша корзина пуста</h1>
          <p className="mt-2 text-brand-muted">Добавьте товары, чтобы оформить заказ</p>
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

  return (
    <div className="mx-auto max-w-[1280px] px-6 pb-20 md:pb-8">
      <Breadcrumbs items={[{ label: "Корзина" }]} />
      <h1 className="font-heading text-2xl font-bold text-foreground lg:text-3xl">
        Корзина <span className="text-brand-muted">({totalCount})</span>
      </h1>

      <div className="mt-6 flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 rounded-2xl border border-brand-border bg-white p-4"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.product.img}
                  alt={item.product.name}
                  className="h-24 w-24 shrink-0 rounded-xl object-cover"
                />
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <Link
                      href={`/catalog/${item.product.catSlug}/${item.product.slug}`}
                      className="text-sm font-semibold text-foreground hover:text-terracotta"
                    >
                      {item.product.name}
                    </Link>
                    {(item.selectedColor || item.selectedSize) && (
                      <div className="mt-1 flex gap-2 text-xs text-brand-muted">
                        {item.selectedColor && <span>Цвет: {item.selectedColor}</span>}
                        {item.selectedSize && <span>Размер: {item.selectedSize}</span>}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center rounded-lg border border-brand-border">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center text-foreground hover:text-terracotta"
                        >
                          <Minus size={14} weight="regular" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center text-foreground hover:text-terracotta"
                        >
                          <Plus size={14} weight="regular" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-foreground">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      {item.product.oldPrice && (
                        <span className="text-xs text-brand-muted line-through">
                          {formatPrice(item.product.oldPrice * item.quantity)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-brand-muted hover:text-terracotta" title="В избранное">
                        <Heart size={16} weight="regular" />
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-brand-muted hover:text-red-500"
                        title="Удалить"
                      >
                        <Trash size={16} weight="regular" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={clearCart}
            className="mt-4 text-sm text-brand-muted hover:text-red-500"
          >
            Очистить корзину
          </button>
        </div>

        <div className="lg:w-[340px] shrink-0">
          <div className="sticky top-28 rounded-2xl border border-brand-border bg-white p-6">
            <h2 className="text-lg font-bold text-foreground">Итого</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-brand-muted">Товаров</span>
                <span className="text-foreground">{totalCount} шт.</span>
              </div>
              {totalDiscount > 0 && (
                <div className="flex justify-between">
                  <span className="text-brand-muted">Сумма без скидки</span>
                  <span className="text-brand-muted line-through">{formatPrice(totalOldPrice)}</span>
                </div>
              )}
              {totalDiscount > 0 && (
                <div className="flex justify-between">
                  <span className="text-brand-muted">Скидка</span>
                  <span className="font-medium text-terracotta">-{formatPrice(totalDiscount)}</span>
                </div>
              )}
              <div className="border-t border-brand-border pt-3">
                <div className="flex justify-between text-base font-bold">
                  <span className="text-foreground">К оплате</span>
                  <span className="text-foreground">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <input
                placeholder="Промокод"
                className="flex-1 rounded-lg border border-brand-border px-3 py-2 text-sm outline-none focus:border-terracotta"
              />
              <button className="rounded-lg border border-brand-border px-4 py-2 text-sm font-medium text-foreground hover:border-terracotta hover:text-terracotta">
                Применить
              </button>
            </div>

            <Link
              href="/checkout"
              className="mt-4 block rounded-xl bg-terracotta py-3.5 text-center text-sm font-semibold text-white shadow-[0_4px_16px_rgba(196,112,75,0.3)] transition-colors hover:bg-terracotta/90"
            >
              Оформить заказ
            </Link>

            <div className="mt-4 flex justify-center gap-3">
              {["Visa", "MC", "Mir", "СБП"].map((p) => (
                <span key={p} className="rounded-md bg-surface px-2 py-0.5 text-[10px] font-medium text-brand-muted">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
