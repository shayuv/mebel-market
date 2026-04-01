import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#FAF8F5", surface: "#F0EDE8", surfaceLight: "#F5F2EE",
  primary: "#2D2926", terracotta: "#C4704B", terracottaLight: "#FFF3ED",
  gold: "#B8976A", muted: "#8A8580", success: "#4A7C59", white: "#FFF",
  border: "#E8E4DF", blue: "#5BB5C4",
};

const menuData = [
  { icon: "🛋️", name: "Диваны и кресла", subs: ["Прямые диваны","Угловые диваны","П-образные диваны","Диваны-кровати","Кресла","Тахты","Пуфы","Банкетки"] },
  { icon: "🚪", name: "Шкафы и стеллажи", subs: ["Шкафы-купе","Распашные шкафы","Угловые шкафы","Модульные шкафы","Стеллажи","Стенки","Полки","Витрины"] },
  { icon: "🛏️", name: "Кровати и матрасы", subs: ["Двуспальные кровати","Односпальные кровати","Двухъярусные кровати","Пружинные матрасы","Беспружинные матрасы","Топперы","Наматрасники"] },
  { icon: "🍳", name: "Кухни", subs: ["Готовые кухни","Модульные кухни","Кухонные модули","Столешницы","Мойки","Смесители","Фурнитура"] },
  { icon: "🪑", name: "Столы и стулья", subs: ["Обеденные столы","Компьютерные столы","Журнальные столики","Кухонные стулья","Барные стулья","Офисные кресла","Обеденные группы"] },
  { icon: "🧒", name: "Детская", subs: ["Детские кровати","Двухъярусные","Кровати-чердаки","Детские шкафы","Комоды","Стеллажи","Столы","Стулья"] },
  { icon: "🚿", name: "Ванная", subs: ["Тумбы с раковиной","Зеркала","Пеналы","Полки","Корзины для белья"] },
  { icon: "👞", name: "Прихожая", subs: ["Прихожие","Обувницы","Вешалки","Зеркала","Пуфы","Банкетки"] },
  { icon: "🏡", name: "Декор и текстиль", subs: ["Шторы","Подушки","Пледы","Ковры","Вазы","Свечи","Рамки","Часы"] },
  { icon: "⚡", name: "Бытовая техника", subs: ["Холодильники","Стиральные машины","Посудомоечные","Вытяжки","Духовые шкафы","Варочные панели"] },
];

