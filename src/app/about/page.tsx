"use client";

import Link from "next/link";
import { Buildings, Users, Truck, ShieldCheck } from "@phosphor-icons/react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

const stats = [
  { icon: Buildings, value: "12", label: "магазинов" },
  { icon: Users, value: "500 000+", label: "клиентов" },
  { icon: Truck, value: "50 000+", label: "товаров" },
  { icon: ShieldCheck, value: "10 лет", label: "на рынке" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 pb-20 md:pb-8">
      <Breadcrumbs items={[{ label: "О компании" }]} />

      <h1 className="font-heading text-3xl font-bold text-foreground">
        О компании
      </h1>

      <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-foreground/80">
        <p>
          <strong className="text-foreground">МЕБЕЛЬ.маркет</strong> — один из
          крупнейших интернет-магазинов мебели и товаров для дома в России.
          Мы работаем с 2016 года и за это время помогли обустроить более
          500 000 домов по всей стране.
        </p>
        <p>
          Наш ассортимент — более 50 000 товаров от ведущих российских
          и европейских производителей: диваны, кровати, шкафы, кухни,
          столы, декор и бытовая техника. Мы тщательно отбираем поставщиков,
          чтобы предложить лучшее сочетание качества и цены.
        </p>
        <p>
          Собственная служба доставки работает в Москве и Московской области.
          В остальные регионы доставляем транспортными компаниями. Профессиональная
          сборка мебели — за 1 день после доставки.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-brand-border bg-white p-6 text-center"
          >
            <stat.icon size={28} weight="duotone" className="mx-auto text-terracotta" />
            <div className="mt-3 text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="mt-1 text-xs text-brand-muted">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=500&fit=crop"
          alt="Офис МЕБЕЛЬ.маркет"
          className="h-[280px] w-full object-cover md:h-[360px]"
        />
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/contacts"
          className="inline-block rounded-xl bg-terracotta px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-terracotta/90"
        >
          Контакты и магазины
        </Link>
      </div>
    </div>
  );
}
