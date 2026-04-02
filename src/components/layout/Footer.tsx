import Link from "next/link";

export function Footer() {
  const columns = [
    {
      title: "Каталог",
      items: [
        { label: "Диваны", href: "/catalog/divany" },
        { label: "Шкафы", href: "/catalog/shkafy" },
        { label: "Кровати", href: "/catalog/krovati" },
        { label: "Кухни", href: "/catalog/kuhni" },
        { label: "Столы", href: "/catalog/stoly" },
        { label: "Детская", href: "/catalog/detskaya" },
        { label: "Декор", href: "/catalog/dekor" },
      ],
    },
    {
      title: "Покупателям",
      items: [
        { label: "Доставка", href: "/delivery" },
        { label: "Оплата", href: "/payment" },
        { label: "Гарантии", href: "/warranty" },
        { label: "Возврат", href: "/warranty" },
      ],
    },
    {
      title: "Контакты",
      items: [
        { label: "Магазины", href: "/contacts" },
        { label: "Контакты", href: "/contacts" },
      ],
    },
  ];

  return (
    <footer className="border-t border-brand-border pt-11 pb-7">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-8 px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="font-heading mb-3.5 text-[22px] font-extrabold text-foreground">
            МЕБЕЛЬ<span className="text-terracotta">.маркет</span>
          </div>
          <p className="mb-4 text-[13px] leading-relaxed text-brand-muted">
            Мебель и товары для дома с доставкой по всей России. Более 50 000
            товаров.
          </p>
          <div className="flex gap-2">
            {["TG", "VK", "YT"].map((s) => (
              <div
                key={s}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[10px] bg-surface text-[11px] font-bold text-brand-muted"
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <div className="mb-3.5 text-sm font-bold text-foreground">
              {col.title}
            </div>
            {col.items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block py-1 text-[13px] text-brand-muted hover:text-terracotta"
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="mx-auto mt-9 flex flex-col items-center gap-4 border-t border-brand-border px-6 pt-5 text-xs text-brand-muted md:flex-row md:justify-between">
        <span>© 2026 МЕБЕЛЬ.маркет</span>
        <div className="flex gap-3">
          {["Visa", "MC", "Mir", "СБП"].map((p) => (
            <span
              key={p}
              className="rounded-md bg-surface px-2.5 py-0.5 font-medium"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
