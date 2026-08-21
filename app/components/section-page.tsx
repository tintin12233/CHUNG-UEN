"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faArrowUpRightFromSquare, faEnvelope, faFax, faLocationDot, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { AboutGallery, aboutContent, aboutTimeline, applications, capacityCards, copy, equipmentGroups, SectionIntro, services, text, TextValue } from "@/app/page";
import { PageHero, useSiteLang } from "@/app/components/site-chrome";

export type SectionKind = "about" | "services" | "capacity" | "equipment" | "cases" | "quality" | "industries" | "contact";

const pageMeta: Record<SectionKind, { index: string; eyebrow: keyof typeof copy.zh; title: keyof typeof copy.zh; body: keyof typeof copy.zh }> = {
  about: { index: "01", eyebrow: "aboutEyebrow", title: "aboutTitle", body: "aboutBody" },
  services: { index: "02", eyebrow: "serviceEyebrow", title: "serviceTitle", body: "serviceBody" },
  capacity: { index: "03", eyebrow: "capacityEyebrow", title: "capacityTitle", body: "capacityBody" },
  equipment: { index: "04", eyebrow: "equipmentEyebrow", title: "equipmentTitle", body: "equipmentBody" },
  cases: { index: "05", eyebrow: "casesEyebrow", title: "casesTitle", body: "casesBody" },
  quality: { index: "06", eyebrow: "qualityEyebrow", title: "qualityTitle", body: "qualityBody" },
  industries: { index: "07", eyebrow: "industryEyebrow", title: "industryTitle", body: "industryBody" },
  contact: { index: "08", eyebrow: "contactEyebrow", title: "contactTitle", body: "contactBody" },
};

type LocalizedText = { zh: string; ja: string; en: string };

type ProductEntry = {
  code: string;
  title: LocalizedText;
  category: LocalizedText;
  body: LocalizedText;
  image: string;
};

