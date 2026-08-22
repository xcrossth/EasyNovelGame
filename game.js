// ===== ระบบเสียง =====
// BGM สลับตามกลุ่มฉาก + SFX คลิก/เหตุการณ์ (เบราว์เซอร์ต้องรอผู้เล่นแตะครั้งแรกก่อน)
const BGM = {
  main: "assets/audio/bgm-main.mp3",
  crisis: "assets/audio/bgm-crisis.mp3",
  storm: "assets/audio/bgm-storm.mp3",
  warm: "assets/audio/bgm-warm.mp3",
};
const SCENE_BGM = {
  a3_crisis: "crisis", a3_path: "crisis", a3_river: "crisis", a3_clinic: "crisis",
  a3_return: "crisis", a3_aunt_door: "crisis", a3_aunt_in: "crisis",
  a3_herb_search: "crisis", a3_gamble: "crisis",
  a5_prep: "storm", a5_intro: "storm", a5_huddle: "storm", a5_fireout: "storm", a5_escape: "storm",
  a5_relight: "warm", a5_knock: "warm", a5_dawn: "warm",
};
const SCENE_SFX = {
  a2_knock: "assets/audio/sfx-knock.mp3",
  a4_open: "assets/audio/sfx-open.mp3",
};
let bgmAudio = new Audio();
bgmAudio.loop = true;
bgmAudio.volume = 0.45;
let currentBgmKey = null;
let muted = false;
let sfxCache = {};
for (const p of ["assets/audio/sfx-click.mp3"]) {
  sfxCache[p] = new Audio(p);
  sfxCache[p].volume = 0.6;
}
function playSfx(path) {
  if (muted) return;
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
document.getElementById("mute").onclick = () => {
  muted = !muted;
  document.getElementById("mute").textContent = muted ? "🔇" : "🔊";
  if (muted) bgmAudio.pause();
  else { bgmAudio.play().catch(() => {}); }
};
// แตะแรกของเซสชัน = เริ่มเสียง (นโยบาย autoplay ของเบราว์เซอร์)
document.body.addEventListener(
  "pointerdown",
  () => {
    if (!muted && !currentBgmKey) setBgm(SCENE_BGM[currentSceneId] || "main");
    else if (!muted && bgmAudio.paused) bgmAudio.play().catch(() => {});
  },
  { once: false }
);

// ===== รายการนิยาย (หน้าเลือกเรื่อง) =====
const STORIES = [
  { id: 1, title: "ฤดูหนาวปีนั้น", cover: "assets/cover1.png", status: "play", badge: "เล่นได้เลย" },
  { id: 2, title: "ฤดูฝนที่หายไป", cover: "assets/cover2.png", status: "wip", badge: "กำลังเขียนบท" },
  { id: 3, title: "ฤดูร้อนสุดท้าย", cover: "assets/cover3.png", status: "soon", badge: "เร็วๆ นี้" },
  { id: 4, title: "ฤดูใบไม้ร่วงสีแดง", cover: "assets/cover4.png", status: "soon", badge: "เร็วๆ นี้" },
];
const menuEl = document.getElementById("menu");
const hudEl = document.getElementById("hud");
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
      if (st.status === "play") startStory1();
      else if (st.status === "wip") showToast("🖋 " + st.title + " — กำลังเขียนบทอยู่...");
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
  hudEl.style.display = "none";
  bgmAudio.pause();
  currentBgmKey = null;
  menuEl.style.display = "flex";
}

function startStory1() {
  menuEl.style.display = "none";
  hudEl.style.display = "";
  restart();
}

// ===== ตัวเกมหลัก (point-and-click + fx บรรยากาศ) =====

let flags = { warmth: 0, trust: 0, helpedAunt: false, knowsBox: false, openedBox: false, auntRescue: false };
let currentSceneId = "start";
let nudgeTimer = null;
const gameEl = document.getElementById("game");

const bgEl = document.getElementById("bg");
const overlayEl = document.getElementById("overlay-cold");
const captionEl = document.getElementById("caption");
const endingEl = document.getElementById("ending");

