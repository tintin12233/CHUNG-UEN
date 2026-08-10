"use client";

import { FormEvent, useState } from "react";

export type Lang = "zh" | "ja" | "en";
export type TextValue = Record<Lang, string>;

const languages: { key: Lang; label: string }[] = [
  { key: "zh", label: "繁中" },
  { key: "ja", label: "日本語" },
  { key: "en", label: "EN" },
];

export const navItems: { id: string; href: string; label: TextValue }[] = [
  { id: "about", href: "/about", label: { zh: "關於長芸", ja: "長芸について", en: "About Chy" } },
  { id: "services", href: "/services", label: { zh: "加工服務", ja: "加工サービス", en: "Services" } },
  { id: "capacity", href: "/capacity", label: { zh: "加工能力", ja: "加工能力", en: "Capabilities" } },
  { id: "equipment", href: "/equipment", label: { zh: "設備介紹", ja: "設備紹介", en: "Equipment" } },
  { id: "cases", href: "/cases", label: { zh: "加工實績", ja: "加工実績", en: "Track Record" } },
  { id: "quality", href: "/quality", label: { zh: "技術與品質", ja: "技術と品質", en: "Quality" } },
  { id: "industries", href: "/industries", label: { zh: "應用產業", ja: "対応産業", en: "Industries" } },
  { id: "contact", href: "/contact", label: { zh: "聯絡詢價", ja: "お問い合わせ", en: "Contact" } },
];

