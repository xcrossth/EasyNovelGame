// ป้ายกำกับความหมายของไอคอน (ใช้เมื่อ hotspot ไม่ได้ระบุ label เอง)
const IMG_LABELS = {
  "assets/obj-firewood.png": "หาฟืน", "assets/obj-ladder.png": "อุดหลังคา",
  "assets/obj-blanket.png": "ผ้าห่ม / กอดกัน", "assets/obj-fire.png": "ก่อไฟ",
  "assets/obj-food.png": "ทำอาหาร", "assets/obj-medicine.png": "หยิบยา",
  "assets/obj-candle.png": "จุดเทียน / อยู่เฝ้า", "assets/obj-bed.png": "เข้านอน",
  "assets/obj-sunrise.png": "ถึงเช้าวันใหม่", "assets/obj-door.png": "เปิดประตู",
  "assets/obj-tea.png": "ชงชา / ดื่มของอุ่น", "assets/obj-herbs.png": "หาสมุนไพร",
  "assets/obj-key.png": "ใช้กุญแจ", "assets/obj-letter.png": "อ่านจดหมาย",
  "assets/obj-money.png": "เงินของพ่อ", "assets/obj-box.png": "เปิดกล่อง",
  "assets/obj-cloth.png": "ผ้าเช็ดตัว / น้ำ", "assets/obj-heart.png": "ปลอบใจ / ให้ใจ",
  "assets/obj-lantern.png": "ถือตะเกียงออกไป", "assets/obj-plant.png": "ต้นหอมของพ่อ",
  "assets/s2/ic-determined.png": "เงยหน้าสู้", "assets/s2/ic-lookaway.png": "ทำเป็นไม่เห็น",
  "assets/s2/ic-smile.png": "ตอบเรียบๆ", "assets/s2/ic-sad.png": "ปลอบโยน",
  "assets/s2/ic-angry.png": "โกรธฟันธง", "assets/s2/ic-think.png": "ครุ่นคิด",
  "assets/s2/ic-broom.png": "ทำงานบ้าน", "assets/s2/ic-door.png": "เปิดประตู",
  "assets/s2/item-file.png": "แฟ้มเอกสาร", "assets/s2/item-photo.png": "รูปถ่ายเก่า",
  "assets/s2/item-diary.png": "สมุดไดอารี่", "assets/s2/item-bracelet.png": "กำไลทองหูกระดิ่ง",
  "assets/s3/item-bowl.png": "ถ้วยเครื่องกระเบื้อง", "assets/s3/item-paddle.png": "ป้ายประมูล",
  "assets/s3/item-seal.png": "ตราหยกมังกร", "assets/s4/item-coin.png": "เหรียญพลังระบบ",
  "assets/s4/item-memory.png": "กล่องความทรงจำ", "assets/s4/item-leaf.png": "ใบไม้ดิจิทัล",
};
function hotspotLabel(h) {
  return h.label || IMG_LABELS[h.img] || "แตะเพื่อไปต่อ";
}

// ===== ตัวเกมหลัก — รองรับหลายเรื่อง (multi-story) =====