function meetsRequirement(req) {
  if (!req) return true;
  return Object.keys(req).every((k) => flags[k] >= req[k]);
}

function renderHUD() {
  document.getElementById("hud-warmth").textContent = "●".repeat(Math.max(1, Math.min(8, flags.warmth)));
  document.getElementById("hud-trust").textContent = "●".repeat(Math.max(1, Math.min(8, flags.trust)));
  const a = Math.max(0, 0.38 - flags.warmth * 0.05);
  overlayEl.style.background = `rgba(40, 70, 120, ${a})`;
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

function makeSnow(n) {
  for (let i = 0; i < n; i++) {
    const s = document.createElement("div");
    s.className = "snow";
    s.textContent = "❅";
    s.style.left = Math.random() * 100 + "%";
    s.style.fontSize = 0.5 + Math.random() + "rem";
    s.style.animationDuration = 5 + Math.random() * 7 + "s";
    s.style.animationDelay = -Math.random() * 10 + "s";
    gameEl.appendChild(s);
  }
}

function makePetals(n) {
  for (let i = 0; i < n; i++) {
    const p = document.createElement("div");
    p.className = "petal";
    p.style.left = Math.random() * 100 + "%";
    p.style.animationDuration = 7 + Math.random() * 8 + "s";
    p.style.animationDelay = -Math.random() * 12 + "s";
    gameEl.appendChild(p);
  }
}

function makeEmbers(n) {
  for (let i = 0; i < n; i++) {
    const e = document.createElement("div");
    e.className = "ember";
    e.style.left = 20 + Math.random() * 60 + "%";
    const d = 3 + Math.random() * 5;
    e.style.animationDuration = d + "s";
    e.style.animationDelay = -Math.random() * d + "s";
    gameEl.appendChild(e);
  }
}

function makeDust(n) {
  for (let i = 0; i < n; i++) {
    const d = document.createElement("div");
    d.className = "dust";
    d.style.left = Math.random() * 100 + "%";
    d.style.top = 20 + Math.random() * 60 + "%";
    const dur = 4 + Math.random() * 6;
    d.style.animationDuration = dur + "s";
    d.style.animationDelay = -Math.random() * dur + "s";
    gameEl.appendChild(d);
  }
}

function makeSteam(n) {
  for (let i = 0; i < n; i++) {
    const s = document.createElement("div");
    s.className = "steam";
    s.style.left = 35 + Math.random() * 30 + "%";
    s.style.top = 55 + Math.random() * 15 + "%";
    const dur = 3 + Math.random() * 3;
    s.style.animationDuration = dur + "s";
    s.style.animationDelay = -Math.random() * dur + "s";
    gameEl.appendChild(s);
  }
}

function makeFog() {
  for (let i = 0; i < 2; i++) {
    const f = document.createElement("div");
    f.className = "fx fog";
    f.style.top = i === 0 ? "30%" : "60%";
    f.style.animationDelay = i * -8 + "s";
    gameEl.appendChild(f);
  }
}

function makeFlicker() {
  const f = document.createElement("div");
  f.className = "fx flicker";
  gameEl.appendChild(f);
}

function makeWind(n) {
  for (let i = 0; i < n; i++) {
    const w = document.createElement("div");
    w.className = "wind-line";
    w.style.top = Math.random() * 90 + "%";
    const dur = 1.5 + Math.random() * 2;
    w.style.animationDuration = dur + "s";
    w.style.animationDelay = -Math.random() * 6 + "s";
    gameEl.appendChild(w);
  }
}

// ===== ข้อความแบบพิมพ์ทีละตัว + แบ่งหน้า (แยกหน้าด้วยบรรทัดว่าง) =====
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
    if (i < graphemes.length) {
      textNode.data += graphemes[i++];
    } else {
      clearInterval(typeTimer);
      typing = false;
      more.style.display = "";
    }
  }, 30);
}

