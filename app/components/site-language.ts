"use client";

import { useCallback, useSyncExternalStore } from "react";

export type Lang = "zh" | "ja" | "en";

export const SITE_LANGUAGE_STORAGE_KEY = "site-language";
const SITE_LANGUAGE_CHANGE_EVENT = "site-language-change";
let fallbackLang: Lang = "zh";

function isLang(value: string | null): value is Lang {
  return value === "zh" || value === "ja" || value === "en";
}

function readStoredLang(): Lang {
  try {
    const storedLang = window.localStorage.getItem(SITE_LANGUAGE_STORAGE_KEY);
    return isLang(storedLang) ? storedLang : "zh";
  } catch {
    return fallbackLang;
  }
}

function subscribeToLangChanges(onChange: () => void) {
  const syncLanguage = () => {
    document.documentElement.dataset.siteLanguage = readStoredLang();
    onChange();
  };

  window.addEventListener("storage", syncLanguage);
  window.addEventListener(SITE_LANGUAGE_CHANGE_EVENT, syncLanguage);
  return () => {
    window.removeEventListener("storage", syncLanguage);
    window.removeEventListener(SITE_LANGUAGE_CHANGE_EVENT, syncLanguage);
  };
}

function getServerLang(): Lang {
  return "zh";
}

export function useSiteLang() {
  const lang = useSyncExternalStore(subscribeToLangChanges, readStoredLang, getServerLang);

  const setLang = useCallback((nextLang: Lang) => {
    fallbackLang = nextLang;
    document.documentElement.dataset.siteLanguage = nextLang;
    try {
      window.localStorage.setItem(SITE_LANGUAGE_STORAGE_KEY, nextLang);
    } catch {
      // Keep the in-memory value if browser storage is unavailable.
    }
    window.dispatchEvent(new Event(SITE_LANGUAGE_CHANGE_EVENT));
  }, []);

  return { lang, setLang };
}