const heroSlides = [
  { title: "Скандинавский\nуют для вашего дома", sub: "Новая коллекция мебели из массива", cta: "Смотреть коллекцию", price: "от 12 990 ₽", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&h=560&fit=crop" },
  { title: "Кухни мечты\nпод ключ", sub: "Замер, проект и визуализация бесплатно", cta: "Рассчитать кухню", price: "от 45 000 ₽", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&h=560&fit=crop" },
  { title: "Диваны\nс доставкой за 1 день", sub: "Более 500 моделей в наличии на складе", cta: "Выбрать диван", price: "от 18 990 ₽", img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1000&h=560&fit=crop" },
];

const sidePromos = [
  { title: "Рассрочка 0%", sub: "До 24 месяцев\nбез переплат", color: "#EAE3D8", accent: "#2D2926", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=280&fit=crop" },
  { title: "Ликвидация склада", sub: "Скидки до 60%\nна 1200+ товаров", color: "#FFF3ED", accent: "#C4704B", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=280&fit=crop" },
];

const products = [
  { id:1, name:'Диван угловой «Стокгольм»', price:54990, oldPrice:72990, rating:4.8, reviews:128, img:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop", badge:"Хит", cat:"Диваны" },
  { id:2, name:'Кровать «Мальмё»', price:32490, oldPrice:null, rating:4.6, reviews:86, img:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=500&fit=crop", badge:"Новинка", cat:"Кровати" },
  { id:3, name:'Шкаф-купе «Осло» зеркальный', price:28900, oldPrice:36900, rating:4.7, reviews:64, img:"https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=500&h=500&fit=crop", badge:"-22%", cat:"Шкафы" },
  { id:4, name:'Стол обеденный «Хельсинки»', price:18490, oldPrice:null, rating:4.9, reviews:203, img:"https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500&h=500&fit=crop", badge:null, cat:"Столы" },
  { id:5, name:'Комод «Берген» 4 ящика', price:12990, oldPrice:15990, rating:4.5, reviews:47, img:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop", badge:"-19%", cat:"Комоды" },
  { id:6, name:'Кресло «Копенгаген» велюр', price:24990, oldPrice:29990, rating:4.8, reviews:95, img:"https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=500&fit=crop", badge:"Хит", cat:"Кресла" },
];

const categories = [
  { name:"Шкафы", img:"https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=400&h=400&fit=crop", style:"lifestyle" },
  { name:"Комоды", sub:"в наличии", cta:"Подобрать", img:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop", style:"product" },
  { name:"Кровати", size:"wide", img:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=400&fit=crop", style:"lifestyle" },
  { name:"Готовые кухни", badge:"ДО −40%", cta:"Выбрать", size:"tall", img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=800&fit=crop", style:"lifestyle" },
  { name:"Обеденные столы", img:"https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400&fit=crop", style:"product" },
  { name:"Диваны", cta:"Смотреть", img:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop", style:"lifestyle" },
  { name:"Кухонные стулья", cta:"Смотреть", img:"https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=400&fit=crop", style:"product" },
];

const fmt = p => p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";

function Stars({ rating, reviews }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:4 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? C.gold : "#DDD"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
      <span style={{ fontSize:12, color:C.muted, marginLeft:2 }}>{rating}</span>
      {reviews && <span style={{ fontSize:12, color:C.muted }}>({reviews})</span>}
    </div>
  );
}

function MegaMenu({ open, onClose, activeIdx, setActiveIdx }) {
  if (!open) return null;
  const active = menuData[activeIdx] || menuData[0];
  return (
    <>
      <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:90, background:"rgba(0,0,0,0.3)" }} />
      <div style={{
        position:"absolute", top:"100%", left:0, right:0, zIndex:91,
        background:C.white, borderRadius:"0 0 20px 20px",
        boxShadow:"0 20px 60px rgba(0,0,0,0.12)",
        display:"flex", overflow:"hidden",
        animation:"menuSlide 0.25s ease",
      }}>
        <style>{`@keyframes menuSlide{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>
        <div style={{ width:280, background:C.surfaceLight, padding:"12px 0", borderRight:`1px solid ${C.border}` }}>
          {menuData.map((cat, i) => (
            <div key={i} onMouseEnter={() => setActiveIdx(i)} style={{
              display:"flex", alignItems:"center", gap:12, padding:"11px 24px", cursor:"pointer", transition:"all 0.15s",
              background: i === activeIdx ? C.white : "transparent",
              borderRight: i === activeIdx ? `3px solid ${C.terracotta}` : "3px solid transparent",
            }}>
              <span style={{ fontSize:20, width:28, textAlign:"center" }}>{cat.icon}</span>
              <span style={{ fontSize:14, fontWeight: i === activeIdx ? 600 : 400, color: i === activeIdx ? C.primary : C.muted }}>{cat.name}</span>
              <span style={{ marginLeft:"auto", fontSize:12, color:C.muted }}>›</span>
            </div>
          ))}
        </div>
        <div style={{ flex:1, padding:"28px 36px" }}>
          <div style={{ fontSize:20, fontWeight:700, color:C.primary, marginBottom:4, fontFamily:"'DM Serif Display', Georgia, serif" }}>
            {active.icon} {active.name}
          </div>
          <div style={{ fontSize:13, color:C.terracotta, fontWeight:500, marginBottom:20, cursor:"pointer" }}>Смотреть все →</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"0 32px" }}>
            {active.subs.map((sub, j) => (
              <a key={j} href="#" style={{
                display:"block", padding:"9px 0", fontSize:14, color:C.primary,
                textDecoration:"none", borderBottom:`1px solid ${C.border}`, transition:"color 0.15s",
              }}
                onMouseEnter={e => e.target.style.color = C.terracotta}
                onMouseLeave={e => e.target.style.color = C.primary}
              >{sub}</a>
            ))}
          </div>
          <div style={{
            marginTop:24, padding:"18px 22px", borderRadius:14,
            background:`linear-gradient(135deg, ${C.terracottaLight} 0%, #FDE8D8 100%)`,
            display:"flex", justifyContent:"space-between", alignItems:"center",
          }}>
            <div>
              <div style={{ fontSize:14, fontWeight:700, color:C.terracotta }}>Распродажа {active.name.toLowerCase()}</div>
              <div style={{ fontSize:13, color:C.muted, marginTop:4 }}>Скидки до 40% до конца апреля</div>
            </div>
            <button style={{ padding:"8px 18px", borderRadius:10, border:"none", background:C.terracotta, color:C.white, fontSize:13, fontWeight:600, cursor:"pointer" }}>Смотреть</button>
          </div>
        </div>
      </div>
    </>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuIdx, setMenuIdx] = useState(0);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header style={{
      position:"sticky", top:0, zIndex:100, transition:"all 0.3s",
      background: scrolled ? "rgba(250,248,245,0.97)" : C.bg,
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
    }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 0", borderBottom:`1px solid ${C.border}`, fontSize:13, color:C.muted }}>
          <div style={{ display:"flex", gap:20 }}>
            <span style={{ cursor:"pointer" }}>📍 Москва</span>
            <span style={{ cursor:"pointer" }}>Доставка</span>
            <span style={{ cursor:"pointer" }}>Магазины</span>
            <span style={{ cursor:"pointer" }}>Для бизнеса</span>
          </div>
          <div style={{ display:"flex", gap:16, alignItems:"center" }}>
            <span>Ежедневно 9:00–22:00</span>
            <span style={{ fontWeight:600, color:C.primary, fontSize:14 }}>+7 (800) 555-35-35</span>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:16, padding:"12px 0", position:"relative" }}>
          <div style={{ fontSize:26, fontWeight:800, letterSpacing:-1, color:C.primary, fontFamily:"'DM Serif Display', Georgia, serif", whiteSpace:"nowrap" }}>
            МЕБЕЛЬ<span style={{ color:C.terracotta }}>.маркет</span>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            display:"flex", alignItems:"center", gap:8, padding:"10px 20px", borderRadius:12,
            background: menuOpen ? C.terracotta : C.primary, color:C.white,
            border:"none", fontSize:14, fontWeight:600, cursor:"pointer", transition:"background 0.2s",
          }}>
            <div style={{ display:"flex", flexDirection:"column", gap:3, width:16 }}>
              <span style={{ height:2, background:C.white, borderRadius:1, transition:"all 0.3s", transform: menuOpen ? "rotate(45deg) translate(3.5px,3.5px)" : "none" }}/>
              <span style={{ height:2, background:C.white, borderRadius:1, opacity: menuOpen ? 0 : 1, transition:"opacity 0.2s" }}/>
              <span style={{ height:2, background:C.white, borderRadius:1, transition:"all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(3.5px,-3.5px)" : "none" }}/>
            </div>
            Каталог
          </button>
          <div style={{ flex:1, display:"flex", alignItems:"center", background:C.surface, borderRadius:12, padding:"0 4px 0 16px", gap:8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input placeholder="Найти мебель, декор и товары для дома" style={{ border:"none", background:"transparent", flex:1, fontSize:14, outline:"none", color:C.primary, padding:"11px 0" }}/>
            <button style={{ padding:"8px 18px", borderRadius:10, border:"none", background:C.terracotta, color:C.white, fontSize:13, fontWeight:600, cursor:"pointer" }}>Найти</button>
          </div>
          <div style={{ display:"flex", gap:4 }}>
            {[
              { lbl:"Избранное", count:3, d:"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" },
              { lbl:"Сравнение", count:2, d:"M16 3h5v5M8 3H3v5M16 21h5v-5M8 21H3v-5" },
              { lbl:"Корзина", count:1, d:"M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" },
            ].map((item, i) => (
              <div key={i} style={{ position:"relative", display:"flex", flexDirection:"column", alignItems:"center", padding:"6px 10px", borderRadius:12, cursor:"pointer", color:C.primary }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={item.d}/></svg>
                <span style={{ fontSize:10, color:C.muted, marginTop:2 }}>{item.lbl}</span>
                {item.count > 0 && <span style={{ position:"absolute", top:1, right:4, minWidth:16, height:16, borderRadius:8, background:C.terracotta, color:C.white, fontSize:10, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 4px" }}>{item.count}</span>}
              </div>
            ))}
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"6px 10px", borderRadius:12, cursor:"pointer" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span style={{ fontSize:10, color:C.muted, marginTop:2 }}>Войти</span>
          </div>
          <MegaMenu open={menuOpen} onClose={() => setMenuOpen(false)} activeIdx={menuIdx} setActiveIdx={setMenuIdx} />
        </div>
      </div>
    </header>
  );
}

function HeroSlider() {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = heroSlides.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCur(c => (c + 1) % total), 5000);
    return () => clearInterval(t);
  }, [paused, total]);

  const go = d => setCur(c => (c + d + total) % total);

  return (
    <div style={{ display:"flex", gap:14, marginTop:20, height:400 }}>
      <div style={{ flex:"1 1 0", borderRadius:20, overflow:"hidden", position:"relative" }}
        onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        {heroSlides.map((s, i) => (
          <div key={i} style={{
            position:"absolute", inset:0, transition:"opacity 0.7s ease, transform 0.7s ease",
            opacity: i === cur ? 1 : 0, transform: i === cur ? "scale(1)" : "scale(1.03)", pointerEvents: i === cur ? "auto" : "none",
          }}>
            <img src={s.img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(45,41,38,0.78) 0%, rgba(45,41,38,0.3) 55%, transparent 100%)" }}/>
            <div style={{ position:"absolute", left:48, bottom:48, maxWidth:420 }}>
              <div style={{ display:"inline-block", padding:"5px 14px", borderRadius:8, background:"rgba(255,255,255,0.15)", backdropFilter:"blur(8px)", fontSize:13, color:"rgba(255,255,255,0.9)", fontWeight:500, marginBottom:14 }}>{s.price}</div>
              <h1 style={{ fontSize:42, fontWeight:800, color:C.white, lineHeight:1.1, margin:0, fontFamily:"'DM Serif Display', Georgia, serif", whiteSpace:"pre-line" }}>{s.title}</h1>
              <p style={{ fontSize:16, color:"rgba(255,255,255,0.8)", margin:"14px 0 22px", lineHeight:1.4 }}>{s.sub}</p>
              <button style={{ padding:"14px 32px", borderRadius:12, border:"none", fontSize:15, fontWeight:600, background:C.terracotta, color:C.white, cursor:"pointer", boxShadow:"0 4px 24px rgba(196,112,75,0.4)" }}>{s.cta}</button>
            </div>
          </div>
        ))}
        {/* Arrows */}
        {["l","r"].map(d => (
          <button key={d} onClick={() => go(d === "l" ? -1 : 1)} style={{
            position:"absolute", top:"50%", [d === "l" ? "left" : "right"]:16, transform:"translateY(-50%)",
            width:48, height:48, borderRadius:"50%", border:"none", cursor:"pointer", zIndex:5,
            background:"rgba(255,255,255,0.85)", backdropFilter:"blur(8px)",
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:"0 4px 16px rgba(0,0,0,0.1)", transition:"transform 0.2s",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {d === "l" ? <path d="M15 18l-6-6 6-6"/> : <path d="M9 18l6-6-6-6"/>}
            </svg>
          </button>
        ))}
        {/* Dots + counter */}
        <div style={{ position:"absolute", bottom:20, left:48, display:"flex", alignItems:"center", gap:10, zIndex:5 }}>
          <span style={{ fontSize:13, color:"rgba(255,255,255,0.7)", fontWeight:500, fontVariantNumeric:"tabular-nums" }}>{String(cur+1).padStart(2,"0")} / {String(total).padStart(2,"0")}</span>
          <div style={{ display:"flex", gap:6 }}>
            {heroSlides.map((_, i) => (
              <button key={i} onClick={() => setCur(i)} style={{
                width: i === cur ? 28 : 8, height:8, borderRadius:4, border:"none", cursor:"pointer",
                background: i === cur ? C.white : "rgba(255,255,255,0.4)", transition:"all 0.35s",
              }}/>
            ))}
          </div>
        </div>
        {/* Progress */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:"rgba(255,255,255,0.15)", zIndex:5 }}>
          <div key={cur + (paused ? "p" : "")} style={{ height:"100%", background:C.terracotta, borderRadius:2, animation: !paused ? "progress 5s linear" : "none", width: paused ? "0%" : undefined }}>
            <style>{`@keyframes progress{from{width:0%}to{width:100%}}`}</style>
          </div>
        </div>
      </div>

      {/* Side cards */}
      <div style={{ width:300, display:"flex", flexDirection:"column", gap:14, flexShrink:0 }}>
        {sidePromos.map((p, i) => {
          const [h, setH] = useState(false);
          return (
            <div key={i} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
              style={{ flex:1, borderRadius:20, overflow:"hidden", position:"relative", cursor:"pointer", background:p.color, transition:"transform 0.3s", transform: h ? "scale(0.98)" : "scale(1)" }}>
              <img src={p.img} alt="" style={{ position:"absolute", right:-20, bottom:-10, width:"55%", height:"110%", objectFit:"cover", opacity:0.2, transition:"transform 0.4s", transform: h ? "scale(1.08)" : "scale(1)" }}/>
              <div style={{ position:"relative", padding:"26px 22px", height:"100%", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                <div>
                  <div style={{ fontSize:20, fontWeight:700, color:p.accent, lineHeight:1.2, fontFamily:"'DM Serif Display', Georgia, serif" }}>{p.title}</div>
                  <div style={{ fontSize:14, color:C.muted, marginTop:8, whiteSpace:"pre-line", lineHeight:1.5 }}>{p.sub}</div>
                </div>
                <div style={{ alignSelf:"flex-start", padding:"8px 18px", borderRadius:10, border:`1.5px solid ${p.accent}`, fontSize:13, fontWeight:600, color: h ? C.white : p.accent, background: h ? p.accent : "transparent", marginTop:12, transition:"all 0.2s" }}>Подробнее</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BentoCategories() {
  const areas = `"a b c c e" "d f g g e"`;
  const keys = ["a","b","c","e","d","f","g"];
  return (
    <div style={{ marginTop:52 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:24 }}>
        <h2 style={{ fontSize:30, fontWeight:700, color:C.primary, fontFamily:"'DM Serif Display', Georgia, serif", margin:0 }}>Каталог</h2>
        <a href="#" style={{ fontSize:14, color:C.terracotta, textDecoration:"none", fontWeight:500 }}>Все категории →</a>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gridTemplateRows:"210px 210px", gridTemplateAreas:areas, gap:12 }}>
        {categories.map((cat, i) => {
          const [h, setH] = useState(false);
          return (
            <div key={i} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
              style={{ gridArea:keys[i], borderRadius:16, overflow:"hidden", position:"relative", cursor:"pointer", background:C.surfaceLight }}>
              <img src={cat.img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s", transform: h ? "scale(1.06)" : "scale(1)" }}/>
              <div style={{ position:"absolute", inset:0, background: cat.style === "lifestyle" ? "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.5) 100%)" : "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.25) 100%)" }}/>
              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:18 }}>
                <div style={{ fontSize: cat.size ? 20 : 16, fontWeight:700, color: cat.style === "lifestyle" ? C.white : C.primary }}>{cat.name}</div>
                {cat.sub && <div style={{ fontSize:13, color:C.blue, fontWeight:600, marginTop:2 }}>{cat.sub}</div>}
                {cat.cta && <button style={{ marginTop:8, padding:"5px 14px", borderRadius:20, fontSize:12, fontWeight:500, background:"rgba(255,255,255,0.85)", color:C.primary, border:`1px solid ${C.border}`, cursor:"pointer", backdropFilter:"blur(6px)" }}>{cat.cta}</button>}
              </div>
              {cat.badge && <span style={{ position:"absolute", top:14, right:14, padding:"5px 12px", borderRadius:8, background:"#F59E0B", color:C.white, fontSize:12, fontWeight:700 }}>{cat.badge}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProductCard({ p }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ minWidth:228, maxWidth:260, flex:"0 0 auto", background:C.white, borderRadius:16, overflow:"hidden", transition:"transform 0.3s, box-shadow 0.3s", cursor:"pointer", transform: h ? "translateY(-4px)" : "none", boxShadow: h ? "0 12px 36px rgba(0,0,0,0.1)" : "0 1px 4px rgba(0,0,0,0.04)" }}>
      <div style={{ position:"relative", paddingTop:"100%", background:C.surfaceLight, overflow:"hidden" }}>
        <img src={p.img} alt="" style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s", transform: h ? "scale(1.06)" : "scale(1)" }}/>
        {p.badge && <span style={{ position:"absolute", top:12, left:12, padding:"4px 10px", borderRadius:8, fontSize:12, fontWeight:700, background: p.badge === "Хит" ? C.terracotta : p.badge === "Новинка" ? C.success : C.terracotta, color:C.white }}>{p.badge}</span>}
        <div style={{ position:"absolute", top:10, right:10, display:"flex", flexDirection:"column", gap:6, opacity: h ? 1 : 0, transition:"opacity 0.3s" }}>
          {["M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z","M16 3h5v5M8 3H3v5M16 21h5v-5M8 21H3v-5"].map((d, j) => (
            <div key={j} style={{ width:34, height:34, borderRadius:"50%", background:"rgba(255,255,255,0.9)", display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(6px)", color:C.primary }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={d}/></svg>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding:"12px 14px 14px" }}>
        <div style={{ fontSize:11, color:C.muted, textTransform:"uppercase", letterSpacing:0.5, marginBottom:3 }}>{p.cat}</div>
        <div style={{ fontSize:13, fontWeight:500, color:C.primary, lineHeight:1.35, height:36, overflow:"hidden", marginBottom:6 }}>{p.name}</div>
        <Stars rating={p.rating} reviews={p.reviews} />
        <div style={{ display:"flex", alignItems:"baseline", gap:6, marginTop:8 }}>
          <span style={{ fontSize:18, fontWeight:700, color:C.primary }}>{fmt(p.price)}</span>
          {p.oldPrice && <span style={{ fontSize:13, color:C.muted, textDecoration:"line-through" }}>{fmt(p.oldPrice)}</span>}
        </div>
        <button style={{ width:"100%", marginTop:10, padding:"9px 0", border:"none", borderRadius:10, background: h ? C.terracotta : C.surface, color: h ? C.white : C.primary, fontSize:13, fontWeight:600, cursor:"pointer", transition:"all 0.3s" }}>В корзину</button>
      </div>
    </div>
  );
}

function ProductSection() {
  const [tab, setTab] = useState("hits");
  return (
    <div style={{ marginTop:52 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <div style={{ display:"flex", gap:0, background:C.surface, borderRadius:14, padding:3 }}>
          {[{ k:"hits", l:"Хиты продаж" },{ k:"new", l:"Новинки" },{ k:"sale", l:"Со скидкой" }].map(t => (
            <button key={t.k} onClick={() => setTab(t.k)} style={{ padding:"9px 20px", borderRadius:11, border:"none", fontSize:14, fontWeight:600, cursor:"pointer", background: tab === t.k ? C.white : "transparent", color: tab === t.k ? C.primary : C.muted, boxShadow: tab === t.k ? "0 2px 8px rgba(0,0,0,0.05)" : "none", transition:"all 0.25s" }}>{t.l}</button>
          ))}
        </div>
        <a href="#" style={{ fontSize:14, color:C.terracotta, textDecoration:"none", fontWeight:500 }}>Смотреть все →</a>
      </div>
      <div style={{ display:"flex", gap:16, overflowX:"auto", paddingBottom:8, scrollbarWidth:"none" }}>
        {products.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}

function Shoppable() {
  const [pin, setPin] = useState(null);
  const pins = [
    { x:25, y:55, name:"Диван «Стокгольм»", price:"54 990 ₽" },
    { x:60, y:28, name:"Полка «Фьорд»", price:"4 990 ₽" },
    { x:75, y:65, name:"Столик «Берген»", price:"12 490 ₽" },
    { x:42, y:78, name:"Ковёр «Хюгге» 200×300", price:"8 990 ₽" },
  ];
  return (
    <div style={{ marginTop:52 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:20 }}>
        <div>
          <h2 style={{ fontSize:30, fontWeight:700, color:C.primary, fontFamily:"'DM Serif Display', Georgia, serif", margin:0 }}>Готовые интерьеры</h2>
          <p style={{ color:C.muted, margin:"6px 0 0", fontSize:14 }}>Нажмите на точку — узнаете о товаре</p>
        </div>
        <a href="#" style={{ fontSize:14, color:C.terracotta, textDecoration:"none", fontWeight:500 }}>Все интерьеры →</a>
      </div>
      <div style={{ position:"relative", borderRadius:20, overflow:"hidden", height:420 }}>
        <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&h=700&fit=crop" alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
        {pins.map((p, i) => (
          <div key={i} onClick={() => setPin(pin === i ? null : i)} style={{ position:"absolute", left:`${p.x}%`, top:`${p.y}%`, transform:"translate(-50%,-50%)", cursor:"pointer", zIndex:10 }}>
            <div style={{ width:36, height:36, borderRadius:"50%", background:"rgba(255,255,255,0.9)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 20px rgba(0,0,0,0.15)", border:`2px solid ${C.terracotta}`, transition:"transform 0.3s", transform: pin === i ? "scale(1.2)" : "scale(1)", backdropFilter:"blur(8px)" }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:C.terracotta }}/>
            </div>
            {pin === i && (
              <div style={{ position:"absolute", top:"calc(100% + 12px)", left:"50%", transform:"translateX(-50%)", background:"rgba(255,255,255,0.97)", borderRadius:14, padding:"14px 18px", minWidth:180, boxShadow:"0 8px 30px rgba(0,0,0,0.15)", backdropFilter:"blur(12px)", animation:"fadeUp 0.2s ease" }}>
                <style>{`@keyframes fadeUp{from{opacity:0;transform:translateX(-50%) translateY(6px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>
                <div style={{ fontSize:14, fontWeight:600, color:C.primary }}>{p.name}</div>
                <div style={{ fontSize:16, fontWeight:700, color:C.terracotta, marginTop:4 }}>{p.price}</div>
                <div style={{ fontSize:12, color:C.terracotta, marginTop:6, fontWeight:500 }}>Подробнее →</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Advantages() {
  const items = [
    { d:"M1 3h15a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H1zM16 8h4l3 3v5h-7V8zM5 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM19 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", t:"Бесплатная доставка", s:"При заказе от 15 000 ₽" },
    { d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", t:"Гарантия 2 года", s:"На всю мебель" },
    { d:"M1 4h22a0 0 0 0 1 0 0v16a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zM1 10h22", t:"Рассрочка 0%", s:"До 24 месяцев" },
    { d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z", t:"Сборка за 1 день", s:"Профессионалы" },
  ];
  return (
    <div style={{ marginTop:52, display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
      {items.map((a, i) => (
        <div key={i} style={{ background:C.white, borderRadius:16, padding:"24px 20px", border:`1px solid ${C.border}`, textAlign:"center" }}>
          <div style={{ marginBottom:10, display:"flex", justifyContent:"center" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.terracotta} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={a.d}/></svg>
          </div>
          <div style={{ fontSize:15, fontWeight:700, color:C.primary, marginBottom:4 }}>{a.t}</div>
          <div style={{ fontSize:13, color:C.muted }}>{a.s}</div>
        </div>
      ))}
    </div>
  );
}

function Promo() {
  return (
    <div style={{ marginTop:52, borderRadius:20, padding:"40px 44px", position:"relative", overflow:"hidden", background:`linear-gradient(135deg, ${C.primary} 0%, #4A4340 100%)` }}>
      <div style={{ position:"absolute", top:-60, right:-40, width:260, height:260, borderRadius:"50%", background:"rgba(196,112,75,0.12)" }}/>
      <div style={{ position:"relative", zIndex:2, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div style={{ fontSize:13, color:C.gold, fontWeight:600, textTransform:"uppercase", letterSpacing:2, marginBottom:8 }}>Специальное предложение</div>
          <h2 style={{ fontSize:32, fontWeight:800, color:C.white, margin:0, fontFamily:"'DM Serif Display', Georgia, serif" }}>Скидка 15% на первый заказ</h2>
          <p style={{ fontSize:15, color:"rgba(255,255,255,0.65)", marginTop:8 }}>Промокод HELLO при оформлении</p>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <input placeholder="Ваш email" style={{ padding:"13px 20px", borderRadius:12, border:"none", fontSize:14, width:220, background:"rgba(255,255,255,0.1)", color:C.white, outline:"none" }}/>
          <button style={{ padding:"13px 24px", borderRadius:12, border:"none", fontSize:14, fontWeight:600, background:C.terracotta, color:C.white, cursor:"pointer" }}>Получить</button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const cols = [
    { t:"Каталог", items:["Диваны","Шкафы","Кровати","Кухни","Столы","Детская","Декор"] },
    { t:"Покупателям", items:["Доставка","Оплата","Рассрочка","Гарантии","Сборка","Возврат"] },
    { t:"О компании", items:["О нас","Магазины","Отзывы","Вакансии","Контакты"] },
  ];
  return (
    <footer style={{ marginTop:56, borderTop:`1px solid ${C.border}`, paddingTop:44, paddingBottom:28 }}>
      <div style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr 1fr 1fr", gap:40 }}>
        <div>
          <div style={{ fontSize:22, fontWeight:800, color:C.primary, fontFamily:"'DM Serif Display', Georgia, serif", marginBottom:14 }}>МЕБЕЛЬ<span style={{ color:C.terracotta }}>.маркет</span></div>
          <p style={{ fontSize:13, color:C.muted, lineHeight:1.6, marginBottom:16 }}>Мебель и товары для дома с доставкой по всей России. Более 50 000 товаров.</p>
          <div style={{ display:"flex", gap:8 }}>{["TG","VK","YT"].map(s => <div key={s} style={{ width:36, height:36, borderRadius:10, background:C.surface, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:C.muted, cursor:"pointer" }}>{s}</div>)}</div>
        </div>
        {cols.map((c, i) => (
          <div key={i}>
            <div style={{ fontSize:14, fontWeight:700, color:C.primary, marginBottom:14 }}>{c.t}</div>
            {c.items.map((item, j) => <a key={j} href="#" style={{ display:"block", fontSize:13, color:C.muted, textDecoration:"none", padding:"4px 0" }}>{item}</a>)}
          </div>
        ))}
      </div>
      <div style={{ marginTop:36, paddingTop:20, borderTop:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", fontSize:12, color:C.muted }}>
        <span>© 2026 МЕБЕЛЬ.маркет</span>
        <div style={{ display:"flex", gap:12 }}>{["Visa","MC","Mir","СБП"].map(p => <span key={p} style={{ padding:"3px 10px", borderRadius:6, background:C.surface, fontWeight:500 }}>{p}</span>)}</div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"'DM Sans', -apple-system, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Serif+Display&display=swap" rel="stylesheet"/>
      <Header />
      <main style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <HeroSlider />
        <BentoCategories />
        <ProductSection />
        <Shoppable />
        <Advantages />
        <Promo />
      </main>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}><Footer /></div>
    </div>
  );
}