// คำจำกัดความของแต่ละเรื่อง
const GAMES = {
  s1: {
    story: () => STORY,
    compute: (f) => computeEnding(f),
    start: "start",
    flags0: () => ({ warmth: 0, trust: 0, helpedAunt: false, knowsBox: false, openedBox: false, auntRescue: false }),
    hud: [["assets/ui/flame.png", "warmth"], ["assets/ui/heart.png", "trust"]],
    dotsMax: 8,
    coldOverlay: true,
    bgDefault: "assets/bg-house-portrait.png",
    bgm: {
      a3_crisis: "crisis", a3_path: "crisis", a3_river: "crisis", a3_clinic: "crisis",
      a3_return: "crisis", a3_aunt_door: "crisis", a3_aunt_in: "crisis",
      a3_herb_search: "crisis", a3_gamble: "crisis",
      a5_prep: "storm", a5_intro: "storm", a5_huddle: "storm", a5_fireout: "storm", a5_escape: "storm",
      a5_relight: "warm", a5_knock: "warm", a5_dawn: "warm",
    },
    sfx: { a2_knock: "assets/audio/sfx-knock.mp3", a4_open: "assets/audio/sfx-open.mp3" },
  },
  s2: {
    story: () => STORY2,
    compute: (f) => computeEnding2(f),
    start: "s2_start",
    flags0: () => ({ dignity: 0, clue: 0, hasPhoto: false, hasDoc: false, maliSuspects: false, knowsTruth: false, withTheeradech: false }),
    hud: [["assets/ui/crown.png", "dignity"], ["assets/ui/magnifier.png", "clue"]],
    dotsMax: 8,
    coldOverlay: false,
    bgDefault: "assets/s2/foyer.png",
    bgm: {
      // ตอน 1-4
      s2_e1_mali: "s2drama", s2_e1_mali_fight: "s2drama",
      s2_e2_mali_saw: "s2drama", s2_e2_confront: "s2drama", s2_e2_cliff_risk: "s2drama",
      s2_e3_start: "s2drama", s2_e3_give: "s2drama", s2_e3_refuse: "s2drama", s2_e3_lie: "s2drama",
      s2_e3_rain: "crisis", s2_e3_defend: "crisis", s2_e3_evidence: "crisis", s2_e3_leave: "crisis",
      s2_e4_start: "s2drama", s2_e4_talk: "s2drama", s2_e4_file: "s2drama", s2_e4_deal: "s2drama",
      // ตอน 5-8
      s2_e5_mali_see: "s2drama", s2_e5_talkback: "s2drama",
      s2_e6_start: "s2sad", s2_e6_spy: "s2drama", s2_e6_confront_spy: "s2drama", s2_e6_cliff: "crisis",
      s2_e7_start: "s2sad", s2_e7_hurt: "crisis", s2_e7_stand: "crisis", s2_e7_record: "crisis", s2_e7_cliff: "s2sad",
      s2_e8_read: "s2sad", s2_e8_name: "s2drama", s2_e8_open: "s2sad", s2_e8_cliff: "s2drama",
      s2_e9_kong: "crisis", s2_e9_cliff: "crisis",
      s2_e10_start: "crisis", s2_e10_wishai: "crisis", s2_e10_record: "crisis", s2_e10_twist: "s2sad",
      s2_e11_start: "s2drama", s2_e11_mali: "s2sad", s2_e11_police: "s2drama",
      s2_e12_heir: "s2sad", s2_e12_self: "s2sad", s2_e12_love: "s2sad", s2_e12_will: "s2sad",
    },
    sfx: {
      s2_e1_mali: "assets/audio/s2-heels.mp3",
      s2_e1_mali_fight: "assets/audio/s2-slap.mp3",
      s2_e6_cliff: "assets/audio/s2-heartbeat.mp3",
      s2_e8_cliff: "assets/audio/s2-heartbeat.mp3",
      s2_e9_cliff: "assets/audio/s2-heartbeat.mp3",
      s2_e10_twist: "assets/audio/s2-heartbeat.mp3",
      s2_e9_kong: "assets/audio/s2-heels.mp3",
    },
    bgmDefault: "s2lux",
  },
  s3: {
    story: () => STORY3,
    compute: (f) => computeEnding3(f),
    start: "s3_start",
    flags0: () => ({ eye: 0, root: 0, hasLetter: false, friendZhen: false, allyYu: false, workBoss: false, hasPhoto: false, knowsKiller: false, forgave: false, chooseMaster: false, chooseFarm: false, chooseLove: false }),
    hud: [["assets/ui/eye.png", "eye"], ["assets/ui/grass.png", "root"]],
    dotsMax: 12,
    coldOverlay: false,
    bgDefault: "assets/s3/ricefield.png",
    bgm: {
      s3_e3_boss: "crisis", s3_e6_start: "crisis", s3_e7_start: "crisis", s3_e7_rage: "crisis",
      s3_e9_start: "crisis", s3_e10_start: "crisis", s3_e11_start: "s2sad",
      s3_e12_master: "warm", s3_e12_farm: "warm", s3_e12_love: "s2sad",
    },
    sfx: {
      s3_e1_thunder: "assets/audio/s3-eye.mp3",
      s3_e2_tang: "assets/audio/s3-eye.mp3",
      s3_e10_twist: "assets/audio/s2-heartbeat.mp3",
    },
    bgmDefault: "s3bgm",
  },
  s4: {
    story: () => STORY4,
    compute: (f) => computeEnding4(f),
    start: "s4_start",
    flags0: () => ({ power: 0, mem: 10, hasNotebook: false, purePath: false, knowsShi: false, trueFriend: false, allyShi: false, chooseDestroy: false, chooseRule: false, chooseTalk: false }),
    hud: [["assets/ui/star.png", "power"], ["assets/ui/leaf.png", "mem"]],
    dotsMax: 12,
    coldOverlay: false,
    bgDefault: "assets/s4/redleaf.png",
    bgm: {
      s4_e6_start: "crisis", s4_e9_start: "crisis", s4_e10_start: "crisis",
      s4_e2_fee: "s2sad", s4_e8_start: "s2sad", s4_e12_truth: "s2sad",
    },
    sfx: {
      s4_e1_accept: "assets/audio/s4-notif.mp3",
      s4_e6_start: "assets/audio/s4-static.mp3",
      s4_e10_start: "assets/audio/s4-static.mp3",
    },
    bgmDefault: "s4bgm",
  },
};

