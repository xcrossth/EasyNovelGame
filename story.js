// ===== "ฤดูหนาวปีนั้น" — ฉบับเต็ม 5 องก์ ~70 ฉาก, 20 พื้นหลัง =====
// ทุก hotspot ใช้ img | requires:{trust:n} = ต้องมีค่าถึงกดได้ | set = แฟล็กซ่อน
// fx: ["snow","embers","fog","flicker"] = เอฟเฟกต์ของฉาก

const STORY = {

  // ═══════════════════ องก์ 1 — คืนแรก ═══════════════════

  start: {
    fx: ["snow"],
    caption: "ลมหนาวหวีดผ่านช่องหลังคาที่พังยับ ปล่อยให้เกล็ดหิมะโปรยลงมาเป็นหยดๆ\n\nแม่นั่งกอดน้องมะลิอยู่มุมบ้าน ผ้าห่มผืนเดียวที่มีก็บางเกินไป...\n\n\"แม่คะ... หนาว\" เสียงเล็กๆ ของมะลิสั่นเล็กน้อย\n\nฟ้ากำลังจะมืด นี่คือค่ำก่อนคลื่นความหนาวที่ใหญ่ที่สุดในรอบสิบปี และเวลามีเพียงช่วงเย็นนี้เท่านั้น",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { img: "assets/obj-firewood.png", x: 24, y: 74, w: 18, effects: { warmth: 1 }, next: "a1_forest" },
      { img: "assets/obj-ladder.png", x: 76, y: 32, w: 16, effects: { warmth: 1 }, next: "a1_rooftop" },
      { img: "assets/obj-blanket.png", x: 50, y: 82, w: 20, effects: { trust: 2 }, next: "a1_hug" },
    ],
  },

  a1_forest: {
    bg: "assets/bg-forest.png", fx: ["snow"],
    caption: "ป่าหลังบ้านในแสงสุดท้ายของวัน เงาต้นไม้เปลือยทอดยาวบนหิมะขาว\n\nเศษไม้แห้งมีเกลื่อนพื้น เก็บสักพักก็คงพอก่อไฟได้คืนนี้...\n\nแต่ลึกเข้าไปอีกนิด มีบางอย่างกลมกลืนกับหิมะ สะท้อนแสงเหลืองอ่อนลางๆ",
    hotspots: [
      { img: "assets/obj-firewood.png", x: 26, y: 62, w: 18, effects: { warmth: 1 }, next: "a1_axe" },
      { img: "assets/obj-lantern.png", x: 72, y: 66, w: 14, effects: { trust: 1 }, next: "a1_bird" },
    ],
  },

  a1_axe: {
    bg: "assets/bg-forest.png", fx: ["snow"],
    caption: "ขวานเก่าของพ่อ — ฝักอยู่ใต้ตอไม้ใหญ่ ด้ามไม้เก่าแต่คมยังอยู่เหมือนเมื่อวาน\n\nมะลิเคยเล่าว่า พ่อใช้ไม้จากป่านี้แกะสลักเครื่องรางหัวใจให้แก่น้อง ก่อนจะจากไป\n\nจำได้ว่าตอนนั้นมะลิยังเล็กมาก... แต่เรื่องของพ่อ เธอจำได้ทุกอย่าง",
    hotspots: [
      { img: "assets/obj-firewood.png", x: 50, y: 78, w: 20, effects: { warmth: 1 }, set: { hasAxe: true }, next: "a1_wood_in" },
    ],
  },

  a1_bird: {
    bg: "assets/bg-forest.png", fx: ["snow"],
    caption: "ก้อนขนน้อยๆ หนึ่งก้อนนิ่งอยู่กลางหิมะ เข้าใกล้ดู... มันยังหายใจแผ่วเบา\n\nนกเจ็บคิวที่หลงฝูงมากับคลื่นความหนาว\n\nอุ้มกลับไปอุ่นข้างเตาก็ได้... แต่ข้าวกินในบ้านก็กำลังจะหมดเหมือนกัน",
    hotspots: [
      { img: "assets/obj-heart.png", x: 30, y: 78, w: 14, effects: { trust: 1 }, set: { savedBird: true }, next: "a1_wood_in" },
      { img: "assets/obj-firewood.png", x: 70, y: 78, w: 18, effects: { warmth: 1 }, next: "a1_wood_in" },
    ],
  },

  a1_wood_in: {
    fx: ["snow"],
    caption: "กลับถึงบ้านเมื่อแขนไหล่เย็นชาไปหมด แต่อย่างน้อยฟืนก็เต็มแขน\n\nวางฟืนลงได้เองก็ได้ยิน... เสียงแม่ไอ แหบๆ ติดๆ กันหลายที\n\nเสียงแบบนี้ไม่ใช่ไอธรรมดา มันดังมาหลายวันแล้ว แต่แม่ไม่เคยยอมรับสักที",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { img: "assets/obj-fire.png", x: 28, y: 46, w: 14, effects: { warmth: 1 }, next: "a1_kitchen" },
      { img: "assets/obj-cloth.png", x: 72, y: 78, w: 16, effects: { trust: 2 }, next: "a1_mom_sick" },
    ],
  },

  a1_rooftop: {
    bg: "assets/bg-roof.png", fx: ["snow", "wind"],
    caption: "ปีนขึ้นมาบนหลังคา ลมหนาวตบหน้าจนตาแฉะ นิ้วมือสั่นจนแทบจับหมุดไม่ได้\n\nช่องรั่วใหญ่ที่สุดอยู่ตรงนี้แหละ พอดีเหนือมุมที่แม่กับมะลิหลับ\n\nเหนือหัวคือท้องฟ้าสีเทากำลังจะมืดสนิท ก้อนเมฆก้อนใหญ่ที่พาหิมะหนักกำลังก่อตัว",
    hotspots: [
      { img: "assets/obj-ladder.png", x: 30, y: 60, w: 16, effects: { warmth: 1 }, next: "a1_roof_done" },
      { img: "assets/obj-firewood.png", x: 70, y: 70, w: 16, effects: { warmth: 1 }, next: "a1_roof_done" },
    ],
  },

  a1_roof_done: {
    fx: ["snow"],
    caption: "อุดรอยรั่วได้ทันพอดี ก้อนหิมะชุดแรกของคืนนี้ก็เริ่มร่วงลงมา\n\nลมที่เคยหวีดผ่านบ้าน... คราวนี้เงียบลงเยอะแล้ว\n\n\"พี่เก่งจัง!\" มะลิตบมือเบาๆ ก่อนจะหันไปซบกับแม่",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false }],
    hotspots: [
      { img: "assets/obj-firewood.png", x: 28, y: 74, w: 16, effects: { warmth: 1 }, next: "a1_kitchen" },
      { img: "assets/obj-food.png", x: 72, y: 78, w: 16, effects: { trust: 1, warmth: 1 }, next: "a1_kitchen" },
    ],
  },

  a1_hug: {
    caption: "นั่งลงกอดแม่และมะลิไว้กลาง ทั้งสามแน่นกันเป็นก้อนเดียวใต้ผ้าห่มผืนเดียว\n\nความอบอุ่นจากร่างกายช่วยได้เยอะกว่าที่คิด\n\nตอนที่กำลังจะหลับๆ... มะลิกระซิบข้างหูเบามาก\n\n\"พี่คะ... ตัวแม่ร้อนจังเลย\"",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true },
             { img: "assets/obj-blanket.png", x: 26, y: 82, w: 20 }],
    hotspots: [
      { img: "assets/obj-cloth.png", x: 28, y: 44, w: 16, effects: { trust: 1 }, next: "a1_mom_sick" },
      { img: "assets/obj-firewood.png", x: 72, y: 50, w: 16, effects: { warmth: 1 }, next: "a1_kitchen" },
    ],
  },

  a1_mom_sick: {
    caption: "แม่ป่วยมาหลายวันแล้ว — ไอตอนดึก ตัวร้อน แต่ไม่เคยบอกใคร\n\n\"ไม่เป็นไรหรอก แม่แค่เพลีย\" แม่พูดเสมอ พร้อมยิ้มแบบที่รู้ว่าเป็นยิ้มปลอม\n\nแต่คืนนี้เสียงไอมันดังเกินจะทำเป็นไม่ได้ยิน",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { img: "assets/obj-cloth.png", x: 28, y: 46, w: 16, effects: { trust: 2 }, next: "a1_kitchen" },
      { img: "assets/obj-candle.png", x: 74, y: 76, w: 12, effects: { trust: 1 }, next: "a1_kitchen" },
    ],
  },

  a1_kitchen: {
    bg: "assets/bg-kitchen.png", fx: ["flicker"],
    caption: "ครัวมืดสนิท เตาดินเหลือเพียงถ่านแดงๆ ร้อนๆ เป็นจุดเดียวในบ้าน\n\nมะลิเข็นเก้าอี้มาเลื่อยๆ ยกข้าวสารที่เหลืออยู่ให้ดู\n\n\"ทำข้าวต้มกันไหมพี่? มะลิช่วยได้!\"\n\nข้าวสารในโหล... เหลือพอทำได้อีกแค่สองมื้อเท่านั้น",
    hotspots: [
      { img: "assets/obj-food.png", x: 30, y: 70, w: 16, effects: { warmth: 1 }, next: "a1_meal" },
      { img: "assets/obj-tea.png", x: 70, y: 70, w: 14, effects: { trust: 1 }, next: "a1_evening" },
    ],
  },

  a1_meal: {
    bg: "assets/bg-fire.png", fx: ["embers", "flicker"],
    caption: "ข้าวต้มร้อนๆ สองถ้วยใหญ่ ไอน้ำลอยขึ้นเต็มห้องจนเหมือนอยู่ในเมฆ\n\nมะลิกินหมดถ้วยแล้วยกหน้าขึ้นมายิ้ม \"ขอเพิ่มได้ไหมคะ\"\n\nมื้อค่ำนี้ไม่หรูหรา แต่เป็นครั้งแรกในสัปดาห์ที่ทุกคนได้กินของอุ่นๆ ด้วยกัน",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 56, y: 55, w: 42, shiver: false }],
    hotspots: [
      { img: "assets/obj-bed.png", x: 30, y: 78, w: 18, effects: { warmth: 1, trust: 1 }, next: "a1_evening" },
      { img: "assets/obj-heart.png", x: 70, y: 78, w: 14, effects: { trust: 1 }, next: "a1_talk" },
    ],
  },

  a1_evening: {
    bg: "assets/bg-night.png", fx: ["flicker"],
    caption: "ค่ำแล้ว เสียงลมหวีดผ่านช่องไม้ซีกเป็นจังหวะยาวๆ น่ากลัว\n\nมะลิเริ่มหลับในอ้อมแขนแม่ แต่แม่... ยังเพ่งมองเปลวเทียนนิ่งๆ\n\nสายตาแบบนั้นคือสายตาของคนที่กำลังคิดถึงใครสักคน",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false }],
    hotspots: [
      { img: "assets/obj-heart.png", x: 26, y: 76, w: 14, effects: { trust: 2 }, next: "a1_talk" },
      { img: "assets/obj-candle.png", x: 60, y: 76, w: 12, effects: { warmth: 1 }, next: "a1_watch" },
      { img: "assets/obj-bed.png", x: 50, y: 82, w: 16, next: "a1_end" },
    ],
  },

  a1_talk: {
    bg: "assets/bg-night.png", fx: ["flicker"],
    caption: "\"พี่คะ...\"\n\nมะลิดึงแขนเบาๆ ตาเปิดโพลงกลางดึก\n\n\"พี่สัญญาไหม... ว่าจะไม่ทิ้งแม่กับมะลิไปไหน\"\n\nมือเล็กๆ กำมือพี่แน่น ไม่ยอมปล่อย ราวกับกลัวว่าถ้าปล่อยแล้วทุกอย่างจะหายไป",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false }],
    hotspots: [
      { img: "assets/obj-heart.png", x: 50, y: 80, w: 14, effects: { trust: 1 }, next: "a1_watch" },
    ],
  },

  a1_watch: {
    bg: "assets/bg-window.png", fx: ["snow"],
    caption: "ยืนมองหิมะตกผ่านกระจกบานเดียวของบ้าน เงียบๆ คนเดียว\n\nต้นไม้ รั้ว ทุกอย่างกลายเป็นสีขาวเรียบๆ\n\nไกลออกไปปลายสายตา... แสงตะเกียงดวงเดียวจากบ้านหลังข้างๆ ยังสว่างอยู่\n\nบ้านของป้าแก้ม — คนเดียวที่ยังอยู่ในซอยนี้เมื่อฤดูหนาวมาถึง",
    hotspots: [
      { img: "assets/obj-candle.png", x: 50, y: 80, w: 12, effects: { warmth: 1 }, next: "a1_end" },
    ],
  },

  a1_end: {
    bg: "assets/bg-dawn.png", fx: ["fog"],
    caption: "ผ่านคืนแรกมาได้...\n\nแต่ตอนเช้ามืด มีเสียงคุยกันดังมาจากหน้าบ้าน เป็นเสียงลุงข้างบ้านกับใครบางคน\n\n\"...คลื่นความหนาวรอบใหญ่กำลังจะมา ปีนี้มันหนักกว่าทุกปีสิ ได้ข่าวว่าอาจมีพายุด้วย\"\n\nฤดูหนาวปีนี้... เพิ่งเริ่มต้นเท่านั้น",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false }],
    hotspots: [
      { img: "assets/obj-sunrise.png", x: 50, y: 80, w: 20, next: "a2_intro" },
    ],
  },

  // ═══════════════════ องก์ 2 — วันของการแลกเปลี่ยน ═══════════════════

  a2_intro: {
    bg: "assets/bg-morning.png", fx: ["snow"],
    caption: "วันที่สอง หิมะโปรยหนักทั้งเช้าจนไม่เห็นทางข้างนอกหน้าบ้าน\n\nแม่นอนพักบนเตียง อาการยังไม่ดีขึ้นเท่าไหร่\n\nมะลิชี้สิ่งของในบ้าน \"น้ำเหลือนิดเดียวแล้วค่ะ ข้าวก็เหมือนกัน\"\n\nก่อนเที่ยงต้องเลือกออกไปทำอย่างใดอย่างหนึ่ง... ไกลกว่านั้นไม่ไหวแล้ว",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 58, w: 42, shiver: false }],
    hotspots: [
      { img: "assets/obj-cloth.png", x: 24, y: 62, w: 16, effects: { trust: 1 }, next: "a2_well" },
      { img: "assets/obj-box.png", x: 76, y: 34, w: 14, effects: { trust: 1 }, next: "a2_barn" },
      { img: "assets/obj-salt.png", x: 50, y: 80, w: 14, effects: { warmth: 1 }, next: "a2_market" },
    ],
  },

  a2_well: {
    bg: "assets/bg-well.png", fx: ["snow"],
    caption: "บ่อน้ำกลางหมู่บ้านใต้หิมะชั้นหนา เชือกของกระเกลียวเกี่ยวน้ำแข็งแข็งทั้งเส้น\n\nลุงเจ้าของบ่อที่ยังมาเจาะน้ำแข็งทุกเช้า มองมาแล้วส่ายหน้า\n\n\"ฤดูหนาวปีนี้มันแปลกนะหนู ยาวกว่าทุกปี... ฉันอยู่มาเจ็ดสิบปี ไม่เคยเห็นแบบนี้\"",
    hotspots: [
      { img: "assets/obj-cloth.png", x: 30, y: 74, w: 16, effects: { warmth: 1 }, set: { hasWater: true }, next: "a2_well2" },
      { img: "assets/obj-heart.png", x: 70, y: 74, w: 14, effects: { trust: 1 }, set: { hasWater: true }, next: "a2_well2" },
    ],
  },

  a2_well2: {
    bg: "assets/bg-well.png", fx: ["snow"],
    caption: "เหวี่ยงถังลงบ่อได้สำเร็จในที่สุด น้ำเย็นจัดจนมือชาไปครึ่งมือ\n\nได้น้ำเต็มสองถังพอดี! กำลังจะเดินกลับ...\n\n\"รอก่อนหนู!\" ลุงเรียกเสียงดัง แล้วยื่นสิ่งหนึ่งมาให้\n\nมันคือปลาแห้งสองตัว ห่อด้วยใบตองอย่างดี \"เอาไปต้มน้ำซุป เดี๋ยวอากาศหนาวกว่านี้อีก\"",
    hotspots: [
      { img: "assets/obj-food.png", x: 50, y: 78, w: 16, effects: { warmth: 1, trust: 1 }, next: "a2_noon" },
    ],
  },

  a2_barn: {
    bg: "assets/bg-barn.png", fx: ["dust"],
    caption: "โรงนาเก่าที่พ่อเคยใช้เก็บเครื่องมือ บัดนี้ร้างและเต็มไปด้วยฝุ่น\n\nเปิดประตูไม้ที่บานเก่าสะบัดมานาน... กลิ่นไม้ กลิ่นฟาง และบางอย่างที่คุ้นมาก\n\n\"ที่นี่สิ!\" มะลิวิ่งไปชี้มุมหนึ่ง ตาสว่างวาบ\n\n\"พ่อเคยแกะสลักไม้ให้หนูตรงนี้! หนูจำได้!\"",
    hotspots: [
      { img: "assets/obj-heart.png", x: 28, y: 70, w: 14, effects: { trust: 2 }, next: "a2_barn2" },
      { img: "assets/obj-firewood.png", x: 72, y: 70, w: 18, effects: { warmth: 1 }, next: "a2_barn2" },
    ],
  },

  a2_barn2: {
    bg: "assets/bg-barn.png", fx: ["dust"],
    caption: "ดึงผ้าใบเก่าออกจากมุมห้อง... แล้วต้องหยุดนิ่ง\n\nใต้ผ้าใบคือกระสอบข้าวสารเกือบเต็มกระสอบ!\n\nและบนผนัง... มีดพร้อมด้ามไม้ที่มีตัวหนังสือจางๆ สลักไว้\n\nเป็นชื่อของพ่อ",
    hotspots: [
      { img: "assets/obj-food.png", x: 30, y: 74, w: 16, effects: { warmth: 2 }, next: "a2_noon" },
      { img: "assets/obj-heart.png", x: 70, y: 74, w: 14, effects: { trust: 1 }, next: "a2_noon" },
    ],
  },

  a2_market: {
    bg: "assets/bg-market.png", fx: ["fog", "snow"],
    caption: "ตลาดเช้าที่มีแค่สามคันรถ หมอกหนาจนมองไปได้แค่สิบก้าว\n\nป้าขายของที่ยังมาเปิดร้านทุกวัน แม้ลูกค้าจะนับหัวได้\n\n\"โห หน้าเหมือนคนไม่ได้กินข้าวเลย\" ป้ามองแป้งข้าวที่ซีดไปเพราะหนาว\n\n\"ของน้อยละปีนี้... หนูเอาเกลือมาแลกก็ได้นะ เอาไปต้มน้ำซุปให้แม่สิ\"",
    hotspots: [
      { img: "assets/obj-salt.png", x: 30, y: 74, w: 14, effects: { warmth: 2 }, next: "a2_noon" },
      { img: "assets/obj-heart.png", x: 70, y: 74, w: 14, effects: { trust: 1 }, set: { helpedAunt: true }, next: "a2_noon" },
    ],
  },

  a2_noon: {
    bg: "assets/bg-exterior.png", fx: ["snow"],
    caption: "กลับถึงบ้านตอนเที่ยง หิมะเริ่มหนักขึ้นเรื่อยๆ ฟ้ามืดลงผิดปกติ\n\nมองออกไปตามซอย... ภาพเบลอๆ ขาวๆ ของคนสูงวัยคนหนึ่ง\n\nป้าแก้มกำลังปัดหิมะหน้าบ้านตัวเองอยู่คนเดียว ท่าทางหอบๆ\n\nอากาศแบบนี้... คนแก่คนหนึ่งทำงานหนักเกินไป",
    hotspots: [
      { img: "assets/obj-lantern.png", x: 28, y: 66, w: 14, effects: { trust: 1 }, set: { helpedAunt: true }, next: "a2_help" },
      { img: "assets/obj-firewood.png", x: 72, y: 66, w: 16, effects: { warmth: 1 }, next: "a2_chore" },
    ],
  },

  a2_help: {
    bg: "assets/bg-exterior.png", fx: ["snow"],
    caption: "วิ่งข้ามไปช่วยปัดหิมะจนเสร็จ มือเย็นแทบไม่มีความรู้สึก\n\n\"หนูดีจริงนะ...\" ป้าแก้มพูด พลางถอนหายใจยาว\n\n\"ป้าลูกคนเดียว พ่อแกไปนานแล้ว บางที... ก็เหงาเหมือนกันนะ\"\n\nก่อนแยกย้าย ป้ายกมือไหว้เบาๆ \"เดี๋ยวเย็นนี้ป้าจะไปหา เอาของดีๆ ไปให้\"",
    hotspots: [
      { img: "assets/obj-sunrise.png", x: 50, y: 78, w: 20, next: "a2_knock" },
    ],
  },

  a2_chore: {
    bg: "assets/bg-kitchen.png", fx: ["flicker"],
    caption: "ทำงานบ้านฝั่งตัวเอง — เก็บฟืนเพิ่มจากใต้ถุน หุงข้าวเย็นไว้\n\nยังดีที่คืนนี้ยังมีของกิน มีฟืน มีน้ำ\n\nแต่พอเงยหน้าออกไปดู... บ้านของป้าแก้มด้านนั้น เงียบไป\n\nไออุ่นจากเตาทำให้ค่ำนี้ดีกว่าเมื่อวาน... แต่มีอะไรบางอย่างมันยังขาดหายไป",
    hotspots: [
      { img: "assets/obj-sunrise.png", x: 50, y: 78, w: 20, next: "a2_knock" },
    ],
  },

  a2_knock: {
    fx: ["snow"],
    caption: "เย็นมาถึง ลมเริ่มแรงขึ้น... แล้วก็มีเสียงนั้น\n\nก๊อก... ก๊อก... ก๊อก\n\nเสียงเคาะสามครั้ง ช้าๆ พร้อมเสียงลมหายใจของคนที่หนาวจนสั่น\n\nมะลิมองหน้าแล้วกระซิบ \"ใครนะคะ...\"",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 60, y: 50, w: 36, shiver: false }],
    hotspots: [
      { img: "assets/obj-door.png", x: 30, y: 60, w: 22, next: "a2_ask" },
    ],
  },

  a2_ask: {
    caption: "เปิดประตูออก ป้าแก้มยืนอยู่ ตัวสั่น ผ้าพันคาเปียกฝนหิมะ\n\nมือหนาวเย็นของป้ากุมมือไว้แน่น\n\n\"ขอเกลือหน่อยได้ไหนหนู... ป้าจะเอาไปตุ๋นอะไรดีๆ ให้ทั้งบ้านนี้\n\nแลกเปลี่ยนกัน... ฤดูหนาวมันต้องช่วยกันอยู่รอด\"",
    actors: [{ img: "assets/sprite-aunt.png", x: 50, y: 52, w: 40, shiver: false }],
    hotspots: [
      { img: "assets/obj-salt.png", x: 28, y: 78, w: 16, effects: { trust: 2 }, set: { helpedAunt: true }, next: "a2_talk" },
      { img: "assets/obj-door.png", x: 72, y: 78, w: 18, effects: { warmth: 1 }, next: "a2_refuse" },
    ],
  },

  a2_talk: {
    bg: "assets/bg-fire.png", fx: ["embers", "flicker"],
    caption: "ป้ารับเกลือไปด้วยรอยยิ้มกว้าง แล้วถอดรองเท้าเปียกๆ นั่งลงข้างเตาไฟ\n\n\"ให้ป้าเล่าเรื่องมึงฟังมั้ย... เรื่องสมัยที่พ่อแกยังอยู่\"\n\nแม่ที่นั่งอยู่ด้วยเงียบไป... แต่สายตาบอกว่าอยากฟัง\n\nเรื่องที่ไม่มีใครเคยเล่าให้ลูกฟัง กำลังจะเริ่มขึ้น",
    hotspots: [
      { img: "assets/obj-tea.png", x: 28, y: 78, w: 14, effects: { trust: 1 }, set: { knowsBox: true }, next: "a2_boxhint" },
      { img: "assets/obj-fire.png", x: 72, y: 78, w: 14, effects: { warmth: 1 }, next: "a2_dadstory" },
    ],
  },

  a2_dadstory: {
    bg: "assets/bg-fire.png", fx: ["embers", "flicker"],
    caption: "\"พ่อแกน่ะ...\" ป้าหัวเราะเบาๆ น้ำตาคลอเบ้า\n\n\"ตอนหนาวเข้า เค้าจะเลิกงานก่อนพระอาทิตย์ตกทุกวันเลยนะ\n\nบอกว่าต้องรีบกลับไปก่อไฟ... ให้แม่แกไม่ต้องสั่น\"\n\n\"แกน่ะ เหมือนพ่อแกเป๊ะ ตามันเหมือนกันเลย ตอนที่มันมองคนที่มันรัก\"",
    hotspots: [
      { img: "assets/obj-tea.png", x: 30, y: 78, w: 14, effects: { trust: 1 }, set: { knowsBox: true }, next: "a2_boxhint" },
      { img: "assets/obj-heart.png", x: 70, y: 78, w: 14, effects: { trust: 1 }, next: "a2_dream" },
    ],
  },

  a2_boxhint: {
    bg: "assets/bg-fire.png", fx: ["embers", "flicker"],
    caption: "\"นี่มะลิ... ป้าขอบอกอะไรหน่อยได้มั้ย\"\n\nป้าก้มลงไปพูดกับมะลิเสียงเบา แต่ทุกคนได้ยินหมด\n\n\"กล่องไม้ของพ่อแกน่ะ ป้าเห็นเค้าซ่อนไว้ที่โรงนาเก่า ตอนก่อนจะไป...\"\n\n\"แกรู้ไหม... ว่าข้างในมีอะไร\"",
    hotspots: [
      { img: "assets/obj-box.png", x: 50, y: 80, w: 20, effects: { trust: 1 }, next: "a2_dream" },
    ],
  },

  a2_refuse: {
    fx: ["snow"],
    caption: "\"งั้นเหรอ...\" ป้าพยักหน้าเงียบๆ ยิ้มแบบเข้าใจ\n\n\"ไม่เป็นไรๆ ป้าเข้าใจ... ของมันก็มีจำกัดนะหนู\"\n\nแล้วป้าก็เดินกลับไปในซีกหิมะ ผ้าพันคาพลิ้วไปตามลม\n\nเกลือที่เหลือ... เก็บไว้ได้กินอีกนาน แต่รู้สึกเหมือนเสียอะไรไปมากกว่าที่ได้มา",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { img: "assets/obj-bed.png", x: 50, y: 80, w: 18, next: "a2_dream" },
    ],
  },

  a2_dream: {
    bg: "assets/bg-night.png", fx: ["flicker"],
    caption: "ดึกแล้ว บ้านเงียบสนิทเหลือแค่เสียงลม...\n\nแล้วมะลิก็สะดุ้งตื่น ร้องไห้สั่นๆ ทั้งตัวสั่น\n\n\"พี่คะ... พี่คะ...\"\n\n\"ฝันว่าพ่อยืนอยู่ไกลๆ ตรงปลายทาง... แล้วพ่อก็เดินหายไป มะลิวิ่งตามไม่ทัน\n\nพ่อเป็นอะไรไปคะ... ทำไมไม่มีใครบอกมะลิบ้าง\"",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { img: "assets/obj-heart.png", x: 30, y: 76, w: 14, effects: { trust: 2 }, next: "a2_comfort" },
      { img: "assets/obj-candle.png", x: 70, y: 76, w: 12, effects: { warmth: 1 }, next: "a2_end" },
    ],
  },

  a2_comfort: {
    bg: "assets/bg-night.png", fx: ["flicker"],
    caption: "\"มะลิฟังนะ...\" ปัดน้ำตาน้องเบาๆ\n\n\"พ่อไม่ได้หายไปไหนหรอก... พ่ออยู่ในนี้\"\n\nชี้ที่หัวใจมะลิเบาๆ\n\n\"พ่ออยู่ในหัวใจที่จำหน้าพ่อได้ อยู่ในตาที่เหมือนพ่ะ อยู่ในทุกอย่างที่พ่อทำไว้\"\n\nมะลิหยุดไห้... แล้วหลับไปพร้อมยิ้มบางๆ ที่มุมปาก",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false }],
    hotspots: [
      { img: "assets/obj-bed.png", x: 50, y: 80, w: 18, effects: { trust: 1 }, next: "a2_end" },
    ],
  },

  a2_end: {
    bg: "assets/bg-dawn.png", fx: ["fog"],
    caption: "วันที่สาม เช้ามืด บ้านเงียบผิดปกติ... เกินไป\n\nปกติตอนนี้แม่ต้องตื่นทำข้าวแล้ว แต่วันนี้ไม่มีเสียงเลย\n\nเดินเข้าไปดูมุมเตียง...\n\nเสียงหายใจของแม่... ดังผิดปกติ หอบหืดเป็นจังหวะสั้นๆ ถี่ๆ",
    hotspots: [
      { img: "assets/obj-cloth.png", x: 50, y: 80, w: 16, next: "a3_crisis" },
    ],
  },

  // ═══════════════════ องก์ 3 — ตัวเลือกหนักที่สุด ═══════════════════

  a3_crisis: {
    bg: "assets/bg-dawn.png", fx: ["fog"],
    caption: "แม่กำเริบ! นั่งก้มหน้ากุมอก หายใจแรงจนพูดไม่ออก\n\n\"ยา......\" แม่พูดได้แค่คำเดียว ก่อนจะหอบต่อ\n\nกล่องยาหอบในบ้าน... เปิดดูแล้ว มันว่างเปล่า ไม่มีเหลือแม้แต่เม็ดเดียว\n\nอีกไม่กี่ชั่วโมงพายุจะมาถึง ต้องเลือกเดี๋ยวนี้ — และแต่ละทาง... มันหนักหน่วงทั้งนั้น",
    actors: [{ img: "assets/sprite-mom-sick.png", x: 50, y: 55, w: 48, shiver: false }],
    hotspots: [
      { img: "assets/obj-medicine.png", x: 20, y: 76, w: 14, effects: { warmth: -1, trust: 1 }, next: "a3_path" },
      { img: "assets/obj-lantern.png", x: 50, y: 82, w: 14, requires: { trust: 3 }, next: "a3_aunt_door" },
      { img: "assets/obj-herbs.png", x: 80, y: 76, w: 14, effects: { trust: 1 }, next: "a3_herb_search" },
    ],
  },

  a3_path: {
    bg: "assets/bg-path.png", fx: ["snow"],
    caption: "วิ่งออกจากบ้านมาได้ครึ่งทาง หิมะเริ่มทับถมหนาขึ้นทุกนาที\n\nทางเข้าตัวเมืองมีสองเส้น — ทางหลักยาวแต่ปลอดภัย\n\nหรือลัดผ่านริมแม่น้ำที่เย็นตัวเป็นน้ำแข็ง... ประหยัดเวลาเกือบชั่วโมง\n\nแต่ถ้าน้ำแข็งแตก... ไม่มีใครมาช่วยทัน",
    hotspots: [
      { img: "assets/obj-lantern.png", x: 28, y: 70, w: 14, effects: { warmth: 1 }, next: "a3_river" },
      { img: "assets/obj-cloth.png", x: 72, y: 70, w: 16, next: "a3_clinic" },
    ],
  },

  a3_river: {
    bg: "assets/bg-river.png", fx: ["snow", "wind"],
    caption: "ริมแม่น้ำที่กลายเป็นแผ่นน้ำแข็งขาวโพลนกว้างใหญ่\n\nเสียงเบาๆ ใต้เท้าดัง \"กร๊าก... กร๊าก...\" เป็นระยะ\n\nนาทีที่เดินเร็วที่สุดในชีวิต — ตามองไปข้างหน้า ไม่กล้ามองลงใต้เทพ\n\nฝั่งตรงข้าม... ใกล้เข้ามาทุกก้าว",
    hotspots: [
      { img: "assets/obj-lantern.png", x: 30, y: 74, w: 14, effects: { warmth: 1 }, next: "a3_clinic" },
      { img: "assets/obj-cloth.png", x: 70, y: 74, w: 16, effects: { trust: 1 }, next: "a3_clinic" },
    ],
  },

  a3_clinic: {
    bg: "assets/bg-clinic.png",
    caption: "คลินิกประจำตำบล แสงไฟขาวส่องกลางหิมะ หมอเถื่อนยังเปิดอยู่\n\n\"หอบหืดรึ? แม่เหรอ...\" หมอพูดช้าๆ ค้นตู้ยา\n\n\"ยาชนิดนี้หมดสต๊อกทั้งอำเภอแล้วรู้มั้ย แต่...\"\n\nหมือนเห็นอะไรในสายตา \"...กล่องสุดท้าย ป้าเก็บไว้ให้คนที่ต้องการมันจริงๆ ละกัน\"",
    hotspots: [
      { img: "assets/obj-medicine.png", x: 50, y: 78, w: 14, effects: { trust: 1 }, next: "a3_return" },
    ],
  },

  a3_return: {
    bg: "assets/bg-path.png", fx: ["snow", "wind"],
    caption: "กำยาแน่นในมือ วิ่งกลับทั้งที่ขาสั่นจนแทบยืนไม่ติด\n\nท้องฟ้าด้านบนเริ่มมีเมฆสีเทาดำก้อนใหญ่ก่อตัวเร็วผิดปกติ\n\nพายุกำลังจะมาถึงเร็วกว่าที่หมอบอกไว้...\n\nแล้วแม่ยังอยู่บ้านคนเดียวกับมะลิ",
    hotspots: [
      { img: "assets/obj-medicine.png", x: 50, y: 78, w: 14, effects: { warmth: 1, trust: 1 }, next: "a3_recover" },
    ],
  },

  a3_aunt_door: {
    bg: "assets/bg-aunt-ext.png", fx: ["snow", "flicker"],
    caption: "บ้านของป้าแก้มในเช้ามืด แสงตะเกียงหน้าประตูยังสว่างอยู่\n\nเคาะประตูได้เพียงครั้งที่สอง...\n\n\"รีบเข้ามา!\" ป้าเปิดประตูทันที ตาแปลกใจแต่ไม่ได้ถามอะไรเลยสักคำ\n\nป้ารออยู่... เหมือนรู้มาตลอดว่าเช้านี้จะมีคนมาเคาะประตู",
    hotspots: [
      { img: "assets/obj-door.png", x: 50, y: 76, w: 20, next: "a3_aunt_in" },
    ],
  },

  a3_aunt_in: {
    bg: "assets/bg-aunt.png", fx: ["flicker"],
    caption: "\"ยาหอบป้ามีตัวยาสำรองไว้ตลอด เพราะรู้ว่าแม่แกเป็นนะ\"\n\nป้าหยิบกล่องยาจากชั้น มือสั่นนิดๆ แต่หนักแน่น\n\n\"เมื่อคืนป้านึกถึงหน้าแม่แก... เลยเตรียมของไว้ให้ กะว่าเย็นนี้จะเอาไปเอง\"\n\nนาทีที่หนาวที่สุดของปี... ความดีเก่าๆ ที่สะสมไว้ ยังใช้ได้เสมอ",
    hotspots: [
      { img: "assets/obj-medicine.png", x: 50, y: 78, w: 14, effects: { warmth: 1, trust: 1 }, set: { helpedAunt: true }, next: "a3_recover" },
    ],
  },

  a3_herb_search: {
    bg: "assets/bg-forest.png", fx: ["snow"],
    caption: "มะลิคว้ามือพี่วิ่งออกหลังบ้าน ไปพุ่มไม้ใต้ต้นมะขาม\n\n\"ใบนี้! ใบนี้สิคะ!\"\n\nน้องเล็กควักใบไม้สีเขียวเข้มออกจากพุ่ม ยื่นให้ดูด้วยตาเป็นประกาย\n\n\"แม่เคยต้มให้หนูดื่มตอนไอส์! ขมมากแต่หาย! หนูจำได้!\"\n\nความจำของเด็กเจ็ดขวบ... กับชีวิตของแม่",
    hotspots: [
      { img: "assets/obj-herbs.png", x: 50, y: 78, w: 16, effects: { trust: 1 }, next: "a3_gamble" },
    ],
  },

  a3_gamble: {
    bg: "assets/bg-kitchen.png", fx: ["flicker", "steam"],
    caption: "ต้มใบไม้ในหม้อดินเก่า กลิ่นขมจัดจนมะลิหน้าบูด\n\nป้อนยาให้แม่ทีละช้อน ทีละช้อน... นาทีผ่านไปช้าเหมือนชั่วโมง\n\nมะลิกุมมือแม่ไว้ นิ่ง ไม่กล้าขยับ ไม่กล้าพูด\n\nแล้วเสียงหายใจของแม่ก็... นิ่งขึ้น สม่ำเสมอขึ้น ทีละนิด\n\nความจำของเด็กเจ็ดขวบ ไม่ได้ผิดเลยสักนิด",
    hotspots: [
      { img: "assets/obj-tea.png", x: 50, y: 78, w: 14, effects: { warmth: 1, trust: 1 }, next: "a3_recover" },
    ],
  },

  a3_recover: {
    bg: "assets/bg-night.png", fx: ["flicker"],
    caption: "ค่ำนั้น แม่หลับสบายเป็นครั้งแรกในหลายคืน ไอก็ไม่กำเริบ\n\nตื่นมาตอนดึกมาก เห็นแม่มองมานิ่งๆ ในแสงเทียน\n\n\"...ลูกโตแล้วสินะ\"\n\nแม่ลูบหัวเบาๆ เหมือนตอนยังเด็ก แต่สายตา... เปลี่ยนไปจากเมื่อก่อน",
    hotspots: [
      { img: "assets/obj-heart.png", x: 30, y: 78, w: 14, effects: { trust: 2 }, next: "a3_momtalk" },
      { img: "assets/obj-candle.png", x: 70, y: 78, w: 12, effects: { warmth: 1 }, next: "a3_end" },
    ],
  },

  a3_momtalk: {
    bg: "assets/bg-night.png", fx: ["flicker"],
    caption: "\"เรื่องพ่อของเราน่ะ...\" แม่เริ่มพูด แล้วหยุด เหมือนคำไม่ยอมออกมาง่ายๆ\n\n\"...แม่เล่าให้ฟังวันหน้านะ ให้เล่าพร้อมกันทั้งบ้าน ตอนที่ทุกคนพร้อม\"\n\nแล้วแม่ก็หันไปลูบหัวมะลิ\n\n\"เดี๋ยวนี้... ถึงเวลาแล้วล่ะ มะลิรู้ว่าของพ่ออยู่ที่ไหน จริงไหมล่ะ\"",
    hotspots: [
      { img: "assets/obj-sunrise.png", x: 50, y: 80, w: 20, effects: { trust: 1 }, next: "a3_end" },
    ],
  },

  a3_end: {
    bg: "assets/bg-morning.png", fx: ["snow"],
    caption: "วันที่สี่ แดดอ่อนๆ ส่องเข้ามาเป็นครั้งแรกในรอดหลายวัน\n\nแม่อาการดีขึ้นมาก นั่งพิงหมอนได้แล้ว ยิ้มได้เหมือนเดิม\n\nมะลิลากมือพี่ไปชี้มุมหนึ่งของบ้าน ตาเป็นประกายเหมือนจุดพลุ\n\n\"แม่บอกว่าถึงเวลาแล้ว! พี่ตามมะลิมาเร็ว!\"",
    hotspots: [
      { img: "assets/obj-key.png", x: 50, y: 80, w: 12, next: "a4_intro" },
    ],
  },

  // ═══════════════════ องก์ 4 — กล่องของพ่อ ═══════════════════

  a4_intro: {
    bg: "assets/bg-morning.png", fx: ["snow"],
    caption: "\"พ่อเคยบอกมะลิน่ะคะ\" มะลิพูดช้าๆ ตอนที่ไม่ค่อยได้ยินน้ำเสียงจริงจังของน้อง\n\n\"ถ้าปีไหนหนาวที่สุดแล้วเราผ่านไปได้... ให้มาเปิดกล่องที่พ่อซ่อนไว้\"\n\n\"พ่อบอกว่าข้างในมีของที่เก็บไว้ให้ทุกคน... มะลิรอมาตั้งแต่ตอนนั้นเลยนะ\"\n\nพ่อรู้ตั้งแต่ตอนนั้นแล้ว... ว่าวันหนึ่งมันจะมาถึงจริงๆ",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: false }],
    hotspots: [
      { img: "assets/obj-key.png", x: 50, y: 80, w: 12, requires: { trust: 4 }, next: "a4_barn_search" },
      { img: "assets/obj-candle.png", x: 78, y: 68, w: 12, next: "a5_prep" },
    ],
  },

  a4_barn_search: {
    bg: "assets/bg-barn.png", fx: ["dust"],
    caption: "โรงนาเก่า อีกครั้งหนึ่ง — แต่คราวนี้ตามหาสิ่งที่พ่อซ่อนไว้จริงๆ\n\nมะลิวิ่งไปชี้แผ่นไม้บางๆ ที่ฝังอยู่กับพื้น มุมที่แม่เคยบอกให้มาดู\n\n\"ที่นี่สิ! พ่อเคยซ่อนกุญแจไว้ตรงนี้! มะลิจำได้!\"\n\nดึงแผ่นไม้ออก... ใต้มันมีบางอย่างเก็บไว้อย่างดี ห่อผ้ากันน้ำหลายชั้น",
    hotspots: [
      { img: "assets/obj-key.png", x: 50, y: 78, w: 12, next: "a4_open" },
    ],
  },

  a4_open: {
    bg: "assets/bg-barn.png", fx: ["dust"],
    caption: "กุญแจสนิมสีน้ำตาลหมุนหนึ่งรอบ... \"แต๊ะ\"\n\nฝากล่องไม้เปิดออกเป็นครั้งแรกในรอบหลายปี\n\nข้างใน... ซองจดหมายเก่าที่ห่อผ้าไว้ และถุงเงินเล็กๆ ที่หนักมือผิดปกติ\n\nมะลิกุมมือพี่แน่น \"พ่ออยู่ในนั้นจริงๆ ใช่ไหมคะ\"",
    actors: [{ img: "assets/obj-box.png", x: 50, y: 55, w: 34 }],
    hotspots: [
      { img: "assets/obj-letter.png", x: 28, y: 80, w: 16, effects: { trust: 2 }, set: { openedBox: true }, next: "a4_letter" },
      { img: "assets/obj-money.png", x: 72, y: 80, w: 16, effects: { warmth: 2 }, set: { openedBox: true }, next: "a4_money" },
    ],
  },

  a4_letter: {
    bg: "assets/bg-window.png", fx: ["snow"],
    caption: "\"ถ้าลูกได้อ่านจดหมายนี้ แปลว่าถึงเวลาแล้ว\"\n\nลายมือของพ่อ — เอียงๆ ตัวเล็ก เหมือนคนที่เขียนรีบๆ แต่ระวังทุกตัวอักษร\n\n\"พ่อขอโทษที่ต้องไปก่อน ก่อนที่จะได้เห็นพวกเธอโต\n\nแต่พ่ออยากให้รู้ว่า... พ่อไม่เคยไปไหนเลย\"",
    hotspots: [
      { img: "assets/obj-heart.png", x: 50, y: 78, w: 14, next: "a4_letter2" },
    ],
  },

  a4_letter2: {
    bg: "assets/bg-window.png", fx: ["snow"],
    caption: "\"ลูกพี่... พ่อรู้ว่าแกต้องเป็นคนอ่านจดหมายนี้ก่อนใคร\n\nดูแลแม่กับน้อง เหมือนที่พ่อเคยดูแล — แกทำได้อยู่แล้ว พ่อเห็น\"\n\n\"อย่าได้โกรธแม่ที่เขาปิดบังเรื่องของพ่อนะ... เขาทำเพื่อพวกเธอทั้งนั้น\n\nทุกคืนที่เขาร้องไห้ มันคือรักที่ไม่รู้จะบอกยังไง\"\"",
    hotspots: [
      { img: "assets/obj-heart.png", x: 30, y: 78, w: 14, effects: { trust: 1, warmth: 1 }, next: "a4_memory" },
      { img: "assets/obj-money.png", x: 70, y: 78, w: 16, effects: { warmth: 1 }, next: "a4_memory" },
    ],
  },

  a4_memory: {
    bg: "assets/bg-spring.png", fx: ["petals"],
    caption: "แม่เดินมาช้าๆ นั่งลงข้างๆ แล้วเล่าต่อในสิ่งที่เหลือ\n\n\"คืนก่อนพ่อจะไป... ทั้งคู่ปลูกต้นหอมเล็กๆ ไว้หน้าบ้าน\"\n\n\"พ่อบอกว่า... ถ้าปีไหนมันออกดอก แปลว่าพ่อส่งข่าวมาถึงพวกเราแล้วนะ\"\n\nหันไปมองหน้าบ้าน... ต้นเล็กๆ นั้นยังยืนอยู่ ใต้หิมะ รอเวลาของมัน",
    hotspots: [
      { img: "assets/obj-plant.png", x: 50, y: 78, w: 14, effects: { trust: 1 }, set: { knowsTree: true }, next: "a4_after" },
    ],
  },

  a4_money: {
    bg: "assets/bg-barn.png", fx: ["dust"],
    caption: "ถุงเงินของพ่อ — เหรียญและธนบัตรเก็บมานานหลายปี\n\nพอดีสำหรับซ่อมหลังคาทั้งหลัง และซื้อยาให้แม่ตลอดฤดูหนาว\n\nพ่อเก็บมันไว้ตั้งแต่ยังไม่มีมะลิ... รอวันที่ลูกๆ ต้องการมันที่สุด\n\n\"ไอ้หนูพ่อ...\" แม่พูดเบาๆ พลางหัวเราะทั้งน้ำตา \"ยังเลี้ยงบ้านหลังนี้อยู่เลยนะ\"",
    hotspots: [
      { img: "assets/obj-firewood.png", x: 28, y: 78, w: 16, effects: { warmth: 1 }, next: "a4_after" },
      { img: "assets/obj-medicine.png", x: 72, y: 78, w: 14, effects: { warmth: 1, trust: 1 }, next: "a4_after" },
    ],
  },

  a4_after: {
    bg: "assets/bg-night.png", fx: ["flicker"],
    caption: "คืนนั้นบ้านเงียบ แต่ใจของทุกคนเต็มกว่าเมื่อไหร่\n\nแม่หลับไปพร้อมยิ้ม มะลิกอดเครื่องรางหัวใจไม่ยอมปล่อย\n\nมองออกไปนอกหน้าต่าง... เมฆก้อนใหญ่สีเทาดำกำลังก่อตัวขึ้นไกลๆ เงียบๆ\n\nคืนสุดท้ายของฤดูหนาวกำลังจะมาถึง... และมันจะหนักที่สุด",
    hotspots: [
      { img: "assets/obj-candle.png", x: 50, y: 78, w: 12, next: "a5_prep" },
    ],
  },

  // ═══════════════════ องก์ 5 — พายุ ═══════════════════

  a5_prep: {
    bg: "assets/bg-kitchen.png", fx: ["flicker", "wind"],
    caption: "ข่าวพายุมาถึงบ้านตอนบ่าย — \"พายุหิมะใหญ่ที่สุดในรอบสิบปี คืนนี้\"\n\nทุกคนในบ้านขยับกันคล่องขึ้นผิดปกติ เหมือกรู้ว่าต้องทำอะไร\n\nเก็บน้ำให้เต็มทุกโหล อุดช่องลมเพิ่ม ผ้าห่มทุกผืนกองไว้กลางบ้าน\n\nเตรียมพร้อม... เท่าที่บ้านหลังคาพังจะทำได้",
    hotspots: [
      { img: "assets/obj-cloth.png", x: 26, y: 72, w: 16, effects: { warmth: 1 }, next: "a5_intro" },
      { img: "assets/obj-firewood.png", x: 72, y: 72, w: 16, effects: { warmth: 1 }, next: "a5_intro" },
    ],
  },

  a5_intro: {
    bg: "assets/bg-storm.png", fx: ["snow", "wind", "shake"],
    caption: "พายุมาถึงจริงๆ!\n\nบ้านสั่นสะเทือนเป็นจังหวะ หลังคาส่งเสียงร่อนแร่น่ากลัว หิมะพัดเข้าช่องที่อุดไว้\n\nไฟในเตายังลุกอยู่ แต่ลมนอกนั้นมันดังราวกับมีอะไรกัดกรามบ้านทั้งหลัง\n\nมะลิกุมแขนพี่แน่น \"พี่คะ... มันจะหายไปใช่ไหมคะ\"",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { img: "assets/obj-fire.png", x: 28, y: 76, w: 14, effects: { warmth: 1 }, next: "a5_fireout" },
      { img: "assets/obj-lantern.png", x: 72, y: 76, w: 14, requires: { helpedAunt: true }, next: "a5_escape" },
      { img: "assets/obj-blanket.png", x: 50, y: 82, w: 18, effects: { warmth: 1, trust: 1 }, next: "a5_huddle" },
    ],
  },

  a5_huddle: {
    bg: "assets/bg-storm.png", fx: ["snow", "wind", "shake"],
    caption: "ทั้งบ้านย้ายมากอดกันกลางห้อง ใต้ผ้าห่มทุกผืนที่มีในบ้าน\n\nนอกหน้าต่างคือความมืดและเสียงลมที่ไม่ยอมหยุด\n\nแต่ใต้ผ้าห่มกองใหญ่นั้น... มันอบอุ่นเหลือเกิน\n\nมะลิเริ่มหลับๆ มะลิกระซิบ \"ฝันดีนะคะทุกคน\"",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { img: "assets/obj-candle.png", x: 30, y: 78, w: 12, effects: { warmth: 1 }, next: "final" },
      { img: "assets/obj-door.png", x: 70, y: 78, w: 18, requires: { helpedAunt: true }, next: "a5_escape" },
      { img: "assets/obj-bed.png", x: 50, y: 82, w: 16, next: "a5_dawn" },
    ],
  },

  a5_fireout: {
    bg: "assets/bg-storm.png", fx: ["snow", "wind", "shake"],
    caption: "ลมกระโชกหนึ่งพัดเข้าตรงเตา — ไฟดับ!\n\nความมืดกลืนบ้านทั้งหลัง เหลือแค่แสงจากพายุข้างนอกลอดผ่านช่องไม้\n\nอุณหภูมิลดลงเร็วจับใจ มะลิเริ่มสั่นอีกครั้ง\n\nต้องตัดสินใจเดี๋ยวนี้... ก่อนทุกอย่างจะสายเกินไป",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 50, y: 55, w: 42, shiver: true }],
    hotspots: [
      { img: "assets/obj-firewood.png", x: 26, y: 76, w: 16, effects: { warmth: 1 }, next: "a5_relight" },
      { img: "assets/obj-door.png", x: 72, y: 76, w: 18, requires: { helpedAunt: true }, next: "a5_escape" },
      { img: "assets/obj-blanket.png", x: 50, y: 82, w: 18, effects: { trust: 1 }, next: "a5_dawn" },
    ],
  },

  a5_relight: {
    bg: "assets/bg-fire.png", fx: ["embers", "flicker"],
    caption: "จุดไฟใหม่ด้วยมือที่สั่นจนไม่น่าจะจับไม้ขีดไฟได้\n\nครั้งแรก... ดับ ครั้งที่สอง... ดับ\n\nครั้งที่สาม — เปลวไฟเล็กๆ ติดแล้ว! ค่อยๆ แรงขึ้น แรงขึ้น\n\nทุกคนถอนหายใจพร้อมกันยาวๆ... แล้วหัวเราะขำๆ กันทั้งบ้าน",
    actors: [{ img: "assets/sprite-mom-daughter.png", x: 56, y: 55, w: 42, shiver: false }],
    hotspots: [
      { img: "assets/obj-candle.png", x: 30, y: 78, w: 12, effects: { warmth: 1 }, next: "a5_dawn" },
      { img: "assets/obj-heart.png", x: 70, y: 78, w: 14, effects: { trust: 1 }, next: "a5_dawn" },
    ],
  },

  a5_escape: {
    bg: "assets/bg-blizzard.png", fx: ["snow", "wind", "shake"],
    caption: "ออกไปในพายุ! หิมะเจ็บปวดเหมือนเข็มพันเล่มบินตามลม\n\nมองไม่เห็นทาง มองเห็นแค่สีขาวด้านหน้า มือกุมมือมะลิแน่นไม่ปล่อย\n\nแล้ว... ตรงปลายทางที่เบลอๆ — แสงส้มอุ่นๆ ดวงเดียว\n\nแสงตะเกียงหน้าบ้านของป้าแก้ม ยังสว่างอยู่... รออยู่",
    hotspots: [
      { img: "assets/obj-lantern.png", x: 50, y: 78, w: 14, next: "a5_knock" },
    ],
  },

  a5_knock: {
    bg: "assets/bg-aunt.png", fx: ["flicker"],
    caption: "\"ป้ารอแกอยู่นะ... รู้มั้ยว่าเดี๋ยวก็ต้องมา\"\n\nป้าแก้มเปิดประตูทิ้งไว้ ตะเกียงแขวนรอ น้ำซุปร้อนบนเตา\n\nบ้านป้าอบอุ่นราวกับเป็นอีกโลกหนึ่ง ทุกคนดื่มชาร้อนกันคนละสามแก้ว\n\nพายุด้านนอกยังคุยกันเสียงดัง... แต่ตรงนี้ มันแค่เสียงเบาๆ ไกลๆ",
    hotspots: [
      { img: "assets/obj-tea.png", x: 50, y: 78, w: 14, set: { auntRescue: true }, next: "a5_dawn" },
    ],
  },

  a5_dawn: {
    bg: "assets/bg-dawn.png", fx: ["fog"],
    caption: "ฟ้าสาง...\n\nพายุผ่านไปแล้ว เงียบไปหมดทั้งโลก ได้ยินแค่เสียงหายใจของกันและกัน\n\nเปิดประตูออกไป โลกขาวสะอาดนิ่งสงบราวกับไม่มีอะไรเคยเกิดขึ้น\n\nฤดูหนาวที่ยาวนานที่สุดในรอบสิบปี... ผ่านพ้นไปแล้ว",
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