export const copy: Record<Lang, Record<string, string>> = {
  zh: {
    utility: "長芸有限公司｜精密研磨與零件加工",
    heroEyebrow: "CHY / PRECISION IN MOTION",
    heroTitle: "把每一寸精度，做成值得託付的零件",
    heroBody:
      "從精密研磨起家，長芸整合內外徑研磨、CNC 車床與協力加工資源，為工作母機、汽車零組件與產業機械提供穩定的製程管理。",
    heroPrimary: "認識長芸",
    heroSecondary: "查看加工服務",
    aboutEyebrow: "01 / ABOUT CHY",
    aboutTitle: "在現場累積的經驗，成為客戶手上的精度。",
    aboutBody:
      "長芸從機械零件的內徑、外徑精密研磨出發，逐步導入日本 CNC 磨床，發展出以研磨為核心、整合多項加工製程的服務能力。每一道工序都由現場經驗與品質意識共同守住，讓客戶拿到的不只是一件加工品，而是一個可持續交付的結果。",
    aboutLink: "看長芸的發展沿革",
    serviceEyebrow: "02 / WHAT WE DO",
    serviceTitle: "三種核心能力，對應不同的加工需求。",
    serviceBody:
      "從單一研磨製程到整合加工，長芸以清楚的製程責任與彈性的協力體系，支援客戶從圖面走到成品。",
    capacityEyebrow: "03 / CAPABILITIES",
    capacityTitle: "讓圖面上的要求，落到可驗證的加工條件。",
    capacityBody:
      "設備規格、加工範圍與檢驗工具，構成長芸面對不同工件需求時的製程基礎。",
    equipmentEyebrow: "04 / EQUIPMENT",
    equipmentTitle: "以設備組合支撐穩定產出。",
    equipmentBody:
      "以下為目前設備表中的生產與檢驗設備總覽；單機照片將於後續補齊，現階段先以示意版位呈現。",
    casesEyebrow: "05 / TRACK RECORD",
    casesTitle: "熟悉關鍵零件，也熟悉交付的節奏。",
    casesBody:
      "長芸長期服務工作母機與機械產業，從軸類、套筒到客製化零件，依照圖面與精度需求安排製程。",
    qualityEyebrow: "06 / QUALITY",
    qualityTitle: "把品質管理放進每一道流程。",
    qualityBody:
      "從圖面確認、製程評估、進料與協力加工，到最終檢驗與包裝出貨，長芸統一掌握進度與品質標準。",
    industryEyebrow: "07 / INDUSTRIES",
    industryTitle: "從工作母機出發，走進更多精密製造現場。",
    industryBody: "以穩定加工品質，支援需要長期合作與持續交付的產業客戶。",
    contactEyebrow: "08 / CONTACT",
    contactTitle: "帶著圖面來，和長芸談談你的加工需求。",
    contactBody:
      "這份詢價表先以靜態展示方式提供，方便整理工件資訊；確認串接方式後即可接上實際送出流程。",
    contactPerson: "聯絡人｜陳宜興",
    formNotice: "目前為靜態展示，資料尚未送出。",
    formButton: "預覽詢價內容",
    formDone: "表單預覽完成；確認串接方式後即可啟用送出。",
  },
  ja: {
    utility: "長芸有限公司｜精密研削・部品加工",
    heroEyebrow: "CHY / PRECISION IN MOTION",
    heroTitle: "一つひとつの精度を、信頼される部品へ。",
    heroBody:
      "精密研削を起点に、内外径研削、CNC旋盤、協力会社との連携まで。長芸は安定した工程管理で、工作機械・自動車部品・産業機械を支えます。",
    heroPrimary: "長芸について",
    heroSecondary: "加工サービスを見る",
    aboutEyebrow: "01 / ABOUT CHY",
    aboutTitle: "現場で積み重ねた経験が、お客様の精度になる。",
    aboutBody:
      "長芸は機械部品の内径・外径精密研削から始まり、日本製CNC研削盤を導入しながら、研削を中心とした一貫加工力を築いてきました。",
    aboutLink: "沿革を見る",
    serviceEyebrow: "02 / WHAT WE DO",
    serviceTitle: "三つの中核技術で、加工要件に応える。",
    serviceBody: "図面から完成品まで、工程責任を明確にし、柔軟な協力体制で対応します。",
    capacityEyebrow: "03 / CAPABILITIES",
    capacityTitle: "図面の要求を、検証できる加工条件へ。",
    capacityBody: "設備仕様、加工範囲、検査機器を組み合わせ、さまざまなワークに対応します。",
    equipmentEyebrow: "04 / EQUIPMENT",
    equipmentTitle: "設備の組み合わせで、安定した生産を支える。",
    equipmentBody: "設備一覧をもとにした概要です。個別写真は後日追加し、現在はプレースホルダーで表示しています。",
    casesEyebrow: "05 / TRACK RECORD",
    casesTitle: "重要部品と、確かな納期感覚。",
    casesBody: "工作機械や機械産業向けに、軸・スリーブ・カスタム部品を図面と精度に合わせて加工します。",
    qualityEyebrow: "06 / QUALITY",
    qualityTitle: "すべての工程に品質管理を。",
    qualityBody: "図面確認から最終検査、梱包・出荷まで、進捗と品質基準を一元管理します。",
    industryEyebrow: "07 / INDUSTRIES",
    industryTitle: "工作機械から、より多くの精密製造現場へ。",
    industryBody: "安定した加工品質で、長期的な協業と継続納品を支えます。",
    contactEyebrow: "08 / CONTACT",
    contactTitle: "図面をお持ちください。加工についてご相談ください。",
    contactBody: "お問い合わせフォームは現在、静的なプレビューとして提供しています。",
    contactPerson: "担当｜陳宜興",
    formNotice: "現在は静的表示です。送信されません。",
    formButton: "見積内容をプレビュー",
    formDone: "プレビューが完了しました。送信機能は接続後に有効化できます。",
  },
  en: {
    utility: "CHUNG YUEN CO., LTD.｜Precision Grinding & Machining",
    heroEyebrow: "CHY / PRECISION IN MOTION",
    heroTitle: "Every micron of precision, made into a part you can trust.",
    heroBody:
      "From precision grinding to CNC turning and coordinated partner processes, Chung Yuen manages the path from drawing to finished component for machine tools, automotive parts, and industrial machinery.",
    heroPrimary: "About Chy",
    heroSecondary: "Explore services",
    aboutEyebrow: "01 / ABOUT CHY",
    aboutTitle: "Experience built on the shop floor becomes precision in your hands.",
    aboutBody:
      "Chung Yuen began with precision internal and external grinding, then expanded into CNC grinding and integrated component processing. Every process is guided by practical experience, clear quality ownership, and a commitment to dependable delivery.",
    aboutLink: "View our timeline",
    serviceEyebrow: "02 / WHAT WE DO",
    serviceTitle: "Three core capabilities for different machining needs.",
    serviceBody: "From a single grinding process to coordinated production, we take responsibility for the path from drawing to finished part.",
    capacityEyebrow: "03 / CAPABILITIES",
    capacityTitle: "Turning drawing requirements into verifiable machining conditions.",
    capacityBody: "Our equipment range, working envelopes, and inspection tools form the foundation for repeatable production.",
    equipmentEyebrow: "04 / EQUIPMENT",
    equipmentTitle: "A balanced equipment mix for dependable output.",
    equipmentBody: "This overview is based on the current equipment list. Individual machine photos will be added later; placeholder panels are used for now.",
    casesEyebrow: "05 / TRACK RECORD",
    casesTitle: "Familiar with critical parts. Reliable with delivery rhythm.",
    casesBody: "We support machine-tool and industrial customers with shafts, sleeves, and custom components aligned to drawings and tolerance requirements.",
    qualityEyebrow: "06 / QUALITY",
    qualityTitle: "Quality management in every process.",
    qualityBody: "From drawing review and process planning to incoming material, partner processing, final inspection, and shipment, progress and standards stay visible.",
    industryEyebrow: "07 / INDUSTRIES",
    industryTitle: "From machine tools into more precision manufacturing environments.",
    industryBody: "Stable machining quality for customers who value long-term collaboration and consistent delivery.",
    contactEyebrow: "08 / CONTACT",
    contactTitle: "Bring your drawing. Let’s talk about the right process.",
    contactBody: "This inquiry form is currently a static presentation. A live submission flow can be connected later.",
    contactPerson: "Contact｜Yi-Hsing Chen",
    formNotice: "Static preview only. No information is sent.",
    formButton: "Preview inquiry",
    formDone: "Preview ready. Submission can be enabled once a connection method is confirmed.",
  },
};

