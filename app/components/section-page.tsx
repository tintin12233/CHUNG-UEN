"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faArrowUpRightFromSquare, faBoxOpen, faEnvelope, faFax, faFileCircleCheck, faGears, faGaugeHigh, faListCheck, faLocationDot, faMagnifyingGlassChart, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { AboutGallery, aboutContent, aboutTimeline, applications, copy, equipmentGroups, productionProcessSteps, SectionIntro, services, text, TextValue } from "@/app/page";
import { PageHero, useSiteLang } from "@/app/components/site-chrome";
import { withBasePath, withRoutePath } from "@/app/components/site-paths";

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
  image: string | string[];
};

const productCatalog: ProductEntry[] = [
  { code: "01", title: { zh: "精密軸件組", ja: "精密軸部品", en: "Precision shaft assembly" }, category: { zh: "軸件加工", ja: "軸部品加工", en: "Shaft machining" }, body: { zh: "階梯、軸肩與外徑尺寸依圖面加工。", ja: "段差、肩部、外径を図面に合わせて加工。", en: "Stepped profiles, shoulders, and diameters machined to drawing." }, image: "/images/products/product-01.png" },
  { code: "02", title: { zh: "連接板", ja: "フランジリング", en: "Flange rings" }, category: { zh: "法蘭零件", ja: "フランジ部品", en: "Flange components" }, body: { zh: "多孔位法蘭與環形零件，兼顧平面與孔位精度。", ja: "多孔フランジとリング部品を高精度に加工。", en: "Multi-hole flanges and rings with controlled faces and bores." }, image: "/images/products/product-02.png" },
  { code: "03", title: { zh: "精密階梯軸", ja: "精密段付き軸", en: "Precision stepped shaft" }, category: { zh: "軸件加工", ja: "軸部品加工", en: "Shaft machining" }, body: { zh: "長軸與套筒配合使用，支援外徑研磨與尺寸檢驗。", ja: "長軸とスリーブの組み合わせに対応。", en: "Long shafts paired with sleeves for grinding and inspection." }, image: "/images/products/product-03.png" },
  { code: "04", title: { zh: "主軸襯套", ja: "フランジ付き主軸", en: "Flanged spindle" }, category: { zh: "主軸組件", ja: "主軸アセンブリ", en: "Spindle assembly" }, body: { zh: "主軸本體與法蘭一體加工，重視同心度與表面品質。", ja: "主軸本体とフランジを一体加工。", en: "Integrated spindle and flange machining with concentricity in focus." }, image: "/images/products/product-04.png" },
  { code: "05", title: { zh: "治具", ja: "精密テーパーハブ", en: "Precision tapered hub" }, category: { zh: "客製零件", ja: "カスタム部品", en: "Custom components" }, body: { zh: "依照配合面、錐度與法蘭需求製作客製零件。", ja: "嵌合面、テーパー、フランジ仕様に対応。", en: "Custom parts built around mating faces, tapers, and flanges." }, image: "/images/products/product-05.png" },
  { code: "06", title: { zh: "精密套筒", ja: "精密スリーブ", en: "Precision sleeves" }, category: { zh: "套筒加工", ja: "スリーブ加工", en: "Sleeve machining" }, body: { zh: "套筒外徑、內孔與端面加工，適合精密配合。", ja: "外径、内径、端面を精密に加工。", en: "Sleeves with controlled outside diameters, bores, and faces." }, image: "/images/products/product-06.png" },
  { code: "07", title: { zh: "精密軸件", ja: "精密軸部品", en: "Precision shaft parts" }, category: { zh: "軸件加工", ja: "軸部品加工", en: "Shaft machining" }, body: { zh: "多段外徑、軸肩與螺紋端部加工，適用於傳動與旋轉機構。", ja: "多段外径、軸肩、ねじ端部に対応し、伝動・回転機構に適しています。", en: "Multi-diameter shafts, shoulders, and threaded ends for transmission and rotating mechanisms." }, image: ["/images/products/product-07.png", "/images/products/product-08.png"] },
  { code: "08", title: { zh: "主軸", ja: "主軸アセンブリ", en: "Spindle assembly" }, category: { zh: "主軸組件", ja: "主軸アセンブリ", en: "Spindle assembly" }, body: { zh: "長尺寸主軸加工，兼顧外徑、端部螺紋與表面品質。", ja: "長尺主軸の外径、ねじ部、表面品質を管理。", en: "Long spindles with controlled diameters, threads, and surfaces." }, image: "/images/products/product-09.png" },
  { code: "09", title: { zh: "軸承座／套筒", ja: "ベアリングハウジング／スリーブ", en: "Bearing housing / sleeve" }, category: { zh: "座體加工", ja: "ハウジング加工", en: "Housing machining" }, body: { zh: "內孔、外圓與側面結構一次整合，支援精密組裝。", ja: "内径、外径、側面形状を一体加工。", en: "Bores, outside diameters, and side features for precision assembly." }, image: "/images/products/product-10.png" },
  { code: "10", title: { zh: "主軸襯套", ja: "フランジ付き芯軸", en: "Flanged mandrel" }, category: { zh: "主軸組件", ja: "主軸アセンブリ", en: "Spindle assembly" }, body: { zh: "法蘭、軸肩與長軸結構整合，適合高精度配合。", ja: "フランジ、肩部、長尺軸を一体加工。", en: "Flanges, shoulders, and long shafts integrated for precision fit." }, image: "/images/products/product-11.png" },
  { code: "11", title: { zh: "定位氣缸", ja: "油圧精密ハウジング", en: "Hydraulic precision housing" }, category: { zh: "液壓與精密零件", ja: "油圧・精密部品", en: "Hydraulic precision parts" }, body: { zh: "深孔、螺紋與外部安裝面加工，重視密合與尺寸穩定。", ja: "深穴、ねじ、取付面を精密に加工。", en: "Deep bores, threads, and mounting faces for stable sealing." }, image: "/images/products/product-12.png" },
  { code: "12", title: { zh: "靜壓軸承(前＆後)", ja: "真鍮スリーブアセンブリ", en: "Brass sleeve assembly" }, category: { zh: "精密套筒", ja: "精密スリーブ", en: "Precision sleeve" }, body: { zh: "黃銅材質套筒與法蘭結構，依需求完成孔位與端面。", ja: "真鍮スリーブとフランジを仕様に合わせて加工。", en: "Brass sleeves and flanges finished to specified bores and faces." }, image: "/images/products/product-13.png" },
  { code: "13", title: { zh: "精密套筒", ja: "精密スリーブ", en: "Precision sleeve body" }, category: { zh: "套筒加工", ja: "スリーブ加工", en: "Sleeve machining" }, body: { zh: "內孔、外徑與端面精密加工，適合高精度配合。", ja: "内径、外径、端面を精密加工し、高精度な嵌合に対応。", en: "Precision bores, diameters, and faces for close-fitting assemblies." }, image: "/images/products/product-14.png" },
  { code: "14/15", title: { zh: "主軸芯", ja: "ねじ付き主軸／段付きスプライン軸", en: "Threaded spindle / stepped spline shaft" }, category: { zh: "軸件加工", ja: "軸部品加工", en: "Shaft machining" }, body: { zh: "長軸、螺紋、花鍵與階梯外徑整合加工，維持旋轉件的尺寸穩定。", ja: "長尺軸、ねじ、スプライン、段付き外径を一体加工し、回転部品の寸法を安定管理。", en: "Long shafts with threads, splines, and stepped diameters for stable rotating assemblies." }, image: ["/images/products/product-15.png", "/images/products/product-16.png"] },
  { code: "16", title: { zh: "蝸桿軸", ja: "精密ねじ軸", en: "Precision threaded shaft" }, category: { zh: "軸件加工", ja: "軸部品加工", en: "Shaft machining" }, body: { zh: "多段螺紋與外徑加工，適用於精密傳動與定位機構。", ja: "多段ねじと外径を加工し、精密伝動・位置決め機構に対応。", en: "Multi-threaded shafts for precision transmission and positioning mechanisms." }, image: "/images/products/product-17.png" },
  { code: "17", title: { zh: "齒圈組件", ja: "歯車リング", en: "Toothed ring assembly" }, category: { zh: "齒輪零件", ja: "歯車部品", en: "Gear components" }, body: { zh: "大尺寸齒圈與內孔加工，兼顧齒形、孔位與端面精度。", ja: "大径歯車リングの内径、歯形、穴位置、端面精度を管理。", en: "Large toothed rings with controlled bores, tooth profiles, holes, and faces." }, image: "/images/products/product-18.png" },
  { code: "18", title: { zh: "軸承座", ja: "大型フランジリング", en: "Large flange ring" }, category: { zh: "法蘭零件", ja: "フランジ部品", en: "Flange components" }, body: { zh: "大型法蘭環與環形端面加工，支援多孔位精密組裝。", ja: "大型フランジリングと環状端面を加工し、多孔精密組立に対応。", en: "Large flange rings with machined faces and precision bolt patterns." }, image: ["/images/products/product-19.png", "/images/products/product-18-side.png"] },
  { code: "19", title: { zh: "錐形主軸座", ja: "テーパー主軸ハウジング", en: "Tapered spindle housing" }, category: { zh: "座體加工", ja: "ハウジング加工", en: "Housing machining" }, body: { zh: "錐度、法蘭與安裝孔位整合加工，適合主軸座體應用。", ja: "テーパー、フランジ、取付穴を一体加工し、主軸ハウジングに対応。", en: "Tapers, flanges, and mounting holes integrated for spindle housings." }, image: "/images/products/product-20.png" },
  { code: "20", title: { zh: "頂針子", ja: "テーパー主軸部品", en: "Tapered spindle component" }, category: { zh: "主軸組件", ja: "主軸部品", en: "Spindle components" }, body: { zh: "錐端、螺紋與軸身精密加工，重視同心度與表面品質。", ja: "テーパー端、ねじ、軸部を精密加工し、同心度と表面品質を管理。", en: "Tapered ends, threads, and shaft surfaces machined with concentricity in focus." }, image: "/images/products/product-21.png" },
  { code: "21", title: { zh: "大型精密座體", ja: "大型精密ハウジング", en: "Large precision housing" }, category: { zh: "座體加工", ja: "ハウジング加工", en: "Housing machining" }, body: { zh: "大型環形座體與內孔、安裝孔位一次加工完成。", ja: "大型ハウジングの内径と取付穴を一体加工。", en: "Large housings with integrated bores and mounting-hole machining." }, image: "/images/products/product-22.png" },
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
  return <section className="section about-section"><div className="container"><SectionIntro eyebrow={c.aboutEyebrow} title={c.aboutTitle} body={content.overview} /><div className="about-grid"><div className="about-story"><div className="story-card"><span className="story-index">01</span><p>{content.detail}</p></div><a className="outline-link" href={withRoutePath("/quality")}>{c.aboutLink} <span className="button-icon" aria-hidden="true"><FontAwesomeIcon icon={faArrowRight} /></span></a></div><AboutGallery lang={lang} /></div><div className="about-story-copy">{content.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="about-history"><div className="about-history-header"><div><p className="section-eyebrow">{content.historyEyebrow}</p><h2>{content.historyTitle}</h2></div><p className="history-lede">{content.historyBody}</p></div><AboutTimeline lang={lang} /></div></div></section>;
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

function ProductionProcess({ lang }: { lang: "zh" | "ja" | "en" }) {
  const c = copy[lang];
  const rows = [productionProcessSteps.slice(0, 4), productionProcessSteps.slice(4, 8), productionProcessSteps.slice(8)];

  return <div className="production-process" aria-labelledby="production-process-title"><div className="production-process-heading"><div><p className="eyebrow">{c.productionEyebrow}</p><h2 id="production-process-title">{c.productionTitle}</h2></div><div className="production-process-copy"><p className="production-process-subtitle">{c.productionSubtitle}</p><p>{c.productionBody}</p></div></div><div className="production-process-meta"><span>{c.productionCount}</span><i /><span>{c.productionNote}</span></div><div className="production-process-track">{rows.map((row, rowIndex) => <div className="production-process-row" key={`production-row-${rowIndex}`}>{row.map((step, stepIndex) => <div className="production-step-wrap" key={step.number}><article className={`production-step ${step.featured ? "production-step-featured" : ""}`}><span className="production-step-number">{step.number}</span><span className="production-step-title">{text(step.title, lang)}</span>{step.featured && <span className="production-step-badge">{lang === "zh" ? "核心製程" : lang === "ja" ? "中核工程" : "CORE CAPABILITY"}</span>}</article>{stepIndex < row.length - 1 && <span className="production-step-arrow" aria-hidden="true"><FontAwesomeIcon icon={faArrowRight} /></span>}</div>)}</div>)}</div></div>;
}

function ServicesPage() {
  const { lang } = useSiteLang();
  const c = copy[lang];
  return <section className="section dark-section services-section"><div className="container"><div className="section-intro"><p className="eyebrow">{c.serviceEyebrow}</p></div><div className="service-grid">{services.map((service) => <article className={`service-card ${service.image ? "service-card-with-image" : ""}`} key={service.number}><div className="service-top"><span>{service.number}</span><b aria-hidden="true"><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></b></div>{service.image && <div className="service-card-image"><img src={withBasePath(service.image)} alt={text(service.title, lang)} /></div>}<h3>{text(service.title, lang)}</h3><p>{text(service.body, lang)}</p><span className="service-tag">{text(service.tags, lang)}</span></article>)}</div><div className="process-line"><span>DRAWING</span><i /><span>PROCESS</span><i /><span>FINISHED PART</span></div><ProductionProcess lang={lang} /></div></section>;
}

const capacitySpecGroups: Array<{ title: TextValue; items: Array<{ label: TextValue; value: string }> }> = [
  {
    title: { zh: "外徑研磨能力", ja: "外径研削能力", en: "OD grinding capacity" },
    items: [
      { label: { zh: "最大加工外徑", ja: "最大加工外径", en: "Max. grinding diameter" }, value: "Ø350 mm" },
      { label: { zh: "最大加工長度", ja: "最大加工長さ", en: "Max. grinding length" }, value: "1500 mm" },
      { label: { zh: "最大工件重量", ja: "最大ワーク重量", en: "Max. workpiece weight" }, value: "150 kg" },
    ],
  },
  {
    title: { zh: "內徑研磨能力", ja: "内径研削能力", en: "ID grinding capacity" },
    items: [
      { label: { zh: "最小加工內徑", ja: "最小加工内径", en: "Min. grinding diameter" }, value: "Ø8 mm" },
      { label: { zh: "最大加工內徑", ja: "最大加工内径", en: "Max. grinding diameter" }, value: "Ø350 mm" },
      { label: { zh: "最大加工深度", ja: "最大加工深さ", en: "Max. grinding depth" }, value: "470 mm" },
    ],
  },
  {
    title: { zh: "CNC車床加工能力", ja: "CNC旋盤加工能力", en: "CNC turning capacity" },
    items: [{ label: { zh: "加工尺寸", ja: "加工サイズ", en: "Machining envelope" }, value: "Ø550 × 1250L" }],
  },
];

const capacityVideos: Array<{ code: string; title: TextValue; detail: TextValue; src: string; type: string; format: string }> = [
  {
    code: "01",
    title: { zh: "精密加工實況", ja: "精密加工の様子", en: "Precision machining in action" },
    detail: { zh: "加工現場影片紀錄", ja: "加工現場の記録映像", en: "A view from the machining floor" },
    src: "/videos/precision-machining-01.mp4",
    type: "video/mp4",
    format: "MP4",
  },
  {
    code: "02",
    title: { zh: "加工現場細節", ja: "加工現場のディテール", en: "Machining floor detail" },
    detail: { zh: "零件加工過程影片紀錄", ja: "部品加工プロセスの記録映像", en: "A closer look at the machining process" },
    src: "/videos/precision-machining-02.mp4",
    type: "video/mp4",
    format: "MP4",
  },
  {
    code: "03",
    title: { zh: "油壓半自動圓筒磨床（非 CNC）", ja: "油圧半自動円筒研削盤（CNCではありません）", en: "Hydraulic semi-automatic cylindrical grinder" },
    detail: { zh: "本廠設備實際加工影片", ja: "当社設備による実加工映像", en: "In-house equipment in operation — not CNC" },
    src: "/videos/hydraulic-semi-auto-cylindrical-grinder.mp4",
    type: "video/mp4",
    format: "MP4",
  },
];

function CapacityPage() {
  const { lang } = useSiteLang();
  const c = copy[lang];
  return <section className="section capacity-section">
    <div className="container">
      <SectionIntro eyebrow={c.capacityEyebrow} title={c.capacityTitle} body={c.capacityBody} />
      <div className="capacity-spec-section">
        <div className="capacity-spec-heading">
          <div>
            <p className="section-eyebrow">CAPACITY / 03</p>
            <h3>{lang === "zh" ? "加工能力規格" : lang === "ja" ? "加工能力仕様" : "Machining capacity specifications"}</h3>
          </div>
          <p>{lang === "zh" ? "以下規格補充說明長芸可承接的研磨與車床加工範圍。" : lang === "ja" ? "長芸が対応する研削・旋盤加工の範囲を仕様として紹介します。" : "A detailed view of the grinding and turning envelope Chung Uen can support."}</p>
        </div>
        <div className="capacity-spec-grid">
          {capacitySpecGroups.map((group, index) => <article className="capacity-spec-group" key={group.title.en}>
            <div className="capacity-spec-group-header"><span>0{index + 1}</span><h4>{text(group.title, lang)}</h4></div>
            <div className="capacity-spec-list">
              {group.items.map((item) => <div className="capacity-spec-row" key={`${item.label.en}-${item.value}`}><span>{text(item.label, lang)}</span><strong>{item.value}</strong></div>)}
            </div>
          </article>)}
        </div>
      </div>
      <div className="capacity-video-section">
        <div className="capacity-video-heading">
          <div>
            <p className="section-eyebrow">SHOP FLOOR / 03</p>
            <h3>{lang === "zh" ? "加工現場影片" : lang === "ja" ? "加工現場の映像" : "Machining in motion"}</h3>
          </div>
          <p>{lang === "zh" ? "透過現場影片了解本廠的加工設備與實際作業方式。" : lang === "ja" ? "現場映像を通して、当社の加工設備と実際の作業をご覧いただけます。" : "See the equipment and working methods behind our machining capacity."}</p>
        </div>
        <div className="capacity-video-grid">
          {capacityVideos.map((video) => <article className="capacity-video-card" key={video.src}>
            <div className="capacity-video-frame">
              <video controls preload="metadata" playsInline aria-label={text(video.title, lang)}>
                <source src={withBasePath(video.src)} type={video.type} />
                {lang === "zh" ? "您的瀏覽器不支援影片播放。" : lang === "ja" ? "お使いのブラウザは動画再生に対応していません。" : "Your browser does not support video playback."}
              </video>
            </div>
            <div className="capacity-video-card-copy">
              <div className="capacity-video-card-meta"><span>{video.code}</span><span>{video.format}</span></div>
              <h4>{text(video.title, lang)}</h4>
              <p>{text(video.detail, lang)}</p>
              <a className="capacity-video-link" href={withBasePath(video.src)} target="_blank" rel="noreferrer">{lang === "zh" ? "另開影片" : lang === "ja" ? "動画を開く" : "Open video"}<span aria-hidden="true">↗</span></a>
            </div>
          </article>)}
        </div>
      </div>
    </div>
  </section>;
}

const equipmentGalleryImages: Array<{ src: string; label: TextValue }> = [
  { src: "/images/equipment/equipment-01.png", label: { zh: "立式加工設備", ja: "立形加工設備", en: "Vertical machining equipment" } },
  { src: "/images/equipment/equipment-02.png", label: { zh: "圓筒研磨設備", ja: "円筒研削設備", en: "Cylindrical grinding equipment" } },
  { src: "/images/equipment/equipment-03.png", label: { zh: "軸件精密研磨", ja: "軸部品の精密研削", en: "Precision shaft grinding" } },
  { src: "/images/equipment/equipment-04.png", label: { zh: "大型精密研磨設備", ja: "大型精密研削設備", en: "Large precision grinding equipment" } },
  { src: "/images/equipment/equipment-05.png", label: { zh: "CNC 車削設備", ja: "CNC旋盤設備", en: "CNC turning equipment" } },
  { src: "/images/equipment/equipment-06.png", label: { zh: "工廠生產線", ja: "工場の生産ライン", en: "Factory production floor" } },
  { src: "/images/equipment/equipment-07.png", label: { zh: "CNC 研磨設備", ja: "CNC研削設備", en: "CNC grinding equipment" } },
  { src: "/images/equipment/equipment-08.png", label: { zh: "研磨加工現場", ja: "研削加工の現場", en: "Grinding operation" } },
  { src: "/images/equipment/equipment-09.png", label: { zh: "傳統研磨設備", ja: "従来型研削設備", en: "Conventional grinding equipment" } },
  { src: "/images/equipment/equipment-10-vturn-26.png", label: { zh: "CNC 車削 Vturn-26", ja: "CNC旋盤 Vturn-26", en: "CNC turning — Vturn-26" } },
  { src: "/images/equipment/equipment-11-vturn-26-material-staging.png", label: { zh: "CNC 車削與備料區", ja: "CNC旋盤と材料準備エリア", en: "CNC turning and material staging" } },
  { src: "/images/equipment/equipment-12.jpg", label: { zh: "SHIGIYA 研磨設備", ja: "SHIGIYA研削設備", en: "SHIGIYA grinding equipment" } },
];

const equipmentGalleryTitle: TextValue = { zh: "設備現場照片", ja: "設備現場の写真", en: "Inside the equipment floor" };
const equipmentGalleryBody: TextValue = { zh: "從車削、研磨到整廠現場，記錄長芸持續運轉的加工設備與製程環境。", ja: "旋削、研削から工場全景まで、長芸の加工設備と製造現場を紹介します。", en: "A closer look at the turning, grinding, and shop-floor equipment behind every finished part." };

function EquipmentPage() {
  const { lang } = useSiteLang();
  const c = copy[lang];
  return <section className="section"><div className="container"><SectionIntro eyebrow={c.equipmentEyebrow} title={c.equipmentTitle} body={c.equipmentBody} /><div className="equipment-layout"><div className="equipment-placeholder"><img src={withBasePath("/images/about-floor.jpg")} alt="Factory equipment" /><div className="placeholder-caption"><span>CHY / EQUIPMENT</span><small>PRECISION MACHINING FLOOR</small></div></div><div className="equipment-groups">{equipmentGroups.map((group) => <div className="equipment-group" key={group.title.en}><h3>{text(group.title, lang)}</h3>{group.items.map(([name, spec, brand, qty]) => <div className="equipment-row" key={`${name}-${spec}`}><span>{name}</span><span>{spec}</span><span>{brand}</span><strong>{qty}</strong></div>)}</div>)}</div></div><EquipmentGallery lang={lang} /></div></section>;
}

function EquipmentGallery({ lang }: { lang: "zh" | "ja" | "en" }) {
  return <div className="equipment-gallery-section"><div className="equipment-gallery-heading"><div><p className="section-eyebrow">EQUIPMENT / 12</p><h3>{text(equipmentGalleryTitle, lang)}</h3></div><p>{text(equipmentGalleryBody, lang)}</p></div><div className="equipment-gallery" aria-label={lang === "zh" ? "設備介紹照片" : lang === "ja" ? "設備紹介写真" : "Equipment gallery"}>{equipmentGalleryImages.map((image, index) => <figure key={image.src}><div className="equipment-gallery-image"><img src={withBasePath(image.src)} alt={text(image.label, lang)} /></div><figcaption><span>{String(index + 1).padStart(2, "0")}</span><strong>{text(image.label, lang)}</strong></figcaption></figure>)}</div></div>;
}

function ProductImageGallery({ product, lang }: { product: ProductEntry; lang: "zh" | "ja" | "en" }) {
  const images = Array.isArray(product.image) ? product.image : [product.image];
  const [activeIndex, setActiveIndex] = useState(0);
  const title = text(product.title, lang);
  const galleryClassName = ["product-image-gallery", images.length > 1 ? "product-image-gallery-carousel" : "", product.code === "08" ? "product-image-gallery-reserved" : ""].filter(Boolean).join(" ");
  const moveImage = (direction: number) => {
    setActiveIndex((current) => (current + direction + images.length) % images.length);
  };

  return <div className={galleryClassName} aria-label={images.length > 1 ? `${title}照片輪播` : undefined} aria-roledescription={images.length > 1 ? "carousel" : undefined}><div className="product-image-wrap"><img className="product-image" src={withBasePath(images[activeIndex])} alt={`${title}－第 ${activeIndex + 1} 張`} /></div>{images.length > 1 && <div className="product-image-carousel-controls"><button className="product-image-carousel-arrow" type="button" aria-label="上一張產品照片" onClick={() => moveImage(-1)}><FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" /></button><div className="product-image-carousel-dots" role="tablist" aria-label="產品照片選擇">{images.map((image, index) => <button key={image} className={index === activeIndex ? "is-active" : ""} type="button" role="tab" aria-selected={index === activeIndex} aria-label={`顯示第 ${index + 1} 張產品照片`} onClick={() => setActiveIndex(index)} />)}</div><button className="product-image-carousel-arrow" type="button" aria-label="下一張產品照片" onClick={() => moveImage(1)}><FontAwesomeIcon icon={faArrowRight} aria-hidden="true" /></button></div>}</div>;
}

function CasesPage() {
  const { lang } = useSiteLang();
  const c = copy[lang];
  return <section className="section dark-section cases-section"><div className="container"><SectionIntro eyebrow={c.casesEyebrow} title={c.casesTitle} body={c.casesBody} /><div className="product-catalog-heading"><div><span className="product-catalog-kicker">PRODUCT RANGE / 20</span><h3>{text(productCatalogTitle, lang)}</h3></div><p>{text(productCatalogBody, lang)}</p></div><div className="product-grid" aria-label={text(productCatalogTitle, lang)}>{productCatalog.map((product) => <article className="product-card" key={product.code}><ProductImageGallery product={product} lang={lang} /><div className="product-card-body"><span className="product-category">{text(product.category, lang)}</span><h3>{text(product.title, lang)}</h3><p>{text(product.body, lang)}</p></div></article>)}</div></div></section>;
}

const qualityGalleryImages: Array<{ src: string; alt: TextValue }> = [
  { src: "/images/quality/蔡司三次元.png", alt: { zh: "蔡司三次元檢驗設備", ja: "ZEISS三次元検査設備", en: "ZEISS coordinate inspection equipment" } },
  { src: "/images/quality/29173ee9-5159-414a-a7df-b6bddc1e2f16.png", alt: { zh: "蔡司三次元量測設備", ja: "ZEISS三次元測定機", en: "ZEISS coordinate measuring machine" } },
  { src: "/images/quality/quality-gallery-runout-inspection.png", alt: { zh: "齒輪軸偏擺檢驗", ja: "ギアシャフトの振れ検査", en: "Gear shaft runout inspection" } },
  { src: "/images/quality/630059e7-fd1a-49b9-9ed8-922e4b0facef.png", alt: { zh: "外徑分厘卡分類收納", ja: "外側マイクロメータの分類収納", en: "Organized outside micrometer storage" } },
  { src: "/images/quality/69da0811-f53e-4fc7-89eb-0113790d210e.png", alt: { zh: "外徑分厘卡與量具收納櫃", ja: "外側マイクロメータと測定具収納棚", en: "Outside micrometers and measuring tools cabinet" } },
  { src: "/images/quality/quality-gallery-surface-roughness-inspection.png", alt: { zh: "圓筒表面粗糙度檢驗", ja: "円筒表面粗さ検査", en: "Cylindrical surface roughness inspection" } },
  { src: "/images/quality/precision-taper-gauges.png", alt: { zh: "精密錐度量規", ja: "精密テーパーゲージ", en: "Precision taper gauges" } },
  { src: "/images/quality/precision-ring-gauges.png", alt: { zh: "精密環規與尺寸檢驗", ja: "精密リングゲージと寸法検査", en: "Precision ring gauges and dimensional inspection" } },
  { src: "/images/quality/inspection-circular-gauges.png", alt: { zh: "圓盤式精密量規", ja: "円盤型精密ゲージ", en: "Circular precision gauges" } },
  { src: "/images/quality/mahr-surface-roughness-gauge.png", alt: { zh: "Mahr 指針式量表與收納盒", ja: "Mahr ダイヤルゲージと収納ケース", en: "Mahr dial indicator and storage case" } },
  { src: "/images/quality/quality-gallery-outside-micrometer.jpg", alt: { zh: "外徑分厘卡", ja: "外側マイクロメータ", en: "Outside micrometer" } },
  { src: "/images/quality/硬度計.png", alt: { zh: "硬度計設備", ja: "硬さ試験機", en: "Hardness tester" } },
  { src: "/images/quality/052fea87-e39b-44c6-881c-d26d657ece4c.png", alt: { zh: "品質檢驗室與量具收納", ja: "品質検査室と測定具の保管", en: "Quality inspection room and gauge storage" } },
  { src: "/images/quality/inspection-gauge-blocks.png", alt: { zh: "量塊組與木製收納盒", ja: "ブロックゲージセットと木製ケース", en: "Gauge block set in wooden case" } },
  { src: "/images/quality/inspection-dial-caliper-mitutoyo.png", alt: { zh: "Mitutoyo 指針式游標卡尺", ja: "Mitutoyo ダイヤルノギス", en: "Mitutoyo dial caliper" } },
];

const qualityProcessTitle: TextValue = { zh: "品質檢驗流程", ja: "品質検査工程", en: "Quality control process" };
const qualityProcessSteps = [
  { icon: faFileCircleCheck, title: { zh: "圖面審查", ja: "図面確認", en: "Drawing review" }, body: { zh: "確認圖面規格與加工要求", ja: "図面仕様と加工要件を確認", en: "Confirm drawing specifications and machining requirements" } },
  { icon: faListCheck, title: { zh: "製程規劃", ja: "工程計画", en: "Process planning" }, body: { zh: "評估加工可行性與製程安排", ja: "加工可否と工程を評価", en: "Evaluate feasibility and process sequence" } },
  { icon: faGears, title: { zh: "加工與管控", ja: "加工と管理", en: "Processing and control" }, body: { zh: "生產中持續進行尺寸與精度管控", ja: "生産中も寸法と精度を継続管理", en: "Control dimensions and accuracy throughout production" } },
  { icon: faMagnifyingGlassChart, title: { zh: "最終檢驗", ja: "最終検査", en: "Final inspection" }, body: { zh: "使用精密量測設備進行品質確認", ja: "精密測定設備で品質を確認", en: "Verify quality with precision measurement equipment" } },
  { icon: faBoxOpen, title: { zh: "防鏽、包裝與出貨", ja: "防錆・梱包・出荷", en: "Packing and shipment" }, body: { zh: "確保產品在最佳狀態交付客戶", ja: "最適な状態でお客様へ届ける", en: "Deliver every part in its best condition" } },
];

const qualityEquipmentTitle: TextValue = { zh: "檢驗設備與量測工具", ja: "検査設備と測定工具", en: "Inspection equipment" };
const qualityEquipmentBody: TextValue = { zh: "為確保加工精度與品質穩定，長芸配置多項精密量測設備與檢驗工具，依零件尺寸、公差及幾何精度需求進行檢驗。", ja: "加工精度と品質を安定させるため、寸法、公差、幾何精度の要求に合わせて精密測定設備と検査工具を使い分けます。", en: "We match precision measurement equipment and inspection tools to each part's dimensions, tolerances, and geometric requirements." };

const qualityEquipmentCards = [
  { src: "/images/quality/29173ee9-5159-414a-a7df-b6bddc1e2f16.png", kicker: { zh: "ZEISS CONTURA", ja: "ZEISS CONTURA", en: "ZEISS CONTURA" }, title: { zh: "蔡司三次元量床", ja: "ZEISS三次元測定機", en: "ZEISS coordinate measuring machine" }, detail: { zh: "700 × 1000 × 600 mm", ja: "700 × 1000 × 600 mm", en: "700 × 1000 × 600 mm" } },
  { src: "/images/quality/mahr-surface-roughness-gauge.png", kicker: { zh: "MAHR", ja: "MAHR", en: "MAHR" }, title: { zh: "內徑測缸規", ja: "ダイヤルゲージ", en: "Dial indicator" }, detail: { zh: "精密指示量測", ja: "精密な指示測定", en: "Precision indicator measurement" } },
  { src: "/images/quality/equipment-micrometer-cabinet.png", kicker: { zh: "MITUTOYO", ja: "MITUTOYO", en: "MITUTOYO" }, title: { zh: "外徑分厘卡", ja: "外側マイクロメータ", en: "Outside micrometer" }, detail: { zh: "外徑尺寸量測", ja: "外径寸法測定", en: "Outside diameter measurement" } },
];

type QualityEquipmentTable = {
  id: string;
  title: TextValue;
  headers: TextValue[];
  rows: Array<{ cells: TextValue[] }>;
};

const qualityEquipmentTables: QualityEquipmentTable[] = [
  {
    id: "measurement-equipment",
    title: { zh: "量測與檢驗設備", ja: "測定・検査設備", en: "Measurement and inspection equipment" },
    headers: [
      { zh: "設備名稱", ja: "設備名称", en: "Equipment" },
      { zh: "規格", ja: "仕様", en: "Specification" },
      { zh: "廠牌／產地", ja: "メーカー／産地", en: "Brand / origin" },
      { zh: "數量", ja: "数量", en: "Qty." },
    ],
    rows: [
      { cells: [{ zh: "蔡司三次元量床", ja: "ZEISS三次元測定機", en: "ZEISS coordinate measuring machine" }, { zh: "700 × 1000 × 600", ja: "700 × 1000 × 600", en: "700 × 1000 × 600" }, { zh: "德國 ZEISS CONTURA", ja: "ドイツ ZEISS CONTURA", en: "ZEISS CONTURA / Germany" }, { zh: "1", ja: "1", en: "1" }] },
      { cells: [{ zh: "電子式外徑卡規", ja: "電子式外側ノギス", en: "Electronic outside caliper" }, { zh: "Ø0～Ø275", ja: "Ø0～Ø275", en: "Ø0–Ø275" }, { zh: "日本／美國", ja: "日本／米国", en: "Japan / USA" }, { zh: "18", ja: "18", en: "18" }] },
      { cells: [{ zh: "外徑分厘卡", ja: "外側マイクロメータ", en: "Outside micrometer" }, { zh: "0～525", ja: "0～525", en: "0–525" }, { zh: "日本 Mitutoyo", ja: "日本 Mitutoyo", en: "Mitutoyo / Japan" }, { zh: "90", ja: "90", en: "90" }] },
      { cells: [{ zh: "內徑測缸規", ja: "内径シリンダーゲージ", en: "Bore gauge" }, { zh: "10～350", ja: "10～350", en: "10–350" }, { zh: "日本／瑞士／德國", ja: "日本／スイス／ドイツ", en: "Japan / Switzerland / Germany" }, { zh: "50", ja: "50", en: "50" }] },
      { cells: [{ zh: "0級塊規＆陶瓷塊規", ja: "0級ブロックゲージ・セラミックゲージ", en: "Grade 0 and ceramic gauge blocks" }, { zh: "0.1～300", ja: "0.1～300", en: "0.1–300" }, { zh: "日本／美國", ja: "日本／米国", en: "Japan / USA" }, { zh: "2 組", ja: "2 組", en: "2 sets" }] },
      { cells: [{ zh: "花崗岩平台", ja: "花崗岩定盤", en: "Granite surface plate" }, { zh: "600 × 900", ja: "600 × 900", en: "600 × 900" }, { zh: "美國 A級", ja: "米国 A級", en: "Grade A / USA" }, { zh: "1", ja: "1", en: "1" }] },
    ],
  },
  {
    id: "measurement-fixtures",
    title: { zh: "量測治具", ja: "測定治具", en: "Measurement fixtures" },
    headers: [
      { zh: "規具", ja: "ゲージ", en: "Gauge" },
      { zh: "規格", ja: "仕様", en: "Specification" },
      { zh: "數量", ja: "数量", en: "Qty." },
    ],
    rows: [
      { cells: [{ zh: "外徑環規", ja: "外径リングゲージ", en: "Outside ring gauges" }, { zh: "Ø15～Ø300", ja: "Ø15～Ø300", en: "Ø15–Ø300" }, { zh: "80", ja: "80", en: "80" }] },
      { cells: [{ zh: "內徑環規", ja: "内径リングゲージ", en: "Inside ring gauges" }, { zh: "Ø16～Ø220", ja: "Ø16～Ø220", en: "Ø16–Ø220" }, { zh: "120", ja: "120", en: "120" }] },
      { cells: [{ zh: "銑床斜度規及其他", ja: "フライス盤テーパーゲージほか", en: "Milling taper gauges and others" }, { zh: "30#、40#、A50#、MT3#～MT6#、ER11～ER40", ja: "30#、40#、A50#、MT3#～MT6#、ER11～ER40", en: "30#, 40#, A50#, MT3#–MT6#, ER11–ER40" }, { zh: "各 1", ja: "各 1", en: "1 each" }] },
      { cells: [{ zh: "車床鼻規", ja: "旋盤ノーズゲージ", en: "Lathe nose gauges" }, { zh: "A4、A5、A6、A8、A11、A15、A20", ja: "A4、A5、A6、A8、A11、A15、A20", en: "A4, A5, A6, A8, A11, A15, A20" }, { zh: "各 1", ja: "各 1", en: "1 each" }] },
    ],
  },
  {
    id: "surface-hardness",
    title: { zh: "表面與硬度檢測", ja: "表面・硬さ検査", en: "Surface and hardness inspection" },
    headers: [
      { zh: "設備", ja: "設備", en: "Equipment" },
      { zh: "型號", ja: "型式", en: "Model" },
      { zh: "廠牌／形式", ja: "メーカー／形式", en: "Brand / type" },
      { zh: "數量", ja: "数量", en: "Qty." },
    ],
    rows: [
      { cells: [{ zh: "表面粗糙度儀", ja: "表面粗さ測定機", en: "Surface roughness tester" }, { zh: "SJ-210", ja: "SJ-210", en: "SJ-210" }, { zh: "Mitutoyo", ja: "Mitutoyo", en: "Mitutoyo" }, { zh: "1", ja: "1", en: "1" }] },
      { cells: [{ zh: "洛氏硬度計", ja: "ロックウェル硬さ試験機", en: "Rockwell hardness tester" }, { zh: "—", ja: "—", en: "—" }, { zh: "日本製", ja: "日本製", en: "Made in Japan" }, { zh: "1", ja: "1", en: "1" }] },
      { cells: [{ zh: "里氏硬度計", ja: "リーブ硬さ試験機", en: "Leeb hardness tester" }, { zh: "TH120A", ja: "TH120A", en: "TH120A" }, { zh: "—", ja: "—", en: "—" }, { zh: "1", ja: "1", en: "1" }] },
    ],
  },
];

type QualityMetric = {
  id: string;
  label: TextValue;
  count: TextValue;
  image?: string;
  imageAlt?: TextValue;
  icon?: typeof faGaugeHigh;
};

const qualityMetrics: QualityMetric[] = [
  { id: "outside-micrometer", label: { zh: "外徑分厘卡", ja: "外側マイクロメータ", en: "Outside micrometers" }, count: { zh: "90+", ja: "90+", en: "90+" }, image: "/images/quality/outside-micrometer.png", imageAlt: { zh: "外徑分厘卡", ja: "外側マイクロメータ", en: "Outside micrometers" } },
  { id: "inside-bore-gauge", label: { zh: "內徑測缸規", ja: "内径シリンダーゲージ", en: "Bore gauges" }, count: { zh: "50+", ja: "50+", en: "50+" }, icon: faGaugeHigh },
  { id: "inside-outside-ring", label: { zh: "內外徑環規", ja: "内外径リングゲージ", en: "Inside / outside ring gauges" }, count: { zh: "200+", ja: "200+", en: "200+" }, image: "/images/quality/outside-ring-gauge.png", imageAlt: { zh: "內外徑環規", ja: "内外径リングゲージ", en: "Inside / outside ring gauges" } },
];

const qualityGalleryTitle: TextValue = { zh: "現場檢驗及設備照片", ja: "検査現場の写真", en: "Inspection in practice" };
const qualityGalleryBody: TextValue = { zh: "從量具收納到實際量測，讓每一個尺寸都有清楚可追溯的檢驗依據。", ja: "測定具の保管から実際の測定まで、すべての寸法に追跡可能な検査根拠を残します。", en: "From organized gauges to hands-on measurement, every dimension stays backed by a clear inspection record." };

function QualitySectionHeading({ title, english, light = false }: { title: string; english: string; light?: boolean }) {
  return <div className={`quality-section-heading ${light ? "quality-section-heading-light" : ""}`}><div className="quality-section-heading-main"><h2>{title}</h2><i aria-hidden="true" /></div><span>{english}</span></div>;
}

function QualityPage() {
  const { lang } = useSiteLang();
  return <section className="section quality-page">
    <div className="quality-process-band">
      <div className="container">
        <QualitySectionHeading title={text(qualityProcessTitle, lang)} english="QUALITY CONTROL PROCESS" />
        <div className="quality-process-grid" aria-label={text(qualityProcessTitle, lang)}>
          {qualityProcessSteps.map((step, index) => <div className="quality-process-item" key={step.title.en}>
            <article className="quality-process-card">
              <span className="quality-process-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="quality-process-icon" aria-hidden="true"><FontAwesomeIcon icon={step.icon} /></span>
              <h3>{text(step.title, lang)}</h3>
              <p>{text(step.body, lang)}</p>
            </article>
            {index < qualityProcessSteps.length - 1 && <span className="quality-process-arrow" aria-hidden="true"><FontAwesomeIcon icon={faArrowRight} /></span>}
          </div>)}
        </div>
      </div>
    </div>
    <div className="quality-equipment-band">
      <div className="container">
        <QualitySectionHeading title={text(qualityEquipmentTitle, lang)} english="INSPECTION EQUIPMENT" />
        <p className="quality-equipment-intro">{text(qualityEquipmentBody, lang)}</p>
        <div className="quality-equipment-layout">
          <div className="quality-equipment-main">
            <div className="quality-equipment-cards">
              {qualityEquipmentCards.map((card) => <article className="quality-equipment-card" key={card.src}>
                <img src={withBasePath(card.src)} alt={text(card.title, lang)} />
                <div className="quality-equipment-card-copy"><span>{text(card.kicker, lang)}</span><h3>{text(card.title, lang)}</h3><p>{text(card.detail, lang)}</p></div>
              </article>)}
            </div>
            <div className="quality-metrics" aria-label={lang === "zh" ? "主要量測項目" : lang === "ja" ? "主な測定項目" : "Primary measurement categories"}>
              {qualityMetrics.map((metric) => <div className="quality-metric" key={metric.id}>
                {metric.icon ? <span className="quality-metric-image quality-metric-fa-icon"><FontAwesomeIcon icon={metric.icon} aria-hidden="true" /></span> : metric.image && metric.imageAlt ? <span className="quality-metric-image"><img src={withBasePath(metric.image)} alt={text(metric.imageAlt, lang)} /></span> : null}
                <span className="quality-metric-copy">{metric.count && <strong className="quality-metric-count">{text(metric.count, lang)}</strong>}<span className="quality-metric-label">{text(metric.label, lang)}</span></span>
              </div>)}
            </div>
          </div>
          <div className="quality-equipment-table-wrap">
            <div className="quality-equipment-tables">
              {qualityEquipmentTables.map((table) => <section className="quality-equipment-table-group" key={table.id}>
                <h3>{text(table.title, lang)}</h3>
                <table className="quality-equipment-table" aria-label={text(table.title, lang)}>
                  <thead><tr>{table.headers.map((header) => <th scope="col" key={header.en}>{text(header, lang)}</th>)}</tr></thead>
                  <tbody>{table.rows.map((row, rowIndex) => <tr key={`${table.id}-${rowIndex}`}>{row.cells.map((cell, cellIndex) => cellIndex === row.cells.length - 1 ? <td className="quality-equipment-quantity" key={`${table.id}-${rowIndex}-${cellIndex}`}>{text(cell, lang)}</td> : <td key={`${table.id}-${rowIndex}-${cellIndex}`}>{text(cell, lang)}</td>)}</tr>)}</tbody>
                </table>
              </section>)}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="quality-gallery-band">
      <div className="container">
        <QualitySectionHeading title={text(qualityGalleryTitle, lang)} english="QUALITY / 15" light />
        <p className="quality-gallery-intro">{text(qualityGalleryBody, lang)}</p>
        <div className="quality-gallery" aria-label={lang === "zh" ? "品質檢驗照片" : lang === "ja" ? "品質検査写真" : "Quality inspection photos"}>{qualityGalleryImages.map((image) => <figure key={image.src}><img src={withBasePath(image.src)} alt={text(image.alt, lang)} /></figure>)}</div>
      </div>
    </div>
  </section>;
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
  return <section className="section dark-section"><div className="container"><SectionIntro eyebrow={c.contactEyebrow} title={c.contactTitle} body={c.contactBody} /><div className="contact-layout"><aside className="contact-card"><h3>長芸有限公司</h3><div className="contact-details"><p className="contact-detail"><FontAwesomeIcon icon={faUser} aria-hidden="true" /><span>聯絡人:  陳總經理</span></p><a className="contact-detail" href="tel:0426763118"><FontAwesomeIcon icon={faPhone} aria-hidden="true" /><span>04-26763118</span></a><p className="contact-detail"><FontAwesomeIcon icon={faFax} aria-hidden="true" /><span>04-26763117</span></p><a className="contact-detail" href="mailto:charngyun0815@gmail.com"><FontAwesomeIcon icon={faEnvelope} aria-hidden="true" /><span>charngyun0815@gmail.com</span></a><p className="contact-detail"><FontAwesomeIcon icon={faLocationDot} aria-hidden="true" /><span>台中市大甲區重義一路151號</span></p></div></aside><form className="rfq-form" onSubmit={handleSubmit}><div className="form-heading"><span>RFQ / 01</span><strong>{lang === "zh" ? "聯絡表單" : lang === "ja" ? "お問い合わせフォーム" : "Contact form"}</strong></div><div className="form-grid">
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
