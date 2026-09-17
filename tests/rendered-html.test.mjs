import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routes = [
  ["/", "專注精密研磨", "長芸有限公司｜精密研磨、CNC車削與精密機械零組件"],
  ["/about", "關於長芸", "關於長芸｜精密機械零組件加工｜長芸有限公司"],
  ["/services", "從圖面評估到成品", "服務｜精密研磨、CNC車削與整合加工｜長芸有限公司"],
  ["/capacity", "讓每一個尺寸", "加工能力｜內外徑研磨與 CNC 車削｜長芸有限公司"],
  ["/equipment", "設備與經驗", "設備｜精密研磨與機械加工設備｜長芸有限公司"],
  ["/cases", "熟悉關鍵零件", "產品與實績｜精密機械零組件｜長芸有限公司"],
  ["/quality", "嚴格檢驗", "品質管理｜精密量測與加工品質｜長芸有限公司"],
  ["/industries", "服務需要精度", "應用產業｜精密機械與工業零組件｜長芸有限公司"],
  ["/contact", "帶著您的圖面", "聯絡長芸｜精密加工詢價｜長芸有限公司"],
];

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const requestPath = pathname === "/" ? pathname : `${pathname}/`;
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${requestPath}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders every independent company page", async () => {
  for (const [pathname, marker, title] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i, pathname);
    const html = await response.text();
    assert.match(html, new RegExp(`<title>${title}<\\/title>`, "i"), pathname);
    assert.match(html, /name="description"/i, pathname);
    assert.match(html, /property="og:title"/i, pathname);
    assert.match(html, /application\/ld\+json/i, pathname);
    assert.match(html, /CHUNG UEN CO\., LTD\./, pathname);
    assert.doesNotMatch(html, /CHUNG YUEN CO\., LTD\.|Chung Yuen/, pathname);
    assert.match(html, new RegExp(marker), pathname);
    assert.match(html, /href="\/contact"/, pathname);
    assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/i);
    if (pathname === "/" || pathname === "/about") {
      assert.match(html, /ABOUT CHY/);
      assert.match(html, /1998年成立的「春興工業社」/);
      assert.match(html, /2014年成立第二廠/);
      assert.match(html, /品質優先、誠信合作、持續精進/);
      assert.match(html, /aria-roledescription="carousel"/);
      assert.equal((html.match(/class="about-gallery-arrow"/g) ?? []).length, 2);
    }
    if (pathname === "/") {
      assert.match(html, /aria-label="Language selector"/i);
      assert.match(html, /台中市大甲區重義一路151號/);
      assert.match(html, /04-26763117/);
      assert.match(html, /chunguen851996@gmail\.com/);
      assert.equal((html.match(/class="home-value-icon"/g) ?? []).length, 0);
      assert.doesNotMatch(html, /核心經營理念/);
      assert.match(html, /加工服務/);
      assert.match(html, /加工能力/);
      assert.doesNotMatch(html, /長芸沿革/);
      assert.doesNotMatch(html, /我們的目標|home-next-band|home-mission-block/);
      assert.match(html, /home-service-card\.png/);
      assert.match(html, /home-process-card\.jpg/);
      assert.equal((html.match(/class="home-action-image-link"/g) ?? []).length, 2);
      assert.match(html, /class="home-action-image-link" href="\/services" aria-label="加工服務"/);
      assert.match(html, /class="home-action-image-link" href="\/capacity" aria-label="加工能力"/);
      assert.ok((html.match(/href="\/services"/g) ?? []).length >= 2);
      assert.match(html, />中<.*>日<.*>EN</s);
      assert.equal((html.match(/class="feature-icon"/g) ?? []).length, 4);
      assert.match(html, /Target icon/);
      assert.match(html, /Shield icon/);
      assert.match(html, /Integrated service icon/);
      assert.match(html, /Trust icon/);
      assert.match(html, /svg-inline--fa/);
      assert.doesNotMatch(html, /viewBox="0 0 64 64"/);
    }
    if (pathname === "/about") {
      assert.match(html, /長芸沿革/);
      assert.match(html, /1997/);
      assert.match(html, /2001/);
      assert.match(html, /2002–2003/);
      assert.match(html, /2006/);
      assert.match(html, /2008/);
      assert.match(html, /2009/);
      assert.match(html, /顯示較早的沿革/);
      assert.match(html, /顯示較晚的沿革/);
    }
    if (pathname === "/cases") {
      assert.match(html, /PRODUCT RANGE \/ 20/i);
      assert.match(html, /product-01\.png/);
      assert.match(html, /product-13\.png/);
      assert.match(html, /product-07\.png/);
      assert.match(html, /aria-label="精密軸件照片輪播"/);
      assert.equal((html.match(/class="product-image-carousel-dots"/g) ?? []).length, 3);
      assert.match(html, /class="product-image-gallery product-image-gallery-reserved"/);
      assert.equal((html.match(/class="product-card"/g) ?? []).length, 20);
    }
  }
});

test("generates crawler metadata files", async () => {
  const robots = await readFile(new URL("../dist/client/robots.txt", import.meta.url), "utf8");
  const sitemap = await readFile(new URL("../dist/client/sitemap.xml", import.meta.url), "utf8");

  assert.match(robots, /User-agent: \*/);
  assert.match(robots, /Sitemap: https:\/\/chung-uen\.pages\.dev\/sitemap\.xml/);
  assert.match(sitemap, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  assert.match(sitemap, /https:\/\/chung-uen\.pages\.dev\/contact\//);
});
