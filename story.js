// ===== "ฤดูหนาวปีนั้น" — ฉบับเต็ม 5 องก์ ~70 ฉาก, 20 พื้นหลัง =====
// ทุก hotspot ใช้ img | requires:{trust:n} = ต้องมีค่าถึงกดได้ | set = แฟล็กซ่อน
// fx: ["snow","embers","fog","flicker"] = เอฟเฟกต์ของฉาก

const STORY = {

  // ═══════════════════ องก์ 1 — คืนแรก ═══════════════════

  start: {
    fx: ["snow"],
    caption: "❄️ ค่ำแล้ว... บ้านหลังคาพัง หนาวเข้าทุกที\nแม่กับมะลิหดตัวอยู่มุมบ้าน",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { img: "assets/obj-firewood.png", x: 24, y: 74, w: 18, effects: { warmth: 1 }, next: "a1_forest" },
      { img: "assets/obj-ladder.png", x: 76, y: 32, w: 16, effects: { warmth: 1 }, next: "a1_rooftop" },
      { img: "assets/obj-blanket.png", x: 50, y: 82, w: 20, effects: { trust: 2 }, next: "a1_hug" },
    ],
  },

  a1_forest: {
    bg: "assets/bg-forest.png", fx: ["snow"],
    caption: "🌲 ป่าหลังบ้าน แสงสุดท้ายของวันส่องผ่านต้นไม้เปลือย\nเศษไม้แห้งมีเกลื่อน... แต่ลึกกว่านั้นมีบางอย่างสะท้อนแสง",
    hotspots: [
      { img: "assets/obj-firewood.png", x: 26, y: 62, w: 18, effects: { warmth: 1 }, next: "a1_axe" },
      { img: "assets/obj-lantern.png", x: 72, y: 66, w: 14, effects: { trust: 1 }, next: "a1_bird" },
    ],
  },

  a1_axe: {
    bg: "assets/bg-forest.png", fx: ["snow"],
    caption: "🪓 ขวานเก่าของพ่อ ยังคมอยู่ ฝังอยู่ใต้ตอไม้\nมะลิเคยบอกว่าพ่อใช้ตัวไม้ทำเครื่องรางให้แก่น้อง",
    hotspots: [
      { img: "assets/obj-firewood.png", x: 50, y: 78, w: 20, effects: { warmth: 1 }, set: { hasAxe: true }, next: "a1_wood_in" },
    ],
  },

  a1_bird: {
    bg: "assets/bg-forest.png", fx: ["snow"],
    caption: "🐦 นกตัวน้อยตัวแข็งอยู่กลางหิมะ ยังหายใจแผ่วเบา\nอุ้นกลับบ้านไปอุ่นข้างเตาไหม... แต่ข้าวกินก็กำลังจะหมด",
    hotspots: [
      { img: "assets/obj-heart.png", x: 30, y: 78, w: 14, effects: { trust: 1 }, set: { savedBird: true }, next: "a1_wood_in" },
      { img: "assets/obj-firewood.png", x: 70, y: 78, w: 18, effects: { warmth: 1 }, next: "a1_wood_in" },
    ],
  },

  a1_wood_in: {
    fx: ["snow"],
    caption: "🪵 กลับถึงบ้าน ฟืนเต็มแขน แขนกับไหล่เย็นชาไปหมด\nแต่คืนนี้มีไฟแน่แล้ว... แล้วแม่ก็ไอเสียงแหบผิดปกติ",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { img: "assets/obj-fire.png", x: 28, y: 46, w: 14, effects: { warmth: 1 }, next: "a1_kitchen" },
      { img: "assets/obj-cloth.png", x: 72, y: 78, w: 16, effects: { trust: 2 }, next: "a1_mom_sick" },
    ],
  },

  a1_rooftop: {
    bg: "assets/bg-roof.png", fx: ["snow", "wind"],
    caption: "🪜 ปีนขึ้นมาอุดรอยรั่ว มือสั่นจนแทบจับหมุดไม่ได้\nเหนือหัวคือท้องฟ้าสีเทากำลังจะมืด และหิมะที่กำลังจะตกหนัก",
    hotspots: [
      { img: "assets/obj-ladder.png", x: 30, y: 60, w: 16, effects: { warmth: 1 }, next: "a1_roof_done" },
      { img: "assets/obj-firewood.png", x: 70, y: 70, w: 16, effects: { warmth: 1 }, next: "a1_roof_done" },
    ],
  },

  a1_roof_done: {
    fx: ["snow"],
    caption: "🪜 ลงจากหลังคาได้พอดี ก้อนแรกของหิมะหนักก็เริ่มร่วง\nลมหวีดผ่านบ้าน... แต่คราวนี้มันเงียบลงเยอะแล้ว",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false }],
    hotspots: [
      { img: "assets/obj-firewood.png", x: 28, y: 74, w: 16, effects: { warmth: 1 }, next: "a1_kitchen" },
      { img: "assets/obj-food.png", x: 72, y: 78, w: 16, effects: { trust: 1, warmth: 1 }, next: "a1_kitchen" },
    ],
  },

  a1_hug: {
    caption: "🤗 ทั้งสามกอดกันใต้ผ้าห่มผืนเดียว\nมะลิกระซิบเบาๆ \"ตัวแม่ร้อนจังเลยพี่...\"",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true },
             { img: "assets/obj-blanket.png", x: 26, y: 82, w: 20 }],
    hotspots: [
      { img: "assets/obj-cloth.png", x: 28, y: 44, w: 16, effects: { trust: 1 }, next: "a1_mom_sick" },
      { img: "assets/obj-firewood.png", x: 72, y: 50, w: 16, effects: { warmth: 1 }, next: "a1_kitchen" },
    ],
  },

  a1_mom_sick: {
    caption: "💊 แม่ป่วยมาหลายวันแล้ว แต่ไม่เคยบอกใคร\n\"ไม่เป็นไรหรอก... แม่แค่เพลีย\"",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { img: "assets/obj-cloth.png", x: 28, y: 46, w: 16, effects: { trust: 2 }, next: "a1_kitchen" },
      { img: "assets/obj-candle.png", x: 74, y: 76, w: 12, effects: { trust: 1 }, next: "a1_kitchen" },
    ],
  },

  a1_kitchen: {
    bg: "assets/bg-kitchen.png", fx: ["flicker"],
    caption: "🍲 ครัวมืดสนิท เตาดินเหลือเพียงถ่านแดงๆ\nมะลิยกข้าวสารที่เหลืออยู่ให้ดู... \"ทำข้าวต้มกันไหมพี่\"",
    hotspots: [
      { img: "assets/obj-food.png", x: 30, y: 70, w: 16, effects: { warmth: 1 }, next: "a1_meal" },
      { img: "assets/obj-tea.png", x: 70, y: 70, w: 14, effects: { trust: 1 }, next: "a1_evening" },
    ],
  },

  a1_meal: {
    bg: "assets/bg-fire.png", fx: ["embers", "flicker"],
    caption: "🍲 ข้าวต้มร้อนๆ ลมไอน้ำขึ้นเต็มห้อง\nมะลิกินหมดถ้วยแล้วขอเพิ่ม — นั่นแหละสัญญาณที่ดีที่สุดของคืนนี้",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 56, y: 55, w: 42, shiver: false }],
    hotspots: [
      { img: "assets/obj-bed.png", x: 30, y: 78, w: 18, effects: { warmth: 1, trust: 1 }, next: "a1_evening" },
      { img: "assets/obj-heart.png", x: 70, y: 78, w: 14, effects: { trust: 1 }, next: "a1_talk" },
    ],
  },

  a1_evening: {
    bg: "assets/bg-night.png", fx: ["flicker"],
    caption: "🌃 ค่ำแล้ว เสียงลมหวีดผ่านช่องไม้ซีก\nมะลิเริ่มหลับ แต่แม่ยังเพ่งมองเปลวเทียนเหมือนกำลังคิดอะไรบางอย่าง",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false }],
    hotspots: [
      { img: "assets/obj-heart.png", x: 26, y: 76, w: 14, effects: { trust: 2 }, next: "a1_talk" },
      { img: "assets/obj-candle.png", x: 60, y: 76, w: 12, effects: { warmth: 1 }, next: "a1_watch" },
      { img: "assets/obj-bed.png", x: 50, y: 82, w: 16, next: "a1_end" },
    ],
  },

  a1_talk: {
    bg: "assets/bg-night.png", fx: ["flicker"],
    caption: "💬 \"พี่สัญญาไหม... ว่าจะไม่ทิ้งแม่กับมะลิไปไหน\"\nมือเล็กๆ กำมือพี่แน่น ไม่ยอมปล่อย",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false }],
    hotspots: [
      { img: "assets/obj-heart.png", x: 50, y: 80, w: 14, effects: { trust: 1 }, next: "a1_watch" },
    ],
  },

  a1_watch: {
    bg: "assets/bg-window.png", fx: ["snow"],
    caption: "🌨 ยืนมองหิมะตกผ่านบนต่างกระจกบานเดียวของบ้าน\nไกลออกไป... แสงตะเกียงดวงเดียวจากบ้านป้าแก้มยังสว่างอยู่",
    hotspots: [
      { img: "assets/obj-candle.png", x: 50, y: 80, w: 12, effects: { warmth: 1 }, next: "a1_end" },
    ],
  },

  a1_end: {
    bg: "assets/bg-dawn.png", fx: ["fog"],
    caption: "🌟 ผ่านคืนแรกมาได้...\nแต่ข่าวจากปากคนในหมู่บ้านบอกว่า คลื่นความหนาวที่ใหญ่กว่ากำลังจะมา",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false }],
    hotspots: [
      { img: "assets/obj-sunrise.png", x: 50, y: 80, w: 20, next: "a2_intro" },
    ],
  },

  // ═══════════════════ องก์ 2 — วันของการแลกเปลี่ยน ═══════════════════

  a2_intro: {
    bg: "assets/bg-morning.png", fx: ["snow"],
    caption: "🗓 วันที่สอง หิมะโปรยหนักทั้งเช้า\nมีเวลาทำอย่างเดียวก่อนเที่ยง — น้ำกับข้าวกำลังจะหมด",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 58, w: 42, shiver: false }],
    hotspots: [
      { img: "assets/obj-cloth.png", x: 24, y: 62, w: 16, effects: { trust: 1 }, next: "a2_well" },
      { img: "assets/obj-box.png", x: 76, y: 34, w: 14, effects: { trust: 1 }, next: "a2_barn" },
      { img: "assets/obj-salt.png", x: 50, y: 80, w: 14, effects: { warmth: 1 }, next: "a2_market" },
    ],
  },

  a2_well: {
    bg: "assets/bg-well.png", fx: ["snow"],
    caption: "🪣 บ่อน้ำของหมู่บ้าน เชือกเกี่ยวน้ำแข็งแข็งทั้งเส้น\nชายชราเจ้าของบ่อบ่นว่า \"ฤดูหนาวปีนี้มันแปลก ยาวกว่าทุกปี\"",
    hotspots: [
      { img: "assets/obj-cloth.png", x: 30, y: 74, w: 16, effects: { warmth: 1 }, set: { hasWater: true }, next: "a2_well2" },
      { img: "assets/obj-heart.png", x: 70, y: 74, w: 14, effects: { trust: 1 }, set: { hasWater: true }, next: "a2_well2" },
    ],
  },

  a2_well2: {
    bg: "assets/bg-well.png", fx: ["snow"],
    caption: "🪣 ได้น้ำเต็มสองถัง! กำลังจะเดินกลับ...\nลุงเจ้าของบ่อเรียกไว้ \"รอก่อนหนู เอาอันนี้ไปด้วย\" — มันคือปลาแห้งสองตัว",
    hotspots: [
      { img: "assets/obj-food.png", x: 50, y: 78, w: 16, effects: { warmth: 1, trust: 1 }, next: "a2_noon" },
    ],
  },

  a2_barn: {
    bg: "assets/bg-barn.png", fx: ["dust"],
    caption: "🏚 โรงนาเก่าที่พ่อเคยใช้เก็บของ ตอนนี้ร้างและเต็มไปด้วยฝุ่น\nมะลิวิ่งไปชี้มุมหนึ่ง \"ที่นี่! พ่อเคยแกะสลักไม้ให้หนูตรงนี้!\"",
    hotspots: [
      { img: "assets/obj-heart.png", x: 28, y: 70, w: 14, effects: { trust: 2 }, next: "a2_barn2" },
      { img: "assets/obj-firewood.png", x: 72, y: 70, w: 18, effects: { warmth: 1 }, next: "a2_barn2" },
    ],
  },

  a2_barn2: {
    bg: "assets/bg-barn.png", fx: ["dust"],
    caption: "🪵 ใต้ผ้าใบเก่ามีข้าวสารเกือบเต็มกระสอบ!\nและแขวนอยู่บนผนัง... มีดพร้อมด้ามไม้ที่มีชื่อพ่อเขียนจางๆ",
    hotspots: [
      { img: "assets/obj-food.png", x: 30, y: 74, w: 16, effects: { warmth: 2 }, next: "a2_noon" },
      { img: "assets/obj-heart.png", x: 70, y: 74, w: 14, effects: { trust: 1 }, next: "a2_noon" },
    ],
  },

  a2_market: {
    bg: "assets/bg-market.png", fx: ["fog", "snow"],
    caption: "🧺 ตลาดเช้าที่มีแค่สามคันรถ หมอกหนาจนเห็นทางสั้นๆ\nป้าขายของมองแป้งข้าวที่หิมะ \"ของน้อยละ หนูเอาเกลือมาแลกก็ได้\"",
    hotspots: [
      { img: "assets/obj-salt.png", x: 30, y: 74, w: 14, effects: { warmth: 2 }, next: "a2_noon" },
      { img: "assets/obj-heart.png", x: 70, y: 74, w: 14, effects: { trust: 1 }, set: { helpedAunt: true }, next: "a2_noon" },
    ],
  },

  a2_noon: {
    bg: "assets/bg-exterior.png", fx: ["snow"],
    caption: "☀️ กลับถึงบ้านตอนเที่ยง หิมะเริ่มหนักขึ้น\nกลางแสงสีขาวๆ... ป้าแก้มกำลังยืนปัดหิมะหน้าบ้านตัวเองอยู่ไกลๆ",
    hotspots: [
      { img: "assets/obj-lantern.png", x: 28, y: 66, w: 14, effects: { trust: 1 }, set: { helpedAunt: true }, next: "a2_help" },
      { img: "assets/obj-firewood.png", x: 72, y: 66, w: 16, effects: { warmth: 1 }, next: "a2_chore" },
    ],
  },

  a2_help: {
    bg: "assets/bg-exterior.png", fx: ["snow"],
    caption: "🤝 ช่วยป้าปัดหิมะจนเสร็จ มือเย็นแทบไม่มีความรู้สึก\n\"หนูดีจริงนะ... เดี๋ยวเย็นนี้ป้าจะมาหา เอาของดีๆ มาให้\"",
    hotspots: [
      { img: "assets/obj-sunrise.png", x: 50, y: 78, w: 20, next: "a2_knock" },
    ],
  },

  a2_chore: {
    bg: "assets/bg-kitchen.png", fx: ["flicker"],
    caption: "🪵 ทำงานบ้านฝั่งตัวเอง เก็บฟืนเพิ่มและหุงข้าวเย็น\nยังดีที่คืนนี้ยังมีของกิน... แต่บ้านป้าแก้มด้านนั้น เงียบไป",
    hotspots: [
      { img: "assets/obj-sunrise.png", x: 50, y: 78, w: 20, next: "a2_knock" },
    ],
  },

  a2_knock: {
    fx: ["snow"],
    caption: "🌨 เย็นมาถึง... มีคนเคาะประตูสามครั้ง\nเสียงคนสูงวัยกำลังสั่นเพราะความหนาว",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 60, y: 50, w: 36, shiver: false }],
    hotspots: [
      { img: "assets/obj-door.png", x: 30, y: 60, w: 22, next: "a2_ask" },
    ],
  },

  a2_ask: {
    caption: "🧂 ป้าแก้มยืนหนาวสั่น \"ขอเกลือหน่อยได้ไหนหนู\nป้าจะเอาไปตุ๋นอะไรดีๆ ให้ทั้งบ้านนี้\"",
    actors: [{ img: "assets/sprite-aunt.png", x: 50, y: 52, w: 40, shiver: false }],
    hotspots: [
      { img: "assets/obj-salt.png", x: 28, y: 78, w: 16, effects: { trust: 2 }, set: { helpedAunt: true }, next: "a2_talk" },
      { img: "assets/obj-door.png", x: 72, y: 78, w: 18, effects: { warmth: 1 }, next: "a2_refuse" },
    ],
  },

  a2_talk: {
    bg: "assets/bg-fire.png", fx: ["embers", "flicker"],
    caption: "🧂 ป้ารับเกลือไปด้วยรอยยิ้มกว้าง แล้วนั่งลงข้างเตาไฟ\nชวนคุยเรื่องสมัยพ่อยังอยู่... เรื่องที่ไม่มีใครเคยเล่าให้ฟัง",
    hotspots: [
      { img: "assets/obj-tea.png", x: 28, y: 78, w: 14, effects: { trust: 1 }, set: { knowsBox: true }, next: "a2_boxhint" },
      { img: "assets/obj-fire.png", x: 72, y: 78, w: 14, effects: { warmth: 1 }, next: "a2_dadstory" },
    ],
  },

  a2_dadstory: {
    bg: "assets/bg-fire.png", fx: ["embers", "flicker"],
    caption: "🔥 \"พ่อแกน่ะ ตอนหนาวเข้า จะเลิกงานก่อนพระอาทิตย์ตก\nเพื่อกลับมาก่อไฟให้แม่แก... ทุกคืนเลยนะ\"",
    hotspots: [
      { img: "assets/obj-tea.png", x: 30, y: 78, w: 14, effects: { trust: 1 }, set: { knowsBox: true }, next: "a2_boxhint" },
      { img: "assets/obj-heart.png", x: 70, y: 78, w: 14, effects: { trust: 1 }, next: "a2_dream" },
    ],
  },

  a2_boxhint: {
    bg: "assets/bg-fire.png", fx: ["embers", "flicker"],
    caption: "✉️ \"กล่องไม้ของพ่อแกน่ะ ป้าเห็นเค้าซ่อนไว้ที่โรงนาเก่า\nตอนก่อนจะไป... แกรู้ไหม ว่าข้างในมีอะไร\"",
    hotspots: [
      { img: "assets/obj-box.png", x: 50, y: 80, w: 20, effects: { trust: 1 }, next: "a2_dream" },
    ],
  },

  a2_refuse: {
    fx: ["snow"],
    caption: "🚪 \"งั้นเหรอ... ไม่เป็นไรๆ\" ป้าพยักหน้าเงียบๆ\nแล้วเดินกลับไปในซีกหิมะ ผ้าพันคอพลิ้วไปตามลม",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { img: "assets/obj-bed.png", x: 50, y: 80, w: 18, next: "a2_dream" },
    ],
  },

  a2_dream: {
    bg: "assets/bg-night.png", fx: ["flicker"],
    caption: "🌃 ดึกแล้ว... มะลิสะดุ้งตื่นจากฝันร้ายร้องไห้สั่นๆ\n\"ฝันว่าพ่อยืนอยู่ไกลๆ แล้วเดินหายไป... พี่คะ พ่อเป็นอะไรไป\"",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { img: "assets/obj-heart.png", x: 30, y: 76, w: 14, effects: { trust: 2 }, next: "a2_comfort" },
      { img: "assets/obj-candle.png", x: 70, y: 76, w: 12, effects: { warmth: 1 }, next: "a2_end" },
    ],
  },

  a2_comfort: {
    bg: "assets/bg-night.png", fx: ["flicker"],
    caption: "🤍 \"พ่อไม่ได้หายไปไหนหรอก... พ่ออยู่ในนี้\"\nชี้ที่หัวใจมะลิเบาๆ จนเธอหยุดไห้ แล้วหลับไปพร้อมยิ้มบางๆ",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false }],
    hotspots: [
      { img: "assets/obj-bed.png", x: 50, y: 80, w: 18, effects: { trust: 1 }, next: "a2_end" },
    ],
  },

  a2_end: {
    bg: "assets/bg-dawn.png", fx: ["fog"],
    caption: "🌅 วันที่สาม เช้านี้บ้านเงียบผิดปกติ... เกินไป\nเสียงหายใจดังผิดปกติมาจากมุมเตียงของแม่",
    hotspots: [
      { img: "assets/obj-cloth.png", x: 50, y: 80, w: 16, next: "a3_crisis" },
    ],
  },

  // ═══════════════════ องก์ 3 — ตัวเลือกหนักที่สุด ═══════════════════

  a3_crisis: {
    bg: "assets/bg-dawn.png", fx: ["fog"],
    caption: "💦 แม่กำเริบ! หอบแรงจนพูดไม่ออก\nยาหมดเกลี้ยง... ต้องเลือกเดี๋ยวนี้ ก่อนพายุจะมาถึง",
    actors: [{ img: "assets/sprite-mom-sick.png", x: 50, y: 55, w: 48, shiver: false }],
    hotspots: [
      { img: "assets/obj-medicine.png", x: 20, y: 76, w: 14, effects: { warmth: -1, trust: 1 }, next: "a3_path" },
      { img: "assets/obj-lantern.png", x: 50, y: 82, w: 14, requires: { trust: 3 }, next: "a3_aunt_door" },
      { img: "assets/obj-herbs.png", x: 80, y: 76, w: 14, effects: { trust: 1 }, next: "a3_herb_search" },
    ],
  },

  a3_path: {
    bg: "assets/bg-path.png", fx: ["snow"],
    caption: "🛤 ทางเดินเข้าตัวเมือง หิมะเริ่มทับถม\nมีสองทาง — ทางหลักยาวแต่ปลอดภัย หรือลัดผ่านริมแม่น้ำแข็ง",
    hotspots: [
      { img: "assets/obj-lantern.png", x: 28, y: 70, w: 14, effects: { warmth: 1 }, next: "a3_river" },
      { img: "assets/obj-cloth.png", x: 72, y: 70, w: 16, next: "a3_clinic" },
    ],
  },

  a3_river: {
    bg: "assets/bg-river.png", fx: ["snow", "wind"],
    caption: "❄️ ริมแม่น้ำที่เย็นตัวเป็นน้ำแข็ง ลัดทางประหยัดเวลาเกือบชั่วโมง\nแต่น้ำแข็งบางจุดมันส่งเสียง... \"กร๊าก\" เบาๆ",
    hotspots: [
      { img: "assets/obj-lantern.png", x: 30, y: 74, w: 14, effects: { warmth: 1 }, next: "a3_clinic" },
      { img: "assets/obj-cloth.png", x: 70, y: 74, w: 16, effects: { trust: 1 }, next: "a3_clinic" },
    ],
  },

  a3_clinic: {
    bg: "assets/bg-clinic.png",
    caption: "🏥 คลินิกประจำตำบล หมอเถื่อนไฟอ่อยกว่าที่คิด\n\"ยาหอบชนิดนี้หมดสต๊อกทั้งอำเภอ... แต่เหลือกล่องสุดท้ายไว้ให้คนที่ต้องการจริงๆ\"",
    hotspots: [
      { img: "assets/obj-medicine.png", x: 50, y: 78, w: 14, effects: { trust: 1 }, next: "a3_return" },
    ],
  },

  a3_return: {
    bg: "assets/bg-path.png", fx: ["snow", "wind"],
    caption: "💊 วิ่งกลับทั้งที่ขาสั่น กำยาแน่นในมือ\nบนท้องฟ้าเริ่มมีเมฆสีเทาดำก่อตัว... พายุกำลังจะมาถึงเร็วกว่าที่คิด",
    hotspots: [
      { img: "assets/obj-medicine.png", x: 50, y: 78, w: 14, effects: { warmth: 1, trust: 1 }, next: "a3_recover" },
    ],
  },

  a3_aunt_door: {
    bg: "assets/bg-aunt-ext.png", fx: ["snow", "flicker"],
    caption: "🏮 บ้านป้าแก้ม ตะเกียงหน้าประตูยังสว่าง\nเคาะประตูได้ไม่ถึงสามวินาที... ป้าก็เปิดออกทันที \"รีบเข้ามา!\"",
    hotspots: [
      { img: "assets/obj-door.png", x: 50, y: 76, w: 20, next: "a3_aunt_in" },
    ],
  },

  a3_aunt_in: {
    bg: "assets/bg-aunt.png", fx: ["flicker"],
    caption: "🤝 \"ยาหอบป้ามีตัวยาสำรองไว้ตลอด เพราะรู้ว่าแม่แกเป็น\"\nนาทีที่หนาวที่สุด... ความดีเก่าๆ ยังใช้ได้เสมอ",
    hotspots: [
      { img: "assets/obj-medicine.png", x: 50, y: 78, w: 14, effects: { warmth: 1, trust: 1 }, set: { helpedAunt: true }, next: "a3_recover" },
    ],
  },

  a3_herb_search: {
    bg: "assets/bg-forest.png", fx: ["snow"],
    caption: "🌿 หลังบ้าน มะลิคว้ามือพี่วิ่งไปพุ่มไม้ใต้ต้นมะขาม\n\"ใบนี้! แม่เคยต้มให้หนูดื่มตอนไอส์! หนูจำได้!\"",
    hotspots: [
      { img: "assets/obj-herbs.png", x: 50, y: 78, w: 16, effects: { trust: 1 }, next: "a3_gamble" },
    ],
  },

  a3_gamble: {
    bg: "assets/bg-kitchen.png", fx: ["flicker", "steam"],
    caption: "🍵 ต้มยาป้อนแม่ทีละช้อน... นาทีผ่านไปช้าเหมือนชั่วโมง\nแล้วเสียงหายใจก็... นิ่งขึ้น สม่ำเสมอขึ้น",
    hotspots: [
      { img: "assets/obj-tea.png", x: 50, y: 78, w: 14, effects: { warmth: 1, trust: 1 }, next: "a3_recover" },
    ],
  },

  a3_recover: {
    bg: "assets/bg-night.png", fx: ["flicker"],
    caption: "🌙 ค่ำนั้น แม่หลับสบายเป็นครั้งแรกในหลายคืน\nตื่นมาตอนดึก เห็นแม่มองมา สายตานุ่มนวล \"...ลูกโตแล้วสินะ\"",
    hotspots: [
      { img: "assets/obj-heart.png", x: 30, y: 78, w: 14, effects: { trust: 2 }, next: "a3_momtalk" },
      { img: "assets/obj-candle.png", x: 70, y: 78, w: 12, effects: { warmth: 1 }, next: "a3_end" },
    ],
  },

  a3_momtalk: {
    bg: "assets/bg-night.png", fx: ["flicker"],
    caption: "💬 \"เรื่องพ่อของเราน่ะ... แม่เล่าให้ฟังวันหน้านะ\"\nแม่ลูบหัวมะลิเบาๆ \"เดี๋ยวนี้... ถึงเวลาแล้วล่ะ มะลิรู้ว่าของพ่ออยู่ที่ไหน\"",
    hotspots: [
      { img: "assets/obj-sunrise.png", x: 50, y: 80, w: 20, effects: { trust: 1 }, next: "a3_end" },
    ],
  },

  a3_end: {
    bg: "assets/bg-morning.png", fx: ["snow"],
    caption: "🌅 วันที่สี่ แม่อาการดีขึ้นมาก นั่งได้แล้ว\nมะลิลากมือพี่ไปชี้มุมหนึ่งของบ้าน ตาเป็นประกาย",
    hotspots: [
      { img: "assets/obj-key.png", x: 50, y: 80, w: 12, next: "a4_intro" },
    ],
  },

  // ═══════════════════ องก์ 4 — กล่องของพ่อ ═══════════════════

  a4_intro: {
    bg: "assets/bg-morning.png", fx: ["snow"],
    caption: "\"พ่อเคยบอกมะลิว่า ถ้าหนาวมากที่สุดแล้วผ่านไปได้\nให้มาเปิดกล่องที่พ่อซ่อนไว้... มะลิรอมาตั้งนานแล้ว\"",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false }],
    hotspots: [
      { img: "assets/obj-key.png", x: 50, y: 80, w: 12, requires: { trust: 4 }, next: "a4_barn_search" },
      { img: "assets/obj-candle.png", x: 78, y: 68, w: 12, next: "a5_prep" },
    ],
  },

  a4_barn_search: {
    bg: "assets/bg-barn.png", fx: ["dust"],
    caption: "🔎 โรงนาเก่า... มะลิวิ่งไปชี้ใต้แผ่นไม้บางที่ฝังอยู่กับพื้น\n\"ที่นี่! พ่อเคยซ่อนกุญแจไว้ตรงนี้! มะลิจำได้!\"",
    hotspots: [
      { img: "assets/obj-key.png", x: 50, y: 78, w: 12, next: "a4_open" },
    ],
  },

  a4_open: {
    bg: "assets/bg-barn.png", fx: ["dust"],
    caption: "📦 กุญแจหมุนหนึ่งรอบ... ฝาไม้เปิดออกครั้งแรกในรอบหลายปี\nข้างในมีซองจดหมายเก่า และถุงเงินเล็กๆ ที่หนักมือผิดปกติ",
    actors: [{ img: "assets/obj-box.png", x: 50, y: 55, w: 34 }],
    hotspots: [
      { img: "assets/obj-letter.png", x: 28, y: 80, w: 16, effects: { trust: 2 }, set: { openedBox: true }, next: "a4_letter" },
      { img: "assets/obj-money.png", x: 72, y: 80, w: 16, effects: { warmth: 2 }, set: { openedBox: true }, next: "a4_money" },
    ],
  },

  a4_letter: {
    bg: "assets/bg-window.png", fx: ["snow"],
    caption: "✉️ \"ถ้าลูกได้อ่านจดหมายนี้ แปลว่าถึงเวลาแล้ว\nพ่อขอโทษที่ต้องไปก่อน แต่พ่ออยากให้รู้ว่า... พ่อไม่เคยไปไหนเลย\"",
    hotspots: [
      { img: "assets/obj-heart.png", x: 50, y: 78, w: 14, next: "a4_letter2" },
    ],
  },

  a4_letter2: {
    bg: "assets/bg-window.png", fx: ["snow"],
    caption: "\"ลูกพี่... ดูแลแม่กับน้อง เหมือนที่พ่อเคยดูแล\nอย่าได้โกรธแม่ที่เขาปิดบังเรื่องของพ่อนะ... เขาทำเพื่อพวกเธอทั้งนั้น\"",
    hotspots: [
      { img: "assets/obj-heart.png", x: 30, y: 78, w: 14, effects: { trust: 1, warmth: 1 }, next: "a4_memory" },
      { img: "assets/obj-money.png", x: 70, y: 78, w: 16, effects: { warmth: 1 }, next: "a4_memory" },
    ],
  },

  a4_memory: {
    bg: "assets/bg-spring.png", fx: ["petals"],
    caption: "🌸 แม่เล่าต่อ — คืนก่อนพ่อจะไป ทั้งคู่ปลูกต้นหอมเล็กๆ ไว้หน้าบ้าน\n\"ถ้าปีไหนมันออกดอก แปลว่าพ่อส่งข่าวถึงพวกเรา\"",
    hotspots: [
      { img: "assets/obj-plant.png", x: 50, y: 78, w: 14, effects: { trust: 1 }, set: { knowsTree: true }, next: "a4_after" },
    ],
  },

  a4_money: {
    bg: "assets/bg-barn.png", fx: ["dust"],
    caption: "💰 ถุงเงินของพ่อ — เก็บไว้ตั้งแต่ยังไม่มีมะลิ\nพอดีสำหรับซ่อมหลังคา และซื้อยาให้แม่ตลอดฤดูหนาว",
    hotspots: [
      { img: "assets/obj-firewood.png", x: 28, y: 78, w: 16, effects: { warmth: 1 }, next: "a4_after" },
      { img: "assets/obj-medicine.png", x: 72, y: 78, w: 14, effects: { warmth: 1, trust: 1 }, next: "a4_after" },
    ],
  },

  a4_after: {
    bg: "assets/bg-night.png", fx: ["flicker"],
    caption: "🕯 คืนนั้นบ้านเงียบ แต่ใจของทุกคนเต็มกว่าเมื่อไหร่\nนอกหน้าต่าง... เมฆพายุกำลังก่อตัวขึ้นไกลๆ เงียบๆ",
    hotspots: [
      { img: "assets/obj-candle.png", x: 50, y: 78, w: 12, next: "a5_prep" },
    ],
  },

  // ═══════════════════ องก์ 5 — พายุ ═══════════════════

  a5_prep: {
    bg: "assets/bg-kitchen.png", fx: ["flicker", "wind"],
    caption: "⛈ คืนสุดท้าย — พายุหิมะใหญ่ที่สุดในรอบสิบปีกำลังจะมาถึง\nเตรียมตัวก่อน มีเวลาไม่มาก...",
    hotspots: [
      { img: "assets/obj-cloth.png", x: 26, y: 72, w: 16, effects: { warmth: 1 }, next: "a5_intro" },
      { img: "assets/obj-firewood.png", x: 72, y: 72, w: 16, effects: { warmth: 1 }, next: "a5_intro" },
    ],
  },

  a5_intro: {
    bg: "assets/bg-storm.png", fx: ["snow", "wind", "shake"],
    caption: "⛈ พายุมาถึงแล้ว! บ้านสั่นสะเทือน หลังคาส่งเสียงร่อนแร่\nไฟในเตาลุกโชน แต่ลมก็พยายามจะมดเข้ามา",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { img: "assets/obj-fire.png", x: 28, y: 76, w: 14, effects: { warmth: 1 }, next: "a5_fireout" },
      { img: "assets/obj-lantern.png", x: 72, y: 76, w: 14, requires: { helpedAunt: true }, next: "a5_escape" },
      { img: "assets/obj-blanket.png", x: 50, y: 82, w: 18, effects: { warmth: 1, trust: 1 }, next: "a5_huddle" },
    ],
  },

  a5_huddle: {
    bg: "assets/bg-storm.png", fx: ["snow", "wind", "shake"],
    caption: "🤗 ทั้งบ้านกอดกันใต้ผ้าห่มทุกผืนที่มี\nลมหวีด... แต่ใต้ผ้าห่มมันอบอุ่นเหลือเกิน",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { img: "assets/obj-candle.png", x: 30, y: 78, w: 12, effects: { warmth: 1 }, next: "final" },
      { img: "assets/obj-door.png", x: 70, y: 78, w: 18, requires: { helpedAunt: true }, next: "a5_escape" },
      { img: "assets/obj-bed.png", x: 50, y: 82, w: 16, next: "a5_dawn" },
    ],
  },

  a5_fireout: {
    bg: "assets/bg-storm.png", fx: ["snow", "wind", "shake"],
    caption: "💨 ลมกระโชกพัดไฟดับ! ความมืดกลืนบ้านทั้งหลัง\nอุณหภูมิลดลงทุกนาที... ต้องตัดสินใจเดี๋ยวนี้",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { img: "assets/obj-firewood.png", x: 26, y: 76, w: 16, effects: { warmth: 1 }, next: "a5_relight" },
      { img: "assets/obj-door.png", x: 72, y: 76, w: 18, requires: { helpedAunt: true }, next: "a5_escape" },
      { img: "assets/obj-blanket.png", x: 50, y: 82, w: 18, effects: { trust: 1 }, next: "a5_dawn" },
    ],
  },

  a5_relight: {
    bg: "assets/bg-fire.png", fx: ["embers", "flicker"],
    caption: "🔥 จุดไฟใหม่ด้วยมือที่สั่น... ครั้ง สองครั้ง สามครั้ง\nเปลวไฟติดแล้ว! ทุกคนถอนหายใจพร้อมกัน แล้วหัวเราะ",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 56, y: 55, w: 42, shiver: false }],
    hotspots: [
      { img: "assets/obj-candle.png", x: 30, y: 78, w: 12, effects: { warmth: 1 }, next: "a5_dawn" },
      { img: "assets/obj-heart.png", x: 70, y: 78, w: 14, effects: { trust: 1 }, next: "a5_dawn" },
    ],
  },

  a5_escape: {
    bg: "assets/bg-blizzard.png", fx: ["snow", "wind", "shake"],
    caption: "🏮 ออกไปในพายุ! หิมะเจ็บปวดเหมือนเข็มบินตามลม\nเหลือบมองไปข้างหน้า... แสงตะเกียงดวงนั้นยังสว่างอยู่ ป้าแก้มรออยู่",
    hotspots: [
      { img: "assets/obj-lantern.png", x: 50, y: 78, w: 14, next: "a5_knock" },
    ],
  },

  a5_knock: {
    bg: "assets/bg-aunt.png", fx: ["flicker"],
    caption: "🤝 \"ป้ารอแกอยู่นะ... รู้มั้ยว่าเดี๋ยวก็ต้องมา\"\nบ้านป้าอบอุ่นราวกับอีกโลก ทั้งบ้านดื่มชาร้อนกันสามแก้ว",
    hotspots: [
      { img: "assets/obj-tea.png", x: 50, y: 78, w: 14, set: { auntRescue: true }, next: "a5_dawn" },
    ],
  },

  a5_dawn: {
    bg: "assets/bg-dawn.png", fx: ["fog"],
    caption: "🌅 ฟ้าสาง... พายุผ่านไปแล้ว\nโลกขาวสะอาดนิ่งสงบราวกับไม่มีอะไรเคยเกิดขึ้น",
    hotspots: [
      { img: "assets/obj-sunrise.png", x: 50, y: 78, w: 20, next: "final" },
    ],
  },

  final: {
    dynamic: "ending",
    ending: true,
  },
};