let curKey = null;
let S = null;       // def ของเรื่องปัจจุบัน
let flags = {};
let currentSceneId = null;
let nudgeTimer = null;
const gameEl = document.getElementById("game");

const bgEl = document.getElementById("bg");
const overlayEl = document.getElementById("overlay-cold");
const captionEl = document.getElementById("caption");
const endingEl = document.getElementById("ending");
const hudEl = document.getElementById("hud");
const hud1El = document.getElementById("hud-1");
const hud2El = document.getElementById("hud-2");
const epEl = document.getElementById("episode");

function meetsRequirement(req) {
  if (!req) return true;
  return Object.keys(req).every((k) => flags[k] >= req[k]);
}

function renderHUD() {
  if (!S) return;
  const [[i1, k1], [i2, k2]] = S.hud;
  const dots = (k) => '<span class="dots">' + "●".repeat(Math.max(1, Math.min(S.dotsMax, flags[k]))) + "</span>";
  hud1El.innerHTML = `<img class="hud-ic" src="${i1}" alt="">` + dots(k1);
  hud2El.innerHTML = `<img class="hud-ic" src="${i2}" alt="">` + dots(k2);
  if (S.coldOverlay) {
    const a = Math.max(0, 0.38 - flags.warmth * 0.05);
    overlayEl.style.background = `rgba(40, 70, 120, ${a})`;
  } else overlayEl.style.background = "transparent";
}

function clearDynamic() {
  clearTimeout(nudgeTimer);
  gameEl.querySelectorAll(
    ".actor, .hotspot, .fx, .snow, .ember, .petal, .dust, .steam, .wind-line"
  ).forEach((el) => el.remove());
  gameEl.classList.remove("shake-screen");
}

