// ตรวจการซ้อนทับกันของ hotspot กับ hotspot / ตัวละคร ในทุกฉาก
const fs = require("fs");

function boxes(scene) {
  const bs = [];
  for (const h of scene.hotspots || []) {
    const top = Math.min(h.y, 82);
    bs.push({ kind: "hot", w: h.w, halfW: h.w / 2, halfH: (h.w * 0.5625) / 2, cx: h.x, cy: top, id: h.img || "?" });
  }
  for (const a of scene.actors || []) {
    const top = Math.min(a.y, 76);
    bs.push({ kind: "actor", w: a.w, halfW: a.w / 2, halfH: (a.w * 1.4) / 2, cx: a.x, cy: top, id: a.img || "?" });
  }
  return bs;
}
function overlapArea(a, b) {
  const ox = Math.min(a.cx + a.halfW, b.cx + b.halfW) - Math.max(a.cx - a.halfW, b.cx - b.halfW);
  const oy = Math.min(a.cy + a.halfH, b.cy + b.halfH) - Math.max(a.cy - a.halfH, b.cy - b.halfH);
  return ox > 0 && oy > 0 ? ox * oy : 0;
}
function check(name, src) {
  const fn = new Function(src + `; return ${name === "story1" ? "STORY" : "STORY2"};`);
  const story = fn();
  let issues = 0;
  for (const [id, scene] of Object.entries(story)) {
    const bs = boxes(scene);
    for (let i = 0; i < bs.length; i++) {
      for (let j = i + 1; j < bs.length; j++) {
        const ov = overlapArea(bs[i], bs[j]);
        const smaller = Math.min(bs[i].halfW * bs[i].halfH * 4, bs[j].halfW * bs[j].halfH * 4);
        if (ov > smaller * 0.18) {
          console.log(`[${name}] ${id}: ${bs[i].kind}(${bs[i].cx},${bs[i].cy}) x ${bs[j].kind}(${bs[j].cx},${bs[j].cy}) overlap ${(ov / smaller * 100).toFixed(0)}% — ${bs[i].id} vs ${bs[j].id}`);
          issues++;
        }
      }
    }
  }
  return issues;
}
const i1 = check("story1", fs.readFileSync(__dirname + "/story.js", "utf8"));
const i2 = check("story2", fs.readFileSync(__dirname + "/story2.js", "utf8"));
console.log("issues:", i1 + i2);
