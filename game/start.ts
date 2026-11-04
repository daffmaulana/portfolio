import kaplay from "kaplay";
import { WORLD_WIDTH, GROUND_Y, zones, objects } from "./world";
import type { WorldObject } from "./world";

const SPEED = 110;
const TRAVEL_SPEED = 700;
const INTERACT_RANGE = 50;
const PLAYER_SCALE = 1; // sprite 128 px tampil 128 unit. Ubah untuk memperbesar/memperkecil.
// Objek mana yang sudah punya gambar asli (id dari world.ts → nama sprite)
const OBJECT_SPRITES: Record<string, string> = {
  intro: "halte-besar",
  about: "rumah",
  org: "aiesec",
  "intern-1": "gedung-1",
  "intern-2": "gedung-2",
  skills: "skills",
  "proj-1": "toko-1",
  "proj-2": "toko-2",
  "proj-3": "toko-3",
  mailbox: "phone",
};

// --- Lalu lintas ---
const TRAFFIC_FACES_RIGHT = true; // true kalau di PNG kendaraan menghadap kanan

const VEHICLE_SCALE: Record<string, number> = {
  sedan: 1.3,
  suv: 1.3,
  lcgc: 1.1,
  bis: 0.8,
  "bis-2": 0.8,
  "motor-1": 0.75,
  "motor-2": 0.75,
  "motor-3": 0.75,
  "bajaj"  : 0.85,
};

// offsetY = tinggi roda dari GROUND_Y; z = urutan tumpukan
const LANES = [
  { names: ["sedan", "suv", "bis", "bis-2","lcgc"], count: 12, speed: 55, offsetY: 54, z: 5 },
  {
    names: ["motor-1", "motor-2", "motor-3", "bajaj",],
    count: 14,
    speed: 80,
    offsetY: 60,
    z: 6,
  },
];

// --- Awan ---
const CLOUD_SPRITES = ["cloud-1", "cloud-2", "cloud-3"];
const CLOUD_COUNT = 6;               // jumlah awan di langit
const CLOUD_SPEED = [4, 7, 10];      // px/detik, untuk awan kecil, sedang, besar
const CLOUD_PARALLAX = [0.03, 0.05, 0.08]; // seberapa banyak ikut bergeser dengan kamera
const CLOUD_MARGIN = 170;            // ruang di luar layar tempat awan berputar
const CLOUD_OPACITY = 0.6; // 0 = tembus penuh, 1 = pekat
const CLOUD_SIZE: [number, number][] = [
  [72, 28],
  [112, 40],
  [160, 52],
]; // lebar dan tinggi tiap sprite awan

// --- NPC pejalan kaki ---
const NPC_CHARACTERS = 10;   // jumlah karakter yang kamu punya
const NPC_COUNT = 16;        // jumlah NPC di seluruh dunia
const NPC_SPEED_MIN = 28;    // px per detik
const NPC_SPEED_MAX = 48;
const NPC_STEP_PX = 10;       // ganti pose setiap NPC berjalan sejauh ini
const NPC_Y_OFFSET = 0;      // naikkan atau turunkan kaki NPC dari garis tanah
const NPC_BACK_OFFSET = 4;

// --- Pet cat ---
const PET_SCALE = 0.5;
const PET_FOLLOW_DISTANCE = 44;
const PET_FOLLOW_SPEED = 150;
const PET_WALK_STEP = 0.16;
const PET_BACK_OFFSET = 3;

type NpcObj = { pos: { x: number }; flipX: boolean; sprite: string };

type RGB = [number, number, number];

// Sky colors along the world: dawn → day → sunset → dusk.
// "at" is how far along the world (0 = left edge, 1 = right edge).
const SKY_STOPS: { at: number; color: RGB }[] = [
  { at: 0.0, color: [255, 190, 150] },
  { at: 0.3, color: [135, 206, 235] },
  { at: 0.7, color: [245, 150, 110] },
  { at: 1.0, color: [60, 50, 110] },
];

const DAY_GROUND: RGB = [90, 170, 90];
const NIGHT_GROUND: RGB = [40, 85, 75];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const mix = (a: RGB, b: RGB, t: number): RGB => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
  lerp(a[2], b[2], t),
];

// Find the sky color at a given point in the world
function skyAt(p: number): RGB {
  for (let i = 0; i < SKY_STOPS.length - 1; i++) {
    const a = SKY_STOPS[i];
    const b = SKY_STOPS[i + 1];
    if (p <= b.at) return mix(a.color, b.color, (p - a.at) / (b.at - a.at));
  }
  return SKY_STOPS[SKY_STOPS.length - 1].color;
}