export const services = [
  {
    number: "01",
    title: { zh: "整合加工服務", ja: "一貫加工サービス", en: "Integrated processing" },
    body: {
      zh: "依客戶圖面整合備料、車削、銑削、熱處理與精密研磨，讓複數製程由同一窗口管理。",
      ja: "図面に合わせて材料、旋削、フライス、熱処理、精密研削までを一元管理します。",
      en: "Coordinate material preparation, turning, milling, heat treatment, and grinding through one accountable window.",
    },
    tags: { zh: "成品代料 · 製程管理", ja: "完成品対応 · 工程管理", en: "Finished parts · Process control" },
  },
  {
    number: "02",
    title: { zh: "精密研磨加工", ja: "精密研削加工", en: "Precision grinding" },
    body: {
      zh: "以外徑、內徑與轉盤／平面研磨為核心，支援主軸、套筒、軸類與精密圓筒零件。",
      ja: "外径・内径・平面研削を中心に、主軸、スリーブ、シャフトなどに対応します。",
      en: "Core expertise in OD, ID, surface, and cylindrical grinding for spindles, sleeves, shafts, and precision round parts.",
    },
    tags: { zh: "外徑研磨 · 內徑研磨", ja: "外径研削 · 内径研削", en: "OD grinding · ID grinding" },
  },
  {
    number: "03",
    title: { zh: "CNC 車床加工", ja: "CNC旋盤加工", en: "CNC turning" },
    body: {
      zh: "提供精密軸類、套筒、機械零件與客製化零件加工，支援小量打樣與穩定量產。",
      ja: "精密シャフト、スリーブ、機械部品、カスタム部品の少量から量産まで対応します。",
      en: "Precision shafts, sleeves, machine parts, and custom components for prototypes, small lots, and repeat production.",
    },
    tags: { zh: "V26 · V36 · 支持架", ja: "V26 · V36 · 支持架", en: "V26 · V36 · Steady rest" },
  },
];