const productCatalog: ProductEntry[] = [
  { code: "01", title: { zh: "精密軸件組", ja: "精密軸部品", en: "Precision shaft assembly" }, category: { zh: "軸件加工", ja: "軸部品加工", en: "Shaft machining" }, body: { zh: "階梯、軸肩與外徑尺寸依圖面加工。", ja: "段差、肩部、外径を図面に合わせて加工。", en: "Stepped profiles, shoulders, and diameters machined to drawing." }, image: "/images/products/product-01.png" },
  { code: "02", title: { zh: "法蘭墊片", ja: "フランジリング", en: "Flange rings" }, category: { zh: "法蘭零件", ja: "フランジ部品", en: "Flange components" }, body: { zh: "多孔位法蘭與環形零件，兼顧平面與孔位精度。", ja: "多孔フランジとリング部品を高精度に加工。", en: "Multi-hole flanges and rings with controlled faces and bores." }, image: "/images/products/product-02.png" },
  { code: "03", title: { zh: "精密階梯軸", ja: "精密段付き軸", en: "Precision stepped shaft" }, category: { zh: "軸件加工", ja: "軸部品加工", en: "Shaft machining" }, body: { zh: "長軸與套筒配合使用，支援外徑研磨與尺寸檢驗。", ja: "長軸とスリーブの組み合わせに対応。", en: "Long shafts paired with sleeves for grinding and inspection." }, image: "/images/products/product-03.png" },
  { code: "04", title: { zh: "法蘭主軸", ja: "フランジ付き主軸", en: "Flanged spindle" }, category: { zh: "主軸組件", ja: "主軸アセンブリ", en: "Spindle assembly" }, body: { zh: "主軸本體與法蘭一體加工，重視同心度與表面品質。", ja: "主軸本体とフランジを一体加工。", en: "Integrated spindle and flange machining with concentricity in focus." }, image: "/images/products/product-04.png" },
  { code: "05", title: { zh: "精密錐形座", ja: "精密テーパーハブ", en: "Precision tapered hub" }, category: { zh: "客製零件", ja: "カスタム部品", en: "Custom components" }, body: { zh: "依照配合面、錐度與法蘭需求製作客製零件。", ja: "嵌合面、テーパー、フランジ仕様に対応。", en: "Custom parts built around mating faces, tapers, and flanges." }, image: "/images/products/product-05.png" },
  { code: "06", title: { zh: "精密套筒", ja: "精密スリーブ", en: "Precision sleeves" }, category: { zh: "套筒加工", ja: "スリーブ加工", en: "Sleeve machining" }, body: { zh: "套筒外徑、內孔與端面加工，適合精密配合。", ja: "外径、内径、端面を精密に加工。", en: "Sleeves with controlled outside diameters, bores, and faces." }, image: "/images/products/product-06.png" },
  { code: "07", title: { zh: "精密階梯軸", ja: "段付き軸", en: "Stepped shaft" }, category: { zh: "軸件加工", ja: "軸部品加工", en: "Shaft machining" }, body: { zh: "多段外徑與螺紋端部加工，適用於傳動機構。", ja: "多段外径とねじ端部を加工。", en: "Multi-diameter shafts with threaded ends for transmission parts." }, image: "/images/products/product-07.png" },
  { code: "08", title: { zh: "芯軸", ja: "芯軸", en: "Mandrel" }, category: { zh: "軸件加工", ja: "芯軸加工", en: "Mandrel machining" }, body: { zh: "大尺寸軸身與精密軸肩，維持旋轉件的配合穩定。", ja: "大径軸と精密な肩部で安定した嵌合を実現。", en: "Large shaft bodies and precision shoulders for stable fit." }, image: "/images/products/product-08.png" },
  { code: "09", title: { zh: "主軸組件", ja: "主軸アセンブリ", en: "Spindle assembly" }, category: { zh: "主軸組件", ja: "主軸アセンブリ", en: "Spindle assembly" }, body: { zh: "長尺寸主軸加工，兼顧外徑、端部螺紋與表面品質。", ja: "長尺主軸の外径、ねじ部、表面品質を管理。", en: "Long spindles with controlled diameters, threads, and surfaces." }, image: "/images/products/product-09.png" },
  { code: "10", title: { zh: "軸承座／套筒", ja: "ベアリングハウジング／スリーブ", en: "Bearing housing / sleeve" }, category: { zh: "座體加工", ja: "ハウジング加工", en: "Housing machining" }, body: { zh: "內孔、外圓與側面結構一次整合，支援精密組裝。", ja: "内径、外径、側面形状を一体加工。", en: "Bores, outside diameters, and side features for precision assembly." }, image: "/images/products/product-10.png" },
  { code: "11", title: { zh: "法蘭芯軸", ja: "フランジ付き芯軸", en: "Flanged mandrel" }, category: { zh: "主軸組件", ja: "主軸アセンブリ", en: "Spindle assembly" }, body: { zh: "法蘭、軸肩與長軸結構整合，適合高精度配合。", ja: "フランジ、肩部、長尺軸を一体加工。", en: "Flanges, shoulders, and long shafts integrated for precision fit." }, image: "/images/products/product-11.png" },
  { code: "12", title: { zh: "液壓精密座體", ja: "油圧精密ハウジング", en: "Hydraulic precision housing" }, category: { zh: "液壓與精密零件", ja: "油圧・精密部品", en: "Hydraulic precision parts" }, body: { zh: "深孔、螺紋與外部安裝面加工，重視密合與尺寸穩定。", ja: "深穴、ねじ、取付面を精密に加工。", en: "Deep bores, threads, and mounting faces for stable sealing." }, image: "/images/products/product-12.png" },
  { code: "13", title: { zh: "黃銅套筒組件", ja: "真鍮スリーブアセンブリ", en: "Brass sleeve assembly" }, category: { zh: "精密套筒", ja: "精密スリーブ", en: "Precision sleeve" }, body: { zh: "黃銅材質套筒與法蘭結構，依需求完成孔位與端面。", ja: "真鍮スリーブとフランジを仕様に合わせて加工。", en: "Brass sleeves and flanges finished to specified bores and faces." }, image: "/images/products/product-13.png" },
];

const productCatalogTitle: LocalizedText = { zh: "長芸精密零件產品", ja: "長芸の精密部品", en: "Chung Uen precision parts" };
const productCatalogBody: LocalizedText = { zh: "從軸件、套筒到法蘭與座體，依照客戶圖面完成車削、研磨與檢驗。", ja: "軸、スリーブ、フランジ、ハウジングまで、図面に基づき旋削・研磨・検査を行います。", en: "From shafts and sleeves to flanges and housings, parts are turned, ground, and inspected to drawing." };

