"use client";

import { FormEvent, useState } from "react";
import {
  applications,
  capacityCards,
  copy,
  equipmentGroups,
  Lang,
  SectionIntro,
  services,
  text,
  timeline,
  TextValue,
} from "@/app/page";
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

const cases = [
  { code: "A1", title: { zh: "工作母機主軸", ja: "工作機械主軸", en: "Machine-tool spindle" }, meta: "CNC turning + heat treatment + ID / OD grinding" },
  { code: "A2", title: { zh: "精密套筒", ja: "精密スリーブ", en: "Precision sleeve" }, meta: "ID grinding + final inspection" },
  { code: "A3", title: { zh: "客製化軸類零件", ja: "カスタムシャフト", en: "Custom shaft component" }, meta: "Drawing-based integrated processing" },
];

const workflow: [string, TextValue][] = [
  ["01", { zh: "圖面確認", ja: "図面確認", en: "Drawing review" }],
  ["02", { zh: "製程評估", ja: "工程評価", en: "Process planning" }],
  ["03", { zh: "加工與協力管理", ja: "加工・協力管理", en: "Processing & partner control" }],
  ["04", { zh: "最終品質檢驗", ja: "最終品質検査", en: "Final inspection" }],
  ["05", { zh: "防鏽、包裝、出貨", ja: "防錆・梱包・出荷", en: "Rust protection, packing & shipment" }],
];

function AboutPage() {
  const { lang } = useSiteLang();
  const c = copy[lang];
  return <section className="section about-section"><div className="container"><SectionIntro eyebrow={c.aboutEyebrow} title={c.aboutTitle} body={c.aboutBody} /><div className="about-grid"><div className="about-story"><div className="story-card"><span className="story-index">01</span><p>{lang === "zh" ? "從一台磨床開始，走過不同階段的製程升級。" : lang === "ja" ? "一台の研削盤から始まり、工程を進化させてきました。" : "From one grinding machine to an evolving production system."}</p></div><div className="timeline">{timeline.map(([year, label]) => <div className="timeline-row" key={year}><strong>{year}</strong><span>{text(label, lang)}</span></div>)}</div><a className="text-link dark-link" href="/quality">{c.aboutLink}<span>↗</span></a></div><div className="about-gallery"><figure className="photo photo-exterior"><img src="/images/about-exterior.jpg" alt="長芸有限公司公司外觀" /><figcaption><span>CHY / 01</span><span>{lang === "zh" ? "公司外觀" : lang === "ja" ? "社屋" : "Company exterior"}</span></figcaption></figure><figure className="photo photo-factory"><img src="/images/about-factory.jpg" alt="長芸工廠內部全景" /><figcaption><span>CHY / 02</span><span>{lang === "zh" ? "廠內環境" : lang === "ja" ? "工場内" : "Factory floor"}</span></figcaption></figure><figure className="photo photo-floor"><img src="/images/about-floor.jpg" alt="長芸加工現場" /><figcaption><span>CHY / 03</span><span>{lang === "zh" ? "加工現場" : lang === "ja" ? "加工現場" : "Machining floor"}</span></figcaption></figure></div></div></div></section>;
}

function ServicesPage() {
  const { lang } = useSiteLang();
  const c = copy[lang];
  return <section className="section dark-section services-section"><div className="container"><SectionIntro eyebrow={c.serviceEyebrow} title={c.serviceTitle} body={c.serviceBody} /><div className="service-grid">{services.map((service) => <article className="service-card" key={service.number}><div className="service-top"><span>{service.number}</span><i>↗</i></div><h3>{text(service.title, lang)}</h3><p>{text(service.body, lang)}</p><div className="service-tag">{text(service.tags, lang)}</div></article>)}</div><div className="process-line"><span>{lang === "zh" ? "圖面" : lang === "ja" ? "図面" : "Drawing"}</span><i /><span>{lang === "zh" ? "製程" : lang === "ja" ? "工程" : "Process"}</span><i /><span>{lang === "zh" ? "成品" : lang === "ja" ? "完成品" : "Finished part"}</span></div></div></section>;
}