export const capacityCards = [
  {
    label: { zh: "CNC 車床", ja: "CNC旋盤", en: "CNC turning" },
    value: "V36 · Ø550 × 1250L",
    note: { zh: "另有 V26-1100L 設備", ja: "V26-1100Lも保有", en: "V26-1100L also available" },
  },
  {
    label: { zh: "CNC 圓筒磨床", ja: "CNC円筒研削", en: "CNC cylindrical grinding" },
    value: "Ø300 × 400L–1500L",
    note: { zh: "日本 SHIGIYA", ja: "日本 SHIGIYA", en: "Japanese SHIGIYA" },
  },
  {
    label: { zh: "內外徑複合式磨床", ja: "内外径複合研削", en: "ID / OD combination grinding" },
    value: "Ø450 × 200L",
    note: { zh: "多台配置，支援複合製程", ja: "複数台で複合工程に対応", en: "Multiple machines for coordinated processes" },
  },
];

export const equipmentGroups = [
  {
    title: { zh: "研磨設備", ja: "研削設備", en: "Grinding equipment" },
    items: [
      ["圓筒磨床", "Ø320 × 1500L", "TOYODA / SHIGIYA", "3"],
      ["萬能圓筒磨床", "Ø350 × 1500L", "台製", "6"],
      ["CNC 圓筒磨床", "Ø300 × 400L–1500L", "SHIGIYA", "4"],
      ["轉盤平面磨床", "Ø10–450", "台製", "2"],
      ["中心孔磨床", "Ø100 × 1000L", "美國", "1"],
      ["CNC 內外徑複合式磨床", "Ø450 × 200L", "台製", "4"],
      ["內徑專用研磨機", "Ø350 × 1000L", "台製", "1"],
    ],
  },
  {
    title: { zh: "車削設備", ja: "旋盤設備", en: "Turning equipment" },
    items: [
      ["CNC 車床 V26-1100L", "支持架", "台中精機", "1"],
      ["CNC 車床 V36-1250L", "支持架", "台中精機", "1"],
    ],
  },
  {
    title: { zh: "檢驗與量測", ja: "検査・測定", en: "Inspection & measurement" },
    items: [
      ["表面粗糙儀 M1", "表面粗糙度", "Mahr", "1"],
      ["手動三次元量床", "450 × 500", "TESA", "1"],
      ["電子式外徑卡規", "Ø0–275", "日本／美國", "18"],
      ["外徑環規", "Ø15–300", "台製", "110"],
      ["內徑環規", "Ø16–220", "台製／英國／德國", "130"],
      ["外徑分厘卡", "0–525", "Mitutoyo", "90"],
    ],
  },
];

export const applications = [
  { code: "01", title: { zh: "工作母機", ja: "工作機械", en: "Machine tools" }, body: { zh: "主軸、套筒、精密軸類零件", ja: "主軸、スリーブ、精密シャフト", en: "Spindles, sleeves, and precision shafts" } },
  { code: "02", title: { zh: "汽車零組件", ja: "自動車部品", en: "Automotive parts" }, body: { zh: "傳動及相關精密零件", ja: "駆動系および精密部品", en: "Transmission and precision components" } },
  { code: "03", title: { zh: "產業機械", ja: "産業機械", en: "Industrial machinery" }, body: { zh: "機械結構與功能性零件", ja: "機械構造・機能部品", en: "Structural and functional components" } },
  { code: "04", title: { zh: "自動化設備", ja: "自動化設備", en: "Automation" }, body: { zh: "依圖面客製與製程整合", ja: "図面対応と工程統合", en: "Drawing-based custom production" } },
];

export const timeline: [string, TextValue][] = [
  ["1998", { zh: "從精密研磨加工起步", ja: "精密研削加工からスタート", en: "Began with precision grinding" }],
  ["2003", { zh: "成立長芸有限公司，投入工作母機零件加工", ja: "長芸有限公司を設立し、工作機械部品へ", en: "Chung Yuen was established for machine-tool parts" }],
  ["2004", { zh: "導入日本 CNC 精密磨床", ja: "日本製CNC精密研削盤を導入", en: "Japanese CNC grinding was introduced" }],
  ["至今", { zh: "持續服務精密機械產業", ja: "精密機械産業へのサービスを継続", en: "Continuing to serve precision manufacturing" }],
];

export const text = (value: TextValue, lang: Lang) => value[lang] || value.zh;

