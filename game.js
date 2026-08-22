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
  gameEl.querySelectorAll(".actor, .hotspot, .snow, .fx").forEach((el) => el.remove());
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

function gotoScene(id) {
  currentSceneId = id;
  clearDynamic();
  const scene = STORY[id];

  if (scene.dynamic === "ending") {
    const e = computeEnding(flags);
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
    endingEl.append(title, text, btn);
    return;
  }

  endingEl.style.display = "none";
  captionEl.style.display = "";
  captionEl.textContent = scene.caption || "";
  if (scene.bg) bgEl.src = scene.bg;
  applyFx(scene.fx);

  (scene.actors || []).forEach((a) => {
    const el = document.createElement("div");
    el.className = "actor" + (a.shiver ? " shiver" : "");
    el.style.left = a.x + "%";
    el.style.top = Math.min(a.y, 76) + "%"; // ไม่ให้ตัวละครตกไปโดนแถบข้อความ
    el.style.width = a.w + "%";
    el.innerHTML = `<img src="${a.img}" alt="">`;
    gameEl.appendChild(el);
  });

  (scene.hotspots || []).forEach((h) => {
    const ok = meetsRequirement(h.requires);
    const el = document.createElement("div");
    el.className = "hotspot" + (ok ? " fade-in" : " locked");
    el.style.left = h.x + "%";
    el.style.top = Math.min(h.y, 82) + "%"; // เพดาน: วัตถุไม่ให้ต่ำกว่าแถบข้อความ
    el.style.width = h.w + "%";
    el.innerHTML = h.img ? `<img src="${h.img}" alt="">` : `<div class="emoji">❔</div>`;
    if (!ok) el.innerHTML += `<div class="lock">🔒</div>`;
    el.onclick = () => {
      if (!ok) return;
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

  // ถ้าผู้เล่นเฉยๆ นาน 8 วิ ให้วัตถุกระพริบเตือน
  nudgeTimer = setTimeout(() => {
    gameEl.querySelectorAll(".hotspot:not(.locked)").forEach((el) => el.classList.add("nudge"));
  }, 8000);
}

function restart() {
  flags = { warmth: 0, trust: 0, helpedAunt: false, knowsBox: false, openedBox: false, auntRescue: false };
  bgEl.src = "assets/bg-house-portrait.png";
  renderHUD();
  gotoScene("start");
}

renderHUD();
gotoScene("start");
