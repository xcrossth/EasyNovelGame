// ===== "ฤดูหนาวปีนั้น" — บทเต็ม 5 องก์ =====
// โครงสร้างฉาก:
//   caption : ข้อความสั้นๆ (1-2 บรรทัด)
//   bg      : ภาพพื้นหลัง (ถ้าต่างจากปกติ)
//   actors  : { img, x, y, w (%), shiver }
//   hotspots: { icon หรือ img, x, y, w, effects:{warmth,trust}, set:{แฟล็กซ่อน}, requires:{trust,trustMin...}, next }
//   requires: { trust: 4 } = ต้องมีค่าไว้ใจ >= 4 ถึงจะกดได้ (ขึ้น 🔒 ถ้ายังไม่ถึง)

const STORY = {

  // ═══════════ องก์ 1 — คืนแรก ═══════════

  start: {
    caption: "❄️ ค่ำแล้ว... บ้านหลังคาพัง หนาวเข้าทุกที",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { img: "assets/obj-firewood.png", x: 24, y: 74, w: 18, effects: { warmth: 1 }, next: "a1_wood" },
      { img: "assets/obj-ladder.png", x: 76, y: 32, w: 16, effects: { warmth: 1 }, next: "a1_roof" },
      { img: "assets/obj-blanket.png", x: 50, y: 86, w: 20, effects: { trust: 2 }, next: "a1_hug" },
    ],
  },

  a1_wood: {
    caption: "🪵 ฟืนเต็มแขน! แต่... แม่ไอเสียงแหบผิดปกติ",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true },
             { img: "assets/obj-firewood.png", x: 26, y: 62, w: 18 }],
    hotspots: [
      { icon: "🔥", x: 30, y: 44, w: 14, effects: { warmth: 1 }, next: "a1_end" },
      { icon: "💧", x: 74, y: 76, w: 12, effects: { trust: 2 }, next: "a1_mom_sick" },
    ],
  },

  a1_roof: {
    caption: "🪜 ลมหยุดหวีดแล้ว... แต่ยังไม่มีไฟ ไม่มีข้าวร้อน",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false }],
    hotspots: [
      { icon: "🪵", x: 24, y: 74, w: 14, effects: { warmth: 1 }, next: "a1_end" },
      { icon: "🍲", x: 76, y: 78, w: 14, effects: { trust: 1, warmth: 1 }, next: "a1_end" },
    ],
  },

  a1_hug: {
    caption: "🤗 กอดกันแน่นๆ... มะลิกระซิบว่า \"ตัวแม่ร้อนจัง\"",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true },
             { img: "assets/obj-blanket.png", x: 26, y: 84, w: 20 }],
    hotspots: [
      { icon: "💧", x: 28, y: 44, w: 12, effects: { trust: 1 }, next: "a1_mom_sick" },
      { icon: "🔥", x: 72, y: 50, w: 14, effects: { warmth: 1 }, next: "a1_end" },
    ],
  },

  a1_mom_sick: {
    caption: "💊 แม่ป่วยมาหลายวันแล้ว... แต่ไม่เคยบอกใคร",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { icon: "💧", x: 28, y: 46, w: 12, effects: { trust: 2 }, next: "a1_end" },
      { icon: "🌙", x: 74, y: 76, w: 12, effects: { trust: 1 }, next: "a1_end" },
    ],
  },

  a1_end: {
    caption: "🌟 ผ่านคืนแรกมาได้... แต่ฤดูหนาวเพิ่งเริ่ม",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { icon: "🌅", x: 50, y: 86, w: 14, next: "a2_intro" },
    ],
  },

  // ═══════════ องก์ 2 — ของแลกเปลี่ยน ═══════════

  a2_intro: {
    caption: "🌨 หิมะหนักทั้งวัน เย็นมาถึง... มีคนเคาะประตู",
    actors: [{ img: "assets/sprite-aunt.png", x: 50, y: 55, w: 40, shiver: false }],
    hotspots: [
      { icon: "🚪", x: 50, y: 86, w: 14, next: "a2_ask" },
    ],
  },

  a2_ask: {
    caption: "🧂 \"หนูๆ... ขอเกลือหน่อยได้ไหน ป้าตุ๋นอะไรไม่ได้เลย\"",
    actors: [{ img: "assets/sprite-aunt.png", x: 50, y: 55, w: 40, shiver: false }],
    hotspots: [
      { icon: "🧂", x: 28, y: 78, w: 14, effects: { trust: 2 }, set: { helpedAunt: true }, next: "a2_talk" },
      { icon: "🚫", x: 72, y: 78, w: 12, effects: { warmth: 1 }, next: "a2_refuse" },
    ],
  },

  a2_talk: {
    caption: "🧂 ป้าแก้มยิ้มกว้าง... แล้วชวนคุยเรื่องสมัยพ่อยังอยู่",
    actors: [{ img: "assets/sprite-aunt.png", x: 50, y: 55, w: 40, shiver: false }],
    hotspots: [
      { icon: "👂", x: 30, y: 80, w: 12, effects: { trust: 1 }, set: { knowsBox: true }, next: "a2_boxhint" },
      { icon: "🔥", x: 70, y: 80, w: 12, effects: { warmth: 1 }, next: "a2_dream" },
    ],
  },

  a2_boxhint: {
    caption: "\"กล่องไม้ของพ่อแกน่ะ... ป้าเห็นเค้าซ่อนไว้ที่โรงนาเก่า\"",
    actors: [{ img: "assets/sprite-aunt.png", x: 50, y: 55, w: 40, shiver: false }],
    hotspots: [
      { icon: "🤔", x: 50, y: 86, w: 12, effects: { trust: 1 }, next: "a2_dream" },
    ],
  },

  a2_refuse: {
    caption: "🚫 ป้าพยักหน้าเงียบๆ แล้วเดินกลับไปในซีกหิมะ...",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { icon: "🛏", x: 50, y: 86, w: 14, next: "a2_dream" },
    ],
  },

  a2_dream: {
    caption: "🌃 ดึกแล้ว... มะลิสะดุ้งตื่นจากฝันร้าย ร้องไห้สั่นๆ",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { icon: "🤍", x: 30, y: 78, w: 12, effects: { trust: 2 }, next: "a2_end" },
      { icon: "🕯", x: 70, y: 78, w: 12, effects: { warmth: 1 }, next: "a2_end" },
    ],
  },

  a2_end: {
    caption: "🌅 วันที่สาม... เงียบผิดปกติ",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { icon: "❗", x: 50, y: 86, w: 12, next: "a3_crisis" },
    ],
  },

  // ═══════════ องก์ 3 — ตัวเลือกหนักที่สุด ═══════════

  a3_crisis: {
    caption: "💦 แม่กำเริบ! หอบแรง ยาหมดเกลี้ยง... ต้องเลือกเดี๋ยวนี้",
    actors: [{ img: "assets/sprite-mom-sick.png", x: 50, y: 55, w: 48, shiver: false }],
    hotspots: [
      { icon: "🏥", x: 22, y: 76, w: 14, effects: { warmth: -1, trust: 1 }, next: "a3_town" },
      { icon: "🤝", x: 50, y: 86, w: 14, requires: { trust: 3 }, next: "a3_aunt" },
      { icon: "🌿", x: 78, y: 76, w: 14, effects: { trust: 1 }, next: "a3_herb" },
    ],
  },

  a3_town: {
    caption: "🏥 เดินฝ่าหิมะสามชั่วโมง... เกือบหลงทาง แต่ได้ยามา",
    actors: [{ img: "assets/sprite-mom-sick.png", x: 50, y: 55, w: 48, shiver: false }],
    hotspots: [
      { icon: "💊", x: 50, y: 86, w: 14, effects: { warmth: 1, trust: 1 }, next: "a3_end" },
    ],
  },

  a3_aunt: {
    caption: "🤝 ป้าแก้มเปิดประตูทันทีที่เห็นหน้า... \"รีบมา ยาป้ามี\"",
    actors: [{ img: "assets/sprite-mom-sick.png", x: 50, y: 55, w: 48, shiver: false }],
    hotspots: [
      { icon: "💊", x: 50, y: 86, w: 14, effects: { warmth: 1, trust: 1 }, set: { helpedAunt: true }, next: "a3_end" },
    ],
  },

  a3_herb: {
    caption: "🌿 มะลิช่วยจำ... \"ใบนี้! แม่เคยต้มให้หนูดื่ม\"",
    actors: [{ img: "assets/sprite-mom-sick.png", x: 50, y: 55, w: 48, shiver: false }],
    hotspots: [
      { icon: "🍵", x: 50, y: 86, w: 14, effects: { warmth: 1, trust: 2 }, next: "a3_end" },
    ],
  },

  a3_end: {
    caption: "🌙 ฟ้าผ่า... แม่หลับสบายแล้ว ไข้เริ่มลด",
    actors: [{ img: "assets/sprite-mom-sick.png", x: 50, y: 55, w: 48, shiver: false }],
    hotspots: [
      { icon: "🌅", x: 50, y: 86, w: 14, next: "a4_intro" },
    ],
  },

  // ═══════════ องก์ 4 — กล่องของพ่อ ═══════════

  a4_intro: {
    caption: "🗓 วันที่สี่ แม่อาการดีขึ้น... มะลิลากมือชี้ใต้ชั้นไม้",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false }],
    hotspots: [
      { icon: "🔑", x: 50, y: 84, w: 12, requires: { trust: 4 }, next: "a4_open" },
      { icon: "🌙", x: 76, y: 70, w: 12, next: "a5_intro" },
    ],
  },

  a4_open: {
    caption: "📦 \"พ่อเคยซ่อนกุญแจตรงนี้! มะลิจำได้!\"",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 40, w: 42, shiver: false },
             { img: "assets/obj-box.png", x: 50, y: 78, w: 30 }],
    hotspots: [
      { img: "assets/obj-box.png", x: 50, y: 78, w: 30, set: { openedBox: true }, next: "a4_letter" },
    ],
  },

  a4_letter: {
    caption: "✉️ จดหมายลาตัวของพ่อ... และเงินก้อนเล็กๆ ที่เก็บไว้ให้",
    actors: [{ img: "assets/obj-box.png", x: 50, y: 55, w: 34 }],
    hotspots: [
      { icon: "✉️", x: 30, y: 82, w: 12, effects: { trust: 2 }, next: "a4_letter2" },
      { icon: "💰", x: 70, y: 82, w: 12, effects: { warmth: 2 }, next: "a4_after" },
    ],
  },

  a4_letter2: {
    caption: "\"ลูกพี่... ดูแลแม่กับน้อง เหมือนที่พ่อเคยดูแล\"",
    actors: [{ img: "assets/obj-box.png", x: 50, y: 55, w: 34 }],
    hotspots: [
      { icon: "🤍", x: 50, y: 86, w: 12, effects: { trust: 1, warmth: 1 }, next: "a4_after" },
    ],
  },

  a4_after: {
    caption: "🕯 คืนนั้นบ้านเงียบ แต่ใจของทุกคนเต็มกว่าเมื่อไหร่",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false }],
    hotspots: [
      { icon: "🌅", x: 50, y: 86, w: 14, next: "a5_intro" },
    ],
  },

  // ═══════════ องก์ 5 — พายุ ═══════════

  a5_intro: {
    caption: "⛈ คืนสุดท้าย — พายุหิมะใหญ่ที่สุดในรอบสิบปี!",
    bg: "assets/bg-storm.png",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { icon: "🔥", x: 30, y: 78, w: 14, effects: { warmth: 1 }, next: "a5_fireout" },
      { icon: "🚪", x: 70, y: 78, w: 14, next: "a5_knock" },
    ],
  },

  a5_fireout: {
    caption: "💨 ลมพัดไฟดับ! ความมืดกลืนบ้านทั้งหลัง...",
    bg: "assets/bg-storm.png",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { icon: "🔥", x: 28, y: 78, w: 14, effects: { warmth: 1 }, next: "final" },
      { icon: "🚪", x: 72, y: 78, w: 14, requires: { helpedAunt: true }, next: "a5_knock" },
    ],
  },

  a5_knock: {
    caption: "🤝 ป้าแก้มยืนถือตะเกียงรออยู่หน้าประตู... \"ป้ารอแกอยู่นะ\"",
    bg: "assets/bg-storm.png",
    actors: [{ img: "assets/sprite-aunt.png", x: 50, y: 50, w: 40, shiver: false }],
    hotspots: [
      { icon: "🏡", x: 50, y: 86, w: 14, set: { auntRescue: true }, next: "final" },
    ],
  },

  final: {
    dynamic: "ending",
    ending: true,
  },
};