const contactIssues: Array<{ value: string; label: LocalizedText }> = [
  { value: "product", label: { zh: "產品相關", ja: "製品について", en: "Product inquiry" } },
  { value: "report", label: { zh: "錯誤回報", ja: "不具合の報告", en: "Error report" } },
  { value: "suggestion", label: { zh: "建議事項", ja: "ご提案", en: "Suggestion" } },
  { value: "website", label: { zh: "網站操作問題", ja: "ウェブサイトについて", en: "Website issue" } },
  { value: "partnership", label: { zh: "企業合作專案", ja: "企業協業プロジェクト", en: "Business partnership" } },
  { value: "other", label: { zh: "其他", ja: "その他", en: "Other" } },
];

const taiwanLocations = [
  { name: "基隆市", districts: ["中正區", "七堵區", "暖暖區", "仁愛區", "中山區", "安樂區", "信義區"] },
  { name: "臺北市", districts: ["中正區", "大同區", "中山區", "松山區", "大安區", "萬華區", "信義區", "士林區", "北投區", "內湖區", "南港區", "文山區"] },
  { name: "新北市", districts: ["萬里區", "金山區", "板橋區", "汐止區", "深坑區", "石碇區", "瑞芳區", "平溪區", "雙溪區", "貢寮區", "新店區", "坪林區", "烏來區", "永和區", "中和區", "土城區", "三峽區", "樹林區", "鶯歌區", "三重區", "新莊區", "泰山區", "林口區", "蘆洲區", "五股區", "八里區", "淡水區", "三芝區", "石門區"] },
  { name: "桃園市", districts: ["中壢區", "平鎮區", "龍潭區", "楊梅區", "新屋區", "觀音區", "桃園區", "龜山區", "八德區", "大溪區", "復興區", "大園區", "蘆竹區"] },
  { name: "新竹市", districts: ["東區", "北區", "香山區"] },
  { name: "新竹縣", districts: ["竹北市", "竹東鎮", "新埔鎮", "關西鎮", "湖口鄉", "新豐鄉", "芎林鄉", "橫山鄉", "北埔鄉", "寶山鄉", "峨眉鄉", "尖石鄉", "五峰鄉"] },
  { name: "苗栗縣", districts: ["竹南鎮", "頭份市", "三灣鄉", "南庄鄉", "獅潭鄉", "後龍鎮", "通霄鎮", "苑裡鎮", "苗栗市", "造橋鄉", "頭屋鄉", "公館鄉", "大湖鄉", "泰安鄉", "銅鑼鄉", "三義鄉", "西湖鄉", "卓蘭鎮"] },
  { name: "臺中市", districts: ["中區", "東區", "南區", "西區", "北區", "北屯區", "西屯區", "南屯區", "太平區", "大里區", "霧峰區", "烏日區", "豐原區", "后里區", "石岡區", "東勢區", "和平區", "新社區", "潭子區", "大雅區", "神岡區", "大肚區", "沙鹿區", "龍井區", "梧棲區", "清水區", "大甲區", "外埔區", "大安區"] },
  { name: "彰化縣", districts: ["彰化市", "芬園鄉", "花壇鄉", "秀水鄉", "鹿港鎮", "福興鄉", "線西鄉", "和美鎮", "伸港鄉", "員林市", "社頭鄉", "永靖鄉", "埔心鄉", "溪湖鎮", "大村鄉", "埔鹽鄉", "田中鎮", "北斗鎮", "田尾鄉", "埤頭鄉", "溪州鄉", "竹塘鄉", "二林鎮", "大城鄉", "芳苑鄉", "二水鄉"] },
  { name: "南投縣", districts: ["南投市", "中寮鄉", "草屯鎮", "國姓鄉", "埔里鎮", "仁愛鄉", "名間鄉", "集集鎮", "水里鄉", "魚池鄉", "信義鄉", "竹山鎮", "鹿谷鄉"] },
  { name: "雲林縣", districts: ["斗南鎮", "大埤鄉", "虎尾鎮", "土庫鎮", "褒忠鄉", "東勢鄉", "臺西鄉", "崙背鄉", "麥寮鄉", "斗六市", "林內鄉", "古坑鄉", "莿桐鄉", "西螺鎮", "二崙鄉", "北港鎮", "水林鄉", "口湖鄉", "四湖鄉", "元長鄉"] },
  { name: "嘉義市", districts: ["東區", "西區"] },
  { name: "嘉義縣", districts: ["番路鄉", "梅山鄉", "竹崎鄉", "阿里山鄉", "中埔鄉", "大埔鄉", "水上鄉", "鹿草鄉", "太保市", "朴子市", "東石鄉", "六腳鄉", "新港鄉", "民雄鄉", "大林鎮", "溪口鄉", "義竹鄉", "布袋鎮"] },
  { name: "臺南市", districts: ["中西區", "東區", "南區", "北區", "安平區", "安南區", "永康區", "歸仁區", "新化區", "左鎮區", "玉井區", "楠西區", "南化區", "仁德區", "關廟區", "龍崎區", "官田區", "麻豆區", "佳里區", "西港區", "七股區", "將軍區", "學甲區", "北門區", "新營區", "後壁區", "白河區", "東山區", "六甲區", "下營區", "柳營區", "鹽水區", "善化區", "大內區", "山上區", "新市區", "安定區"] },
  { name: "高雄市", districts: ["新興區", "前金區", "苓雅區", "鹽埕區", "鼓山區", "旗津區", "前鎮區", "三民區", "楠梓區", "小港區", "左營區", "仁武區", "大社區", "岡山區", "路竹區", "阿蓮區", "田寮區", "燕巢區", "橋頭區", "梓官區", "彌陀區", "永安區", "湖內區", "鳳山區", "大寮區", "林園區", "鳥松區", "大樹區", "旗山區", "美濃區", "六龜區", "內門區", "杉林區", "甲仙區", "桃源區", "那瑪夏區", "茂林區"] },
  { name: "屏東縣", districts: ["屏東市", "三地門鄉", "霧臺鄉", "瑪家鄉", "九如鄉", "里港鄉", "高樹鄉", "鹽埔鄉", "長治鄉", "麟洛鄉", "竹田鄉", "內埔鄉", "萬丹鄉", "潮州鎮", "泰武鄉", "來義鄉", "萬巒鄉", "崁頂鄉", "新埤鄉", "南州鄉", "林邊鄉", "東港鎮", "琉球鄉", "佳冬鄉", "新園鄉", "枋寮鄉", "枋山鄉", "春日鄉", "獅子鄉", "車城鄉", "牡丹鄉", "恆春鎮", "滿州鄉"] },
  { name: "宜蘭縣", districts: ["宜蘭市", "頭城鎮", "礁溪鄉", "壯圍鄉", "員山鄉", "羅東鎮", "三星鄉", "大同鄉", "五結鄉", "冬山鄉", "蘇澳鎮", "南澳鄉"] },
  { name: "花蓮縣", districts: ["花蓮市", "新城鄉", "秀林鄉", "吉安鄉", "壽豐鄉", "鳳林鎮", "光復鄉", "豐濱鄉", "瑞穗鄉", "萬榮鄉", "玉里鎮", "卓溪鄉", "富里鄉"] },
  { name: "臺東縣", districts: ["臺東市", "綠島鄉", "蘭嶼鄉", "延平鄉", "卑南鄉", "鹿野鄉", "關山鎮", "海端鄉", "池上鄉", "東河鄉", "成功鎮", "長濱鄉", "太麻里鄉", "金峰鄉", "大武鄉", "達仁鄉"] },
  { name: "澎湖縣", districts: ["馬公市", "西嶼鄉", "望安鄉", "七美鄉", "白沙鄉", "湖西鄉"] },
  { name: "金門縣", districts: ["金沙鎮", "金湖鎮", "金寧鄉", "金城鎮", "烈嶼鄉", "烏坵鄉"] },
  { name: "連江縣", districts: ["南竿鄉", "北竿鄉", "莒光鄉", "東引鄉"] },
];