function CapacityPage() {
  const { lang } = useSiteLang();
  const c = copy[lang];
  return <section className="section capacity-section"><div className="container"><SectionIntro eyebrow={c.capacityEyebrow} title={c.capacityTitle} body={c.capacityBody} /><div className="capacity-layout"><div className="capacity-cards">{capacityCards.map((card, index) => <article className={`capacity-card ${index === 0 ? "capacity-card-featured" : ""}`} key={card.value}><div className="capacity-card-head"><span>0{index + 1}</span><span>{text(card.label, lang)}</span></div><strong>{card.value}</strong><small>{text(card.note, lang)}</small></article>)}</div><div className="capacity-notes"><div className="capacity-note"><span>OD</span><p>{lang === "zh" ? "外徑研磨｜適用主軸、軸類與精密圓筒零件" : lang === "ja" ? "外径研削｜主軸・シャフト・精密円筒部品" : "OD grinding｜spindles, shafts, and precision cylindrical parts"}</p></div><div className="capacity-note"><span>ID</span><p>{lang === "zh" ? "內徑研磨｜適用套筒、精密孔徑與內孔零件" : lang === "ja" ? "内径研削｜スリーブ・精密穴・内孔部品" : "ID grinding｜sleeves, precision bores, and internal features"}</p></div><div className="capacity-note"><span>QA</span><p>{lang === "zh" ? "檢驗工具｜Mahr 表面粗糙儀、TESA 三次元量床" : lang === "ja" ? "検査機器｜Mahr粗さ計・TESA三次元測定機" : "Inspection｜Mahr surface roughness and TESA CMM"}</p></div></div></div></div></section>;
}

function EquipmentPage() {
  const { lang } = useSiteLang();
  const c = copy[lang];
  return <section className="section equipment-section"><div className="container"><SectionIntro eyebrow={c.equipmentEyebrow} title={c.equipmentTitle} body={c.equipmentBody} /><div className="equipment-topline"><span>{lang === "zh" ? "設備表總覽" : lang === "ja" ? "設備一覧" : "Equipment overview"}</span><span>{lang === "zh" ? "照片待補" : lang === "ja" ? "写真準備中" : "Photos pending"}</span></div><div className="equipment-layout"><div className="equipment-placeholder"><div className="placeholder-screen"><span>PHOTO / TO BE UPDATED</span><b>CHY</b><i /></div><div className="placeholder-caption"><span>{lang === "zh" ? "設備單機照片暫存版位" : lang === "ja" ? "設備写真の仮表示" : "Temporary machine-photo panel"}</span><small>CHY / EQUIPMENT</small></div></div><div className="equipment-groups">{equipmentGroups.map((group) => <div className="equipment-group" key={group.title.en}><h3>{text(group.title, lang)}</h3><div className="equipment-list">{group.items.map(([name, spec, brand, qty]) => <div className="equipment-row" key={`${name}-${spec}`}><span className="equipment-name">{name}</span><span>{spec}</span><span>{brand}</span><strong>{qty}</strong></div>)}</div></div>)}</div></div></div></section>;
}

function CasesPage() {
  const { lang } = useSiteLang();
  const c = copy[lang];
  return <section className="section case-section dark-section"><div className="container"><SectionIntro eyebrow={c.casesEyebrow} title={c.casesTitle} body={c.casesBody} /><div className="case-grid">{cases.map((item) => <article className="case-card" key={item.code}><div className="case-placeholder"><span>{item.code}</span><div className="case-crosshair" /><small>{lang === "zh" ? "案例照片待補" : lang === "ja" ? "事例写真準備中" : "Case image pending"}</small></div><div className="case-body"><span className="case-code">{item.code} / TRACK RECORD</span><h3>{text(item.title, lang)}</h3><p>{item.meta}</p></div></article>)}</div></div></section>;
}

function QualityPage() {
  const { lang } = useSiteLang();
  const c = copy[lang];
  return <section className="section quality-section"><div className="container"><SectionIntro eyebrow={c.qualityEyebrow} title={c.qualityTitle} body={c.qualityBody} /><div className="quality-layout"><div className="workflow">{workflow.map(([number, label]) => <div className="workflow-step" key={number}><span>{number}</span><strong>{text(label, lang)}</strong><i>→</i></div>)}</div><div className="quality-points"><div><span>01</span><h3>{lang === "zh" ? "多年精密研磨經驗" : lang === "ja" ? "長年の精密研削経験" : "Years of grinding experience"}</h3><p>1998—</p></div><div><span>02</span><h3>{lang === "zh" ? "核心製程由現場掌握" : lang === "ja" ? "核心工程を現場で管理" : "Core processes kept close"}</h3><p>{lang === "zh" ? "內外徑研磨" : lang === "ja" ? "内外径研削" : "ID / OD grinding"}</p></div><div><span>03</span><h3>{lang === "zh" ? "彈性協力加工體系" : lang === "ja" ? "柔軟な協力加工体制" : "Flexible partner network"}</h3><p>30+ partners</p></div></div></div></div></section>;
}

