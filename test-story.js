// ตรวจสอบ: ลิงก์ฉาก, ไฟล์ asset, ฉากเข้าถึงได้, ตอนจบ — ทั้ง 2 เรื่อง
const fs = require("fs");

function checkStory(name, src, startId, endings) {
  const fn = new Function(src + `; return { story: ${name === "story1" ? "STORY" : "STORY2"}, compute: ${name === "story1" ? "computeEnding" : "computeEnding2"} };`);
  const { story, compute } = fn();
  let ok = true;
  for (const [id, s] of Object.entries(story)) {
    (s.hotspots || []).forEach((h) => {
      if (!story[h.next]) { console.log(`[${name}] MISSING scene:`, h.next, "from", id); ok = false; }
      if (h.img && !fs.existsSync(__dirname + "/" + h.img)) { console.log(`[${name}] MISSING asset:`, h.img); ok = false; }
      if (h.requires) for (const k of Object.keys(h.requires)) if (!["warmth","trust","dignity","clue","helpedAunt"].includes(k)) { console.log(`[${name}] UNKNOWN require key:`, k); ok = false; }
    });
    (s.actors || []).forEach((a) => { if (!fs.existsSync(__dirname + "/" + a.img)) { console.log(`[${name}] MISSING asset:`, a.img); ok = false; } });
    if (s.bg && !fs.existsSync(__dirname + "/" + s.bg)) { console.log(`[${name}] MISSING bg:`, s.bg); ok = false; }
    if (s.epEnd && !story[s.epEnd.next]) { console.log(`[${name}] epEnd→MISSING:`, s.epEnd.next); ok = false; }
  }
  const visited = new Set([startId]);
  const queue = [startId];
  while (queue.length) {
    const cur = queue.shift();
    const s = story[cur];
    if (s.epEnd) { if (!visited.has(s.epEnd.next)) { visited.add(s.epEnd.next); queue.push(s.epEnd.next); } }
    for (const h of s.hotspots || []) if (story[h.next] && !visited.has(h.next)) { visited.add(h.next); queue.push(h.next); }
  }
  const unreachable = Object.keys(story).filter((k) => !visited.has(k));
  if (unreachable.length) { console.log(`[${name}] UNREACHABLE:`, unreachable); ok = false; }
  console.log(`[${name}] scenes: ${Object.keys(story).length} reachable: ${visited.size} | ending titles: ${endings.map((f) => compute(f).title).join(", ")}`);
  return ok;
}

const s1 = fs.readFileSync(__dirname + "/story.js", "utf8");
const s2 = fs.readFileSync(__dirname + "/story2.js", "utf8");
const ok1 = checkStory("story1", s1, "start", [
  { warmth: 6, trust: 6, openedBox: true },
  { warmth: 1, trust: 1, helpedAunt: true, auntRescue: true },
  { warmth: 5, openedBox: true }, { trust: 5 }, { warmth: 4 }, {},
]);
const ok2 = checkStory("story2", s2, "s2_start", [
  { dignity: 5, clue: 5, knowsTruth: true },
  { clue: 5, knowsTruth: true },
  { dignity: 1, clue: 1 },
]);
console.log(ok1 && ok2 ? "ALL OK" : "ERRORS FOUND");
process.exit(ok1 && ok2 ? 0 : 1);
