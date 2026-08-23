// เรนเดอร์ maps-html/*.html → PNG ด้วย Edge headless (ไฟล์เขียนแบบ async ต้องรอ)
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const manifest = JSON.parse(fs.readFileSync("maps-manifest.json", "utf8"));
fs.mkdirSync("maps-png", { recursive: true });
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
for (const { file, height, width } of manifest) {
  const out = "maps-png/" + file.replace(".html", ".png");
  const w = Math.min(2400, Math.round(width / 2) * 2 + 80);
  const h = Math.min(4200, Math.round(height / 2) * 2 + 80);
  const url = "file:///" + path.resolve("maps-html/" + file).replace(/\\/g, "/");
  try {
    execSync(`"${EDGE}" --headless --disable-gpu --force-device-scale-factor=1 --hide-scrollbars --user-data-dir=C:\\Users\\XCroSs\\AppData\\Local\\Temp\\edgeprof-${Date.now()} --virtual-time-budget=3000 --screenshot="${path.resolve(out)}" --window-size=${w},${h} "${url}"`, { stdio: "ignore", timeout: 30000 });
  } catch (e) { /* Edge คืนค่าก่อนเขียนไฟล์เสมอ */ }
  // รอไฟล์
  const t0 = Date.now();
  while (!fs.existsSync(out) && Date.now() - t0 < 15000) Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 250);
  console.log(out, fs.existsSync(out) ? "OK" : "MISSING");
}
