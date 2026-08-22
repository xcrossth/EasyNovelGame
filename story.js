// ===== "ฤดูหนาวปีนั้น" — บทเต็มฉบับยาว 5 องก์ (~52 ฉาก) =====
// ทุก hotspot ใช้ img เท่านั้น (ไม่ใช้ emoji)
// requires: { trust: 4 } = ต้องมีค่า >= 4 ถึงกดได้ / set = ตั้งแฟล็กซ่อน

const STORY = {

  // ═══════════════ องก์ 1 — คืนแรก ═══════════════

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
      { img: "assets/obj-fire.png", x: 30, y: 44, w: 14, effects: { warmth: 1 }, next: "a1_evening" },
      { img: "assets/obj-cloth.png", x: 74, y: 76, w: 16, effects: { trust: 2 }, next: "a1_mom_sick" },
    ],
  },

  a1_roof: {
    caption: "🪜 ลมหยุดหวีดแล้ว... มือเย็นชาไปหมด",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false },
             { img: "assets/obj-ladder.png", x: 76, y: 32, w: 16 }],
    hotspots: [
      { img: "assets/obj-firewood.png", x: 24, y: 74, w: 16, effects: { warmth: 1 }, next: "a1_evening" },
      { img: "assets/obj-food.png", x: 76, y: 78, w: 16, effects: { trust: 1, warmth: 1 }, next: "a1_meal" },
    ],
  },

  a1_hug: {
    caption: "🤗 กอดกันแน่นๆ... มะลิกระซิบ \"ตัวแม่ร้อนจังเลย\"",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true },
             { img: "assets/obj-blanket.png", x: 26, y: 84, w: 20 }],
    hotspots: [
      { img: "assets/obj-cloth.png", x: 28, y: 44, w: 16, effects: { trust: 1 }, next: "a1_mom_sick" },
      { img: "assets/obj-firewood.png", x: 72, y: 50, w: 16, effects: { warmth: 1 }, next: "a1_evening" },
    ],
  },

  a1_mom_sick: {
    caption: "💊 แม่ป่วยมาหลายวันแล้ว... แต่ไม่เคยบอกใคร",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { img: "assets/obj-cloth.png", x: 28, y: 46, w: 16, effects: { trust: 2 }, next: "a1_evening" },
      { img: "assets/obj-candle.png", x: 74, y: 76, w: 12, effects: { trust: 1 }, next: "a1_evening" },
    ],
  },

  a1_meal: {
    caption: "🍲 ข้าวต้มร้อนๆ จากข้าวสารเหลือนิดเดียว\nมะลิกินหมดถ้วยแล้วยังขอเพิ่ม",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false },
             { img: "assets/obj-food.png", x: 26, y: 78, w: 18 }],
    hotspots: [
      { img: "assets/obj-bed.png", x: 50, y: 86, w: 18, effects: { warmth: 1, trust: 1 }, next: "a1_end" },
      { img: "assets/obj-candle.png", x: 76, y: 72, w: 12, effects: { trust: 1 }, next: "a1_end" },
    ],
  },

  a1_evening: {
    bg: "assets/bg-night.png",
    caption: "🌃 ค่ำแล้ว เสียงลมหวีดผ่านช่องไม้ซีก\nมะลิเริ่มหลับ แต่แม่ยังเพ่งมองเปลวเทียน",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { img: "assets/obj-heart.png", x: 26, y: 78, w: 14, effects: { trust: 2 }, next: "a1_talk" },
      { img: "assets/obj-candle.png", x: 72, y: 78, w: 12, effects: { warmth: 1 }, next: "a1_end" },
      { img: "assets/obj-bed.png", x: 50, y: 88, w: 16, next: "a1_end" },
    ],
  },

  a1_talk: {
    bg: "assets/bg-night.png",
    caption: "💬 \"พี่สัญญาไหม... ว่าจะไม่ทิ้งแม่กับมะลิไปไหน\"\n\"สัญญาสิ\" มือเล็กๆ กำมือพี่แน่น",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false }],
    hotspots: [
      { img: "assets/obj-heart.png", x: 50, y: 86, w: 14, effects: { trust: 1 }, next: "a1_end" },
    ],
  },

  a1_end: {
    caption: "🌟 ผ่านคืนแรกมาได้... แต่ฤดูหนาวเพิ่งเริ่ม",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { img: "assets/obj-sunrise.png", x: 50, y: 86, w: 20, next: "a2_intro" },
    ],
  },

  // ═══════════════ องก์ 2 — ของแลกเปลี่ยน ═══════════════

  a2_intro: {
    bg: "assets/bg-morning.png",
    caption: "🗓 วันที่สอง หิมะโปรยหนักทั้งวัน\nd้านนอกเห็นป้าแก้มกำลังกุลีกุล้ออะไรซักอย่าง",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 60, w: 42, shiver: false }],
    hotspots: [
      { img: "assets/obj-lantern.png", x: 26, y: 60, w: 14, effects: { trust: 1 }, set: { helpedAunt: true }, next: "a2_help" },
      { img: "assets/obj-firewood.png", x: 74, y: 60, w: 16, effects: { warmth: 1 }, next: "a2_chore" },
      { img: "assets/obj-food.png", x: 50, y: 86, w: 16, effects: { warmth: 1 }, next: "a2_chore" },
    ],
  },

  a2_help: {
    bg: "assets/bg-morning.png",
    caption: "🤝 ช่วยป้าแก้มปัดหิมะหน้าบ้าน\n\"หนูดีจริงนะ... เดี๋ยวเย็นนี้ป้าจะมาหา\"",
    actors: [{ img: "assets/sprite-aunt.png", x: 50, y: 52, w: 40, shiver: false }],
    hotspots: [
      { img: "assets/obj-sunrise.png", x: 50, y: 86, w: 20, next: "a2_knock" },
    ],
  },

  a2_chore: {
    bg: "assets/bg-morning.png",
    caption: "🪵 เก็บฟืนเพิ่มและหุงข้าวเย็น\nยังดีที่คืนนี้ยังมีของกิน",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false },
             { img: "assets/obj-firewood.png", x: 26, y: 62, w: 18 }],
    hotspots: [
      { img: "assets/obj-sunrise.png", x: 50, y: 86, w: 20, next: "a2_knock" },
    ],
  },

  a2_knock: {
    caption: "🌨 เย็นมาถึง... มีคนเคาะประตูสามครั้ง",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 60, y: 50, w: 36, shiver: false }],
    hotspots: [
      { img: "assets/obj-door.png", x: 30, y: 60, w: 22, next: "a2_ask" },
    ],
  },

  a2_ask: {
    caption: "🧂 ป้าแก้มยืนหนาวสั่น \"ขอเกลือหน่อยได้ไหนหนู\nป้าจะเอาไปตุ๋นอะไรดีๆ ให้ทั้งบ้านนี้\"",
    actors: [{ img: "assets/sprite-aunt.png", x: 50, y: 52, w: 40, shiver: false }],
    hotspots: [
      { img: "assets/obj-salt.png", x: 28, y: 80, w: 16, effects: { trust: 2 }, set: { helpedAunt: true }, next: "a2_talk" },
      { img: "assets/obj-door.png", x: 72, y: 80, w: 18, effects: { warmth: 1 }, next: "a2_refuse" },
    ],
  },

  a2_talk: {
    caption: "🧂 ป้ารับเกลือไปด้วยรอยยิ้มกว้าง\nแล้วนั่งลงข้างเตาไฟ... ชวนคุยเรื่องสมัยพ่อยังอยู่",
    actors: [{ img: "assets/sprite-aunt.png", x: 50, y: 52, w: 40, shiver: false }],
    hotspots: [
      { img: "assets/obj-tea.png", x: 28, y: 80, w: 14, effects: { trust: 1 }, set: { knowsBox: true }, next: "a2_boxhint" },
      { img: "assets/obj-fire.png", x: 72, y: 80, w: 14, effects: { warmth: 1 }, next: "a2_dream" },
    ],
  },

  a2_boxhint: {
    caption: "✉️ \"กล่องไม้ของพ่อแกน่ะ ป้าเห็นเค้าซ่อนไว้\nที่โรงนาเก่า ตอนก่อนจะไป... แกรู้ไหม\"",
    actors: [{ img: "assets/sprite-aunt.png", x: 50, y: 52, w: 40, shiver: false }],
    hotspots: [
      { img: "assets/obj-box.png", x: 50, y: 86, w: 20, effects: { trust: 1 }, next: "a2_dream" },
    ],
  },

  a2_refuse: {
    caption: "🚪 \"งั้นเหรอ... ไม่เป็นไรๆ\" ป้าพยักหน้าเงียบๆ\nแล้วเดินกลับไปในซีกหิมะ ผ้าพันคอพลิ้วไปตามลม",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { img: "assets/obj-bed.png", x: 50, y: 86, w: 18, next: "a2_dream" },
    ],
  },

  a2_dream: {
    bg: "assets/bg-night.png",
    caption: "🌃 ดึกแล้ว... มะลิสะดุ้งตื่นจากฝันร้าย\nร้องไห้สั่นๆ \"ฝันว่าพ่อยืนอยู่ไกลๆ แล้วเดินหายไป\"",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { img: "assets/obj-heart.png", x: 30, y: 78, w: 14, effects: { trust: 2 }, next: "a2_comfort" },
      { img: "assets/obj-candle.png", x: 70, y: 78, w: 12, effects: { warmth: 1 }, next: "a2_end" },
    ],
  },

  a2_comfort: {
    bg: "assets/bg-night.png",
    caption: "🤍 \"พ่อไม่ได้หายไปไหนหรอก... พ่ออยู่ในนี้\"\nชี้ที่หัวใจมะลิเบาๆ จนเธอหยุดไห้และหลับตา",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false }],
    hotspots: [
      { img: "assets/obj-bed.png", x: 50, y: 86, w: 18, effects: { trust: 1 }, next: "a2_end" },
    ],
  },

  a2_end: {
    bg: "assets/bg-dawn.png",
    caption: "🌅 วันที่สาม... เช้านี้บ้านเงียบผิดปกติ",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { img: "assets/obj-cloth.png", x: 50, y: 86, w: 16, next: "a3_crisis" },
    ],
  },

  // ═══════════════ องก์ 3 — ตัวเลือกหนักที่สุด ═══════════════

  a3_crisis: {
    bg: "assets/bg-dawn.png",
    caption: "💦 แม่กำเริบ! หอบแรงจนพูดไม่ออก\nยาหมดเกลี้ยง... ต้องเลือกเดี๋ยวนี้",
    actors: [{ img: "assets/sprite-mom-sick.png", x: 50, y: 55, w: 48, shiver: false }],
    hotspots: [
      { img: "assets/obj-medicine.png", x: 20, y: 78, w: 14, effects: { warmth: -1, trust: 1 }, next: "a3_town" },
      { img: "assets/obj-lantern.png", x: 50, y: 88, w: 14, requires: { trust: 3 }, next: "a3_aunt" },
      { img: "assets/obj-herbs.png", x: 80, y: 78, w: 14, effects: { trust: 1 }, next: "a3_herb" },
    ],
  },

  a3_town: {
    caption: "🏥 เดินฝ่าหิมะสามชั่วโมง ป่านไส้แทบขาด\nแพทย์ประจำตำบลหยิบยาให้ \"รีบกลับ พายุกำลังมา\"",
    actors: [{ img: "assets/sprite-mom-sick.png", x: 50, y: 55, w: 48, shiver: false }],
    hotspots: [
      { img: "assets/obj-medicine.png", x: 50, y: 86, w: 14, effects: { warmth: 1, trust: 1 }, next: "a3_recover" },
    ],
  },

  a3_aunt: {
    bg: "assets/bg-aunt.png",
    caption: "🤝 ป้าแก้มเปิดประตูทันทีที่เห็นหน้า\นาทีที่หนาวที่สุด... ความดีเก่าๆ ยังใช้ได้",
    actors: [{ img: "assets/sprite-aunt.png", x: 50, y: 46, w: 38, shiver: false }],
    hotspots: [
      { img: "assets/obj-medicine.png", x: 50, y: 84, w: 14, effects: { warmth: 1, trust: 1 }, set: { helpedAunt: true }, next: "a3_recover" },
    ],
  },

  a3_herb: {
    caption: "🌿 มะลิคว้ามือพี่วิ่งไปหลังบ้าน\n\"ใบนี้! แม่เคยต้มให้หนูดื่มตอนไอ!\"",
    actors: [{ img: "assets/sprite-mom-sick.png", x: 50, y: 55, w: 48, shiver: false }],
    hotspots: [
      { img: "assets/obj-tea.png", x: 50, y: 86, w: 14, effects: { warmth: 1, trust: 2 }, next: "a3_gamble" },
    ],
  },

  a3_gamble: {
    bg: "assets/bg-night.png",
    caption: "🍵 ต้มยาป้อนแม้ทีละช้อน... นาทีผ่านไปช้าเหมือนชั่วโมง\nแล้วเสียงหายใจก็... นิ่งขึ้น สม่ำเสมอขึ้น",
    actors: [{ img: "assets/sprite-mom-sick.png", x: 50, y: 55, w: 48, shiver: false }],
    hotspots: [
      { img: "assets/obj-cloth.png", x: 50, y: 86, w: 16, effects: { trust: 1 }, next: "a3_recover" },
    ],
  },

  a3_recover: {
    bg: "assets/bg-night.png",
    caption: "🌙 ค่ำนั้น แม่หลับสบายเป็นครั้งแรกในหลายคืน\nมะลินอนกอดแขนพี่ ไม่ยอมปล่อย",
    actors: [{ img: "assets/sprite-mom-sick.png", x: 50, y: 55, w: 48, shiver: false }],
    hotspots: [
      { img: "assets/obj-sunrise.png", x: 50, y: 86, w: 20, next: "a4_intro" },
    ],
  },

  // ═══════════════ องก์ 4 — กล่องของพ่อ ═══════════════

  a4_intro: {
    bg: "assets/bg-morning.png",
    caption: "🗓 วันที่สี่ แม่อาการดีขึ้นมาก\nมะลิลากมือพี่ไปชี้มุมหนึ่งของบ้าน \"แม่บอกว่าเวลาแล้ว\"",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false }],
    hotspots: [
      { img: "assets/obj-key.png", x: 50, y: 84, w: 14, requires: { trust: 4 }, next: "a4_search" },
      { img: "assets/obj-candle.png", x: 78, y: 70, w: 12, next: "a5_intro" },
    ],
  },

  a4_search: {
    bg: "assets/bg-morning.png",
    caption: "🔎 \"พ่อเคยซ่อนกุญแจไว้ใต้แผ่นไม้นี้! มะลิจำได้!\"\nฝุ่นปลิวว่อน... แล้วบางอย่างก็สะท้อนแสงเทียน",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 40, w: 42, shiver: false }],
    hotspots: [
      { img: "assets/obj-key.png", x: 50, y: 82, w: 12, next: "a4_open" },
    ],
  },

  a4_open: {
    bg: "assets/bg-morning.png",
    caption: "📦 กุญแจหมุนหนึ่งรอบ... ฝาไม้เปิดออกครั้งแรกในรอบหลายปี\nข้างในมีซองจดหมายเก่า และถุงเงินเล็กๆ",
    actors: [{ img: "assets/obj-box.png", x: 50, y: 55, w: 34 }],
    hotspots: [
      { img: "assets/obj-letter.png", x: 28, y: 84, w: 16, effects: { trust: 2 }, set: { openedBox: true }, next: "a4_letter" },
      { img: "assets/obj-money.png", x: 72, y: 84, w: 16, effects: { warmth: 2 }, set: { openedBox: true }, next: "a4_money" },
    ],
  },

  a4_letter: {
    bg: "assets/bg-morning.png",
    caption: "✉️ \"ถ้าลูกได้อ่านจดหมายนี้ แปลว่าถึงเวลาแล้ว\nพ่อขอโทษที่ต้องไปก่อน แต่พ่อไม่เคยไปไหนเลย\"",
    actors: [{ img: "assets/obj-letter.png", x: 50, y: 50, w: 30 }],
    hotspots: [
      { img: "assets/obj-heart.png", x: 50, y: 86, w: 14, next: "a4_letter2" },
    ],
  },

  a4_letter2: {
    bg: "assets/bg-morning.png",
    caption: "\"ลูกพี่... ดูแลแม่กับน้อง เหมือนที่พ่อเคยดูแล\nแล้วบอกมะลิด้วยว่าพ่อรักเธอแค่ไหน\"",
    actors: [{ img: "assets/obj-letter.png", x: 50, y: 50, w: 30 }],
    hotspots: [
      { img: "assets/obj-heart.png", x: 30, y: 84, w: 14, effects: { trust: 1, warmth: 1 }, next: "a4_after" },
      { img: "assets/obj-money.png", x: 70, y: 84, w: 16, effects: { warmth: 1 }, next: "a4_after" },
    ],
  },

  a4_money: {
    bg: "assets/bg-morning.png",
    caption: "💰 ถุงเงินของพ่อ — เก็บไว้ตั้งแต่ยังไม่มีมะลิ\nพอดีสำหรับซ่อมหลังคา และซื้อยาให้แม่ตลอดฤดูหนาว",
    actors: [{ img: "assets/obj-money.png", x: 50, y: 50, w: 30 }],
    hotspots: [
      { img: "assets/obj-firewood.png", x: 28, y: 82, w: 16, effects: { warmth: 1 }, next: "a4_after" },
      { img: "assets/obj-medicine.png", x: 72, y: 82, w: 14, effects: { warmth: 1, trust: 1 }, next: "a4_after" },
    ],
  },

  a4_after: {
    bg: "assets/bg-night.png",
    caption: "🕯 คืนนั้นบ้านเงียบ แต่ใจของทุกคนเต็มกว่าเมื่อไหร่\nนอกหน้าต่าง... เมฆพายุกำลังก่อตัวขึ้นไกลๆ",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false }],
    hotspots: [
      { img: "assets/obj-sunrise.png", x: 50, y: 86, w: 20, next: "a5_intro" },
    ],
  },

  // ═══════════════ องก์ 5 — พายุ ═══════════════

  a5_intro: {
    caption: "⛈ คืนสุดท้าย — พายุหิมะใหญ่ที่สุดในรอบสิบปี!\nบ้านสั่นสะเทือน ต้องตัดสินใจเร็ว",
    bg: "assets/bg-storm.png",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { img: "assets/obj-fire.png", x: 28, y: 78, w: 14, effects: { warmth: 1 }, next: "a5_fireout" },
      { img: "assets/obj-lantern.png", x: 72, y: 78, w: 14, requires: { helpedAunt: true }, next: "a5_knock" },
      { img: "assets/obj-blanket.png", x: 50, y: 88, w: 18, effects: { warmth: 1, trust: 1 }, next: "a5_huddle" },
    ],
  },

  a5_huddle: {
    caption: "🤗 ทั้งบ้านกอดกันใต้ผ้าห่มทุกผืนที่มี\nลมหวีด... แต่ใต้ผ้าห่มมันอบอุ่นเหลือเกิน",
    bg: "assets/bg-storm.png",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { img: "assets/obj-candle.png", x: 30, y: 80, w: 12, effects: { warmth: 1 }, next: "final" },
      { img: "assets/obj-door.png", x: 70, y: 80, w: 18, requires: { helpedAunt: true }, next: "a5_knock" },
      { img: "assets/obj-bed.png", x: 50, y: 90, w: 16, next: "final" },
    ],
  },

  a5_fireout: {
    caption: "💨 ลมกระโชกพัดไฟดับ! ความมืดกลืนบ้านทั้งหลัง\nอุณหภูมิลดลงทุกนาที...",
    bg: "assets/bg-storm.png",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { img: "assets/obj-firewood.png", x: 26, y: 78, w: 16, effects: { warmth: 1 }, next: "a5_relight" },
      { img: "assets/obj-door.png", x: 72, y: 78, w: 18, requires: { helpedAunt: true }, next: "a5_knock" },
      { img: "assets/obj-blanket.png", x: 50, y: 90, w: 18, effects: { trust: 1 }, next: "final" },
    ],
  },

  a5_relight: {
    caption: "🔥 จุดไฟใหม่ด้วยมือที่สั่น... ครั้ง สองครั้ง สามครั้ง\nเปลวไฟติดแล้ว! ทุกคนถอนหายใจพร้อมกัน",
    bg: "assets/bg-storm.png",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false },
             { img: "assets/obj-fire.png", x: 26, y: 78, w: 16 }],
    hotspots: [
      { img: "assets/obj-candle.png", x: 50, y: 88, w: 12, effects: { warmth: 1 }, next: "final" },
      { img: "assets/obj-heart.png", x: 74, y: 84, w: 14, effects: { trust: 1 }, next: "final" },
    ],
  },

  a5_knock: {
    bg: "assets/bg-aunt.png",
    caption: "🤝 เปิดประตูออกไป... ป้าแก้มยืนถือตะเกียงรออยู่\n\"ป้ารอแกอยู่นะ มา เข้าบ้านป้าสิ\"",
    bg: "assets/bg-storm.png",
    actors: [{ img: "assets/sprite-aunt.png", x: 50, y: 48, w: 40, shiver: false }],
    hotspots: [
      { img: "assets/obj-lantern.png", x: 50, y: 86, w: 14, set: { auntRescue: true }, next: "final" },
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
    return { title: "สดใส", emoji: "🏡",
      text: "ผ่านฤดูหนาวมาได้ทั้งบ้าน รู้เรื่องพ่อครบทุกอย่าง\nตอนต้นฤดูใบไม้ผลิ ต้นหอมที่พ่อปลูกไว้ออกดอกครั้งแรก\n\n— จบแบบดีที่สุด —" };
  if (auntRescue && helpedAunt)
    return { title: "บ้านที่สอง", emoji: "🤝",
      text: "คืนพายุนั้น สองบ้านกลายเป็นครอบครัวเดียวกัน\nความดีที่ให้ไป กลับมาในวันที่หนาวที่สุด\n\n— จบแบบสายป้าแก้ม —" };
  if (warmth >= 4 && openedBox)
    return { title: "อบอุ่นพอ", emoji: "🔥",
      text: "ไฟไม่เคยดับ ท้องไม่เคยว่าง\nแต่บางคืน...ยังอยากรู้ว่าในกล่องมีอะไร\n\n— จบแบบดี —" };
  if (trust >= 4)
    return { title: "แน่นแฟบ", emoji: "💛",
      text: "บ้านหนาว แต่ไม่มีใครหนาวเพียงลำพัง\nต่างคนต่างเล่าเรื่องพ่อให้กันฟังทั้งคืน\n\n— จบแบบกลาง —" };
  if (warmth >= 3)
    return { title: "ค้างเติ่ง", emoji: "🍂",
      text: "ผ่านฤดูหนาวมาได้... แบบที่ไม่มีใครล้ม\nแต่ก็ไม่มีใครสักคนที่เต็มเปี่ยม\n\n— จบแบบเหลือความรู้สึกว่าพลาดอะไรไป —" };
  return { title: "หนาว", emoji: "❄️",
    text: "ไฟดับกลางดึก ผ้าห่มบางเกินไป\nคืนนั้นฝังอยู่ในความทรงจำเป็นความหนาวที่ยาวนานที่สุด\n\n— จบแบบเศร้า ลองเล่นใหม่ดู —" };
}
