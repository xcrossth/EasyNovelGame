// จำลองเดินทุกเส้นทาง (path) สะสมค่า แล้วคำนวณตอนจบของแต่ละเส้นทาง → สรุปเป็น HTML
const fs = require("fs");

function simulate(file, storyVar, computeVar, start, flags0, out) {
  const src = fs.readFileSync(file, "utf8");
  const story = new Function(src + "; return " + storyVar + ";")();
  const compute = new Function(src + "; return " + computeVar + ";")();
  const paths = [];
  const seenState = new Set();
  (function walk(sceneId, flags, steps) {
    const sc = story[sceneId];
    if (!sc) return;
    // memo: ฉากเดิม+ค่าเดิม → อนาคตเหมือนเดิม ตัดซ้ำ (นับเส้นทางแรกเป็นตัวแทน)
    const key = sceneId + "|" + JSON.stringify(flags);
    if (seenState.has(key)) return;
    seenState.add(key);
    if (sc.ending) { paths.push({ flags, steps, ending: compute({ ...flags }) }); return; }
    const outs = [];
    if (sc.epEnd) outs.push({ next: sc.epEnd.next, label: "▸ ต่อตอนถัดไป", eff: null, set: null });
    for (const h of sc.hotspots || []) outs.push({ next: h.next, label: h.label || (h.img || "").split("/").pop(), eff: h.effects, set: h.set });
    for (const o of outs) {
      const f = { ...flags };
      if (o.eff) for (const [k, v] of Object.entries(o.eff)) f[k] = Math.max(0, (f[k] || 0) + v);
      if (o.set) Object.assign(f, o.set);
      walk(o.next, f, [...steps, { scene: sceneId, label: o.label }]);
    }
  })(start, flags0(), []);
  // จัดกลุ่มตามตอนจบ
  const groups = {};
  for (const p of paths) (groups[p.ending.title] ||= []).push(p);
  return { story, paths, groups };
}

const r1 = simulate("story.js", "STORY", "computeEnding", "start",
  () => ({ warmth: 0, trust: 0, helpedAunt: false, knowsBox: false, openedBox: false, auntRescue: false }), "end1");
const r2 = simulate("story2.js", "STORY2", "computeEnding2", "s2_start",
  () => ({ dignity: 0, clue: 0, hasPhoto: false, hasDoc: false, maliSuspects: false, knowsTruth: false, withTheeradech: false, allyPloy: false, spyExposed: false, hasDiary: false, hasRecording: false, knowsManager: false, hasHalfPage: false, allyPapa: false, helpedMali: false, exposedAll: false, chooseHeir: false, chooseSelf: false, chooseLove: false }), "end2");
console.log("story1 paths:", r1.paths.length, "endings:", Object.keys(r1.groups).length);
console.log("story2 paths:", r2.paths.length, "endings:", Object.keys(r2.groups).length);

function pick(group) {
  // เลือกตัวแทน: เส้นทางที่สั้นที่สุด
  return group.slice().sort((a, b) => a.steps.length - b.steps.length)[0];
}

const CSS = `
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Tahoma,'Leelawadee UI',sans-serif;background:#0f172a;color:#e2e8f0;padding:36px 46px 60px}
h1{color:#fbbf24;font-size:28px;margin-bottom:2px}
.sub{color:#94a3b8;font-size:14px;margin-bottom:26px}
.end{background:linear-gradient(180deg,#1c2740,#161f36);border:1px solid #334155;border-left:6px solid #f59e0b;border-radius:14px;padding:18px 22px;margin-bottom:18px}
.end h2{font-size:18px;color:#fbbf24;margin-bottom:6px}
.meta{display:flex;gap:14px;font-size:12.5px;color:#94a3b8;margin-bottom:10px;flex-wrap:wrap}
.meta b{color:#e2e8f0}
.cond{font-size:13.5px;line-height:1.8;color:#f1f5f9;background:rgba(251,191,36,.07);border-radius:8px;padding:8px 14px;margin-bottom:12px}
.chain{font-size:12.5px;line-height:2.1;color:#cbd5e1}
.chain .step{display:inline-block;background:#233350;border:1px solid #3b4d68;border-radius:999px;padding:3px 12px;margin:2px 3px 2px 0;white-space:nowrap}
.chain .arr{color:#f59e0b;margin:0 2px}
`;

