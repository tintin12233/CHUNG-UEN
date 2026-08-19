"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
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

const caseImages: Record<string, string> = {
  "01": "/images/product-case-01.png",
};

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
  return <section className="section dark-section"><div className="container"><SectionIntro eyebrow={c.casesEyebrow} title={c.casesTitle} body={c.casesBody} /><div className="case-grid">{applications.slice(0, 3).map((item) => { const image = caseImages[item.code]; return <article className="case-card" key={item.code}><div className={`case-placeholder ${image ? "case-placeholder-image" : ""}`}>{image ? <img src={image} alt={text(item.title, lang)} /> : <b>CHY</b>}<span>{item.code}</span></div><div className="case-body"><span className="case-code">{item.code} / TRACK RECORD</span><h3>{text(item.title, lang)}</h3><p>{text(item.body, lang)}</p></div></article>; })}</div></div></section>;
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
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
  return <section className="section dark-section"><div className="container"><SectionIntro eyebrow={c.contactEyebrow} title={c.contactTitle} body={c.contactBody} /><div className="contact-layout"><aside className="contact-card"><span className="contact-card-label">CHY / 08</span><h3>長芸有限公司</h3><p>{c.contactPerson}</p><a href="tel:0426763118">04-26763118</a><span>台中市大里區國光路一段 51 號</span></aside><form className="rfq-form" onSubmit={handleSubmit}><div className="form-heading"><span>RFQ / 01</span><strong>詢問資料</strong></div><div className="form-grid"><label><span>公司名稱</span><input required type="text" /></label><label><span>聯絡人</span><input required type="text" /></label><label><span>Email</span><input required type="email" /></label><label><span>電話</span><input type="tel" /></label><label className="form-wide"><span>零件與加工需求</span><textarea required rows={5} /></label></div><div className="form-footer"><p>{submitted ? c.formDone : c.formNotice}</p><button className="hero-button" type="submit">{c.formButton} <span className="button-icon" aria-hidden="true"><FontAwesomeIcon icon={faArrowRight} /></span></button></div></form></div></div></section>;
}

export function SectionPage({ kind }: { kind: SectionKind }) {
  const { lang } = useSiteLang();
  const meta = pageMeta[kind];
  const content = { about: <AboutPage />, services: <ServicesPage />, capacity: <CapacityPage />, equipment: <EquipmentPage />, cases: <CasesPage />, quality: <QualityPage />, industries: <IndustriesPage />, contact: <ContactPage /> }[kind];
  return <><PageHero index={meta.index} eyebrow={copy[lang][meta.eyebrow]} title={copy[lang][meta.title]} body={copy[lang][meta.body]} />{content}</>;
}