export function SectionIntro({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p className="section-lede">{body}</p>
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("zh");
  const [submitted, setSubmitted] = useState(false);
  const c = copy[lang];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="utility-bar">
          <div className="container utility-inner">
            <span>{c.utility}</span>
            <span className="utility-meta">台中・大甲　/　04-26763118</span>
          </div>
        </div>
        <div className="nav-wrap">
          <div className="container nav-inner">
            <a className="brand" href="#top" aria-label="長芸有限公司 home">
              <span className="brand-mark">Chy</span>
              <span className="brand-copy">
                <strong>長芸</strong>
                <small>CHUNG YUEN CO., LTD.</small>
              </span>
            </a>
            <nav className="desktop-nav" aria-label="Main navigation">
              {navItems.map((item) => (
                <a key={item.id} href={item.href}>
                  {text(item.label, lang)}
                </a>
              ))}
            </nav>
            <div className="nav-actions">
              <div className="language-switcher" aria-label="Language selector">
                {languages.map((item) => (
                  <button
                    key={item.key}
                    className={lang === item.key ? "is-active" : ""}
                    type="button"
                    aria-pressed={lang === item.key}
                    onClick={() => setLang(item.key)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <a className="nav-cta" href="/contact">
                {lang === "zh" ? "開始詢價" : lang === "ja" ? "見積相談" : "Request a quote"}
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-content">
              <p className="eyebrow hero-eyebrow">{c.heroEyebrow}</p>
              <h1>{c.heroTitle}</h1>
              <p className="hero-lede">{c.heroBody}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="/about">
                  {c.heroPrimary}<span>↗</span>
                </a>
                <a className="text-link light-link" href="/services">
                  {c.heroSecondary}<span>→</span>
                </a>
              </div>
              <div className="hero-footnote">
                <span className="signal-dot" />
                <span>{lang === "zh" ? "以現場經驗，守住每一次交付" : lang === "ja" ? "現場の経験で、納品を支える" : "Shop-floor experience behind every delivery"}</span>
              </div>
            </div>
            <div className="hero-visual" aria-hidden="true">
              <div className="hero-visual-topline"><span>CHY / 01</span><span>PRECISION INDUSTRY</span></div>
              <div className="blueprint-grid" />
              <div className="hero-plate">
                <span className="plate-label">OD / ID</span>
                <span className="plate-value">± μ</span>
                <span className="plate-line" />
                <span className="plate-caption">GRINDING / TURNING / INSPECTION</span>
              </div>
              <div className="hero-orbit orbit-one" />
              <div className="hero-orbit orbit-two" />
              <div className="hero-coordinate coordinate-one">X 550</div>
              <div className="hero-coordinate coordinate-two">L 1250</div>
              <div className="hero-stamp">CHY<span>EST. 1998</span></div>
              <div className="hero-visual-bottomline"><span>MADE FOR CONTINUITY</span><span>● 04</span></div>
            </div>
          </div>
          <div className="hero-ruler" aria-hidden="true"><span>01</span><i /><span>10</span><i /><span>20</span><i /><span>30</span><i /><span>40</span><i /><span>50</span></div>
        </section>

        <section className="proof-strip">
          <div className="container proof-grid">
            <div><strong>25+</strong><span>{lang === "zh" ? "年精密加工經驗" : lang === "ja" ? "年の精密加工経験" : "years of precision experience"}</span></div>
            <div><strong>20+</strong><span>{lang === "zh" ? "家合作客戶" : lang === "ja" ? "社の協力顧客" : "customer relationships"}</span></div>
            <div><strong>30+</strong><span>{lang === "zh" ? "家協力加工夥伴" : lang === "ja" ? "社の協力加工先" : "processing partners"}</span></div>
            <div><strong>Ø550</strong><span>{lang === "zh" ? "× 1250L 車床加工" : lang === "ja" ? "× 1250L 旋盤加工" : "× 1250L turning"}</span></div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="container">
            <SectionIntro eyebrow={c.aboutEyebrow} title={c.aboutTitle} body={c.aboutBody} />
            <div className="about-grid">
              <div className="about-story">
                <div className="story-card">
                  <span className="story-index">01</span>
                  <p>{lang === "zh" ? "從一台磨床開始，走過不同階段的製程升級。" : lang === "ja" ? "一台の研削盤から始まり、工程を進化させてきました。" : "From one grinding machine to an evolving production system."}</p>
                </div>
                <div className="timeline">
                  {timeline.map(([year, label]) => (
                    <div className="timeline-row" key={year}>
                      <strong>{year}</strong><span>{text(label, lang)}</span>
                    </div>
                  ))}
                </div>
                <a className="text-link dark-link" href="/quality">{c.aboutLink}<span>↗</span></a>
              </div>
              <div className="about-gallery">
                <figure className="photo photo-exterior">
                  <img src="/images/about-exterior.jpg" alt="長芸有限公司公司外觀" />
                  <figcaption><span>CHY / 01</span><span>{lang === "zh" ? "公司外觀" : lang === "ja" ? "社屋" : "Company exterior"}</span></figcaption>
                </figure>
                <figure className="photo photo-factory">
                  <img src="/images/about-factory.jpg" alt="長芸工廠內部全景" />
                  <figcaption><span>CHY / 02</span><span>{lang === "zh" ? "廠內環境" : lang === "ja" ? "工場内" : "Factory floor"}</span></figcaption>
                </figure>
                <figure className="photo photo-floor">
                  <img src="/images/about-floor.jpg" alt="長芸加工現場" />
                  <figcaption><span>CHY / 03</span><span>{lang === "zh" ? "加工現場" : lang === "ja" ? "加工現場" : "Machining floor"}</span></figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section dark-section services-section">
          <div className="container">
            <SectionIntro eyebrow={c.serviceEyebrow} title={c.serviceTitle} body={c.serviceBody} />
            <div className="service-grid">
              {services.map((service) => (
                <article className="service-card" key={service.number}>
                  <div className="service-top"><span>{service.number}</span><i>↗</i></div>
                  <h3>{text(service.title, lang)}</h3>
                  <p>{text(service.body, lang)}</p>
                  <div className="service-tag">{text(service.tags, lang)}</div>
                </article>
              ))}
            </div>
            <div className="process-line"><span>{lang === "zh" ? "圖面" : lang === "ja" ? "図面" : "Drawing"}</span><i /><span>{lang === "zh" ? "製程" : lang === "ja" ? "工程" : "Process"}</span><i /><span>{lang === "zh" ? "成品" : lang === "ja" ? "完成品" : "Finished part"}</span></div>
          </div>
        </section>

        <section id="capacity" className="section capacity-section">
          <div className="container">
            <SectionIntro eyebrow={c.capacityEyebrow} title={c.capacityTitle} body={c.capacityBody} />
            <div className="capacity-layout">
              <div className="capacity-cards">
                {capacityCards.map((card, index) => (
                  <article className={`capacity-card ${index === 0 ? "capacity-card-featured" : ""}`} key={card.value}>
                    <div className="capacity-card-head"><span>0{index + 1}</span><span>{text(card.label, lang)}</span></div>
                    <strong>{card.value}</strong>
                    <small>{text(card.note, lang)}</small>
                  </article>
                ))}
              </div>
              <div className="capacity-notes">
                <div className="capacity-note"><span>OD</span><p>{lang === "zh" ? "外徑研磨｜適用主軸、軸類與精密圓筒零件" : lang === "ja" ? "外径研削｜主軸・シャフト・精密円筒部品" : "OD grinding｜spindles, shafts, and precision cylindrical parts"}</p></div>
                <div className="capacity-note"><span>ID</span><p>{lang === "zh" ? "內徑研磨｜適用套筒、精密孔徑與內孔零件" : lang === "ja" ? "内径研削｜スリーブ・精密穴・内孔部品" : "ID grinding｜sleeves, precision bores, and internal features"}</p></div>
                <div className="capacity-note"><span>QA</span><p>{lang === "zh" ? "檢驗工具｜Mahr 表面粗糙儀、TESA 三次元量床" : lang === "ja" ? "検査機器｜Mahr粗さ計・TESA三次元測定機" : "Inspection｜Mahr surface roughness and TESA CMM"}</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="equipment" className="section equipment-section">
          <div className="container">
            <SectionIntro eyebrow={c.equipmentEyebrow} title={c.equipmentTitle} body={c.equipmentBody} />
            <div className="equipment-topline"><span>{lang === "zh" ? "設備表總覽" : lang === "ja" ? "設備一覧" : "Equipment overview"}</span><span>{lang === "zh" ? "照片待補" : lang === "ja" ? "写真準備中" : "Photos pending"}</span></div>
            <div className="equipment-layout">
              <div className="equipment-placeholder">
                <div className="placeholder-screen"><span>PHOTO / TO BE UPDATED</span><b>CHY</b><i /></div>
                <div className="placeholder-caption"><span>{lang === "zh" ? "設備單機照片暫存版位" : lang === "ja" ? "設備写真の仮表示" : "Temporary machine-photo panel"}</span><small>CHY / EQUIPMENT</small></div>
              </div>
              <div className="equipment-groups">
                {equipmentGroups.map((group) => (
                  <div className="equipment-group" key={group.title.en}>
                    <h3>{text(group.title, lang)}</h3>
                    <div className="equipment-list">
                      {group.items.map(([name, spec, brand, qty]) => (
                        <div className="equipment-row" key={`${name}-${spec}`}>
                          <span className="equipment-name">{name}</span><span>{spec}</span><span>{brand}</span><strong>{qty}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="cases" className="section case-section dark-section">
          <div className="container">
            <SectionIntro eyebrow={c.casesEyebrow} title={c.casesTitle} body={c.casesBody} />
            <div className="case-grid">
              {[
                { code: "A1", title: { zh: "工作母機主軸", ja: "工作機械主軸", en: "Machine-tool spindle" }, meta: "CNC turning + heat treatment + ID / OD grinding" },
                { code: "A2", title: { zh: "精密套筒", ja: "精密スリーブ", en: "Precision sleeve" }, meta: "ID grinding + final inspection" },
                { code: "A3", title: { zh: "客製化軸類零件", ja: "カスタムシャフト", en: "Custom shaft component" }, meta: "Drawing-based integrated processing" },
              ].map((item) => (
                <article className="case-card" key={item.code}>
                  <div className="case-placeholder"><span>{item.code}</span><div className="case-crosshair" /><small>{lang === "zh" ? "案例照片待補" : lang === "ja" ? "事例写真準備中" : "Case image pending"}</small></div>
                  <div className="case-body"><span className="case-code">{item.code} / TRACK RECORD</span><h3>{text(item.title, lang)}</h3><p>{item.meta}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="quality" className="section quality-section">
          <div className="container">
            <SectionIntro eyebrow={c.qualityEyebrow} title={c.qualityTitle} body={c.qualityBody} />
            <div className="quality-layout">
              <div className="workflow">
                {[
                  ["01", { zh: "圖面確認", ja: "図面確認", en: "Drawing review" }],
                  ["02", { zh: "製程評估", ja: "工程評価", en: "Process planning" }],
                  ["03", { zh: "加工與協力管理", ja: "加工・協力管理", en: "Processing & partner control" }],
                  ["04", { zh: "最終品質檢驗", ja: "最終品質検査", en: "Final inspection" }],
                  ["05", { zh: "防鏽、包裝、出貨", ja: "防錆・梱包・出荷", en: "Rust protection, packing & shipment" }],
                ].map(([number, label]) => (
                  <div className="workflow-step" key={number as string}><span>{number}</span><strong>{text(label as TextValue, lang)}</strong><i>→</i></div>
                ))}
              </div>
              <div className="quality-points">
                <div><span>01</span><h3>{lang === "zh" ? "多年精密研磨經驗" : lang === "ja" ? "長年の精密研削経験" : "Years of grinding experience"}</h3><p>1998—</p></div>
                <div><span>02</span><h3>{lang === "zh" ? "核心製程由現場掌握" : lang === "ja" ? "核心工程を現場で管理" : "Core processes kept close"}</h3><p>{lang === "zh" ? "內外徑研磨" : lang === "ja" ? "内外径研削" : "ID / OD grinding"}</p></div>
                <div><span>03</span><h3>{lang === "zh" ? "彈性協力加工體系" : lang === "ja" ? "柔軟な協力加工体制" : "Flexible partner network"}</h3><p>30+ partners</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="industries" className="section industries-section">
          <div className="container">
            <SectionIntro eyebrow={c.industryEyebrow} title={c.industryTitle} body={c.industryBody} />
            <div className="industry-grid">
              {applications.map((item) => (
                <article className="industry-card" key={item.code}><span>{item.code}</span><h3>{text(item.title, lang)}</h3><p>{text(item.body, lang)}</p><i>↗</i></article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section dark-section">
          <div className="container">
            <SectionIntro eyebrow={c.contactEyebrow} title={c.contactTitle} body={c.contactBody} />
            <div className="contact-layout">
              <aside className="contact-card">
                <div className="contact-card-top"><span className="brand-mark">Chy</span><span>CHY / 08</span></div>
                <h3>長芸有限公司</h3>
                <p>{c.contactPerson}</p>
                <div className="contact-details">
                  <div><span>PHONE</span><a href="tel:0426763118">04-26763118</a></div>
                  <div><span>ADDRESS</span><p>43743 台中市大甲區義和里重義一路151號</p></div>
                </div>
                <div className="contact-note">{lang === "zh" ? "工作母機・精密零件・CNC 研磨與車床加工" : lang === "ja" ? "工作機械・精密部品・CNC研削・旋盤加工" : "Machine tools · Precision parts · CNC grinding & turning"}</div>
              </aside>
              <form className="rfq-form" onSubmit={handleSubmit}>
                <div className="form-heading"><span>RFQ / 01</span><strong>{lang === "zh" ? "詢價資訊" : lang === "ja" ? "見積情報" : "Inquiry details"}</strong></div>
                <div className="form-grid">
                  <label><span>{lang === "zh" ? "公司名稱" : lang === "ja" ? "会社名" : "Company"}</span><input type="text" placeholder="" /></label>
                  <label><span>{lang === "zh" ? "聯絡人" : lang === "ja" ? "ご担当者" : "Contact person"}</span><input type="text" placeholder="" /></label>
                  <label><span>{lang === "zh" ? "Email" : "Email"}</span><input type="email" placeholder="" /></label>
                  <label><span>{lang === "zh" ? "電話" : lang === "ja" ? "電話番号" : "Phone"}</span><input type="tel" placeholder="" /></label>
                  <label className="form-wide"><span>{lang === "zh" ? "品名／加工需求" : lang === "ja" ? "品名／加工内容" : "Part / process"}</span><input type="text" placeholder="" /></label>
                  <label className="form-wide"><span>{lang === "zh" ? "材質、數量、尺寸、精度與交期" : lang === "ja" ? "材質・数量・寸法・精度・納期" : "Material, quantity, dimensions, tolerance & lead time"}</span><textarea rows={4} placeholder="" /></label>
                  <label className="file-field form-wide"><span>{lang === "zh" ? "上傳圖面（示意）" : lang === "ja" ? "図面アップロード（デモ）" : "Upload drawing (demo)"}</span><input type="file" accept=".pdf,.dxf,.dwg,.step,.stp,.jpg,.png" /><small>PDF / DXF / DWG / STEP / JPG / PNG</small></label>
                </div>
                <div className="form-footer"><p>{submitted ? c.formDone : c.formNotice}</p><button className="button button-primary" type="submit">{c.formButton}<span>↗</span></button></div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-brand"><a className="brand" href="#top"><span className="brand-mark">Chy</span><span className="brand-copy"><strong>長芸</strong><small>CHUNG YUEN CO., LTD.</small></span></a><p>{lang === "zh" ? "用研磨的專注，交付可被信任的精度。" : lang === "ja" ? "研削への集中で、信頼される精度を届けます。" : "Focused grinding. Dependable precision."}</p></div>
          <div className="footer-links"><span>{lang === "zh" ? "快速導覽" : lang === "ja" ? "クイックリンク" : "Quick links"}</span>{navItems.slice(0, 4).map((item) => <a key={item.id} href={item.href}>{text(item.label, lang)}</a>)}</div>
          <div className="footer-contact"><span>{lang === "zh" ? "聯絡長芸" : lang === "ja" ? "お問い合わせ" : "Contact Chy"}</span><a href="tel:0426763118">04-26763118</a><p>43743 台中市大甲區義和里重義一路151號</p></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 CHYUNG YUEN CO., LTD. ALL RIGHTS RESERVED.</span><span>長芸有限公司 / 金芸精密工業有限公司</span></div>
      </footer>
    </div>
  );
}
