import type {
  MenuCategory,
  Category,
  HeroSlide,
  SidePromo,
  ShoppablePin,
  Advantage,
} from "@/types";

export const menuData: MenuCategory[] = [
  {
    icon: "\u{1F6CB}\uFE0F",
    name: "Диваны и кресла",
    slug: "divany-i-kresla",
    subs: ["Прямые диваны", "Угловые диваны", "П-образные диваны", "Диваны-кровати", "Кресла", "Тахты", "Пуфы", "Банкетки"],
  },
  {
    icon: "\u{1F6AA}",
    name: "Шкафы и стеллажи",
    slug: "shkafy-i-stellazhi",
    subs: ["Шкафы-купе", "Распашные шкафы", "Угловые шкафы", "Модульные шкафы", "Стеллажи", "Стенки", "Полки", "Витрины"],
  },
  {
    icon: "\u{1F6CF}\uFE0F",
    name: "Кровати и матрасы",
    slug: "krovati-i-matrace",
    subs: ["Двуспальные кровати", "Односпальные кровати", "Двухъярусные кровати", "Пружинные матрасы", "Беспружинные матрасы", "Топперы", "Наматрасники"],
  },
  {
    icon: "\u{1F373}",
    name: "Кухни",
    slug: "kuhni",
    subs: ["Готовые кухни", "Модульные кухни", "Кухонные модули", "Столешницы", "Мойки", "Смесители", "Фурнитура"],
  },
  {
    icon: "\u{1FA91}",
    name: "Столы и стулья",
    slug: "stoly-i-stulya",
    subs: ["Обеденные столы", "Компьютерные столы", "Журнальные столики", "Кухонные стулья", "Барные стулья", "Офисные кресла", "Обеденные группы"],
  },
  {
    icon: "\u{1F9D2}",
    name: "Детская",
    slug: "detskaya",
    subs: ["Детские кровати", "Двухъярусные", "Кровати-чердаки", "Детские шкафы", "Комоды", "Стеллажи", "Столы", "Стулья"],
  },
  {
    icon: "\u{1F6BF}",
    name: "Ванная",
    slug: "vannaya",
    subs: ["Тумбы с раковиной", "Зеркала", "Пеналы", "Полки", "Корзины для белья"],
  },
  {
    icon: "\u{1F45E}",
    name: "Прихожая",
    slug: "prihozhaya",
    subs: ["Прихожие", "Обувницы", "Вешалки", "Зеркала", "Пуфы", "Банкетки"],
  },
  {
    icon: "\u{1F3E1}",
    name: "Декор и текстиль",
    slug: "dekor-i-tekstil",
    subs: ["Шторы", "Подушки", "Пледы", "Ковры", "Вазы", "Свечи", "Рамки", "Часы"],
  },
  {
    icon: "\u26A1",
    name: "Бытовая техника",
    slug: "bytovaya-tehnika",
    subs: ["Холодильники", "Стиральные машины", "Посудомоечные", "Вытяжки", "Духовые шкафы", "Варочные панели"],
  },
];

export const heroSlides: HeroSlide[] = [
  {
    title: "Скандинавский\nуют для вашего дома",
    sub: "Новая коллекция мебели из массива",
    cta: "Смотреть коллекцию",
    price: "от 12 990 \u20BD",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&h=560&fit=crop",
  },
  {
    title: "Кухни мечты\nпод ключ",
    sub: "Замер, проект и визуализация бесплатно",
    cta: "Рассчитать кухню",
    price: "от 45 000 \u20BD",
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&h=560&fit=crop",
  },
  {
    title: "Диваны\nс доставкой за 1 день",
    sub: "Более 500 моделей в наличии на складе",
    cta: "Выбрать диван",
    price: "от 18 990 \u20BD",
    img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1000&h=560&fit=crop",
  },
];

export const sidePromos: SidePromo[] = [
  {
    title: "Рассрочка 0%",
    sub: "До 24 месяцев\nбез переплат",
    color: "#EAE3D8",
    accent: "#2D2926",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=280&fit=crop",
  },
  {
    title: "Ликвидация склада",
    sub: "Скидки до 60%\nна 1200+ товаров",
    color: "#FFF3ED",
    accent: "#C4704B",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=280&fit=crop",
  },
];

export const bentoCategories: Category[] = [
  { name: "Шкафы", img: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=400&h=400&fit=crop", style: "lifestyle" },
  { name: "Комоды", sub: "в наличии", cta: "Подобрать", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop", style: "product" },
  { name: "Кровати", size: "wide", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=400&fit=crop", style: "lifestyle" },
  { name: "Готовые кухни", badge: "ДО -40%", cta: "Выбрать", size: "tall", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=800&fit=crop", style: "lifestyle" },
  { name: "Обеденные столы", img: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400&fit=crop", style: "product" },
  { name: "Диваны", cta: "Смотреть", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop", style: "lifestyle" },
  { name: "Кухонные стулья", cta: "Смотреть", img: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=400&fit=crop", style: "product" },
];

export const shoppablePins: ShoppablePin[] = [
  { x: 25, y: 55, name: "Диван Стокгольм", price: "54 990 \u20BD" },
  { x: 60, y: 28, name: "Полка Фьорд", price: "4 990 \u20BD" },
  { x: 75, y: 65, name: "Столик Берген", price: "12 490 \u20BD" },
  { x: 42, y: 78, name: "Ковёр Хюгге 200x300", price: "8 990 \u20BD" },
];

export const advantages: Advantage[] = [
  { icon: "truck", title: "Бесплатная доставка", subtitle: "При заказе от 15 000 \u20BD" },
  { icon: "shield", title: "Гарантия 2 года", subtitle: "На всю мебель" },
  { icon: "credit-card", title: "Рассрочка 0%", subtitle: "До 24 месяцев" },
  { icon: "wrench", title: "Сборка за 1 день", subtitle: "Профессионалы" },
];

export const brands = ["WoodHouse", "NordMebeL", "MebelArt", "HomeStyle"];
export const materials = ["ЛДСП", "МДФ", "Массив", "Экокожа", "Ткань", "Велюр", "Полипропилен"];
