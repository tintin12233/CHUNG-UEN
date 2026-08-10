import assert from "node:assert/strict";
import test from "node:test";

const routes = [
  ["/", "把每一寸精度"],
  ["/about", "在現場累積的經驗"],
  ["/services", "三種核心能力"],
  ["/capacity", "可驗證的加工條件"],
  ["/equipment", "設備組合支撐穩定產出"],
  ["/cases", "熟悉關鍵零件"],
  ["/quality", "品質管理放進每一道流程"],
  ["/industries", "走進更多精密製造現場"],
  ["/contact", "談談你的加工需求"],
];

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders every independent company page", async () => {
  for (const [pathname, marker] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i, pathname);
    const html = await response.text();
    assert.match(html, /<title>長芸有限公司｜精密研磨與零件加工<\/title>/i, pathname);
    assert.match(html, new RegExp(marker), pathname);
    assert.match(html, /href="\/contact"/, pathname);
    assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/i, pathname);
  }
});