function page(r, title, sub) {
  const order = Object.entries(r.groups).sort((a, b) => b[1].length - a[1].length);
  let html = `<!DOCTYPE html><html lang="th"><head><meta charset="utf-8"><style>${CSS}</style></head><body>
  <h1>${title}</h1><div class="sub">${sub} · จำลองเดินครบทุกเส้นทาง (${r.paths.length.toLocaleString()} เส้นทาง) พบ ${order.length} ตอนจบ</div>`;
  for (const [name, group] of order) {
    const rep = pick(group);
    const pct = (group.length / r.paths.length * 100).toFixed(1);
    const e = rep.ending;
    const steps = rep.steps.filter((s) => !s.label.startsWith("▸")).map((s) => `<span class="step">${s.label}</span>`).join('<span class="arr">→</span>');
    html += `<div class="end" style="border-left-color:${"#f59e0b"}">
      <h2>${e.title}</h2>
      <div class="meta"><span>ได้จากเส้นทาง <b>${group.length.toLocaleString()}</b> เส้นทาง</span><span>(<b>${pct}%</b> ของทุกเส้นทาง)</span></div>
      <div class="cond">${(e.text || "").split("\n").filter((l) => l.startsWith("—"))[0] || ""} ${condText(name)}</div>
      <div class="chain"><b style="color:#7dd3fc">ตัวอย่างการเลือกที่ได้จบนี้:</b><br>${steps}</div>
    </div>`;
  }
  html += "</body></html>";
  return html;
}

function condText(name) {
  const C = {
    "สดใส": "เงื่อนไข: 🔥อบอุ่น ≥6 และ 💛ไว้ใจ ≥6 และเปิดกล่องพ่อ (ต้องไว้ใจ ≥4 จึงเห็นตัวเลือกกุญแจ ตอนที่ 4)",
    "บ้านที่สอง": "เงื่อนไข: ช่วยป้าแก้ม (ให้เกลือ/ช่วยปัดหิมะ) แล้วหนีพายุไปบ้านป้า (คืนพายุ)",
    "อบอุ่นพอ": "เงื่อนไข: 🔥อบอุ่น ≥5 และเปิดกล่องพ่อได้",
    "แน่นแฟบ": "เงื่อนไข: 💛ไว้ใจ ≥5 (เน้นปลอบใจ/ดูแลกัน ไม่จำเป็นต้องเปิดกล่อง)",
    "ค้างเติ่ง": "เงื่อนไข: 🔥อบอุ่น ≥4 แต่ไว้ใจไม่ถึงเกณฑ์สูง",
    "หนาว": "เงื่อนไข: ค่าทั้งสองต่ำ — รอดมาได้แบบเหนื่อยล้า",
    "👑 ราชินีรัตนวงศ์": "เงื่อนไข: เปิดโปงสำเร็จ + เลือกรับชื่อ 'ธนพร' + 👑ศักดิ์ศรี ≥6",
    "🕊 อิสรภาพ": "เงื่อนไข: เปิดโปงสำเร็จ + เลือก 'ฉันคือหนึ่งฤทัย เดินหน้าต่อ'",
    "💗 เรือสองลำ": "เงื่อนไข: รับข้อเสนอธีรเดช (ตอน 4) + ตอนจบเลือกกลับไปหาเขา",
    "🎭 นางฟ้าเลือกข้าง": "เงื่อนไข: ตอน 11 เลือก 'ยื่นมือให้มาลีรัตน์' + เปิดโปงสำเร็จ",
    "⚖ ความจริงเดียว": "เงื่อนไข: เปิดโปงสำเร็จ + มีเพื่อนแท้ (เปิดใจให้ภาภาหรือพลอย)",
    "💸 เงินซื้ออะไรไม่ได้": "เงื่อนไข: เปิดโปงสำเร็จ แต่ไม่มีพันธมิตรและไม่เลือกอะไรพิเศษ",
    "🌧 ฝนยังตก": "เงื่อนไข: พิสูจน์ไม่สำเร็จ (ไม่มีครึ่งกระดาษ/เสียงอัด) แต่ยังพอตั้งตัวได้",
    "⚫ ฤดูฝนที่หายไปตลอดกาล": "เงื่อนไข: พิสูจน์ไม่สำเร็จ แต่ยืนรับชื่อทายาท — โดนฟ้องกลับและแพ้ยับ",
  };
  return C[name] || "";
}

fs.writeFileSync("maps-html/endings-1.html", page(r1, "คู่มือตอนจบ — ฤดูหนาวปีนั้น", "6 ตอนจบ"));
fs.writeFileSync("maps-html/endings-2.html", page(r2, "คู่มือตอนจบ — ฤดูฝนที่หายไป", "8 ตอนจบ"));
const man = [
  { file: "endings-1.html", width: 1050, height: 450 + Object.keys(r1.groups).length * 330 },
  { file: "endings-2.html", width: 1050, height: 450 + Object.keys(r2.groups).length * 330 },
];
fs.writeFileSync("maps-manifest.json", JSON.stringify(man, null, 1));
console.log("endings pages written");