// ===== เอฟเฟกต์บรรยากาศต่อฉาก =====
function applyFx(list) {
  if (!list) return;
  for (const fx of list) {
    if (fx === "snow") makeSnow(24);
    else if (fx === "petals") makePetals(14);
    else if (fx === "embers") makeEmbers(14);
    else if (fx === "dust") makeDust(18);
    else if (fx === "steam") makeSteam(5);
    else if (fx === "fog") makeFog();
    else if (fx === "flicker") makeFlicker();
    else if (fx === "wind") makeWind(5);
    else if (fx === "shake") gameEl.classList.add("shake-screen");
  }
}
function makeSnow(n) { for (let i = 0; i < n; i++) { const s = document.createElement("div"); s.className = "snow"; s.textContent = "❅"; s.style.left = Math.random()*100+"%"; s.style.fontSize = .5+Math.random()+"rem"; s.style.animationDuration = 5+Math.random()*7+"s"; s.style.animationDelay = -Math.random()*10+"s"; gameEl.appendChild(s); } }
function makePetals(n) { for (let i = 0; i < n; i++) { const p = document.createElement("div"); p.className = "petal"; p.style.left = Math.random()*100+"%"; p.style.animationDuration = 7+Math.random()*8+"s"; p.style.animationDelay = -Math.random()*12+"s"; gameEl.appendChild(p); } }
function makeEmbers(n) { for (let i = 0; i < n; i++) { const e = document.createElement("div"); e.className = "ember"; e.style.left = 20+Math.random()*60+"%"; const d = 3+Math.random()*5; e.style.animationDuration = d+"s"; e.style.animationDelay = -Math.random()*d+"s"; gameEl.appendChild(e); } }
function makeDust(n) { for (let i = 0; i < n; i++) { const d = document.createElement("div"); d.className = "dust"; d.style.left = Math.random()*100+"%"; d.style.top = 20+Math.random()*60+"%"; const dur = 4+Math.random()*6; d.style.animationDuration = dur+"s"; d.style.animationDelay = -Math.random()*dur+"s"; gameEl.appendChild(d); } }
function makeSteam(n) { for (let i = 0; i < n; i++) { const s = document.createElement("div"); s.className = "steam"; s.style.left = 35+Math.random()*30+"%"; s.style.top = 55+Math.random()*15+"%"; const dur = 3+Math.random()*3; s.style.animationDuration = dur+"s"; s.style.animationDelay = -Math.random()*dur+"s"; gameEl.appendChild(s); } }
function makeFog() { for (let i = 0; i < 2; i++) { const f = document.createElement("div"); f.className = "fx fog"; f.style.top = i===0?"30%":"60%"; f.style.animationDelay = i*-8+"s"; gameEl.appendChild(f); } }
function makeFlicker() { const f = document.createElement("div"); f.className = "fx flicker"; gameEl.appendChild(f); }
function makeWind(n) { for (let i = 0; i < n; i++) { const w = document.createElement("div"); w.className = "wind-line"; w.style.top = Math.random()*90+"%"; const dur = 1.5+Math.random()*2; w.style.animationDuration = dur+"s"; w.style.animationDelay = -Math.random()*6+"s"; gameEl.appendChild(w); } }

// ===== ข้อความแบบพิมพ์ทีละตัว + แบ่งหน้า =====
let captionPages = [];
let pageIndex = 0;
let typeTimer = null;
let typing = false;
let onCaptionDone = null;

