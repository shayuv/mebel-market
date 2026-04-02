import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { MapPin, Phone, Clock, EnvelopeSimple, ChatCircleDots } from "@phosphor-icons/react";

export const metadata = {
  title: "Контакты — МЕБЕЛЬ.маркет",
};

const stores = [
  {
    name: "Мега Тёплый Стан",
    address: "г. Москва, Калужское шоссе, 21-й км, ТРЦ «Мега»",
    phone: "+7 (495) 123-45-01",
    hours: "Ежедневно 10:00–22:00",
  },
  {
    name: "МЕБЕЛЬ.маркет Химки",
    address: "г. Химки, ул. Ленинградская, вл. 5, ТЦ «Лига»",
    phone: "+7 (495) 123-45-02",
    hours: "Ежедневно 10:00–21:00",
  },
  {
    name: "МЕБЕЛЬ.маркет Балашиха",
    address: "г. Балашиха, шоссе Энтузиастов, 36А, ТЦ «МаксСити»",
    phone: "+7 (495) 123-45-03",
    hours: "Ежедневно 10:00–21:00",
  },
  {
    name: "МЕБЕЛЬ.маркет Одинцово",
    address: "г. Одинцово, Можайское шоссе, 71, ТЦ «Три Кита»",
    phone: "+7 (495) 123-45-04",
    hours: "Ежедневно 10:00–21:00",
  },
];

const contactChannels = [
  {
    icon: Phone,
    title: "Горячая линия",
    value: "+7 (800) 555-35-35",
    description: "Бесплатно по России, ежедневно 9:00–22:00",
  },
  {
    icon: EnvelopeSimple,
    title: "Email",
    value: "info@mebel-market.ru",
    description: "Ответим в течение 24 часов",
  },
  {
    icon: ChatCircleDots,
    title: "Онлайн-чат",
    value: "Чат на сайте",
    description: "Среднее время ответа — 3 минуты",
  },
];

export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 pb-20 md:pb-8">
      <Breadcrumbs items={[{ label: "Контакты" }]} />

      <h1 className="font-heading text-3xl font-bold text-foreground">
        Контакты
      </h1>
      <p className="mt-3 max-w-2xl text-brand-muted">
        Свяжитесь с нами любым удобным способом или посетите один из наших
        магазинов.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {contactChannels.map((ch) => (
          <div
            key={ch.title}
            className="rounded-2xl border border-brand-border bg-white p-6 text-center"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-terracotta-light">
              <ch.icon size={24} weight="regular" className="text-terracotta" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">
              {ch.title}
            </h3>
            <div className="mt-1 text-lg font-bold text-terracotta">
              {ch.value}
            </div>
            <p className="mt-1 text-xs text-brand-muted">{ch.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-foreground">Наши магазины</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {stores.map((store) => (
            <div
              key={store.name}
              className="rounded-2xl border border-brand-border bg-white p-5"
            >
              <h3 className="font-semibold text-foreground">{store.name}</h3>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-start gap-2 text-brand-muted">
                  <MapPin size={16} weight="regular" className="mt-0.5 shrink-0 text-terracotta" />
                  <span>{store.address}</span>
                </div>
                <div className="flex items-center gap-2 text-brand-muted">
                  <Phone size={16} weight="regular" className="shrink-0 text-terracotta" />
                  <span>{store.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-brand-muted">
                  <Clock size={16} weight="regular" className="shrink-0 text-terracotta" />
                  <span>{store.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 overflow-hidden rounded-2xl border border-brand-border">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=37.5%2C55.7%2C37.7%2C55.8&amp;layer=mapnik"
          className="h-[320px] w-full border-0"
          loading="lazy"
          title="Карта магазинов"
        />
      </div>

      <div className="mt-12 rounded-2xl bg-surface p-8">
        <h2 className="text-lg font-bold text-foreground">
          Реквизиты компании
        </h2>
        <div className="mt-4 grid gap-2 text-sm text-brand-muted sm:grid-cols-2">
          <div>
            <span className="font-medium text-foreground">ООО «МЕБЕЛЬ.маркет»</span>
          </div>
          <div>ИНН: 7712345678</div>
          <div>ОГРН: 1177746034567</div>
          <div>Юр. адрес: 123456, г. Москва, ул. Мебельная, д. 1</div>
        </div>
      </div>
    </div>
  );
}