function captionTapped() {
  if (typing) {
    // แตะตอนกำลังพิมพ์ = แสดงข้อความเต็มทันที
    clearInterval(typeTimer);
    typing = false;
    const page = captionPages[pageIndex].trim();
    captionEl.firstChild.data = page;
    captionEl.querySelector(".more").style.display = "";
    return;
  }
  pageIndex++;
  if (pageIndex < captionPages.length) {
    showPage();
  } else {
    finishCaption();
  }
}

function finishCaption() {
  captionEl.onclick = null;
  const cb = onCaptionDone;
  onCaptionDone = null;
  if (cb) cb();
}
captionEl.addEventListener("click", (e) => { e.stopPropagation(); captionTapped(); });

function gotoScene(id) {
  currentSceneId = id;
  clearDynamic();
  clearInterval(typeTimer);
  const scene = STORY[id];

  if (scene.dynamic === "ending") {
    const e = computeEnding(flags);
    setBgm(e.title === "หนาว" ? "storm" : e.title === "สดใส" || e.title === "บ้านที่สอง" ? "warm" : "main");
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
    btn.id = "restart";
    btn.textContent = "🔄 อีกครั้ง";
    btn.onclick = restart;
    const home = document.createElement("button");
    home.id = "restart";
    home.style.background = "rgba(255,255,255,.14)";
    home.style.color = "var(--text)";
    home.textContent = "🏠 เลือกเรื่องอื่น";
    home.onclick = showMenu;
    endingEl.append(title, text, btn, home);
    return;
  }

  endingEl.style.display = "none";
  if (scene.bg) bgEl.src = scene.bg;
  applyFx(scene.fx);
  setBgm(SCENE_BGM[id] || "main");
  if (SCENE_SFX[id]) playSfx(SCENE_SFX[id]);

  // ตัวละคร/วัตถุประกอบขึ้นทันที ไม่ให้จอว่างระหว่างพิมพ์ข้อความ
  (scene.actors || []).forEach((a) => {
    const el = document.createElement("div");
    el.className = "actor" + (a.shiver ? " shiver" : "");
    el.style.left = a.x + "%";
    el.style.top = Math.min(a.y, 76) + "%";
    el.style.width = a.w + "%";
    el.innerHTML = `<img src="${a.img}" alt="">`;
    gameEl.appendChild(el);
  });

  // วัตถุที่คลิกได้จะโผล่หลังข้อความอ่านจบ เพื่อไม่ให้กดข้ามเนื้อเรื่อง
  startCaption(scene.caption, () => {
    (scene.hotspots || []).forEach((h) => {
      const ok = meetsRequirement(h.requires);
      const el = document.createElement("div");
      el.className = "hotspot" + (ok ? " fade-in" : " locked");
      el.style.left = h.x + "%";
      el.style.top = Math.min(h.y, 82) + "%";
      el.style.width = h.w + "%";
      el.innerHTML = h.img ? `<img src="${h.img}" alt="">` : `<div class="emoji">❔</div>`;
      if (!ok) el.innerHTML += `<div class="lock">🔒</div>`;
      el.onclick = (ev) => {
        ev.stopPropagation();
        if (!ok) return;
        playSfx("assets/audio/sfx-click.mp3");
        if (h.effects) {
          flags.warmth = Math.max(0, flags.warmth + (h.effects.warmth || 0));
          flags.trust = Math.max(0, flags.trust + (h.effects.trust || 0));
        }
        if (h.set) Object.assign(flags, h.set);
        renderHUD();
        gotoScene(h.next);
      };
      gameEl.appendChild(el);
    });

    nudgeTimer = setTimeout(() => {
      gameEl.querySelectorAll(".hotspot:not(.locked)").forEach((el) => el.classList.add("nudge"));
    }, 8000);
  });
}

function restart() {
  flags = { warmth: 0, trust: 0, helpedAunt: false, knowsBox: false, openedBox: false, auntRescue: false };
  bgEl.src = "assets/bg-house-portrait.png";
  renderHUD();
  gotoScene("start");
}

renderHUD();
gotoScene("start");
buildMenu();
showMenu();