function startCaption(text, done) {
  clearInterval(typeTimer);
  onCaptionDone = done;
  captionPages = (text || "").split(/\n\s*\n/).filter((p) => p.trim());
  pageIndex = 0;
  if (!captionPages.length) { captionEl.style.display = "none"; finishCaption(); return; }
  captionEl.style.display = "";
  showPage();
}
function showPage() {
  const page = captionPages[pageIndex].trim();
  const graphemes = (window.Intl && Intl.Segmenter)
    ? [...new Intl.Segmenter("th", { granularity: "grapheme" }).segment(page)].map((s) => s.segment)
    : Array.from(page);
  let i = 0;
  typing = true;
  captionEl.textContent = "";
  const more = document.createElement("span");
  more.className = "more";
  more.textContent = pageIndex < captionPages.length - 1 ? "▼ แตะเพื่ออ่านต่อ" : "▼";
  more.style.display = "none";
  captionEl.appendChild(document.createTextNode(""));
  captionEl.appendChild(more);
  const textNode = captionEl.firstChild;
  typeTimer = setInterval(() => {
    if (i < graphemes.length) textNode.data += graphemes[i++];
    else { clearInterval(typeTimer); typing = false; more.style.display = ""; }
  }, 30);
}
function captionTapped() {
  if (typing) {
    clearInterval(typeTimer);
    typing = false;
    captionEl.firstChild.data = captionPages[pageIndex].trim();
    captionEl.querySelector(".more").style.display = "";
    return;
  }
  pageIndex++;
  if (pageIndex < captionPages.length) showPage();
  else finishCaption();
}
function finishCaption() {
  captionEl.onclick = null;
  const cb = onCaptionDone;
  onCaptionDone = null;
  if (cb) cb();
}
captionEl.addEventListener("click", (e) => { e.stopPropagation(); captionTapped(); });

// ===== จอดำจบตอน (คลิฟแฮงเกอร์แบบละคร) =====
function showEpisodeCard(ep, next) {
  playSfx("assets/audio/sfx-click.mp3");
  captionEl.style.display = "none";
  epEl.querySelector(".ep-title").textContent = ep.title;
  epEl.querySelector(".ep-teaser").textContent = ep.teaser;
  epEl.style.display = "flex";
  epEl.classList.remove("fade-in");
  void epEl.offsetWidth;
  epEl.classList.add("fade-in");
  epEl.onclick = () => { epEl.style.display = "none"; gotoScene(next); };
}

// ===== ระบบเสียง =====
const BGM = {
  main: "assets/audio/bgm-main.mp3",
  crisis: "assets/audio/bgm-crisis.mp3",
  storm: "assets/audio/bgm-storm.mp3",
  warm: "assets/audio/bgm-warm.mp3",
  s2drama: "assets/audio/s2-bgm-drama.mp3",
  s2sad: "assets/audio/s2-bgm-sad.mp3",
  s2lux: "assets/audio/s2-bgm-lux.mp3",
  s3bgm: "assets/audio/s3-bgm.mp3",
  s4bgm: "assets/audio/s4-bgm.mp3",
};
let bgmAudio = new Audio();
bgmAudio.loop = true;
bgmAudio.volume = 0.45;
let currentBgmKey = null;
let muted = false;
let sfxCache = {};
function playSfx(path) {
  if (muted || !path) return;
  const a = (sfxCache[path] ||= new Audio(path));
  a.currentTime = 0;
  a.volume = 0.6;
  a.play().catch(() => {});
}
function setBgm(key) {
  if (key === currentBgmKey) return;
  currentBgmKey = key;
  if (muted) return;
  bgmAudio.src = BGM[key];
  bgmAudio.play().catch(() => {});
}
const muteBtn = document.getElementById("mute");
function renderMuteIcon() {
  muteBtn.innerHTML = `<img class="hud-ic" src="assets/ui/${muted ? "sound-off" : "sound-on"}.png" alt="">`;
}
muteBtn.onclick = () => {
  muted = !muted;
  renderMuteIcon();
  if (muted) bgmAudio.pause();
  else bgmAudio.play().catch(() => {});
};
renderMuteIcon();
document.body.addEventListener("pointerdown", () => {
  if (!muted && !currentBgmKey && S) setBgm(S.bgm[currentSceneId] || S.bgmDefault || "main");
  else if (!muted && bgmAudio.paused) bgmAudio.play().catch(() => {});
});

