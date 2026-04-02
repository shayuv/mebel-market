"use client";

import Link from "next/link";
import { User } from "@phosphor-icons/react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 pb-20 md:pb-8">
      <Breadcrumbs items={[{ label: "Личный кабинет" }]} />

      <div className="mt-12 flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-light">
          <User size={36} weight="regular" className="text-brand-muted" />
        </div>
        <h1 className="mt-6 font-heading text-2xl font-bold text-foreground">
          Личный кабинет
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-brand-muted">
          Скоро здесь появится личный кабинет. Вы сможете просматривать историю
          заказов, управлять адресами доставки и настройками аккаунта.
        </p>
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
