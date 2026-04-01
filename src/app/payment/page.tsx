import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CreditCard, Banknote, Shield, Percent, Phone } from "lucide-react";

export const metadata = {
  title: "Оплата — МЕБЕЛЬ.маркет",
};

const paymentMethods = [
  {
    icon: CreditCard,
    title: "Онлайн картой",
    description:
      "Visa, Mastercard, Mir, СБП. Безопасная оплата на сайте через защищённое соединение. Деньги списываются после подтверждения заказа.",
    badges: ["Visa", "MC", "Mir", "СБП"],
  },
  {
    icon: Banknote,
    title: "При получении",
    description:
      "Оплата наличными или банковской картой курьеру при доставке. Для пунктов самовывоза — оплата на кассе.",
    badges: ["Наличные", "Карта"],
  },
  {
    icon: Percent,
    title: "Рассрочка 0%",
    description:
      "Беспроцентная рассрочка на срок от 4 до 12 месяцев. Одобрение за 5 минут без справок и поручителей. Партнёры: Халва, Совесть, Тинькофф Платинум.",
    badges: ["Халва", "Совесть", "Тинькофф"],
  },
];

const guarantees = [
  {
    title: "Безопасная оплата",
    description:
      "Все платежи защищены SSL-шифрованием. Мы не храним данные банковских карт.",
  },
  {
    title: "Возврат средств",
    description:
      "При отмене заказа деньги вернутся на карту в течение 3–5 рабочих дней.",
  },
  {
    title: "Чек и гарантия",
    description:
      "Электронный чек и гарантийный талон отправляются на email после оплаты.",
  },
];

export default function PaymentPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 pb-20 md:pb-8">
      <Breadcrumbs items={[{ label: "Оплата" }]} />

      <h1 className="font-heading text-3xl font-bold text-foreground">
        Способы оплаты
      </h1>
      <p className="mt-3 max-w-2xl text-brand-muted">
        Оплачивайте покупки удобным способом. Все транзакции защищены и
        безопасны.
      </p>

      {/* Payment methods */}
      <div className="mt-10 space-y-6">
        {paymentMethods.map((method) => (
          <div
            key={method.title}
            className="rounded-2xl border border-brand-border bg-white p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-terracotta-light">
                <method.icon size={22} className="text-terracotta" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground">
                  {method.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                  {method.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {method.badges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-md bg-surface px-2.5 py-1 text-xs font-medium text-brand-muted"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security guarantees */}
      <div className="mt-12">
        <div className="flex items-center gap-3">
          <Shield size={22} className="text-terracotta" />
          <h2 className="text-xl font-bold text-foreground">
            Безопасность платежей
          </h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {guarantees.map((g) => (
            <div
              key={g.title}
              className="rounded-2xl border border-brand-border bg-white p-5"
            >
              <h3 className="font-semibold text-foreground">{g.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                {g.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Installment details */}
      <div className="mt-12 rounded-2xl bg-terracotta-light p-8">
        <h2 className="font-heading text-xl font-bold text-terracotta">
          Рассрочка без переплат
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-brand-muted">
          Оформите рассрочку на любой товар стоимостью от 3 000 ₽. Начальный
          взнос — 0%. Срок — от 4 до 12 месяцев. Для оформления нужен только
          паспорт. Решение — за 5 минут.
        </p>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          {[
            { value: "0%", label: "Переплата" },
            { value: "5 мин", label: "Оформление" },
            { value: "12 мес", label: "Макс. срок" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-terracotta">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-brand-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-2xl bg-surface p-8 text-center">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Нужна помощь с оплатой?
        </h2>
        <p className="mt-2 text-brand-muted">
          Свяжитесь с нами — подберём оптимальный способ оплаты
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 text-lg font-bold text-foreground">
          <Phone size={18} className="text-terracotta" />
          +7 (800) 555-35-35
        </div>
      </div>
    </div>
  );
}
