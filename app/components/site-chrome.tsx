"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { copy, Lang, navItems, text } from "@/app/page";

const languages: { key: Lang; label: string }[] = [
  { key: "zh", label: "繁中" },
  { key: "ja", label: "日本語" },
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
  const [menuOpen, setMenuOpen] = useState(false);
  const c = copy[lang];

  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="container utility-inner">
          <span>{c.utility}</span>
          <span className="utility-meta">台中・大甲　/　04-26763118</span>
        </div>
      </div>
      <div className="nav-wrap">
        <div className="container nav-inner">
          <a className="brand" href="/" aria-label="長芸有限公司 home">
            <span className="brand-mark">Chy</span>
            <span className="brand-copy"><strong>長芸</strong><small>CHUNG YUEN CO., LTD.</small></span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item.id} className={pathname === item.href ? "is-active" : ""} href={item.href}>
                {text(item.label, lang)}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <div className="language-switcher" aria-label="Language selector">
              {languages.map((item) => (
                <button key={item.key} className={lang === item.key ? "is-active" : ""} type="button" aria-pressed={lang === item.key} onClick={() => setLang(item.key)}>
                  {item.label}
                </button>
              ))}
            </div>
            <a className="nav-cta" href="/contact">
              {lang === "zh" ? "開始詢價" : lang === "ja" ? "見積相談" : "Request a quote"}<span>↗</span>
            </a>
            <button className="mobile-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
              <span>{menuOpen ? "CLOSE" : "MENU"}</span><b>{menuOpen ? "×" : "☰"}</b>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
            <div className="container">
              <a href="/" onClick={() => setMenuOpen(false)}>{lang === "zh" ? "首頁" : lang === "ja" ? "ホーム" : "Home"}</a>
              {navItems.map((item) => <a key={item.id} className={pathname === item.href ? "is-active" : ""} href={item.href} onClick={() => setMenuOpen(false)}>{text(item.label, lang)}</a>)}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

function SiteFooter() {
  const { lang } = useSiteLang();
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <a className="brand" href="/"><span className="brand-mark">Chy</span><span className="brand-copy"><strong>長芸</strong><small>CHUNG YUEN CO., LTD.</small></span></a>
          <p>{lang === "zh" ? "用研磨的專注，交付可被信任的精度。" : lang === "ja" ? "研削への集中で、信頼される精度を届けます。" : "Focused grinding. Dependable precision."}</p>
        </div>
        <div className="footer-links">
          <span>{lang === "zh" ? "快速導覽" : lang === "ja" ? "クイックリンク" : "Quick links"}</span>
          <a href="/">{lang === "zh" ? "首頁" : lang === "ja" ? "ホーム" : "Home"}</a>
          {navItems.slice(0, 4).map((item) => <a key={item.id} href={item.href}>{text(item.label, lang)}</a>)}
        </div>
        <div className="footer-contact">
          <span>{lang === "zh" ? "聯絡長芸" : lang === "ja" ? "お問い合わせ" : "Contact Chy"}</span>
          <a href="tel:0426763118">04-26763118</a>
          <p>43743 台中市大甲區義和里重義一路151號</p>
        </div>
      </div>
      <div className="container footer-bottom"><span>© 2026 CHYUNG YUEN CO., LTD. ALL RIGHTS RESERVED.</span><span>長芸有限公司 / 金芸精密工業有限公司</span></div>
    </footer>
  );
}

export function SitePage({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("zh");
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <div className="site-shell"><SiteHeader /><main>{children}</main><SiteFooter /></div>
    </LanguageContext.Provider>
  );
}

export function PageHero({ index, eyebrow, title, body }: { index: string; eyebrow: string; title: string; body: string }) {
  return (
    <section className="page-hero dark-section">
      <div className="container page-hero-grid">
        <div className="page-hero-content">
          <p className="eyebrow hero-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="hero-lede">{body}</p>
          <div className="page-hero-meta"><span>CHY / {index}</span><i /><span>PRECISION INDUSTRY</span></div>
        </div>
        <div className="page-hero-visual" aria-hidden="true">
          <div className="blueprint-grid" />
          <div className="page-hero-plate"><span>CHY / {index}</span><strong>± μ</strong><i /><small>GRINDING / TURNING / INSPECTION</small></div>
          <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
          <div className="hero-stamp">CHY<span>EST. 1998</span></div>
        </div>
      </div>
    </section>
  );
}
