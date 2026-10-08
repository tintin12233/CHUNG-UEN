"use client";

import { useEffect, useState } from "react";
import { withBasePath } from "@/app/components/site-paths";

type PreloaderPhase = "visible" | "exiting";

const PRELOADER_SESSION_KEY = "site-preloader-played";
const PRELOADER_EXIT_DELAY = 1660;
const PRELOADER_REMOVE_DELAY = 2200;

export default function SitePreloader() {
  const [phase, setPhase] = useState<PreloaderPhase>("visible");
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    let hasPlayed = false;

    try {
      hasPlayed = window.sessionStorage.getItem(PRELOADER_SESSION_KEY) === "true";
    } catch {
      // Keep the intro available if storage is blocked by the browser.
    }

    if (hasPlayed) {
      root.classList.remove("site-preloader-active");
      body.classList.remove("site-preloader-active");
      const skipTimer = window.setTimeout(() => setMounted(false), 0);

      return () => {
        window.clearTimeout(skipTimer);
        root.classList.remove("site-preloader-active");
        body.classList.remove("site-preloader-active");
      };
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const exitDelay = reducedMotion ? 260 : PRELOADER_EXIT_DELAY;
    const removeDelay = reducedMotion ? 460 : PRELOADER_REMOVE_DELAY;

    root.classList.add("site-preloader-active");
    body.classList.add("site-preloader-active");

    const exitTimer = window.setTimeout(() => setPhase("exiting"), exitDelay);
    const removeTimer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(PRELOADER_SESSION_KEY, "true");
      } catch {
        // The animation can still complete when storage is unavailable.
      }

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
