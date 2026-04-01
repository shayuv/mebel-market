"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { Review } from "@/types";

interface ProductTabsProps {
  description: string;
  specs: Record<string, string>;
  reviews: Review[];
  productRating: number;
  productReviewsCount: number;
}

export function ProductTabs({
  description,
  specs,
  reviews,
  productRating,
  productReviewsCount,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { key: "description", label: "Описание" },
    { key: "specs", label: "Характеристики" },
    { key: "reviews", label: `Отзывы (${productReviewsCount})` },
    { key: "delivery", label: "Доставка и оплата" },
  ];

  return (
    <div className="mt-8">
      {/* Tab buttons */}
      <div className="flex gap-0 border-b border-brand-border overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`shrink-0 border-b-2 px-5 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "border-terracotta text-terracotta"
                : "border-transparent text-brand-muted hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-6">
        {activeTab === "description" && (
          <div className="max-w-3xl text-sm leading-relaxed text-foreground/80">
            {description}
          </div>
        )}

        {activeTab === "specs" && (
          <div className="max-w-2xl">
            <table className="w-full">
              <tbody>
                {Object.entries(specs).map(([key, value]) => (
                  <tr key={key} className="border-b border-brand-border">
                    <td className="py-3 pr-8 text-sm text-brand-muted">
                      {key}
                    </td>
                    <td className="py-3 text-sm font-medium text-foreground">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="max-w-3xl">
            {/* Summary */}
            <div className="mb-6 flex items-center gap-4 rounded-xl bg-surface-light p-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">
                  {productRating}
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i <= Math.round(productRating)
                          ? "fill-gold text-gold"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <div className="text-xs text-brand-muted">
                  {productReviewsCount} отзывов
                </div>
              </div>
              <button className="ml-auto rounded-xl border border-brand-border px-4 py-2 text-sm font-medium text-foreground hover:border-terracotta hover:text-terracotta">
                Написать отзыв
              </button>
            </div>

            {/* Review list */}
            <div className="flex flex-col gap-5">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-brand-border pb-5"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface font-semibold text-foreground">
                        {review.author[0]}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          {review.author}
                        </div>
                        <div className="text-xs text-brand-muted">
                          {review.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          size={13}
                          className={
                            i <= review.rating
                              ? "fill-gold text-gold"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/80">
                    {review.text}
                  </p>
                  {review.photos && (
                    <div className="mt-3 flex gap-2">
                      {review.photos.map((photo, j) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={j}
                          src={photo}
                          alt=""
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                      ))}
                    </div>
                  )}
                  {(review.pros || review.cons) && (
                    <div className="mt-3 flex gap-6">
                      {review.pros && (
                        <div className="text-xs">
                          <span className="font-semibold text-success">
                            Достоинства:
                          </span>{" "}
                          <span className="text-foreground/70">
                            {review.pros}
                          </span>
                        </div>
                      )}
                      {review.cons && (
                        <div className="text-xs">
                          <span className="font-semibold text-red-500">
                            Недостатки:
                          </span>{" "}
                          <span className="text-foreground/70">
                            {review.cons}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "delivery" && (
          <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-foreground/80">
            <div>
              <h4 className="mb-1 font-semibold text-foreground">
                🚚 Доставка
              </h4>
              <p>
                Бесплатная доставка при заказе от 15 000 ₽. Доставка по Москве
                — 1–2 дня, по России — 3–7 дней. Возможен подъём на этаж.
              </p>
            </div>
            <div>
              <h4 className="mb-1 font-semibold text-foreground">
                💳 Оплата
              </h4>
              <p>
                Онлайн картой (Visa, Mastercard, Mir), СБП, наличными при
                получении. Рассрочка 0% до 24 месяцев.
              </p>
            </div>
            <div>
              <h4 className="mb-1 font-semibold text-foreground">
                🔄 Возврат
              </h4>
              <p>
                Возврат в течение 14 дней. Мебель надлежащего качества — при
                сохранении упаковки и отсутствии следов эксплуатации.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
