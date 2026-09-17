"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faEnvelope, faFax, faLocationDot, faPhone, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ContactCta, Lang, navItems, text } from "@/app/page";
import { withBasePath, withRoutePath } from "@/app/components/site-paths";

const languages: { key: Lang; label: string }[] = [
  { key: "zh", label: "中" },
  { key: "ja", label: "日" },
  { key: "en", label: "EN" },
];

const LanguageContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void } | null>(null);

export function useSiteLang() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useSiteLang must be used inside SitePage");
  return context;
}

function SiteHeader() {
  const { lang, setLang } = useSiteLang();
  const pathname = usePathname();
  const normalizedPathname = pathname?.replace(/\/$/, "") || "/";
  const [menuOpen, setMenuOpen] = useState(false);

  return <header className="site-header subpage-header"><div className="container nav-inner"><Link className="brand" href={withRoutePath("/")}><span className="brand-mark brand-mark-original">Chy</span><span className="brand-copy"><strong>長芸有限公司</strong><small>CHUNG UEN CO., LTD.</small></span></Link><nav className="desktop-nav" aria-label="Main navigation">{navItems.map((item) => <a key={item.id} className={normalizedPathname === item.href ? "is-active" : ""} href={withRoutePath(item.href)}>{text(item.label, lang)}</a>)}</nav><div className="header-tools"><div className="language-switcher" aria-label="Language selector">{languages.map((item) => <button key={item.key} type="button" className={lang === item.key ? "is-active" : ""} aria-pressed={lang === item.key} onClick={() => setLang(item.key)}>{item.label}</button>)}</div><button className="mobile-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-mobile-navigation" onClick={() => setMenuOpen((open) => !open)}><span>{menuOpen ? "CLOSE" : "MENU"}</span><b><FontAwesomeIcon icon={menuOpen ? faXmark : faBars} aria-hidden="true" /></b></button></div></div>{menuOpen && <nav id="site-mobile-navigation" className="mobile-nav" aria-label="Mobile navigation"><div className="container">{navItems.map((item) => <a key={item.id} className={normalizedPathname === item.href ? "is-active" : ""} href={withRoutePath(item.href)} onClick={() => setMenuOpen(false)}>{text(item.label, lang)}</a>)}</div></nav>}</header>;
}

function SiteFooter() {
  const { lang } = useSiteLang();
  return <footer className="site-footer"><div className="container footer-main"><div className="footer-company"><h2 className="footer-company-title">長芸有限公司</h2><p>{lang === "zh" ? "專注於工作母機主軸、套筒及精密機械零組件之製造加工，提供穩定可靠的精密零件服務。" : lang === "ja" ? "工作機械の主軸、スリーブ、精密機械部品の加工に取り組んでいます。" : "Precision machining for machine-tool spindles, sleeves, and mechanical components."}</p></div><div className="footer-contact-section"><h6 className="title"><Link href={withRoutePath("/contact")}>{lang === "zh" ? "聯絡我們" : lang === "ja" ? "お問い合わせ" : "Contact us"}</Link></h6><p><a href="tel:0426763118"><FontAwesomeIcon className="footer-contact-icon" icon={faPhone} aria-hidden="true" />04-26763118</a></p><p><FontAwesomeIcon className="footer-contact-icon" icon={faFax} aria-hidden="true" />04-26763117</p></div><div className="footer-contact footer-address-section"><p><a href="mailto:chunguen851996@gmail.com"><FontAwesomeIcon className="footer-contact-icon" icon={faEnvelope} aria-hidden="true" />chunguen851996@gmail.com</a></p><p className="address-indent"><FontAwesomeIcon className="footer-contact-icon" icon={faLocationDot} aria-hidden="true" /><span>台中市大甲區重義一路151號</span></p></div></div><div className="container footer-bottom"><span>© 2026 CHUNG UEN CO., LTD.</span><span>PRECISION GRINDING / TURNING / INSPECTION</span></div></footer>;
}

export function SitePage({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("zh");
  return <LanguageContext.Provider value={{ lang, setLang }}><div className="site-shell"><SiteHeader /><main>{children}</main><ContactCta lang={lang} /><SiteFooter /></div></LanguageContext.Provider>;
}

export function PageHero({ index, eyebrow, title, body }: { index: string; eyebrow: string; title: string; body: string }) {
  return <section className="page-hero" data-page-index={index}><div className="page-hero-media" aria-hidden="true"><img src={withBasePath("/images/chy-page-hero.png")} alt="" /></div><div className="page-hero-scrim" aria-hidden="true" /><div className="container page-hero-grid"><div className="page-hero-content"><p className="eyebrow hero-eyebrow">{eyebrow}</p><h1>{title}</h1><p className="hero-lede">{body}</p><div className="page-hero-meta"><span>CHY / {index}</span><i /><span>PRECISION INDUSTRY</span></div></div></div></section>;
}
