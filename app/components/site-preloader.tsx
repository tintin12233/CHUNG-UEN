"use client";

import { useEffect, useState } from "react";
import { withBasePath } from "@/app/components/site-paths";

type PreloaderPhase = "visible" | "exiting";

export default function SitePreloader() {
  const [phase, setPhase] = useState<PreloaderPhase>("visible");
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const exitDelay = reducedMotion ? 260 : 1450;
    const removeDelay = reducedMotion ? 460 : 2040;

    root.classList.add("site-preloader-active");
    body.classList.add("site-preloader-active");

    const exitTimer = window.setTimeout(() => setPhase("exiting"), exitDelay);
    const removeTimer = window.setTimeout(() => {
      setMounted(false);
      root.classList.remove("site-preloader-active");
      body.classList.remove("site-preloader-active");
      body.classList.add("site-preloader-complete");
    }, removeDelay);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
      root.classList.remove("site-preloader-active");
      body.classList.remove("site-preloader-active");
    };
  }, []);

  if (!mounted) return null;

  return <div id="site-preloader" className={`site-preloader ${phase === "exiting" ? "is-exiting" : ""}`} aria-hidden="true">
    <div className="site-preloader-content">
      <div className="site-preloader-brand">
        <img className="site-preloader-logo" src={withBasePath("/images/chy-logo.png")} alt="" />
        <strong className="site-preloader-name">長芸有限公司</strong>
        <span className="site-preloader-company">CHUNG UEN CO., LTD.</span>
        <span className="site-preloader-line" />
      </div>
    </div>
  </div>;
}
