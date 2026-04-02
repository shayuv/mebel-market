"use client";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Truck, Clock, MapPin, Phone } from "@phosphor-icons/react";
import { Package } from "@phosphor-icons/react";


const deliveryMethods = [
  {
    icon: Truck,
    title: "Доставка курьером",
    price: "от 990 ₽",
    terms: "Бесплатно при заказе от 15 000 ₽",
    description:
      "Подъём на этаж, сборка мебели и установка — по тарифу. Курьер позвонит за час до прибытия.",
  },
  {
    icon: Package,
    title: "Пункты самовывоза",
    price: "Бесплатно",
    terms: "Срок хранения — 7 дней",
    description:
      "Более 150 пунктов выдачи в Москве и Московской области. Вы можете забрать заказ в удобное время.",
  },
  {
    icon: MapPin,
    title: "Доставка по России",
    price: "от 1 500 ₽",
    terms: "Срок — 3–14 дней",
    description:
      "Отправляем транспортными компаниями (СДЭК, Деловые Линии, ПЭК). Стоимость зависит от региона и габаритов.",
  },
];

const faqItems = [
  {
    q: "Какие сроки доставки по Москве?",
    a: "Стандартная доставка — 2–3 рабочих дня. Экспресс-доставка (при наличии товара на складе) — на следующий день.",
  },
  {
    q: "Можно ли заказать доставку в выходные?",
    a: "Да, мы доставляем ежедневно с 9:00 до 22:00, включая выходные и праздничные дни.",
  },
  {
    q: "Как отслеживать заказ?",
    a: "После отправки вы получите SMS с трек-номером. Статус заказа также отображается в личном кабинете.",
  },
  {
    q: "Что делать, если товар не подошёл?",
    a: "В течение 14 дней вы можете вернуть товар надлежащего качества. Возврат осуществляется бесплатно через курьера или в любом магазине.",
  },
];

export default function DeliveryPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 pb-20 md:pb-8">
      <Breadcrumbs items={[{ label: "Доставка" }]} />

      <h1 className="font-heading text-3xl font-bold text-foreground">
        Доставка
      </h1>
      <p className="mt-3 max-w-2xl text-brand-muted">
        Доставляем мебель и товары для дома по всей России. Выберите удобный
        способ получения заказа.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {deliveryMethods.map((method) => (
          <div
            key={method.title}
            className="rounded-2xl border border-brand-border bg-white p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-terracotta-light">
              <method.icon size={22} weight="regular" className="text-terracotta" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-foreground">
              {method.title}
            </h3>
            <div className="mt-1 flex items-center gap-3">
              <span className="text-lg font-bold text-terracotta">
                {method.price}
              </span>
              {method.terms && (
                <span className="text-xs text-brand-muted">
                  {method.terms}
                </span>
              )}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-brand-muted">
              {method.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-brand-border bg-white p-6">
        <div className="flex items-center gap-3">
          <Clock size={20} weight="regular" className="text-terracotta" />
          <h2 className="text-lg font-bold text-foreground">
            График доставки
          </h2>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            { time: "09:00 – 12:00", label: "Утренний слот" },
            { time: "12:00 – 15:00", label: "Дневной слот" },
            { time: "15:00 – 18:00", label: "Вечерний слот" },
            { time: "18:00 – 21:00", label: "Поздний слот" },
          ].map((slot) => (
            <div
              key={slot.time}
              className="flex items-center justify-between rounded-xl border border-brand-border px-4 py-3"
            >
              <span className="text-sm font-medium text-foreground">
                {slot.time}
              </span>
              <span className="text-xs text-brand-muted">{slot.label}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-brand-muted">
          * Точное время доставки согласовывается с менеджером по телефону
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-foreground">
          Часто задаваемые вопросы
        </h2>
        <div className="mt-6 space-y-4">
          {faqItems.map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-brand-border bg-white p-5"
            >
              <h3 className="font-semibold text-foreground">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-2xl bg-surface p-8 text-center">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Остались вопросы?
        </h2>
        <p className="mt-2 text-brand-muted">
          Позвоните нам — поможем выбрать удобный способ доставки
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 text-lg font-bold text-foreground">
          <Phone size={18} weight="fill" className="text-terracotta" />
          +7 (800) 555-35-35
        </div>
      </div>
    </div>
  );
}