function computeEnding(flags) {
  const { warmth, trust, openedBox, helpedAunt, auntRescue } = flags;
  if (warmth >= 6 && trust >= 6 && openedBox)
    return { title: "สดใส", bg: "assets/bg-spring.png", fx: ["petals"],
      text: "ผ่านฤดูหนาวมาได้ทั้งบ้าน รู้เรื่องพ่อครบทุกอย่าง\nต้นหอมที่พ่อปลูกไว้หน้าบ้าน... ออกดอกสีขาวเป็นครั้งแรก\n\"พ่อส่งข่าวมาแล้วล่ะ!\" มะลิพูด ทั้งน้ำตาทั้งยิ้ม\n\n— จบแบบดีที่สุด —" };
  if (auntRescue && helpedAunt)
    return { title: "บ้านที่สอง", bg: "assets/bg-aunt.png", fx: ["flicker"],
      text: "คืนพายุนั้น สองบ้านกลายเป็นครอบครัวเดียวกัน\nความดีที่ให้ไป กลับมาในวันที่หนาวที่สุด\n\n— จบแบบสายป้าแก้ม —" };
  if (warmth >= 5 && openedBox)
    return { title: "อบอุ่นพอ", bg: "assets/bg-fire.png", fx: ["embers", "flicker"],
      text: "ไฟไม่เคยดับ ท้องไม่เคยว่าง รู้เรื่องพ่อแล้ว\nแต่บางคืน... ก็ยังเหลือความรู้สึกว่ามีอะไรค้างอยู่\n\n— จบแบบดี —" };
  if (trust >= 5)
    return { title: "แน่นแฟบ", bg: "assets/bg-night.png", fx: ["flicker"],
      text: "บ้านหนาว แต่ไม่มีใครหนาวเพียงลำพัง\nต่างคนต่างเล่าเรื่องพ่อให้กันฟังทั้งคืน\n\n— จบแบบกลาง —" };
  if (warmth >= 4)
    return { title: "ค้างเติ่ง", bg: "assets/bg-dawn.png", fx: ["fog"],
      text: "ผ่านฤดูหนาวมาได้... แบบที่ไม่มีใครล้ม\nแต่ก็ไม่มีใครสักคนที่เต็มเปี่ยม\n\n— จบแบบเหลือความรู้สึกว่าพลาดอะไรไป —" };
  return { title: "หนาว", bg: "assets/bg-storm.png", fx: ["snow", "wind"],
    text: "ไฟดับกลางดึก ผ้าห่มบางเกินไป\nคืนนั้นฝังอยู่ในความทรงจำเป็นความหนาวที่ยาวนานที่สุด\n\n— จบแบบเศร้า ลองเล่นใหม่ดู —" };
}
