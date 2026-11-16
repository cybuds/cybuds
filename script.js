// Gotta put the picture names in here, the actual files go in the images folder
const FOLDER = "images/";
const IMAGES = [];

const shuffle = (list) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

function fill(id, order) {
  const track = document.getElementById(id);
  if (!order.length) return;
  const reps = Math.max(1, Math.ceil(8 / order.length));
  let html = "";
  for (let half = 0; half < 2; half++) {
    for (let r = 0; r < reps; r++) {
      order.forEach((name) => {
        html += '<div class="item"><img src="' + encodeURI(FOLDER + name) + '" alt=""></div>';
      });
    }
  }
  track.innerHTML = html;
  const setSpeed = () => { track.style.animationDuration = Math.max(20, track.scrollWidth / 2 / 45) + "s"; };
  track.querySelectorAll("img").forEach((img) => img.addEventListener("load", setSpeed));
  setSpeed();
}

const topRow = shuffle(IMAGES);
let bottomRow = shuffle(IMAGES);
for (let tries = 0; IMAGES.length > 1 && bottomRow[0] === topRow[0] && tries < 20; tries++) bottomRow = shuffle(IMAGES);
fill("top", topRow);
fill("bottom", bottomRow);

  const art = document.getElementById("art");
  const setOpen = (open) => {
    document.body.classList.toggle("art-open", open);
    art.setAttribute("aria-expanded", open);
  };
  art.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") setOpen(true); });
  art.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") setOpen(false); });
  art.addEventListener("click", (e) => {
    if (e.pointerType === "mouse") { setOpen(true); return; }
    setOpen(!document.body.classList.contains("art-open"));
  });
  (() => {
    const el = document.getElementById("name");
    const BASE = [[0, 0, 0, 0], [.08, .32, -.32, 0], [.18, -.28, .3, -6], [.28, .22, -.2, 5], [.38, -.17, .17, -4], [.48, .13, -.12, 3], [.58, -.09, .09, -2], [.68, .06, -.06, 1.5], [.78, -.04, .04, -1], [.88, .02, -.02, .5], [1, 0, 0, 0]];
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    let anim, clicks = 0, timer;
    el.addEventListener("click", () => {
      clicks++;
      clearTimeout(timer);
      timer = setTimeout(() => { clicks = 0; }, 1600);
      const amp = Math.min(1 + (clicks - 1) * 0.45, 4);
      const frames = BASE.map(([offset, x, y, skew]) => ({
        offset,
        easing: "ease-out",
        transform: "scale(" + clamp(1 + x * amp, .3, 2.6) + "," + clamp(1 + y * amp, .3, 2.6) + ") skewX(" + clamp(skew * amp, -25, 25) + "deg)"
      }));
      if (anim) anim.cancel();
      anim = el.animate(frames, { duration: 650 + 100 * (amp - 1) });
    });
  })();
const themeBtn = document.getElementById("theme");
  themeBtn.addEventListener("click", () => {
    const dark = document.documentElement.getAttribute("data-theme") !== "dark";
    if (dark) document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
  });
  (() => {
    const logoEl = document.getElementById("logo");
    const path = logoEl.querySelector("path");
    const raw = path.getAttribute("data-values").split(";");
    const frames = raw.map(v => v.match(/-?\d*\.?\d+/g).map(Number));
    const rings = raw[0].split("M").length - 1;
    const per = frames[0].length / 2 / rings;
    const toD = (a) => {
      let out = "", k = 0;
      for (let r = 0; r < rings; r++) {
        out += "M";
        for (let i = 0; i < per; i++) { out += (i ? " L" : "") + a[k++].toFixed(1) + "," + a[k++].toFixed(1); }
        out += " Z ";
      }
      return out;
    };
    const ease = (u) => u * u * (3 - 2 * u);
    const lerp = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
    const CYCLE = 8, SPIN = 24;
    let mode = "rest", tm = 0, snap = frames[0], snapAng = 0, blend = 1, blendDur = .7;
    let cur = frames[0], curAng = 0, restAng = 0, last = 0, raf = 0;
    path.setAttribute("d", toD(cur));

    function target() {
      if (mode === "live") {
        const p = (tm % CYCLE) / CYCLE * (frames.length - 1);
        const s = Math.min(Math.floor(p), frames.length - 2);
        return { arr: lerp(frames[s], frames[s + 1], ease(p - s)), ang: tm / SPIN * 360 };
      }
      return { arr: frames[0], ang: restAng };
    }
    function frame(now) {
      const dt = Math.max(0, Math.min((now - last) / 1000, .1)); last = now;
      if (mode === "live") tm += dt;
      if (blend < 1) blend = Math.min(1, blend + dt / blendDur);
      const t = target(), e = ease(blend);
      cur = blend >= 1 ? t.arr : lerp(snap, t.arr, e);
      curAng = snapAng + (t.ang - snapAng) * e;
      path.setAttribute("d", toD(cur));
      if (mode === "rest" && blend >= 1) {
        tm = 0; curAng = 0; path.removeAttribute("transform"); raf = 0; return;
      }
      path.setAttribute("transform", "rotate(" + curAng.toFixed(2) + " 60 60)");
      raf = requestAnimationFrame(frame);
    }
    function go() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }
    logoEl.addEventListener("pointerenter", () => {
      mode = "live"; snap = cur; snapAng = curAng; blend = 0; blendDur = .4; go();
    });
    logoEl.addEventListener("pointerleave", () => {
      mode = "rest"; snap = cur; snapAng = curAng; restAng = Math.round(curAng / 360) * 360; blend = 0; blendDur = .7; go();
    });
  })();
