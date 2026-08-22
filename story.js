// ===== เนื้อเรื่อง (ฉบับภาพล้วน แนวตั้ง 9:16) =====
// โครงสร้างฉาก:
//   caption : ข้อความสั้นๆ ใต้จอ (ใส่น้อยที่สุด หรือไม่ใส่ก็ได้)
//   actors  : sprite ในฉาก { img, x, y, w (เป็น % ของจอ), shiver: สั่นไหม }
//   hotspots: วัตถุ/ตัวเลือกที่คลิกได้ { icon (emoji) หรือ img, x, y, w, effects, next }
//   bg      : (ถ้าฉากนี้ใช้ภาพพื้นหลังต่างจากเดิม)

const STORY = {
  start: {
    caption: "❄️ ค่ำแล้ว... บ้านหลังคาพัง หนาวเข้าทุกที",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { img: "assets/obj-firewood.png", x: 24, y: 74, w: 18, effects: { warmth: 1 }, next: "firewood" },
      { img: "assets/obj-ladder.png", x: 76, y: 32, w: 16, effects: { warmth: 1 }, next: "roof" },
      { img: "assets/obj-blanket.png", x: 50, y: 86, w: 20, effects: { trust: 2 }, next: "hug" },
    ],
  },

  firewood: {
    caption: "🪵 ฟืนเก็บได้เต็มแขนแล้ว",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true },
             { img: "assets/obj-firewood.png", x: 26, y: 62, w: 18 }],
    hotspots: [
      { icon: "🔥", x: 30, y: 45, w: 14, effects: { warmth: 1 }, next: "fire" },
      { icon: "⏳", x: 18, y: 84, w: 12, effects: { trust: 1 },  next: "save_wood" },
      { icon: "💊", x: 80, y: 78, w: 12, effects: { trust: 2 },  next: "mom_sick" },
    ],
  },

  roof: {
    caption: "🪜 อุดหลังคาเสร็จ ลมหยุดหวีดแล้ว",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false }],
    hotspots: [
      { icon: "🪵", x: 24, y: 74, w: 14, effects: { warmth: 1 }, next: "night_wood" },
      { icon: "🍲", x: 76, y: 78, w: 14, effects: { trust: 2 },  next: "share_food" },
      { icon: "🛏", x: 50, y: 88, w: 14, effects: { warmth: 1, trust: 1 }, next: "sleep_together" },
    ],
  },

  hug: {
    caption: "🤗 กอดกันแน่นๆ... แต่มะลิตัวร้อนผิดปกติ",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true },
             { img: "assets/obj-blanket.png", x: 26, y: 84, w: 20 }],
    hotspots: [
      { icon: "💧", x: 28, y: 46, w: 12, effects: { trust: 2 }, next: "care_sister" },
      { icon: "💊", x: 74, y: 76, w: 12, effects: { trust: 1 }, next: "get_medicine" },
      { icon: "🍲", x: 52, y: 88, w: 14, effects: { warmth: 1 }, next: "warm_meal" },
    ],
  },

  fire: {
    caption: "🔥 ไฟลุกโชน มะลิหัวเราะแล้ว",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 56, y: 55, w: 42, shiver: false }],
    hotspots: [
      { icon: "👁", x: 26, y: 48, w: 12, effects: { warmth: 1 }, next: "final" },
      { icon: "🛏", x: 52, y: 88, w: 14, effects: {},           next: "final" },
    ],
  },

  save_wood: {
    caption: "⏳ เก็บฟืนไว้ครึ่งหนึ่ง เผื่อวันพรุ่งนี้",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true },
             { img: "assets/obj-firewood.png", x: 26, y: 62, w: 18 }],
    hotspots: [
      { icon: "🍲", x: 50, y: 86, w: 14, effects: { warmth: 1 }, next: "final" },
      { icon: "🛏", x: 76, y: 78, w: 14, effects: { trust: 1 },  next: "final" },
    ],
  },

  mom_sick: {
    caption: "💊 แม่ป่วยมาหลายวัน แต่ไม่เคยบอกใคร",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { icon: "💧", x: 28, y: 46, w: 12, effects: { trust: 2 }, next: "final" },
      { icon: "🌙", x: 74, y: 76, w: 12, effects: { trust: 1 }, next: "final" },
    ],
  },

  night_wood: {
    caption: "🌙 กลางดึก... กองไม้ใหญ่ข้างบ้านร้าง",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 60, y: 55, w: 42, shiver: true },
             { img: "assets/obj-firewood.png", x: 25, y: 60, w: 18 }],
    hotspots: [
      { icon: "🔥", x: 50, y: 84, w: 14, effects: { warmth: 1, trust: 1 }, next: "final" },
      { icon: "🧥", x: 78, y: 76, w: 14, effects: { trust: 1 },             next: "final" },
    ],
  },

  share_food: {
    caption: "🍲 ขนมชิ้นสุดท้าย แบ่งกันสามส่วน",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true },
             { img: "assets/obj-food.png", x: 72, y: 76, w: 18 }],
    hotspots: [
      { icon: "🛏", x: 26, y: 78, w: 14, effects: { warmth: 1, trust: 1 }, next: "final" },
      { icon: "🌟", x: 50, y: 88, w: 12, effects: {},                     next: "final" },
    ],
  },

  sleep_together: {
    caption: "🛏 ผ้าห่มผืนเดียว คนสามคน",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false }],
    hotspots: [
      { icon: "🌅", x: 28, y: 68, w: 14, effects: { trust: 1 }, next: "final" },
      { icon: "🪵", x: 72, y: 74, w: 14, effects: { warmth: 1 }, next: "final" },
    ],
  },

  care_sister: {
    caption: "💧 เช็ดตัวมะลิทั้งคืน... เช้ามาไข้ลดแล้ว 💛",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false }],
    hotspots: [
      { icon: "🌅", x: 50, y: 86, w: 14, effects: { trust: 2 }, next: "final" },
    ],
  },

  get_medicine: {
    caption: "💊 คุณป้าให้ยาและฟืน \"พรุ่งนี้มาหาป้าอีกนะ\"",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false }],
    hotspots: [
      { icon: "🏠", x: 50, y: 86, w: 14, effects: { warmth: 1, trust: 1 }, next: "final" },
    ],
  },

  warm_meal: {
    caption: "🍲 ข้าวต้มร้อนๆ มะลิขอเพิ่มอีก!",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false },
             { img: "assets/obj-food.png", x: 28, y: 78, w: 18 }],
    hotspots: [
      { icon: "🛏", x: 72, y: 80, w: 14, effects: { warmth: 1, trust: 1 }, next: "final" },
    ],
  },

  final: {
    dynamic: "ending",
    ending: true,
  },
};

function computeEnding(flags) {
  const { warmth, trust } = flags;
  if (warmth >= 3 && trust >= 3)
    return { title: "🏡 สดใส", emoji: "🌟",
      text: "ฤดูหนาวที่อบอุ่นที่สุด\nแม่ ลูก และบ้านหลังนี้ ผ่านฤดูหนาวมาด้วยกัน\n\n— จบแบบดีที่สุด —" };
  if (warmth >= 2)
    return { title: "🔥 อบอุ่นพอ", emoji: "😌",
      text: "คืนนั้นผ่านไปได้ด้วยกัน\nการรอดมาแบบเรียบง่าย ก็เป็นชัยชนะอย่างหนึ่ง\n\n— จบแบบดี —" };
  if (trust >= 2)
    return { title: "💛 แน่นแฟบ", emoji: "🤗",
      text: "บ้านหนาว แต่ไม่มีใครหนาวเพียงลำพัง\n\n— จบแบบกลาง —" };
  return { title: "❄️ หนาว", emoji: "🥶",
    text: "ไฟดับกลางดึก...\nถ้าเลือกต่างออกไป คืนนี้อาจอบอุ่นกว่านี้\n\n— จบแบบเศร้า ลองใหม่อีกครั้ง —" };
}