// ===== หน้าเลือกนิยาย =====
const STORIES = [
  { key: "s1", title: "ฤดูหนาวปีนั้น", cover: "assets/cover1.png", status: "play", badge: "เล่นได้เลย" },
  { key: "s2", title: "ฤดูฝนที่หายไป", cover: "assets/cover2.png", status: "play", badge: "ครบ 12 ตอน" },
  { key: "s3", title: "ฤดูร้อนสุดท้าย", cover: "assets/cover3.png", status: "play", badge: "ตาทิพย์ · 12 ตอน" },
  { key: "s4", title: "ฤดูใบไม้ร่วงสีแดง", cover: "assets/cover4.png", status: "play", badge: "ระบบโกง · 12 ตอน" },
];
const menuEl = document.getElementById("menu");
const toastEl = document.getElementById("toast");

function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  setTimeout(() => toastEl.classList.remove("show"), 1800);
}
function buildMenu() {
  const grid = document.getElementById("menu-grid");
  grid.innerHTML = "";
  for (const st of STORIES) {
    const card = document.createElement("div");
    card.className = "story-card" + (st.status === "play" ? "" : " locked");
    card.innerHTML =
      `<img src="${st.cover}" alt="">
       <div class="veil"></div>
       <div class="info">
         <span class="name">${st.title}</span>
         <span class="badge ${st.status}">${st.badge}</span>
       </div>`;
    card.onclick = () => {
      if (st.status === "play") startGame(st.key);
      else showToast("✨ " + st.title + " — เร็วๆ นี้");
    };
    grid.appendChild(card);
  }
}
function showMenu() {
  clearDynamic();
  clearInterval(typeTimer);
  captionEl.style.display = "none";
  endingEl.style.display = "none";
  epEl.style.display = "none";
  hudEl.style.display = "none";
  bgmAudio.pause();
  currentBgmKey = null;
  menuEl.style.display = "flex";
}

function startGame(key) {
  curKey = key;
  S = GAMES[key];
  flags = S.flags0();
  menuEl.style.display = "none";
  hudEl.style.display = "";
  bgEl.src = S.bgDefault;
  renderHUD();
  gotoScene(S.start);
}

function restart() {
  flags = S.flags0();
  bgEl.src = S.bgDefault;
  renderHUD();
  gotoScene(S.start);
}

// ===== ระบบกันไอคอนซ้อนกัน: ถ้าตำแหน่งที่ประกาศชนตัวละคร/ไอคอนอื่น ให้ย้ายไปช่องว่างใกล้ๆ =====
function boxCollides(cx, cy, hw, hh, boxes) {
  for (const b of boxes) {
    const ox = Math.min(cx + hw, b.cx + b.hw) - Math.max(cx - hw, b.cx - b.hw);
    const oy = Math.min(cy + hh, b.cy + b.hh) - Math.max(cy - hh, b.cy - b.hh);
    if (ox > 5 && oy > 4) return true;
  }
  return false;
}
function layoutHotspots(hotspots, actors) {
  const obstacles = actors.map((a) => ({
    cx: a.x, cy: Math.min(a.y, 76), hw: a.w / 2, hh: (a.w * 1.4) / 2,
  }));
  const placed = [];
  const result = [];
  const SLOTS = [[22, 72], [78, 72], [50, 80], [26, 62], [74, 62], [50, 56], [12, 80], [88, 80], [20, 28], [80, 28]];
  for (const h of hotspots) {
    let x = h.x, y = Math.min(h.y, 82);
    const hw = h.w / 2, hh = (h.w * 0.5625) / 2 + 2;
    if (boxCollides(x, y, hw, hh, placed.concat(obstacles))) {
      for (const [sx, sy] of SLOTS) {
        if (!boxCollides(sx, sy, hw, hh, placed.concat(obstacles))) { x = sx; y = sy; break; }
      }
    }
    placed.push({ cx: x, cy: y, hw, hh });
    result.push({ x, y });
  }
  return result;
}