const sizeOf = (o: WorldObject) =>
  o.kind === "building" ? { w: 56, h: 64 } : { w: 20, h: 40 };

export type GameHandle = {
  stop: () => void;
  resume: () => void;
  travelTo: (x: number) => void;
};

export function startGame(
  canvas: HTMLCanvasElement,
  onOpen: (target: string) => void,
  onZoneChange: (index: number) => void,
  onProgress: (progress: number) => void,
  onReady: () => void
): GameHandle {
  const k = kaplay({
    canvas,
    width: 640,
    height: 360,
    stretch: true,
    letterbox: true,
    global: false,
    background: [255, 255, 255],
    loadingScreen: false,
  });

  k.loadSprite("idle", "/assets/player/idle.png");
  k.loadSprite("walk1", "/assets/player/walk1.png");
  k.loadSprite("walk2", "/assets/player/walk2.png");
  k.loadSprite("ground", "/assets/world/ground.png");
  k.loadSprite("halte-besar", "/assets/world/halte-besar.png");
  k.loadSprite("rumah", "/assets/world/rumah.png");
  k.loadSprite("gedung-1", "/assets/world/gedung-1.png");
  k.loadSprite("skyline", "/assets/world/skyline-far.png");
  k.loadSprite("ground-fill", "/assets/world/ground-fill.png");
  for (const name of [
    "aiesec", "gedung-2", "skills", "toko-1", "toko-2", "toko-3","phone",
    "sedan", "suv", "lcgc", "bis", "bis-2","motor-1", "motor-2", "motor-3","bajaj", "cloud-1", "cloud-2", "cloud-3", 
  ]) {
    k.loadSprite(name, `/assets/world/${name}.png`);
  }
  for (let i = 1; i <= NPC_CHARACTERS; i++) {
    k.loadSprite(`npc-${i}-1`, `/assets/npc/npc-${i}-1.png`);
    k.loadSprite(`npc-${i}-2`, `/assets/npc/npc-${i}-2.png`);
  }
  k.loadSprite("npc-11-1", "/assets/npc/npc-11-1.png");
  k.loadSprite("npc-11-2", "/assets/npc/npc-11-2.png");
  k.loadSprite("npc-11-3", "/assets/npc/npc-11-3.png");
  k.loadSprite("gedung-tengah", "/assets/world/gedung-tengah.png");

  const toColor = (c: RGB) => k.rgb(c[0], c[1], c[2]);

  let paused = true;
  let travelTarget: number | null = null;

  // Texts that change from dark to light as the sky gets dark,
  // so they stay readable at dusk
  const tints: ((night: number) => void)[] = [];
  const addTint = (
    obj: { color: ReturnType<typeof k.rgb> },
    dayColor: RGB,
    nightColor: RGB
  ) => {
    tints.push((night) => {
      obj.color = toColor(mix(dayColor, nightColor, night));
    });
  };
  // Sprite yang menggelap saat malam (gedung, tanah, skyline)
  const nightSprites: { color: ReturnType<typeof k.rgb> }[] = [];
  const NIGHT_MULT: RGB = [115, 125, 175];

  // Sky: a full-screen rectangle behind everything
  const sky = k.add([
    k.rect(640, 360),
    k.pos(0, 0),
    k.fixed(),
    k.z(-100),
    k.color(toColor(SKY_STOPS[0].color)),
  ]);

  // Sun, moon and stars (all fixed to the screen, behind the ground)
  const glow = k.add([
    k.circle(30),
    k.pos(0, 0),
    k.fixed(),
    k.z(-95),
    k.color(255, 200, 100),
    k.opacity(0.25),
  ]);
  const sun = k.add([
    k.circle(18),
    k.pos(0, 0),
    k.fixed(),
    k.z(-90),
    k.color(255, 236, 130),
    k.opacity(1),
  ]);

  const moon = k.add([
    k.circle(14),
    k.pos(520, 70),
    k.fixed(),
    k.z(-90),
    k.color(235, 235, 250),
    k.opacity(0),
  ]);

  const stars = Array.from({ length: 14 }, (_, i) =>
    k.add([
      k.rect(2, 2),
      k.pos(((i * 97) % 620) + 10, ((i * 53) % 170) + 10),
      k.fixed(),
      k.z(-95),
      k.color(255, 255, 255),
      k.opacity(0),
    ])
  );

   // Awan: melayang pelan, bergeser sedikit mengikuti kamera
  let cloudTime = 0;
  const clouds = Array.from({ length: CLOUD_COUNT }, (_, i) => {
    const size = i % 3; // 0 kecil, 1 sedang, 2 besar, bergantian
    const obj = k.add([
      k.sprite(CLOUD_SPRITES[size], { flipX: Math.random() < 0.5 }),
      k.pos(0, 14 + Math.random() * 92),
      k.fixed(),
      k.z(-88), // di depan matahari dan bulan, di belakang skyline
      k.color(255, 255, 255),
      k.opacity(0.95),
    ]);
    return {
      obj,
      size,
      base: (i / CLOUD_COUNT) * (640 + CLOUD_MARGIN * 2) + Math.random() * 40,
    };
  });

  // Ground
  // Skyline jauh (parallax): bergeser lebih lambat dari kamera
  const SKYLINE_FACTOR = 0.1;
  const skyline = k.add([
    k.sprite("skyline"),
    k.pos(0, GROUND_Y - 220 + 8),
    k.fixed(),
    k.z(-80),
    k.color(255, 255, 255),
  ]);
  nightSprites.push(skyline);

  // Gedung tengah: bergeser lebih cepat dari skyline, lebih lambat dari bangunan utama
  const MID_FACTOR = 0.3;
  const midCity = k.add([
    k.sprite("gedung-tengah"),
    k.pos(0, GROUND_Y - 200 + 4),
    k.fixed(),
    k.z(-70),
    k.color(255, 255, 255),
  ]);
  nightSprites.push(midCity);

  // Ground: trotoar yang diulang sepanjang dunia
  // Ground: baris atas = permukaan trotoar, baris bawah = isian aspal
  const TILE = 32;
  for (let tx = 0; tx < WORLD_WIDTH; tx += TILE) {
    let row = 0;
    for (let ty = GROUND_Y; ty < 360; ty += TILE) {
      const tile = k.add([
        k.sprite(row === 0 ? "ground" : "ground-fill"),
        k.pos(tx, ty),
        k.color(255, 255, 255),
      ]);
      nightSprites.push(tile);
      row++;
    }
  }

  // Lalu lintas: melaju ke kiri, lalu muncul lagi dari kanan
  const traffic: {
    obj: { pos: { x: number } };
    speed: number;
    loop: number;
  }[] = [];

  for (const lane of LANES) {
    const loop = WORLD_WIDTH + 600;
    const gap = loop / lane.count;
    for (let i = 0; i < lane.count; i++) {
      const name = lane.names[Math.floor(Math.random() * lane.names.length)];
      const obj = k.add([
        k.sprite(name, { flipX: TRAFFIC_FACES_RIGHT }),
        k.pos(-300 + i * gap + k.rand(-30, 30), GROUND_Y + lane.offsetY),
        k.anchor("bot"),
        k.scale(VEHICLE_SCALE[name] ?? 1),
        k.z(lane.z),
        k.color(255, 255, 255),
      ]);
      nightSprites.push(obj);
      traffic.push({ obj, speed: lane.speed, loop });
    }
  }

  // NPC pejalan kaki di trotoar
  const npcs: {
    obj: NpcObj;
    x: number;
    dir: number;
    speed: number;
    char: number;
    frame: number;
    t: number;
    step: number;
  }[] = [];

  // Acak urutan karakter supaya kesepuluhnya muncul merata
  const order = Array.from(
    { length: NPC_COUNT },
    (_, i) => (i % NPC_CHARACTERS) + 1
  );
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  for (let i = 0; i < NPC_COUNT; i++) {
    const char = order[i];
    const dir = i % 2 === 0 ? 1 : -1; // setengah ke kanan, setengah ke kiri
    const speed =
      NPC_SPEED_MIN + Math.random() * (NPC_SPEED_MAX - NPC_SPEED_MIN);
    const x =
      (i + 0.5) * (WORLD_WIDTH / NPC_COUNT) + (Math.random() - 0.5) * 80;

    const obj = k.add([
      k.sprite(`npc-${char}-1`, { flipX: dir < 0 }),
      k.pos(x, GROUND_Y + NPC_Y_OFFSET),
      k.anchor("bot"),
      k.z(1), // di belakang karakter (10), di depan bangunan dan kendaraan
      k.color(255, 255, 255),
    ]);
    nightSprites.push(obj);

    npcs.push({
      obj,
      x,
      dir,
      speed,
      char,
      frame: 0,
      t: Math.random() * 0.3, // supaya langkah tidak serempak
      step: NPC_STEP_PX / speed, // detik per pergantian pose
    });
  }

    // SEMENTARA: garis merah tepat di tinggi tanah
  k.add([
    k.rect(WORLD_WIDTH, 1),
    k.pos(0, GROUND_Y),
    k.color(0, 0, 0),
  ]);

  // Zone markers
  for (const z of zones) {
    k.add([
      k.rect(2, 180),
      k.pos(z.x, GROUND_Y - 180),
      k.color(255, 255, 255),
      k.opacity(0.5),
    ]);
    const zoneLabel = k.add([
      k.text(z.name, { size: 12 }),
      k.pos(z.x + 13, 110),
      k.color(40, 40, 40),
      k.z(2),
    ]);
    const labelWidth = zoneLabel.width;
    k.add([
      k.rect(labelWidth + 14, 24),
      k.pos(z.x + 6, 106),
      k.color(35, 32, 29),
      k.opacity(0.9),
      k.z(1),
    ]);
    k.add([
      k.rect(labelWidth + 10, 20),
      k.pos(z.x + 8, 108),
      k.color(255, 248, 225),
      k.opacity(0.96),
      k.z(1),
    ]);
  }

  // Objects and buildings (placeholders)
  // Objek dan bangunan: pakai gambar asli kalau ada, kalau belum pakai kotak
  for (const o of objects) {
    const spriteName = OBJECT_SPRITES[o.id];

    if (spriteName) {
      const obj = k.add([
        k.sprite(spriteName),
        k.pos(o.x, GROUND_Y),
        k.anchor("bot"),
        k.color(255, 255, 255),
      ]);
      nightSprites.push(obj);
      continue;
    }

    const { w, h } = sizeOf(o);
    k.add([
      k.rect(w, h),
      k.pos(o.x, GROUND_Y),
      k.anchor("bot"),
      o.kind === "building" ? k.color(150, 110, 220) : k.color(60, 180, 170),
    ]);
    const objLabel = k.add([
      k.text(o.label, { size: 10 }),
      k.pos(o.x, GROUND_Y - h - 8),
      k.anchor("bot"),
      k.color(40, 40, 40),
    ]);
    addTint(objLabel, [40, 40, 40], [235, 235, 245]);
  }

  // Player
  const player = k.add([
    k.sprite("idle"),
    k.pos(100, GROUND_Y),
    k.anchor("bot"),
    k.scale(PLAYER_SCALE),
    k.color(255, 255, 255),
    k.z(2),
  ]);
  nightSprites.push(player);

  const pet = k.add([
    k.sprite("npc-11-3"),
    k.pos(player.pos.x - PET_FOLLOW_DISTANCE, GROUND_Y),
    k.anchor("bot"),
    k.scale(PET_SCALE),
    k.color(255, 255, 255),
    k.z(3),
  ]);
  nightSprites.push(pet);

  let petX = player.pos.x - PET_FOLLOW_DISTANCE;
  let petWalkTimer = 0;
  let petWalkFrame = 0;
  let petIsWalking = false;
  let playerFacingDirection = 1;

  // "Press E" prompt
  // Latar gelap di belakang teks prompt
  const promptBg = k.add([
    k.rect(10, 10, { radius: 3 }),
    k.pos(0, 0),
    k.anchor("bot"),
    k.color(15, 15, 25),
    k.opacity(0),
    k.z(19),
  ]);

  // "Press E" prompt
  const prompt = k.add([
    k.text("Press E", { size: 14 }),
    k.pos(0, 0),
    k.anchor("bot"),
    k.color(255, 235, 140),
    k.opacity(0),
    k.z(20),
  ]);

  // Controls (ignored while paused; walking cancels fast travel)
  const go = (dir: number) => {
    if (paused) return;
    travelTarget = null;
    player.move(dir * SPEED, 0);
  };
  k.onKeyDown("left", () => go(-1));
  k.onKeyDown("a", () => go(-1));
  k.onKeyDown("right", () => go(1));
  k.onKeyDown("d", () => go(1));

  let nearby: WorldObject | null = null;
  let currentZone = -1;
  let lastX = player.pos.x;
  let walkTimer = 0;
  let walkFrame = 0;
  let currentSprite = "idle";

  k.onUpdate(() => {
    // Gerakkan kendaraan
    for (const t of traffic) {
      t.obj.pos.x -= t.speed * k.dt();
      if (t.obj.pos.x < -300) t.obj.pos.x += t.loop;
    }
    // Fast travel: glide toward the target
    if (travelTarget !== null && !paused) {
      const dx = travelTarget - player.pos.x;
      const step = TRAVEL_SPEED * k.dt();
      if (Math.abs(dx) <= step) {
        player.pos.x = travelTarget;
        travelTarget = null;
      } else {
        player.pos.x += Math.sign(dx) * step;
      }
    }

        // Gerakkan NPC
    for (const n of npcs) {
      n.x += n.dir * n.speed * k.dt();
      if (n.dir > 0 && n.x > WORLD_WIDTH + 40) n.x = -40;
      if (n.dir < 0 && n.x < -40) n.x = WORLD_WIDTH + 40;

      n.t += k.dt();
      if (n.t > n.step) {
        n.t = 0;
        n.frame = 1 - n.frame;
        n.obj.sprite = `npc-${n.char}-${n.frame + 1}`;
      }

      // Pose 2 digeser mundur (berlawanan arah jalan) supaya langkah terlihat
      n.obj.pos.x = n.x - (n.frame === 1 ? n.dir * NPC_BACK_OFFSET : 0);
    }

    player.pos.x = k.clamp(player.pos.x, 8, WORLD_WIDTH - 8);
    // Animasi karakter: ganti pose saat bergerak, balik arah saat ke kiri
    const dx = player.pos.x - lastX;
    lastX = player.pos.x;
    let want = "idle";
    if (Math.abs(dx) > 0.01) {
      playerFacingDirection = dx < 0 ? -1 : 1;
      player.flipX = dx < 0;
      walkTimer += k.dt();
      if (walkTimer > 0.18) {
        walkTimer = 0;
        walkFrame = 1 - walkFrame;
      }
      want = walkFrame === 0 ? "walk1" : "walk2";
    } else {
      walkTimer = 0;
      walkFrame = 0;
    }
    if (want !== currentSprite) {
      player.sprite = want;
      currentSprite = want;
    }

    const petTargetX = k.clamp(
      player.pos.x - playerFacingDirection * PET_FOLLOW_DISTANCE,
      8,
      WORLD_WIDTH - 8
    );
    const petDx = petTargetX - petX;
    const playerIsMoving = Math.abs(dx) > 0.01;
    let petDirection = 0;
    if (playerIsMoving || Math.abs(petDx) > 3) {
      petDirection = Math.sign(petDx);
      petX +=
        Math.sign(petDx) * Math.min(Math.abs(petDx), PET_FOLLOW_SPEED * k.dt());
      pet.flipX = petDirection < 0;
      petWalkTimer += k.dt();
      if (petWalkTimer >= PET_WALK_STEP) {
        petWalkTimer = 0;
        petWalkFrame = 1 - petWalkFrame;
      }
      const petSprite = petWalkFrame === 0 ? "npc-11-1" : "npc-11-2";
      if (!petIsWalking || pet.sprite !== petSprite) pet.sprite = petSprite;
      petIsWalking = true;
    } else {
      petX = petTargetX;
      petWalkTimer = 0;
      petWalkFrame = 0;
      pet.flipX = false;
      if (petIsWalking || pet.sprite !== "npc-11-3") {
        pet.sprite = "npc-11-3";
      }
      petIsWalking = false;
    }
    pet.pos.x =
      petX -
      (petIsWalking && petWalkFrame === 1
        ? petDirection * PET_BACK_OFFSET
        : 0);

    k.setCamPos(k.clamp(player.pos.x, 320, WORLD_WIDTH - 320), 180);

    // Parallax skyline
    const camLeft = k.clamp(player.pos.x, 320, WORLD_WIDTH - 320) - 320;
    skyline.pos.x = -camLeft * SKYLINE_FACTOR;
    midCity.pos.x = -camLeft * MID_FACTOR;

    // Tell React which zone we're in (only when it changes)
    const zoneIndex = zones.reduce(
      (acc, z, i) => (player.pos.x >= z.x ? i : acc),
      0
    );
    if (zoneIndex !== currentZone) {
      currentZone = zoneIndex;
      onZoneChange(zoneIndex);
    }

    // Time of day: sky color depends on how far right you are
    const p = k.clamp(player.pos.x / WORLD_WIDTH, 0, 1);
    const skyColor = skyAt(p);
    sky.color = toColor(skyColor);

    // How dark is the sky? 0 = bright, 1 = dark
    const brightness =
      (0.299 * skyColor[0] + 0.587 * skyColor[1] + 0.114 * skyColor[2]) / 255;
    const night = k.clamp((0.6 - brightness) / 0.3, 0, 1);

    const nightColor = toColor(mix([255, 255, 255], NIGHT_MULT, night));
    for (const s of nightSprites) s.color = nightColor;
    player.color = toColor(mix([255, 255, 255], NIGHT_MULT, night * 0.6));

    for (const apply of tints) apply(night);

    // Sun path: peeks at the left horizon, climbs, then sets near Projects
    const t = 0.04 + Math.min(p / 0.85, 1) * 0.92;
    const arc = Math.sin(Math.PI * t); // 0 at the horizon, 1 at the top
    const sx = 70 + t * 500;
    const sy = 326 - arc * 270;
    sun.pos = k.vec2(sx, sy);
    glow.pos = k.vec2(sx, sy);
    sun.color = toColor(mix([255, 160, 80], [255, 236, 130], arc));
    sun.opacity = 1 - night;
    glow.opacity = (1 - night) * 0.25;

    // Night: moon and stars fade in
    moon.opacity = night;
    for (const s of stars) s.opacity = night * 0.9;

    // Awan: bergerak sendiri ke kiri + sedikit parallax. Tembus pandang,
    // warna ikut langit, dan menghangat saat dekat matahari
    cloudTime += k.dt();
    const spanW = 640 + CLOUD_MARGIN * 2;
    const tBase = mix([255, 255, 255], skyColor, 0.35);
    const tNight = mix([255, 255, 255], NIGHT_MULT, night);
    const baseR = (tBase[0] * tNight[0]) / 255;
    const baseG = (tBase[1] * tNight[1]) / 255;
    const baseB = (tBase[2] * tNight[2]) / 255;

    for (const c of clouds) {
      const raw =
        c.base -
        cloudTime * CLOUD_SPEED[c.size] -
        camLeft * CLOUD_PARALLAX[c.size];
      const wrapped = ((raw % spanW) + spanW) % spanW;
      c.obj.pos.x = wrapped - CLOUD_MARGIN;

      // Seberapa dekat awan ini ke matahari (0 jauh, 1 tepat di matahari)
      const [cw, ch] = CLOUD_SIZE[c.size];
      const dx = c.obj.pos.x + cw / 2 - sx;
      const dy = c.obj.pos.y + ch / 2 - sy;
      const near = Math.max(0, 1 - Math.hypot(dx, dy) / 170) * (1 - night);

      // Awan dekat matahari tersepuh warna hangat
      c.obj.color = toColor(
        mix([baseR, baseG, baseB], [255, 214, 140], near * 0.7)
      );
      c.obj.opacity = CLOUD_OPACITY - night * 0.2;
    }

    nearby =
      objects.find((o) => Math.abs(o.x - player.pos.x) < INTERACT_RANGE) ??
      null;

    // No prompt while gliding past things
    if (nearby && !paused && travelTarget === null) {
      prompt.text = `(E) ${nearby.label}`;
      prompt.pos = k.vec2(player.pos.x, GROUND_Y - 64 * PLAYER_SCALE - 14);
      prompt.opacity = 1;

      // Latar mengikuti ukuran teks
      promptBg.width = prompt.width + 14;
      promptBg.height = prompt.height + 8;
      promptBg.pos = k.vec2(prompt.pos.x, prompt.pos.y + 4);
      promptBg.opacity = 0.8;
    } else {
      prompt.opacity = 0;
      promptBg.opacity = 0;
    }
  });

  // E: pause the game and tell React what to open
  k.onKeyPress("e", () => {
    if (paused || !nearby || travelTarget !== null) return;
    paused = true;
    onOpen(nearby.opens);
  });

  // Laporkan progres loading ke React
  let readyFired = false;
  const progressTimer = setInterval(() => {
    const p = k.loadProgress();
    onProgress(p);
    if (p >= 1 && !readyFired) {
      readyFired = true;
      clearInterval(progressTimer);
      onReady();
    }
  }, 60);

  return {
    stop: () => {
      clearInterval(progressTimer);
      k.quit();
    },
    resume: () => {
      paused = false;
      canvas.focus();
    },
    travelTo: (x: number) => {
      if (paused) return;
      travelTarget = x;
      canvas.focus();
    },
  };
}