function IndustriesPage() {
  const { lang } = useSiteLang();
  const c = copy[lang];
  return <section className="section industries-section"><div className="container"><SectionIntro eyebrow={c.industryEyebrow} title={c.industryTitle} body={c.industryBody} /><div className="industry-grid">{applications.map((item) => <article className="industry-card" key={item.code}><span>{item.code}</span><h3>{text(item.title, lang)}</h3><p>{text(item.body, lang)}</p><i>↗</i></article>)}</div></div></section>;
}

function ContactPage() {
  const { lang } = useSiteLang();
  const c = copy[lang];
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
  return <section className="section contact-section dark-section"><div className="container"><SectionIntro eyebrow={c.contactEyebrow} title={c.contactTitle} body={c.contactBody} /><div className="contact-layout"><aside className="contact-card"><div className="contact-card-top"><span className="brand-mark">Chy</span><span>CHY / 08</span></div><h3>長芸有限公司</h3><p>{c.contactPerson}</p><div className="contact-details"><div><span>PHONE</span><a href="tel:0426763118">04-26763118</a></div><div><span>ADDRESS</span><p>43743 台中市大甲區義和里重義一路151號</p></div></div><div className="contact-note">{lang === "zh" ? "工作母機・精密零件・CNC 研磨與車床加工" : lang === "ja" ? "工作機械・精密部品・CNC研削・旋盤加工" : "Machine tools · Precision parts · CNC grinding & turning"}</div></aside><form className="rfq-form" onSubmit={handleSubmit}><div className="form-heading"><span>RFQ / 01</span><strong>{lang === "zh" ? "詢價資訊" : lang === "ja" ? "見積情報" : "Inquiry details"}</strong></div><div className="form-grid"><label><span>{lang === "zh" ? "公司名稱" : lang === "ja" ? "会社名" : "Company"}</span><input type="text" /></label><label><span>{lang === "zh" ? "聯絡人" : lang === "ja" ? "ご担当者" : "Contact person"}</span><input type="text" /></label><label><span>Email</span><input type="email" /></label><label><span>{lang === "zh" ? "電話" : lang === "ja" ? "電話番号" : "Phone"}</span><input type="tel" /></label><label className="form-wide"><span>{lang === "zh" ? "品名／加工需求" : lang === "ja" ? "品名／加工内容" : "Part / process"}</span><input type="text" /></label><label className="form-wide"><span>{lang === "zh" ? "材質、數量、尺寸、精度與交期" : lang === "ja" ? "材質・数量・寸法・精度・納期" : "Material, quantity, dimensions, tolerance & lead time"}</span><textarea rows={4} /></label><label className="file-field form-wide"><span>{lang === "zh" ? "上傳圖面（示意）" : lang === "ja" ? "図面アップロード（デモ）" : "Upload drawing (demo)"}</span><input type="file" accept=".pdf,.dxf,.dwg,.step,.stp,.jpg,.png" /><small>PDF / DXF / DWG / STEP / JPG / PNG</small></label></div><div className="form-footer"><p>{submitted ? c.formDone : c.formNotice}</p><button className="button button-primary" type="submit">{c.formButton}<span>↗</span></button></div></form></div></div></section>;
}

export function SectionPage({ kind }: { kind: SectionKind }) {
  const { lang } = useSiteLang();
  const c = copy[lang];
  const meta = pageMeta[kind];
  const page = <PageHero index={meta.index} eyebrow={c[meta.eyebrow]} title={c[meta.title]} body={c[meta.body]} />;
  const content = { about: <AboutPage />, services: <ServicesPage />, capacity: <CapacityPage />, equipment: <EquipmentPage />, cases: <CasesPage />, quality: <QualityPage />, industries: <IndustriesPage />, contact: <ContactPage /> }[kind];
  return <>{page}{content}</>;
}