(() => {
    const here = document.querySelector(".here");
    const btn = document.getElementById("here");
    const chips = [...here.querySelectorAll(".chip")];
    const rand = (a, b) => a + Math.random() * (b - a);
    let timer, isOpen = false;

    function open() {
      clearTimeout(timer);
      if (isOpen) return;
      isOpen = true;
      const r = btn.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const placed = [];
      chips.forEach((chip, i) => {
        const w = chip.offsetWidth, h = chip.offsetHeight;
        let x = 0, y = 0;
        for (let tries = 0; tries < 40; tries++) {
          x = Math.max(8, Math.min(innerWidth - w - 8, cx + rand(-170, 170) - w / 2));
          y = Math.min(innerHeight - h - 8, r.bottom + rand(26, 150));
          const hit = placed.some(p => x < p.x + p.w + 8 && x + w + 8 > p.x && y < p.y + p.h + 8 && y + h + 8 > p.y);
          if (!hit) break;
        }
        placed.push({ x, y, w, h });
        const start = "translate(" + (cx - w / 2) + "px," + (r.top + r.height / 2 - h / 2) + "px) scale(.2)";
        chip.dataset.start = start;
        chip.style.transition = "none";
        chip.style.transform = start;
        chip.offsetWidth;
        chip.style.transition = "";
        chip.style.transitionDelay = i * 60 + "ms";
        chip.style.transform = "translate(" + x + "px," + y + "px) rotate(" + rand(-9, 9) + "deg)";
      });
      here.classList.add("open");
    }

    function close() {
      isOpen = false;
      here.classList.remove("open");
      chips.forEach(chip => {
        chip.style.transitionDelay = "";
        chip.style.transform = chip.dataset.start;
      });
    }

    here.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") open(); });
    here.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") timer = setTimeout(close, 450); });
    btn.addEventListener("click", (e) => {
      if (e.pointerType === "mouse") return open();
      isOpen ? close() : open();
    });
    document.addEventListener("click", (e) => { if (isOpen && !here.contains(e.target)) close(); });
    addEventListener("resize", close);
  })();
const ADS = [
  { file: "serverpromo.png", link: "" },
];
const AD_SECONDS = 15;

const banner = document.getElementById("banner");
const bannerImg = banner.querySelector("img");
const adList = ADS.filter((a) => a.file);
let adNow = -1;

function showAd() {
  let n;
  do { n = Math.floor(Math.random() * adList.length); } while (adList.length > 1 && n === adNow);
  adNow = n;
  const ad = adList[n];
  banner.classList.add("swap");
  setTimeout(() => {
    bannerImg.src = encodeURI("images/ads/" + ad.file);
    if (ad.link) banner.href = ad.link;
    else banner.removeAttribute("href");
  }, 350);
}
bannerImg.addEventListener("load", () => banner.classList.remove("swap"));

if (adList.length) {
  document.getElementById("adslot").hidden = false;
  showAd();
  if (adList.length > 1) setInterval(showAd, AD_SECONDS * 1000);
}
