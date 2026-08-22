// ===== ตัวเกมหลัก (point-and-click ภาพล้วน + ระบบ requires/hidden flags) =====

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
  document.getElementById("hud-warmth").textContent = "●".repeat(Math.max(1, Math.min(7, flags.warmth)));
  document.getElementById("hud-trust").textContent = "●".repeat(Math.max(1, Math.min(7, flags.trust)));
  const a = Math.max(0, 0.38 - flags.warmth * 0.06);
  overlayEl.style.background = `rgba(40, 70, 120, ${a})`;
}

function clearDynamic() {
  clearTimeout(nudgeTimer);
  gameEl.querySelectorAll(".actor, .hotspot, .snow").forEach((el) => el.remove());
}

function makeSnow() {
  for (let i = 0; i < 24; i++) {
    const s = document.createElement("div");
    s.className = "snow";
    s.textContent = "❅";
    s.style.left = Math.random() * 100 + "%";
    s.style.fontSize = 0.5 + Math.random() * 1 + "rem";
    s.style.animationDuration = 5 + Math.random() * 7 + "s";
    s.style.animationDelay = -Math.random() * 10 + "s";
    gameEl.appendChild(s);
  }
}

function gotoScene(id) {
  currentSceneId = id;
  clearDynamic();
  const scene = STORY[id];

  if (scene.dynamic === "ending") {
    const e = computeEnding(flags);
    captionEl.style.display = "none";
    endingEl.style.display = "flex";
    endingEl.classList.remove("fade-in");
    void endingEl.offsetWidth;
    endingEl.classList.add("fade-in");
    endingEl.innerHTML = "";
    const title = document.createElement("div");
    title.className = "title";
    title.textContent = `${e.emoji} ${e.title}`;
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
    el.innerHTML = h.img
      ? `<img src="${h.img}" alt="">`
      : `<div class="emoji">${h.icon || "❔"}</div>`;
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

makeSnow();
renderHUD();
gotoScene("start");
