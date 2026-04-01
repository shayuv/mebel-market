"use client";

import { useState } from "react";
import { useCart } from "@/lib/context/CartContext";
import { formatPrice } from "@/lib/formatters";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Check, CreditCard, Truck, User } from "lucide-react";

const steps = [
  { key: "contacts", label: "Контакты", icon: User },
  { key: "delivery", label: "Доставка", icon: Truck },
  { key: "payment", label: "Оплата", icon: CreditCard },
  { key: "confirm", label: "Подтверждение", icon: Check },
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const { items, totalCount, totalPrice } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    deliveryType: "courier" as "courier" | "pickup",
    address: "",
    date: "",
    time: "",
    paymentType: "card" as "card" | "cash" | "installment",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[1280px] px-6 py-20 text-center">
        <h1 className="font-heading text-2xl font-bold text-foreground">Корзина пуста</h1>
        <a href="/catalog" className="mt-4 inline-block text-terracotta hover:underline">Перейти в каталог</a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[960px] px-6 pb-20 md:pb-8">
      <Breadcrumbs items={[{ label: "Корзина", href: "/cart" }, { label: "Оформление заказа" }]} />
      <h1 className="font-heading text-2xl font-bold text-foreground">Оформление заказа</h1>

      {/* Progress bar */}
      <div className="mt-6 flex items-center gap-0">
        {steps.map((step, i) => (
          <div key={step.key} className="flex flex-1 items-center">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                i < currentStep
                  ? "bg-success text-white"
                  : i === currentStep
                    ? "bg-terracotta text-white"
                    : "bg-surface text-brand-muted"
              }`}
            >
              {i < currentStep ? <Check size={18} /> : i + 1}
            </div>
            <span className={`ml-2 hidden text-sm font-medium sm:inline ${
              i <= currentStep ? "text-foreground" : "text-brand-muted"
            }`}>
              {step.label}
            </span>
            {i < steps.length - 1 && (
              <div className={`mx-2 h-0.5 flex-1 ${i < currentStep ? "bg-success" : "bg-surface"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="mt-8">
        {/* Step 1: Contacts */}
        {currentStep === 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Контактные данные</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                placeholder="Имя *"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="rounded-xl border border-brand-border px-4 py-3 text-sm outline-none focus:border-terracotta"
              />
              <input
                placeholder="Телефон *"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="rounded-xl border border-brand-border px-4 py-3 text-sm outline-none focus:border-terracotta"
              />
            </div>
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="w-full rounded-xl border border-brand-border px-4 py-3 text-sm outline-none focus:border-terracotta"
            />
            <button
              onClick={() => setCurrentStep(1)}
              className="mt-4 rounded-xl bg-terracotta px-8 py-3 text-sm font-semibold text-white hover:bg-terracotta/90"
            >
              Далее
            </button>
          </div>
        )}

        {/* Step 2: Delivery */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Способ доставки</h2>
            <div className="flex gap-3">
              {(["courier", "pickup"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => updateField("deliveryType", type)}
                  className={`flex-1 rounded-xl border p-4 text-sm font-medium transition-colors ${
                    form.deliveryType === type
                      ? "border-terracotta bg-terracotta-light text-terracotta"
                      : "border-brand-border text-foreground hover:border-terracotta"
                  }`}
                >
                  {type === "courier" ? "Доставка курьером" : "Самовывоз"}
                </button>
              ))}
            </div>
            {form.deliveryType === "courier" && (
              <div className="space-y-3">
                <input
                  placeholder="Адрес доставки *"
                  value={form.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  className="w-full rounded-xl border border-brand-border px-4 py-3 text-sm outline-none focus:border-terracotta"
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => updateField("date", e.target.value)}
                    className="rounded-xl border border-brand-border px-4 py-3 text-sm outline-none focus:border-terracotta"
                  />
                  <select
                    value={form.time}
                    onChange={(e) => updateField("time", e.target.value)}
                    className="rounded-xl border border-brand-border px-4 py-3 text-sm outline-none focus:border-terracotta"
                  >
                    <option value="">Время доставки</option>
                    <option value="9-12">09:00 - 12:00</option>
                    <option value="12-15">12:00 - 15:00</option>
                    <option value="15-18">15:00 - 18:00</option>
                    <option value="18-21">18:00 - 21:00</option>
                  </select>
                </div>
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setCurrentStep(0)}
                className="rounded-xl border border-brand-border px-6 py-3 text-sm font-medium text-foreground hover:border-terracotta"
              >
                Назад
              </button>
              <button
                onClick={() => setCurrentStep(2)}
                className="rounded-xl bg-terracotta px-8 py-3 text-sm font-semibold text-white hover:bg-terracotta/90"
              >
                Далее
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Способ оплаты</h2>
            <div className="flex flex-col gap-3">
              {([
                { key: "card" as const, label: "Онлайн картой", desc: "Visa, Mastercard, Mir, СБП" },
                { key: "cash" as const, label: "При получении", desc: "Наличными или картой курьеру" },
                { key: "installment" as const, label: "Рассрочка 0%", desc: `От ${formatPrice(Math.ceil(totalPrice / 12))}/мес на 12 месяцев` },
              ]).map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => updateField("paymentType", opt.key)}
                  className={`rounded-xl border p-4 text-left transition-colors ${
                    form.paymentType === opt.key
                      ? "border-terracotta bg-terracotta-light"
                      : "border-brand-border hover:border-terracotta"
                  }`}
                >
                  <div className="text-sm font-semibold text-foreground">{opt.label}</div>
                  <div className="mt-0.5 text-xs text-brand-muted">{opt.desc}</div>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setCurrentStep(1)}
                className="rounded-xl border border-brand-border px-6 py-3 text-sm font-medium text-foreground hover:border-terracotta"
              >
                Назад
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="rounded-xl bg-terracotta px-8 py-3 text-sm font-semibold text-white hover:bg-terracotta/90"
              >
                Далее
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-foreground">Подтверждение заказа</h2>

            {/* Order summary */}
            <div className="rounded-2xl border border-brand-border bg-white p-5">
              <h3 className="text-sm font-bold text-foreground">Ваш заказ ({totalCount} шт.)</h3>
              <div className="mt-3 space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.product.img} alt="" className="h-12 w-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">{item.product.name}</div>
                      <div className="text-xs text-brand-muted">{item.quantity} шт.</div>
                    </div>
                    <span className="text-sm font-bold text-foreground">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-brand-border pt-4">
                <div className="flex justify-between text-base font-bold text-foreground">
                  <span>Итого</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>

            {/* Info summary */}
            <div className="rounded-2xl border border-brand-border bg-white p-5 space-y-2 text-sm">
              <div><span className="text-brand-muted">Имя:</span> <span className="text-foreground font-medium">{form.name || "—"}</span></div>
              <div><span className="text-brand-muted">Телефон:</span> <span className="text-foreground font-medium">{form.phone || "—"}</span></div>
              <div><span className="text-brand-muted">Доставка:</span> <span className="text-foreground font-medium">{form.deliveryType === "courier" ? "Курьер" : "Самовывоз"}</span></div>
              {form.deliveryType === "courier" && form.address && (
                <div><span className="text-brand-muted">Адрес:</span> <span className="text-foreground font-medium">{form.address}</span></div>
              )}
              <div><span className="text-brand-muted">Оплата:</span> <span className="text-foreground font-medium">
                {form.paymentType === "card" ? "Онлайн картой" : form.paymentType === "cash" ? "При получении" : "Рассрочка"}
              </span></div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setCurrentStep(2)}
                className="rounded-xl border border-brand-border px-6 py-3 text-sm font-medium text-foreground hover:border-terracotta"
              >
                Назад
              </button>
              <button className="rounded-xl bg-terracotta px-8 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(196,112,75,0.3)] hover:bg-terracotta/90">
                Подтвердить заказ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