function AboutPage() {
  const { lang } = useSiteLang();
  const c = copy[lang];
  const content = aboutContent[lang];
  return <section className="section about-section"><div className="container"><SectionIntro eyebrow={c.aboutEyebrow} title={c.aboutTitle} body={content.overview} /><div className="about-grid"><div className="about-story"><div className="story-card"><span className="story-index">01</span><p>{content.detail}</p></div><a className="outline-link" href="/quality">{c.aboutLink} <span className="button-icon" aria-hidden="true"><FontAwesomeIcon icon={faArrowRight} /></span></a></div><AboutGallery lang={lang} /></div><div className="about-story-copy">{content.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="about-history"><div className="about-history-header"><div><p className="section-eyebrow">{content.historyEyebrow}</p><h2>{content.historyTitle}</h2></div><p className="history-lede">{content.historyBody}</p></div><AboutTimeline lang={lang} /></div></div></section>;
}

function AboutTimeline({ lang }: { lang: "zh" | "ja" | "en" }) {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = timelineRef.current;
    if (!viewport) return;
    const frame = requestAnimationFrame(() => {
      viewport.scrollLeft = viewport.scrollWidth - viewport.clientWidth;
    });
    return () => cancelAnimationFrame(frame);
  }, [lang]);

  const moveTimeline = (direction: number) => {
    const viewport = timelineRef.current;
    if (!viewport) return;
    viewport.scrollBy({ left: direction * Math.max(viewport.clientWidth * 0.82, 280), behavior: "smooth" });
  };

  return <div className="timeline-carousel"><button className="timeline-arrow" type="button" aria-label="顯示較早的沿革" onClick={() => moveTimeline(-1)}><FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" /></button><div className="timeline-viewport" ref={timelineRef}><div className="timeline">{aboutTimeline.map((item) => <article className="timeline-row" key={item.year}><strong>{item.year}</strong><h3>{text(item.title, lang)}</h3><p>{text(item.body, lang)}</p></article>)}</div></div><button className="timeline-arrow" type="button" aria-label="顯示較晚的沿革" onClick={() => moveTimeline(1)}><FontAwesomeIcon icon={faArrowRight} aria-hidden="true" /></button></div>;
}

