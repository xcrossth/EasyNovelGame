# -*- coding: utf-8 -*-
# วาดแผนภาพเส้นทางเนื้อเรื่องจาก map-story*.json
import json, re
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch
from matplotlib import font_manager

thai = None
for f in font_manager.fontManager.ttflist:
    if f.name in ("Tahoma", "Leelawadee UI", "Microsoft Sans Serif"):
        thai = f.name; break
plt.rcParams["font.family"] = thai or "sans-serif"

def build(jsonfile, start, out, title, act_of):
    graph = json.load(open(jsonfile, encoding="utf-8"))
    depth = {start: 0}
    q = [start]; edges = []
    while q:
        cur = q.pop(0)
        for nx in graph[cur]["nexts"]:
            if nx in graph:
                edges.append((cur, nx))
                if nx not in depth:
                    depth[nx] = depth[cur] + 1
                    q.append(nx)
    levels = {}
    for sid, d in depth.items(): levels.setdefault(d, []).append(sid)
    maxd = max(levels)
    pos = {}
    for d, sids in levels.items():
        for i, sid in enumerate(sids):
            pos[sid] = (d, i - (len(sids) - 1) / 2)

    W = max(14, (maxd + 1) * 1.1)
    H = max(12, max(len(v) for v in levels.values()) * 0.42)
    fig, ax = plt.subplots(figsize=(W, H))
    ax.set_xlim(-0.6, maxd + 0.6)
    ymax = max(len(v) for v in levels.values()) / 2 + 0.6
    ax.set_ylim(-ymax, ymax)
    ax.axis("off")
    ax.set_title(title, fontsize=18, fontweight="bold", pad=16)

    for a, b in edges:
        x1, y1 = pos[a]; x2, y2 = pos[b]
        ax.annotate("", xy=(x2 - 0.44, y2), xytext=(x1 + 0.44, y1),
                    arrowprops=dict(arrowstyle="-|>", color="#8a94a6", lw=0.7, alpha=0.5))

    palette = ["#dbeafe", "#dcfce7", "#fef9c3", "#fce7f3", "#ede9fe", "#ffedd5", "#e0f2fe",
               "#d1fae5", "#fee2e2", "#f3e8ff", "#ecfeff", "#fef3c7"]
    for sid, (x, y) in pos.items():
        g = graph[sid]
        if g["ending"]:
            fc, ec = "#1a1a2e", "#e8a04c"
        else:
            a = act_of(sid)
            fc, ec = palette[a % len(palette)], "#57606f"
        cap = re.sub(r"[\"'`*]", "", g["caption"])
        cap = (cap[:14] + "…") if len(cap) > 15 else cap
        ax.add_patch(FancyBboxPatch((x - 0.46, y - 0.3), 0.92, 0.6,
                     boxstyle="round,pad=0.05", fc=fc, ec=ec, lw=0.9))
        ax.text(x, y + 0.08, cap, ha="center", va="center", fontsize=5.8, color="#1f2937")
        ax.text(x, y - 0.16, sid, ha="center", va="center", fontsize=4.4, color="#8b949e")

    plt.tight_layout()
    plt.savefig(out, dpi=150, bbox_inches="tight", facecolor="white")
    print("saved", out, len(pos), "scenes")

build("map-story1.json", "start", "map-story1.png",
      "ฤดูหนาวปีนั้น — แผนภาพเส้นทางเนื้อเรื่อง (62 ฉาก / 5 องก์ / จบ 6 แบบ)",
      lambda sid: int(sid[1]) if re.match(r"a\d", sid) else 5)
build("map-story2.json", "s2_start", "map-story2.png",
      "ฤดูฝนที่หายไป — แผนภาพเส้นทางเนื้อเรื่อง (92 ฉาก / 12 ตอน / จบ 8 แบบ)",
      lambda sid: int(m.group(1)) if (m := re.match(r"s2_e(\d+)", sid)) else 0)