// ===== ฉากหลัก =====
function gotoScene(id) {
  currentSceneId = id;
  clearDynamic();
  clearInterval(typeTimer);
  const story = S.story();
  const scene = story[id];

  if (scene.dynamic === "ending") {
    const e = S.compute(flags);
    if (curKey === "s1")
      setBgm(e.title === "หนาว" ? "storm" : e.title === "สดใส" || e.title === "บ้านที่สอง" ? "warm" : "main");
    else setBgm("main");
    captionEl.style.display = "none";
    if (e.bg) bgEl.src = e.bg;
    applyFx(e.fx);
    endingEl.style.display = "flex";
    endingEl.classList.remove("fade-in");
    void endingEl.offsetWidth;
    endingEl.classList.add("fade-in");
    endingEl.innerHTML = "";
    const title = document.createElement("div");
    title.className = "title";
    title.textContent = e.title;
    const text = document.createElement("div");
    text.textContent = e.text;
    const btn = document.createElement("button");
    btn.className = "end-btn primary";
    btn.innerHTML = '<img src="assets/ui/retry.png" alt=""><span>เล่นอีกครั้ง</span>';
    btn.onclick = restart;
    const home = document.createElement("button");
    home.className = "end-btn";
    home.innerHTML = '<img src="assets/ui/home.png" alt=""><span>เลือกเรื่องอื่น</span>';
    home.onclick = showMenu;
    const btnRow = document.createElement("div");
    btnRow.className = "end-btns";
    btnRow.append(btn, home);
    endingEl.append(title, text, btnRow);
    return;
  }

  endingEl.style.display = "none";
  if (scene.bg) bgEl.src = scene.bg;
  applyFx(scene.fx);
  setBgm(S.bgm[id] || S.bgmDefault || "main");
  if (S.sfx[id]) playSfx(S.sfx[id]);

  // กล่องข้อความระบบ (เรื่อง 4): สไตล์ sci-fi + เส้นบรรทัดระบบเพิ่มเติม
  captionEl.classList.toggle("sys", !!scene.sysbox);
  let capText = scene.caption || "";
  if (scene.syslines) capText += "\n\n" + scene.syslines.join("\n");

  (scene.actors || []).forEach((a) => {
    const el = document.createElement("div");
    el.className = "actor" + (a.shiver ? " shiver" : "");
    el.style.left = a.x + "%";
    el.style.top = Math.min(a.y, 76) + "%";
    el.style.width = a.w + "%";
    el.innerHTML = `<img src="${a.img}" alt="">`;
    gameEl.appendChild(el);
  });

  startCaption(capText, () => {
    // จบตอน → การ์ดคลิฟแฮงเกอร์
    if (scene.epEnd) { showEpisodeCard(scene.epEnd, scene.epEnd.next); return; }

    const hotspotPos = layoutHotspots(scene.hotspots || [], scene.actors || []);

    (scene.hotspots || []).forEach((h, hi) => {
      const ok = meetsRequirement(h.requires);
      const pos = hotspotPos[hi];
      const el = document.createElement("div");
      el.className = "hotspot" + (ok ? " fade-in" : " locked");
      el.style.left = pos.x + "%";
      el.style.top = Math.min(pos.y, 82) + "%";
      el.style.width = h.w + "%";
      el.innerHTML = h.img
        ? `<img src="${h.img}" alt=""><div class="lbl">${hotspotLabel(h)}</div>`
        : `<div class="emoji">❔</div>`;
      if (!ok) el.innerHTML += `<div class="lock">🔒</div>`;
      el.onclick = (ev) => {
        ev.stopPropagation();
        if (!ok) return;
        playSfx("assets/audio/sfx-click.mp3");
        if (h.effects) {
          for (const [k, v] of Object.entries(h.effects)) {
            flags[k] = Math.max(0, flags[k] + v);
          }
        }
        if (h.set) Object.assign(flags, h.set);
        renderHUD();
        gotoScene(h.next);
      };
      gameEl.appendChild(el);
    });

    nudgeTimer = setTimeout(() => {
      gameEl.querySelectorAll(".hotspot:not(.locked)").forEach((el) => el.classList.add("nudge"));
    }, 15000);
  });
}

buildMenu();
showMenu();