function ServicesPage() {
  const { lang } = useSiteLang();
  const c = copy[lang];
  return <section className="section dark-section"><div className="container"><SectionIntro eyebrow={c.serviceEyebrow} title={c.serviceTitle} body={c.serviceBody} /><div className="service-grid">{services.map((service) => <article className="service-card" key={service.number}><div className="service-top"><span>{service.number}</span><b aria-hidden="true"><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></b></div><h3>{text(service.title, lang)}</h3><p>{text(service.body, lang)}</p><span className="service-tag">{text(service.tags, lang)}</span></article>)}</div><div className="process-line"><span>DRAWING</span><i /><span>PROCESS</span><i /><span>FINISHED PART</span></div></div></section>;
}

function CapacityPage() {
  const { lang } = useSiteLang();
  const c = copy[lang];
  return <section className="section capacity-section"><div className="container"><SectionIntro eyebrow={c.capacityEyebrow} title={c.capacityTitle} body={c.capacityBody} /><div className="capacity-layout"><div className="capacity-cards">{capacityCards.map((card, index) => <article className={`capacity-card ${index === 0 ? "capacity-card-featured" : ""}`} key={card.value}><div className="capacity-card-head"><span>0{index + 1}</span><span>{text(card.label, lang)}</span></div><strong>{card.value}</strong><small>{text(card.note, lang)}</small></article>)}</div><div className="capacity-notes"><div className="capacity-note"><span>OD</span><p>外徑研磨：軸件、主軸與精密圓筒零件。</p></div><div className="capacity-note"><span>ID</span><p>內徑研磨：套筒、精密孔徑與內部特徵。</p></div><div className="capacity-note"><span>QA</span><p>表面粗度與尺寸檢驗，確保每批加工穩定。</p></div></div></div></div></section>;
}

function EquipmentPage() {
  const { lang } = useSiteLang();
  const c = copy[lang];
  return <section className="section"><div className="container"><SectionIntro eyebrow={c.equipmentEyebrow} title={c.equipmentTitle} body={c.equipmentBody} /><div className="equipment-layout"><div className="equipment-placeholder"><img src="/images/about-floor.jpg" alt="Factory equipment" /><div className="placeholder-caption"><span>CHY / EQUIPMENT</span><small>PRECISION MACHINING FLOOR</small></div></div><div className="equipment-groups">{equipmentGroups.map((group) => <div className="equipment-group" key={group.title.en}><h3>{text(group.title, lang)}</h3>{group.items.map(([name, spec, brand, qty]) => <div className="equipment-row" key={`${name}-${spec}`}><span>{name}</span><span>{spec}</span><span>{brand}</span><strong>{qty}</strong></div>)}</div>)}</div></div></div></section>;
}

