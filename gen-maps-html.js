// สร้างแผนภาพเส้นทางเนื้อเรื่องเป็น HTML รายองก์/รายตอน (ไม่มี dependency)
const fs = require("fs");
const g1 = JSON.parse(fs.readFileSync("map-story1.json", "utf8"));
const g2 = JSON.parse(fs.readFileSync("map-story2.json", "utf8"));

const CSS = `
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family: Tahoma, 'Leelawadee UI', sans-serif; background:#0f172a; color:#e2e8f0; padding:30px 50px 60px; }
h1 { font-size:26px; color:#fbbf24; letter-spacing:.5px; margin-bottom:4px; }
.sub { color:#94a3b8; font-size:14px; margin-bottom:6px; }
.legend { display:flex; gap:16px; margin:14px 0 4px; font-size:12px; color:#94a3b8; align-items:center; flex-wrap:wrap; }
.legend .sw { display:inline-block; width:14px; height:14px; border-radius:4px; margin-right:5px; vertical-align:-2px; }
.stage { position:relative; margin:30px auto 0; }
.card { position:absolute; width:176px; min-height:64px; border-radius:12px; padding:9px 11px 7px;
  background:linear-gradient(180deg,#1f2b3f,#19233a); border:1.5px solid #3b4d68; box-shadow:0 6px 16px rgba(0,0,0,.5); z-index:2; }
.card .cap { font-size:12.5px; line-height:1.5; color:#f1f5f9; }
.card .sid { font-size:9.5px; color:#7c8aa0; margin-top:3px; font-family:Consolas,monospace; }
.card.ending { background:linear-gradient(180deg,#1a1a2e,#141428); border:2.5px solid #f59e0b; }
.card.ending .cap { color:#fbbf24; font-weight:bold; }
.card.ghost { opacity:.55; border-style:dashed; min-height:46px; }
svg.wires { position:absolute; left:0; top:0; overflow:visible; z-index:1; }
`;

const HUES = ["#38bdf8", "#34d399", "#f472b6", "#fbbf24", "#a78bfa", "#fb923c", "#2dd4bf", "#f87171", "#c084fc", "#4ade80", "#fdba74", "#22d3ee", "#e879f9", "#facc15"];

function actOf1(sid) { return /^a([1-5])/.test(sid) ? +RegExp.$1 : 0; }
function epOf2(sid) { const m = /^s2_e(\d+)/.exec(sid); return m ? +m[1] : 0; }