function computeEnding(flags) {
  const { warmth, trust, openedBox, helpedAunt, auntRescue } = flags;
  if (warmth >= 5 && trust >= 5 && openedBox)
    return { title: "🏡 สดใส", emoji: "🌟",
      text: "ผ่านฤดูหนาวมาได้ทั้งบ้าน รู้เรื่องพ่อครบทุกอย่าง\nตอนต้นฤดูใบไม้ผลิ ต้นหอมที่พ่อปลูกไว้ออกดอกครั้งแรก\n\n— จบแบบดีที่สุด —" };
  if (auntRescue && helpedAunt)
    return { title: "🏡 บ้านที่สอง", emoji: "🤝",
      text: "คืนพายุนั้น สองบ้านกลายเป็นครอบครัวเดียวกัน\nความดีที่ให้ไป กลับมาในวันที่หนาวที่สุด\n\n— จบแบบสายป้าแก้ม —" };
  if (warmth >= 4 && openedBox)
    return { title: "🔥 อบอุ่นพอ", emoji: "😌",
      text: "ไฟไม่เคยดับ ท้องไม่เคยว่าง\nแต่บางคืน...ยังอยากรู้ว่าในกล่องมีอะไร\n\n— จบแบบดี —" };
  if (trust >= 4)
    return { title: "💛 แน่นแฟบ", emoji: "🤗",
      text: "บ้านหนาว แต่ไม่มีใครหนาวเพียงลำพัง\nต่างคนต่างเล่าเรื่องพ่อให้กันฟังทั้งคืน\n\n— จบแบบกลาง —" };
  if (warmth >= 3)
    return { title: "🌫 ค้างเติ่ง", emoji: "🍂",
      text: "ผ่านฤดูหนาวมาได้... แบบที่ไม่มีใครล้ม\nแต่ก็ไม่มีใครสักคนที่เต็มเปี่ยม\n\n— จบแบบเหลือความรู้สึกว่าพลาดอะไรไป —" };
  return { title: "❄️ หนาว", emoji: "🥶",
    text: "ไฟดับกลางดึก ผ้าห่มบางเกินไป\nคืนนั้นฝังอยู่ในความทรงจำเป็นความหนาวที่ยาวนานที่สุด\n\n— จบแบบเศร้า ลองเล่นใหม่ดู —" };
}
