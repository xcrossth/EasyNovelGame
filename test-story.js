// ตรวจสอบ: ลิงก์ฉาก, ไฟล์ asset, ฉากเข้าถึงได้, ตอนจบ — ทั้ง 2 เรื่อง
const fs = require("fs");

function checkStory(name, src, startId, endings) {
  const VARS={story1:["STORY","computeEnding"],story2:["STORY2","computeEnding2"],story3:["STORY3","computeEnding3"],story4:["STORY4","computeEnding4"]};
  const fn = new Function(src + `; return { story: ${VARS[name][0]}, compute: ${VARS[name][1]} };`);
  const { story, compute } = fn();
  let ok = true;
  for (const [id, s] of Object.entries(story)) {
    (s.hotspots || []).forEach((h) => {
      if (!story[h.next]) { console.log(`[${name}] MISSING scene:`, h.next, "from", id); ok = false; }
      if (h.img && !fs.existsSync(__dirname + "/" + h.img)) { console.log(`[${name}] MISSING asset:`, h.img); ok = false; }
      if (h.requires) for (const k of Object.keys(h.requires)) if (!["warmth","trust","dignity","clue","helpedAunt","withTheeradech","hasRecording","power","mem","eye","root","allyShi","allyYu","knowsShi"].includes(k)) { console.log(`[${name}] UNKNOWN require key:`, k); ok = false; }
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
  { warmth: 20, trust: 20, openedBox: true },
  { warmth: 1, trust: 1, helpedAunt: true, auntRescue: true },
  { warmth: 15, openedBox: true }, { trust: 15 }, { warmth: 12 }, { warmth: 2, trust: 2 },
]);
const ok2 = checkStory("story2", s2, "s2_start", [
  { dignity: 8, clue: 8, exposedAll: true, chooseHeir: true, hasHalfPage: true, hasRecording: true },
  { exposedAll: true, chooseSelf: true },
  { exposedAll: true, withTheeradech: true, chooseLove: true, hasRecording: true },
  { exposedAll: true, helpedMali: true },
  { exposedAll: true, allyPapa: true },
  { exposedAll: true },
  { dignity: 5, clue: 5 },
  { dignity: 1, clue: 1 },
]);
const s3=fs.readFileSync(__dirname+'/story3.js','utf8');
const s4=fs.readFileSync(__dirname+'/story4.js','utf8');
const ok3=checkStory('story3',s3,'s3_start',[{eye:8,root:8,chooseMaster:true},{chooseLove:true,allyYu:true},{chooseFarm:true,root:8},{chooseMaster:true},{forgave:true},{eye:8,root:1},{eye:1,root:1}]);
const ok4=checkStory('story4',s4,'s4_start',[{power:6,mem:10,chooseDestroy:true},{power:8,mem:6,chooseRule:true},{allyShi:true},{trueFriend:true,chooseTalk:true,mem:8},{purePath:true,mem:10},{mem:8},{power:8,mem:2},{power:1,mem:1}]);
console.log(ok1&&ok2&&ok3&&ok4?'ALL OK':'ERRORS FOUND');
process.exit(ok1&&ok2&&ok3&&ok4?0:1);