function CasesPage() {
  const { lang } = useSiteLang();
  const c = copy[lang];
  return <section className="section dark-section cases-section"><div className="container"><SectionIntro eyebrow={c.casesEyebrow} title={c.casesTitle} body={c.casesBody} /><div className="product-catalog-heading"><div><span className="product-catalog-kicker">PRODUCT RANGE / 13</span><h3>{text(productCatalogTitle, lang)}</h3></div><p>{text(productCatalogBody, lang)}</p></div><div className="product-grid" aria-label={text(productCatalogTitle, lang)}>{productCatalog.map((product) => <article className="product-card" key={product.code}><div className="product-image-wrap"><img className="product-image" src={product.image} alt={text(product.title, lang)} /><span className="product-number">{product.code}</span></div><div className="product-card-body"><span className="product-category">{text(product.category, lang)}</span><h3>{text(product.title, lang)}</h3><p>{text(product.body, lang)}</p></div></article>)}</div></div></section>;
}

function QualityPage() {
  const { lang } = useSiteLang();
  const c = copy[lang];
  const steps: TextValue[] = [
    { zh: "圖面審查", ja: "図面確認", en: "Drawing review" },
    { zh: "製程規劃", ja: "工程計画", en: "Process planning" },
    { zh: "加工與管控", ja: "加工と管理", en: "Processing and control" },
    { zh: "最終檢驗", ja: "最終検査", en: "Final inspection" },
    { zh: "防鏽、包裝與出貨", ja: "防錆、梱包、出荷", en: "Packing and shipment" },
  ];
  return <section className="section"><div className="container"><SectionIntro eyebrow={c.qualityEyebrow} title={c.qualityTitle} body={c.qualityBody} /><div className="workflow">{steps.map((step, index) => <div className="workflow-step" key={step.en}><span>0{index + 1}</span><strong>{text(step, lang)}</strong><i aria-hidden="true"><FontAwesomeIcon icon={faArrowRight} /></i></div>)}</div></div></section>;
}

function IndustriesPage() {
  const { lang } = useSiteLang();
  const c = copy[lang];
  return <section className="section"><div className="container"><SectionIntro eyebrow={c.industryEyebrow} title={c.industryTitle} body={c.industryBody} /><div className="industry-grid">{applications.map((item) => <article className="industry-card" key={item.code}><span>{item.code}</span><h3>{text(item.title, lang)}</h3><p>{text(item.body, lang)}</p></article>)}</div></div></section>;
}