function build(graph, start, actFn, file, storyTitle, actTitle) {
  const inAct = (sid) => actFn(sid) === actTitle.num;
  const ids = Object.keys(graph).filter(inAct);
  const entries = ids.filter((id) =>
    id === start || Object.entries(graph).some(([src, g]) => !inAct(src) && g.nexts.includes(id))
  );
  const depth = {};
  entries.forEach((e) => (depth[e] = 0));
  const q = [...entries];
  while (q.length) {
    const cur = q.shift();
    for (const nx of graph[cur].nexts) {
      if (inAct(nx) && depth[nx] === undefined) { depth[nx] = depth[cur] + 1; q.push(nx); }
    }
  }
  for (const id of ids) if (depth[id] === undefined) depth[id] = Math.max(0, ...Object.values(depth)) + 1;

  const ghosts = new Map();
  for (const id of ids) for (const nx of graph[id].nexts) if (!inAct(nx) && graph[nx]) ghosts.set(nx, (ghosts.get(nx) || 0) + 1);

  // layout: จัดคอลัมน์แบบลดเส้นตัดกัน (เรียงตามค่าเฉลี่ยตำแหน่งพ่อแม่)
  const ROWGAP = 122, COLGAP = 208, W = 176;
  const rows = {};
  for (const id of Object.keys(depth)) (rows[depth[id]] ||= []).push(id);
  const rowKeys = Object.keys(rows).map(Number).sort((a, b) => a - b);
  const pos = {};
  const order = {};
  let maxCols = 0;
  rowKeys.forEach((r, ri) => {
    let arr = rows[r];
    if (ri > 0) {
      const avgParent = (id) => {
        const ps = [];
        for (const [src, g] of Object.entries(graph)) if (g.nexts.includes(id) && order[src] !== undefined) ps.push(order[src]);
        return ps.length ? ps.reduce((x, y) => x + y, 0) / ps.length : 999;
      };
      arr = arr.slice().sort((a, b) => avgParent(a) - avgParent(b));
    }
    maxCols = Math.max(maxCols, arr.length);
    arr.forEach((id, i) => { order[id] = i; pos[id] = { x: (i - (arr.length - 1) / 2) * COLGAP, y: r * ROWGAP }; });
  });
  const ghList = [...ghosts.keys()];
  ghList.forEach((id, i) => { pos[id] = { x: (i - (ghList.length - 1) / 2) * COLGAP, y: rowKeys.length * ROWGAP, ghost: true }; });

  const stageW = Math.max(maxCols, ghList.length) * COLGAP + 40;
  const stageH = (rowKeys.length + (ghList.length ? 1.15 : 0.3)) * ROWGAP;
  const midX = stageW / 2; // ศูนย์กลางแนวนอนของ stage
  const centerX = (id) => midX + pos[id].x;              // กึ่งกลางการ์ด
  const cardLeft = (id) => centerX(id) - W / 2;          // ขอบซ้ายการ์ด

  // เส้นเชื่อม: หนา สีตามชั้นของต้นทาง + หัวลูกศรใหญ่
  const cy = (id) => pos[id].y + 32;
  let mk = "";
  for (const r of new Set([...Object.values(depth), -1])) {
    const col = r < 0 ? "#f59e0b" : HUES[r % HUES.length];
    mk += `<marker id="arr${r}" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${col}"/></marker>`;
  }
  let wires = "";
  for (const id of ids) {
    const r = depth[id] || 0;
    const col = HUES[r % HUES.length];
    for (const nx of graph[id].nexts) {
      if (!pos[nx]) continue;
      const isEnd = !!graph[nx].ending;
      const useCol = isEnd ? "#f59e0b" : col;
      const mkid = isEnd ? "arr-1" : "arr" + r;
      const x1 = centerX(id), y1 = cy(id) + 28, x2 = centerX(nx), y2 = cy(nx) - 28;
      wires += `<path d="M${x1} ${y1} C ${x1} ${y1 + 46}, ${x2} ${y2 - 46}, ${x2} ${y2}" fill="none" stroke="${useCol}" stroke-width="2.2" opacity=".85" marker-end="url(#${mkid})"/>`;
    }
  }

  let cards = "";
  for (const [id, p] of Object.entries(pos)) {
    const g = graph[id];
    const cap = (g.caption || "").replace(/["<>]/g, "").slice(0, 34);
    const cls = g.ending ? "ending" : inAct(id) ? "" : "ghost";
    const badge = p.ghost ? `<div style="font-size:9px;color:#f59e0b;margin-top:2px">→ ${actFn(id) ? (start === "start" ? "องก์ " + actFn(id) : "ตอนที่ " + actFn(id)) : "ตอนจบ"}</div>` : "";
    cards += `<div class="card ${cls}" style="left:${cardLeft(id)}px;top:${p.y}px">
      <div class="cap">${cap || id}</div><div class="sid">${id}</div>${badge}</div>`;
  }

  const html = `<!DOCTYPE html><html lang="th"><head><meta charset="utf-8"><style>${CSS}
  .stage{width:${stageW}px;height:${stageH}px}
  </style></head><body>
  <h1>${actTitle.label}</h1><div class="sub">${storyTitle} · ${ids.length} ฉากในช่วงนี้${ghList.length ? " · ทางออกไปอีก " + ghList.length + " ฉาก" : ""}</div>
  <div class="legend">
    <span><span class="sw" style="background:linear-gradient(180deg,#1f2b3f,#192334);border:1.5px solid #3b4d68"></span>ฉาก</span>
    <span><span class="sw" style="background:#141428;border:2.5px solid #f59e0b"></span>จุดคิดตอนจบ</span>
    <span><span class="sw" style="background:#1f2b3f;border:1.5px dashed #64748b;opacity:.6"></span>ทางออกไปช่วงถัดไป</span>
    <span style="color:#7c8aa0">สีเส้น = ชั้นความลึกของเส้นทาง</span>
  </div>
  <div class="stage"><svg class="wires" width="${stageW}" height="${stageH}"><defs>${mk}</defs>${wires}</svg>${cards}</div>
  </body></html>`;
  fs.writeFileSync("maps-html/" + file, html);
  return { file, height: Math.round(stageH + 260), width: Math.round(stageW + 180) };
}

fs.mkdirSync("maps-html", { recursive: true });
const manifest = [];
const A1 = { 1: "องก์ 1 — คืนแรก", 2: "องก์ 2 — ของแลกเปลี่ยน", 3: "องก์ 3 — ตัวเลือกหนักที่สุด", 4: "องก์ 4 — กล่องของพ่อ", 5: "องก์ 5 — พายุ" };
for (let a = 1; a <= 5; a++) manifest.push(build(g1, "start", actOf1, `m1-act${a}.html`, "ฤดูหนาวปีนั้น", { num: a, label: A1[a] }));
const E2 = ["", "น้ำท่วมใจ", "เรือกระดาษ", "มาลีรัตน์รู้แล้ว", "ข้อเสนอของธีรเดช", "กลับบ้านหลังเดิม", "คุณหญิงรู้", "วิชัยลังเล", "ไดอารี่สายฝน", "งานเลี้ยงเปิดม่าย", "ฝนครั้งสุดท้าย", "ฤดูฝนกลับมา", "เลือกฤดูของตัวเอง"];
for (let e = 1; e <= 12; e++) manifest.push(build(g2, "s2_start", epOf2, `m2-ep${e}.html`, "ฤดูฝนที่หายไป", { num: e, label: "ตอนที่ " + e + " — " + E2[e] }));
fs.writeFileSync("maps-manifest.json", JSON.stringify(manifest, null, 1));
console.log("generated", manifest.length, "pages");
