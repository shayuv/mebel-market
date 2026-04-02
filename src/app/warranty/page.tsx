import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import {
  ShieldCheck,
  ArrowCounterClockwise,
  Wrench,
  Medal,
  FileText,
  Phone,
} from "@phosphor-icons/react";

export const metadata = {
  title: "Гарантии — МЕБЕЛЬ.маркет",
};

const warrantyItems = [
  {
    icon: ShieldCheck,
    title: "Гарантия качества",
    description:
      "Вся мебель сертифицирована и соответствует ГОСТ. Гарантийный срок — от 12 до 36 месяцев в зависимости от категории товара. В течение гарантийного срока мы бесплатно устраним производственные дефекты.",
  },
  {
    icon: ArrowCounterClockwise,
    title: "Возврат и обмен",
    description:
      "14 дней на возврат товара надлежащего качества. Если товар не подошёл по размеру, цвету или комплектации — оформим возврат или обмен. Для товаров с дефектами — возврат в течение всего гарантийного срока.",
  },
  {
    icon: Wrench,
    title: "Сборка и установка",
    description:
      "Профессиональная сборка мебели нашими мастерами. Гарантия на сборочные работы — 12 месяцев. Если в процессе эксплуатации выявится дефект сборки — исправим бесплатно.",
  },
  {
    icon: Medal,
    title: "Сертификаты",
    description:
      "Вся продукция прошла обязательную сертификацию. Сертификаты соответствия и санитарно-эпидемиологические заключения доступны по запросу. Мы работаем только с проверенными производителями.",
  },
];

const steps = [
  {
    step: "1",
    title: "Свяжитесь с нами",
    description:
      "Позвоните на горячую линию или напишите в чат на сайте. Опишите проблему и предоставьте фото дефекта.",
  },
  {
    step: "2",
    title: "Диагностика",
    description:
      "Наш специалист определит причину: производственный дефект, неправильная сборка или естественный износ.",
  },
  {
    step: "3",
    title: "Устранение проблемы",
    description:
      "В случае гарантийного случая — бесплатный ремонт, замена деталей или полный возврат средств.",
  },
];

export default function WarrantyPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 pb-20 md:pb-8">
      <Breadcrumbs items={[{ label: "Гарантии" }]} />

      <h1 className="font-heading text-3xl font-bold text-foreground">
        Гарантии и возврат
      </h1>
      <p className="mt-3 max-w-2xl text-brand-muted">
        Мы гарантируем качество каждого товара. Если что-то пошло не так —
        решим проблему быстро и без лишних вопросов.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {warrantyItems.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-brand-border bg-white p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-terracotta-light">
              <item.icon size={22} weight="regular" className="text-terracotta" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-foreground">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-foreground">
          Как оформить гарантиный случай
        </h2>
        <div className="mt-6 flex flex-col gap-4 md:flex-row">
          {steps.map((s) => (
            <div
              key={s.step}
              className="flex-1 rounded-2xl border border-brand-border bg-white p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta text-sm font-bold text-white">
                {s.step}
              </div>
              <h3 className="mt-3 font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-2xl bg-surface p-8">
        <div className="flex items-center gap-3">
          <FileText size={20} weight="regular" className="text-terracotta" />
          <h2 className="text-lg font-bold text-foreground">
            Важно знать
          </h2>
        </div>
        <ul className="mt-4 space-y-2 text-sm text-brand-muted">
          <li className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
            Гарантия действует при условии соблюдения правил эксплуатации и ухода за мебелью
          </li>
          <li className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
            Не покрываются гарантией: механические повреждения, следы домашних животных, выгорание на солнце
          </li>
          <li className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
            Сохраняйте чек и гарантийный талон до окончания гарантийного срока
          </li>
          <li className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
            Средний срок рассмотрения заявки — 1–3 рабочих дня
          </li>
        </ul>
      </div>

      <div className="mt-12 rounded-2xl border-2 border-terracotta/20 bg-terracotta-light p-8 text-center">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Возникла проблема с товаром?
        </h2>
        <p className="mt-2 text-brand-muted">
          Позвоните — оперативно решим вопрос
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 text-lg font-bold text-foreground">
          <Phone size={18} weight="fill" className="text-terracotta" />
          +7 (800) 555-35-35
        </div>
      </div>
    </div>
  );
}