function ContactPage() {
  const { lang } = useSiteLang();
  const c = copy[lang];
  const formCopy: Record<"zh" | "ja" | "en", {
    topic: string;
    topicPlaceholder: string;
    company: string;
    name: string;
    title: string;
    titleMr: string;
    titleMs: string;
    phone: string;
    email: string;
    city: string;
    district: string;
    address: string;
    website: string;
    message: string;
    cityPlaceholder: string;
    districtPlaceholder: string;
    clear: string;
  }> = {
    zh: { topic: "問題分類", topicPlaceholder: "* 問題分類", company: "公司名稱", name: "姓名", title: "稱謂", titleMr: "先生", titleMs: "女士", phone: "電話", email: "E-mail", city: "縣市", district: "區域", address: "地址", website: "網站", message: "內容", cityPlaceholder: "請選擇", districtPlaceholder: "請選擇", clear: "清除" },
    ja: { topic: "お問い合わせ分類", topicPlaceholder: "分類を選択してください", company: "会社名", name: "お名前", title: "敬称", titleMr: "様", titleMs: "様", phone: "電話番号", email: "E-mail", city: "県・市", district: "区・郷鎮", address: "住所", website: "ウェブサイト", message: "お問い合わせ内容", cityPlaceholder: "県・市を選択", districtPlaceholder: "区・郷鎮を選択", clear: "クリア" },
    en: { topic: "Inquiry type", topicPlaceholder: "* Inquiry type", company: "Company name", name: "Name", title: "Title", titleMr: "Mr.", titleMs: "Ms.", phone: "Phone", email: "E-mail", city: "City / county", district: "District", address: "Address", website: "Website", message: "Message", cityPlaceholder: "Select", districtPlaceholder: "Select", clear: "Clear" },
  }[lang];
  const [submitted, setSubmitted] = useState(false);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [title, setTitle] = useState("mr");
  const selectedCity = taiwanLocations.find((location) => location.name === city);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    const form = event.currentTarget.form;
    form?.reset();
    setCity("");
    setDistrict("");
    setTitle("mr");
    setSubmitted(false);
  };
  return <section className="section dark-section"><div className="container"><SectionIntro eyebrow={c.contactEyebrow} title={c.contactTitle} body={c.contactBody} /><div className="contact-layout"><aside className="contact-card"><h3>長芸有限公司</h3><div className="contact-details"><p className="contact-detail"><FontAwesomeIcon icon={faUser} aria-hidden="true" /><span>聯絡人：陳先生</span></p><a className="contact-detail" href="tel:0426763118"><FontAwesomeIcon icon={faPhone} aria-hidden="true" /><span>04-26763118</span></a><p className="contact-detail"><FontAwesomeIcon icon={faFax} aria-hidden="true" /><span>04-26763117</span></p><a className="contact-detail" href="mailto:chunguen851996@gmail.com"><FontAwesomeIcon icon={faEnvelope} aria-hidden="true" /><span>chunguen851996@gmail.com</span></a><p className="contact-detail"><FontAwesomeIcon icon={faLocationDot} aria-hidden="true" /><span>台中市大甲區重義一路151號</span></p></div></aside><form className="rfq-form" onSubmit={handleSubmit}><div className="form-heading"><span>RFQ / 01</span><strong>{lang === "zh" ? "聯絡表單" : lang === "ja" ? "お問い合わせフォーム" : "Contact form"}</strong></div><div className="form-grid">
    <label className="form-wide"><span>{formCopy.topic} <b aria-hidden="true">*</b></span><select name="topic" required defaultValue=""><option value="" disabled>{formCopy.topicPlaceholder}</option>{contactIssues.map((issue) => <option key={issue.value} value={issue.value}>{issue.label[lang]}</option>)}</select></label>
    <label className="form-wide"><span>{formCopy.company}</span><input name="company" type="text" placeholder={formCopy.company} /></label>
    <label><span>{formCopy.name} <b aria-hidden="true">*</b></span><input name="name" required type="text" placeholder={`* ${formCopy.name}`} /></label>
    <label><span>{formCopy.title}</span><select name="title" value={title} onChange={(event) => setTitle(event.target.value)}><option value="mr">{formCopy.titleMr}</option><option value="ms">{formCopy.titleMs}</option></select></label>
    <label><span>{formCopy.phone}</span><input name="phone" type="tel" placeholder={formCopy.phone} /></label>
    <label><span>{formCopy.email} <b aria-hidden="true">*</b></span><input name="email" required type="email" placeholder={`* ${formCopy.email}`} /></label>
    <label><span>{formCopy.city}</span><select name="city" value={city} onChange={(event) => { setCity(event.target.value); setDistrict(""); }}><option value="">{formCopy.cityPlaceholder}</option>{taiwanLocations.map((location) => <option key={location.name} value={location.name}>{location.name}</option>)}</select></label>
    <label><span>{formCopy.district}</span><select name="district" value={district} disabled={!selectedCity} onChange={(event) => setDistrict(event.target.value)}><option value="">{formCopy.districtPlaceholder}</option>{selectedCity?.districts.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
    <label className="form-wide"><span>{formCopy.address}</span><input name="address" type="text" placeholder={formCopy.address} /></label>
    <label className="form-wide"><span>{formCopy.website}</span><input name="website" type="url" placeholder={formCopy.website} /></label>
    <label className="form-wide"><span>{formCopy.message} <b aria-hidden="true">*</b></span><textarea name="message" required rows={5} placeholder={`* ${formCopy.message}`} /></label>
  </div><div className="form-footer"><p aria-live="polite">{submitted ? c.formDone : c.formNotice}</p><div className="form-actions"><button className="form-clear" type="button" onClick={handleClear}>{formCopy.clear}</button><button className="hero-button" type="submit">{c.formButton} <span className="button-icon" aria-hidden="true"><FontAwesomeIcon icon={faArrowRight} /></span></button></div></div></form></div></div></section>;
}

export function SectionPage({ kind }: { kind: SectionKind }) {
  const { lang } = useSiteLang();
  const meta = pageMeta[kind];
  const content = { about: <AboutPage />, services: <ServicesPage />, capacity: <CapacityPage />, equipment: <EquipmentPage />, cases: <CasesPage />, quality: <QualityPage />, industries: <IndustriesPage />, contact: <ContactPage /> }[kind];
  return <><PageHero index={meta.index} eyebrow={copy[lang][meta.eyebrow]} title={copy[lang][meta.title]} body={copy[lang][meta.body]} />{content}</>;
}
