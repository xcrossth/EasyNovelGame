// สคริปต์ตรวจสอบ: ลิงก์ฉาก, ไฟล์ asset, และตอนจบ
const fs = require("fs");
const src = fs.readFileSync(__dirname + "/story.js", "utf8");
const fn = new Function(src + "; return { STORY, computeEnding };");
const { STORY, computeEnding } = fn();

let ok = true;
for (const [id, s] of Object.entries(STORY)) {
  (s.hotspots || []).forEach((h) => {
    if (!STORY[h.next]) { console.log("MISSING scene:", h.next, "from", id); ok = false; }
    if (h.img && !fs.existsSync(__dirname + "/" + h.img)) { console.log("MISSING asset:", h.img); ok = false; }
  });
  (s.actors || []).forEach((a) => {
    if (!fs.existsSync(__dirname + "/" + a.img)) { console.log("MISSING asset:", a.img); ok = false; }
  });
  if (s.bg && !fs.existsSync(__dirname + "/" + s.bg)) { console.log("MISSING bg:", s.bg); ok = false; }
}

// จำลองการเดินเกมทุกทาง (walk ทุก hotspot แบบ BFS สั้นๆ กันฉากวนลูป)
const visited = new Set(["start"]);
const queue = ["start"];
while (queue.length) {
  const cur = queue.shift();
  for (const h of STORY[cur].hotspots || []) {
    if (STORY[h.next] && !visited.has(h.next)) { visited.add(h.next); queue.push(h.next); }
  }
}
const unreachable = Object.keys(STORY).filter((k) => !visited.has(k) && k !== "final");
if (unreachable.length) { console.log("UNREACHABLE scenes:", unreachable); ok = false; }

console.log("scenes:", Object.keys(STORY).length, "| reachable:", visited.size);
console.log("endings:", [
  computeEnding({ warmth: 6, trust: 6, openedBox: true }).title,
  computeEnding({ warmth: 1, trust: 1, helpedAunt: true, auntRescue: true }).title,
  computeEnding({ warmth: 5, trust: 1, openedBox: true }).title,
  computeEnding({ warmth: 1, trust: 5 }).title,
  computeEnding({ warmth: 3, trust: 1 }).title,
  computeEnding({ warmth: 0, trust: 0 }).title,
]);
console.log(ok ? "ALL OK" : "ERRORS FOUND");
process.exit(ok ? 0 : 1);
