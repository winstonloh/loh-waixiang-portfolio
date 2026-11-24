/* =========================================================
   Winston Loh — Portfolio scripts (v2)
   1. Work data   2. Work grid + filters   3. Modal
   4. Hero reveal (full-screen canvas brush)   5. Preloader
   6. Nav, text splitting, scroll reveal, counters, misc
   ========================================================= */
(() => {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const IMG = "assets/img/";
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------
     1. WORK DATA — edit this list to add / change projects
     --------------------------------------------------------- */
  const WORKS = [
    { id: "vlog-1", cat: "vlog", tag: "Vlog", title: "A Workday Vlog", sub: "10:38am, off to work",
      cover: "work/vlog-1",
      desc: "A day-in-my-life vlog following a workday at the mall, with POV selfie shots and time-stamped captions that keep the story moving.",
      link: "https://drive.google.com/file/d/1Vq8MoiSrrEpjZ8hbficVu9nhENkWlMhY/view?usp=sharing" },
    { id: "vlog-2", cat: "vlog", tag: "Vlog", title: "Taylor's Campus Vlog", sub: "A day at Taylor's",
      cover: "work/vlog-2",
      desc: "A one-day campus vlog at Taylor's, covering the campus grounds and an on-campus brand activation booth.",
      link: "https://drive.google.com/file/d/19xDmDpy24FaZcOVql6H12n5Na3wcXEjs/view?usp=sharing" },
    { id: "vlog-3", cat: "vlog", tag: "Vlog", title: "Grab Driver for a Day", sub: "How much can I earn?",
      cover: "work/vlog-3",
      desc: "A Gen-Z experiment vlog: driving Grab for a full day to find out how much you can really earn, told with a strong hook title.",
      link: "https://drive.google.com/file/d/12RCWn-pOQ2EDZ3T9zXYlpJOH1ta3y4Re/view?usp=sharing" },
    { id: "stadium", cat: "review", tag: "Review video", title: "Pickleball Review I", sub: "Pickle Pop",
      cover: "work/stadium-review.jpg", process: "process/stadium-process.jpg",
      desc: "A pickleball venue review: on-site filming, fast-paced cuts, speed ramps and branded titles for short-form social.",
      link: "https://drive.google.com/file/d/1EfBKeWNj5PDE36j6Q_swuDgYTP_0j1hs/view?usp=sharing" },
    { id: "pickleball-2", cat: "review", tag: "Review video", title: "Pickleball Review II", sub: "5 looks, 5 spots",
      cover: "work/pickleball-review-2.jpg",
      desc: "An activewear feature at a pickleball venue: five looks across five spots, with scrapbook-style animated titles.",
      link: "https://drive.google.com/file/d/1g61lmc1rfMfo6LSdNUyxLv9n7Nv-FeLg/view?usp=sharing" },
    { id: "vehicle", cat: "review", tag: "Review video", title: "Automotive Review", sub: "Luxury sedan",
      cover: "work/vehicle-review.jpg", process: "process/vehicle-process.jpg",
      desc: "A sleek car review using speed curves, motion tracking and keyframed transitions for a premium feel.",
      link: "https://drive.google.com/file/d/1S6YPUYrGzFdWF0eJXIwNdTeDxB3KTPZ-/view?usp=sharing" },
    { id: "restaurant", cat: "review", tag: "Review video", title: "Restaurant Review I", sub: "OLA Korean cafe",
      cover: "work/restaurant-review.jpg", process: "process/restaurant-process.jpg",
      desc: "A Korean-style cafe review with bold captions, colour adjustments and food close-ups made for discovery feeds.",
      link: "https://drive.google.com/file/d/1XARQHEfFwKfxOck7ArvfS1z6n2Lavcrs/view?usp=sharing" },
    { id: "restaurant-2", cat: "review", tag: "Review video", title: "Restaurant Review II", sub: "Puchong dark cafe",
      cover: "work/restaurant-review-2.jpg",
      desc: "A dark-themed cafe review in Puchong, featuring the latte, black macarons and Dutch baby pancake with moody light and clean labels.",
      link: "https://drive.google.com/file/d/1SfKXlLBJ3HbA_S530qPv14T2PDD4jiQO/view?usp=sharing" },
    { id: "beauty-1", cat: "beauty-fashion", tag: "Beauty review", title: "Beauty Review I", sub: "Facial treatment",
      cover: "work/beauty-review-1.jpg", process: "process/beauty-process.jpg",
      desc: "A calm, warm-toned beauty treatment review, from shooting the session to text animation and pacing in the edit.",
      link: "https://drive.google.com/file/d/1GopEmXCr6hZSF7N18gbuL6dwLxh9vYXn/view?usp=sharing" },
    { id: "beauty-2", cat: "beauty-fashion", tag: "Beauty review", title: "Beauty Review II", sub: "Lumi Glow",
      cover: "work/beauty-review-2.jpg", process: "process/beauty-process.jpg",
      desc: "A vlog-style beauty review with layered footage, soft lighting and clean on-screen titles.",
      link: "https://drive.google.com/file/d/19GWH7e68msT6Vr10WU-9bXwQmAc_UDAg/view?usp=sharing" },
    { id: "streetwear", cat: "beauty-fashion", tag: "Fashion video", title: "Streetwear", sub: "Lookbook",
      cover: "work/streetwear.jpg", process: "process/streetwear-process.jpg",
      desc: "A streetwear lookbook edit with rhythmic cuts, effects and transitions timed to the music.",
      link: "https://drive.google.com/file/d/1rez5wh-aTCmAvn6TmQhyy_f6_pOF9Lgk/view?usp=sharing" },
    { id: "property-1", cat: "property", tag: "Real estate video", title: "Property Video I", sub: "Gamuda Garden",
      cover: "work/property-video-1.jpg",
      desc: "A property launch video for a freehold double-storey home, edited for social media lead generation.",
      link: "https://drive.google.com/file/d/1I3Cghdba_7itmnje9BPp2f5S3ZeuGnQE/view?usp=sharing" },
    { id: "property-2", cat: "property", tag: "Real estate video", title: "Property Video II", sub: "Near Gamuda Gardens",
      cover: "work/property-video-2.jpg",
      desc: "A new-project highlight video showcasing the development and its clubhouse facilities.",
      link: "https://drive.google.com/file/d/1IXG11e76zQcWilzCSlehzipFDKJhFmhO/view?usp=sharing" },
    { id: "affiliate-1", cat: "affiliate", tag: "Affiliate video", title: "Affiliate: Car Charger", sub: "4-in-1 car charger",
      cover: "work/affiliate-1.jpg",
      desc: "An affiliate product video for a 4-in-1 multi-port car charger, showing its fast charging, live voltage display, retractable cables and starry ambient light.",
      link: "https://drive.google.com/file/d/12fpHcfkpkRIePIKs-ofKFEqPQHfBgcVC/view?usp=sharing" },
    { id: "affiliate-2", cat: "affiliate", tag: "Affiliate video", title: "Affiliate: Car Vacuum", sub: "Cordless car vacuum",
      cover: "work/affiliate-2.jpg",
      desc: "An affiliate product video for a cordless 2-in-1 car vacuum, demonstrating suction and blowing modes, its light weight and the included attachments.",
      link: "https://drive.google.com/file/d/1fq8iuqM9cX1KPJPWU0vuthVqkOPw6Kml/view?usp=sharing" },
    { id: "ai-intro", cat: "ai", tag: "AI content", title: "AI Self Intro", sub: "AI avatar",
      cover: "work/ai-self-intro.jpg",
      desc: "A self-introduction video created with AI tools, exploring how AI can speed up personal branding content.",
      link: "https://drive.google.com/file/d/1mxhEGDQBowuNeEC6PUI79Md9lsXTw_Dw/view?usp=sharing" },
    { id: "ai-animation", cat: "ai", tag: "AI content", title: "AI Animation", sub: "Office story",
      cover: "work/ai-animation.jpg", process: "process/ai-animation-process.jpg",
      desc: "A playful AI-generated animated short featuring character-driven storytelling.",
      link: "https://drive.google.com/file/d/1ixAbvwFkWzjCnVWbWWuDsUAAFHY_RaLb/view?usp=sharing" },
  ];
  const byId = Object.fromEntries(WORKS.map((w) => [w.id, w]));

  // A cover written without an extension (e.g. "work/vlog-1") is tried as .jpg, .jpeg, .png, .webp …
  const EXTS = [".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG", ".WEBP"];
  const hasExt = (p) => /\.[a-z0-9]{3,4}$/i.test(p);
  const coverSrc = (p) => IMG + p + (hasExt(p) ? "" : EXTS[0]);
  document.addEventListener("error", (e) => {
    const img = e.target;
    if (!(img instanceof HTMLImageElement) || !img.dataset.base) return;
    const i = +(img.dataset.try || 0) + 1;
    if (i < EXTS.length) { img.dataset.try = i; img.src = img.dataset.base + EXTS[i]; }
  }, true);
  const baseAttr = (p) => hasExt(p) ? "" : ` data-base="${IMG + p}"`;

  /* ---------------------------------------------------------
     2. WORK GRID + FILTERS
     --------------------------------------------------------- */
  const grid = $("#workGrid");
  grid.innerHTML = WORKS.map((w, i) => `
    <article class="card" data-cat="${w.cat}" data-reveal style="transition-delay:${(i % 5) * 80}ms">
      <button class="video-tile" data-work="${w.id}" aria-label="Open ${w.title}">
        <img src="${coverSrc(w.cover)}"${baseAttr(w.cover)} alt="${w.title} — ${w.sub}" loading="lazy">
        <span class="play" aria-hidden="true"></span>
        <span class="tile-view" aria-hidden="true">View project ↗</span>
        <span class="tile-cap">${w.sub}</span>
      </button>
      <div class="card-meta"><span class="num">${String(i + 1).padStart(2, "0")}</span><h3>${w.title}</h3></div>
    </article>`).join("");

  $$(".chip").forEach((chip) => chip.addEventListener("click", () => {
    $$(".chip").forEach((c) => { c.classList.toggle("is-active", c === chip); c.setAttribute("aria-selected", c === chip); });
    const f = chip.dataset.filter;
    let n = 0;
    $$(".card", grid).forEach((card) => {
      const show = f === "all" || card.dataset.cat === f;
      card.classList.toggle("is-hidden", !show);
      card.classList.remove("is-entering");
      if (show) {
        void card.offsetWidth; // restart animation
        card.style.animationDelay = (n++ * 60) + "ms";
        card.classList.add("is-entering", "in");
      }
    });
  }));

  /* ---------------------------------------------------------
     3. MODAL
     --------------------------------------------------------- */
  const modal = $("#modal");
  let lastFocus = null;

  function openWork(id) {
    const w = byId[id];
    if (!w) return;
    const mc = $("#modalCover");
    mc.removeAttribute("data-try");
    if (hasExt(w.cover)) mc.removeAttribute("data-base"); else mc.dataset.base = IMG + w.cover;
    mc.src = coverSrc(w.cover);
    $("#modalCover").alt = `${w.title} cover`;
    $("#modalTag").textContent = w.tag;
    $("#modalTitle").textContent = w.title;
    $("#modalDesc").textContent = w.desc;
    $("#modalLinks").innerHTML =
      `<a class="btn btn-primary" href="${w.link}" target="_blank" rel="noopener">Watch video <span aria-hidden="true">↗</span></a>`;
    $("#modalProcess").hidden = !w.process;
    if (w.process) $("#modalProcessImg").src = IMG + w.process;
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("no-scroll");
    $(".modal-panel", modal).scrollTop = 0;
    $(".modal-panel", modal).focus();
  }
  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("no-scroll");
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener("click", (e) => {
    const tile = e.target.closest("[data-work]");
    if (tile) return openWork(tile.dataset.work);
    if (e.target.closest("#modal [data-close]")) closeModal();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

  /* ---------------------------------------------------------
     4. HERO REVEAL
     The whole hero is one canvas with two pre-painted layers:
       front = white background + dark "PORTFOLIO" + look 1
       back  = dark background + neon "PORTFOLIO" + look 2
     A torn brush trail follows the pointer; inside it the back
     layer replaces the front, anywhere on the screen.
     --------------------------------------------------------- */
  const hero = $("#hero");
  const front = $("#front");
  const canvas = $("#reveal");
  const ctx = canvas.getContext("2d");
  const mk = () => { const c = document.createElement("canvas"); return [c, c.getContext("2d")]; };
  const [mask, mctx] = mk();
  const [buf, bctx] = mk();
  const [layerA, actx] = mk(); // front layer
  const [layerB, lbctx] = mk(); // back layer

  const touchMQ = matchMedia("(hover: none), (pointer: coarse)");
  let coarse = false;
  function syncTouch() {
    coarse = touchMQ.matches;
    const hintEl = $("#hintText");
    if (hintEl) hintEl.textContent = coarse ? "Drag to switch looks" : "Move your cursor to switch looks";
  }
  syncTouch();
  touchMQ.addEventListener ? touchMQ.addEventListener("change", syncTouch) : touchMQ.addListener(syncTouch);

  // Replace these two files to change the hero looks (same pose, transparent background).
  const back = new Image();
  back.src = "assets/img/hero/hero-back.webp";
  const imgLoaded = (img) => img.complete && img.naturalWidth ? Promise.resolve() :
    new Promise((res) => { img.addEventListener("load", res, { once: true }); img.addEventListener("error", res, { once: true }); });
  const fontLoaded = document.fonts
    ? Promise.all([
        ...["400", "700", "800"].map((w) => document.fonts.load(`${w} 100px "Inter Tight"`)),
        document.fonts.load('400 100px "Anton"'),
        document.fonts.load('italic 400 100px "Instrument Serif"'),
      ]).catch(() => {})
    : Promise.resolve();
  // Never let a slow or blocked font hold the hero back: wait at most 2.5 s, then repaint once fonts arrive.
  const fontOrTimeout = Promise.race([fontLoaded, new Promise((res) => setTimeout(res, 2500))]);
  const heroAssets = Promise.all([imgLoaded(front), imgLoaded(back), fontOrTimeout]);

  let W = 0, H = 0, dpr = 1, layersReady = false, dirty = true;

  // Each look is pre-painted into two transparent sheets so they can drift apart with the cursor:
  //   type = the tall PORTFOLIO word + name block      fore = the figure (+ a hairline of the word over it)
  const looks = [
    { img: front, dark: false, layer: layerA, lctx: actx },
    { img: back, dark: true, layer: layerB, lctx: lbctx },
  ].map((o) => { const [type, tctx] = mk(), [fore, fctx] = mk(); return { ...o, type, tctx, fore, fctx }; });
  const [scratch, sctx] = mk();          // shared, only sized while painting

  const LIME = "#d4ff3f";
  const SANS = (w) => `${w} {s}px "Inter Tight", system-ui, sans-serif`;
  const SERIF = `italic 400 {s}px "Instrument Serif", Georgia, serif`;
  const DISPLAY = `400 {s}px "Anton", Impact, "Inter Tight", sans-serif`;   // tall condensed display face
  const isMobile = () => W < 720;
  const figureBox = () => {
    const aspect = front.naturalWidth / front.naturalHeight || 0.6;
    const ph = Math.min(H * (isMobile() ? 0.72 : 0.9), (W * 0.96) / aspect);
    return { ph, top: H - ph };
  };

  function paintLook(L) {
    const { tctx: c, fctx: f, dark, img } = L;
    scratch.width = Math.round(W * dpr); scratch.height = Math.round(H * dpr);
    const x = sctx;
    [c, f, x].forEach((k) => { k.setTransform(dpr, 0, 0, dpr, 0, 0); k.globalCompositeOperation = "source-over"; k.clearRect(0, 0, W, H); });
    const mobile = isMobile();
    const { ph } = figureBox();
    const gutter = Math.min(40, Math.max(18, W * 0.026));
    const INK = dark ? "#f2efe9" : "#0e0e0e";
    const SOFT = dark ? "rgba(242,239,233,.62)" : "rgba(14,14,14,.6)";
    const setFont = (k, spec, size, ls = 0) => {
      k.font = spec.replace("{s}", size);
      if ("letterSpacing" in k) k.letterSpacing = `${size * ls}px`;
    };

    // ---- name block metrics ("Hello, I'm" over "Winston Loh")
    const n = mobile ? Math.max(30, Math.min(W * 0.105, 44)) : Math.max(38, Math.min(W * 0.046, H * 0.1, 92));
    const hs = n * 0.48;
    setFont(c, SANS(700), n, -0.035); const wWin = c.measureText("Winston").width;
    setFont(c, SANS(400), n * 0.6, -0.02); const wLoh = c.measureText(" Loh").width;
    setFont(c, SERIF, hs, 0); const wHello = c.measureText("Hello, I'm").width;

    // ---- PORTFOLIO: fitted to the width, then stretched vertically for tension
    const word = "PORTFOLIO", track = 0.012;
    setFont(c, DISPLAY, 100, track);
    const mt = c.measureText(word);
    const m = mt.width - 100 * track;
    const capNat = (mt.actualBoundingBoxAscent || 73) / 100;
    const fs = (W * (mobile ? 0.92 : 0.95) / m) * 100;
    const wordTop = mobile ? 92 + hs + n * 1.02 + 30 : 100;
    const target = mobile ? H * 0.2 : Math.max(H * 0.36, Math.min(H * 0.52, H - wordTop - n * 1.6 - hs * 2.4 - 96));
    const stretch = Math.min(mobile ? 2.1 : 1.7, Math.max(1, target / (fs * capNat)));
    const base = wordTop + fs * capNat * stretch;
    const drawWord = (k, stroke) => {
      k.save();
      k.translate(W / 2 + (fs * track) / 2, base);
      k.scale(1, stretch);
      setFont(k, DISPLAY, fs, track);
      k.textAlign = "center"; k.textBaseline = "alphabetic";
      stroke ? k.strokeText(word, 0, 0) : k.fillText(word, 0, 0);
      k.restore();
    };
    c.fillStyle = dark ? LIME : INK;
    drawWord(c, false);

    // ---- name block
    let x0, y1, y2;
    if (mobile) { y1 = 92 + hs; y2 = y1 + n * 1.02; x0 = (W - wWin - wLoh) / 2; }
    else { x0 = gutter; y1 = base + hs * 2.5; y2 = y1 + n * 1.04; }
    c.textAlign = "left";
    setFont(c, SERIF, hs, 0);
    c.fillStyle = SOFT;
    c.fillText("Hello, I'm", mobile ? (W - wHello) / 2 : x0, y1);
    c.fillStyle = LIME;                                   // marker stroke behind "Winston"
    const mk2 = [x0 - n * 0.06, y2 - n * 0.36, wWin + n * 0.12, n * 0.46];
    c.beginPath();
    c.roundRect ? c.roundRect(...mk2, n * 0.04) : c.rect(...mk2);
    c.fill();
    setFont(c, SANS(700), n, -0.035);
    c.fillStyle = dark ? "#0e0e0e" : INK;
    c.fillText("Winston", x0, y2);
    setFont(c, SANS(400), n * 0.6, -0.02);
    c.fillStyle = INK;
    c.fillText(" Loh", x0 + wWin, y2);
    if ("letterSpacing" in c) c.letterSpacing = "0px";
    if (!dark) hero.style.setProperty("--hello-top", `${y1 - hs * 0.8}px`);

    // ---- figure (drawn on its own layer, always in front of the word)
    if (img && img.naturalWidth) {
      const h = ph + 24, w = h * (img.naturalWidth / img.naturalHeight), dx = (W - w) / 2, dy = H - ph;
      f.drawImage(img, dx, dy, w, h);
    }
    scratch.width = scratch.height = 1;  // release memory
  }

  // Pointer parallax + entrance animation, composed into the two full layers the brush swaps between
  let ptx = 0, pty = 0, pmx = 0, pmy = 0, introT0 = 0, introDone = reduceMotion;
  function startIntro() { if (introDone) return; introDone = true; introT0 = performance.now(); dirty = true; }
  function compose(now) {
    let e1 = introDone ? 1 : 0, e2 = e1;
    if (introT0) {
      const t = (now - introT0) / 1500;
      if (t < 1) {
        const ez = (v) => 1 - Math.pow(1 - Math.min(Math.max(v, 0), 1), 4);
        e1 = ez(t / 0.7); e2 = ez((t - 0.22) / 0.78); dirty = true;
      } else introT0 = 0;
    }
    if (Math.abs(ptx - pmx) + Math.abs(pty - pmy) > 0.002) { pmx += (ptx - pmx) * 0.06; pmy += (pty - pmy) * 0.06; dirty = true; }
    if (!dirty) return;
    dirty = false;
    const mobile = isMobile(), { ph } = figureBox();
    for (const L of looks) {
      const c = L.lctx, dark = L.dark;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.globalAlpha = 1;
      c.fillStyle = dark ? "#09090b" : "#efeee9";
      c.fillRect(0, 0, W, H);
      const g = c.createRadialGradient(W / 2, H * 0.55, 0, W / 2, H * 0.55, Math.max(W, H) * 0.6);
      if (dark) { g.addColorStop(0, "rgba(112, 72, 255, .34)"); g.addColorStop(.5, "rgba(212, 255, 63, .05)"); g.addColorStop(1, "rgba(0,0,0,0)"); }
      else { g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(1, "rgba(255,255,255,0)"); }
      c.fillStyle = g;
      c.fillRect(0, 0, W, H);
      // a single graphic disc behind the figure: lime on paper, a thin ring in the dark look
      const R = Math.min(ph * 0.3, W * 0.36) * (0.9 + 0.1 * e2);
      c.beginPath();
      c.arc(W / 2 + pmx * 6, H - ph * 0.56, R, 0, Math.PI * 2);
      c.globalAlpha = e2;
      if (dark) { c.strokeStyle = "rgba(242,239,233,.28)"; c.lineWidth = 1; c.stroke(); }
      else { c.fillStyle = LIME; c.fill(); }
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.globalAlpha = e1;
      c.drawImage(L.type, Math.round(-pmx * 12 * dpr), Math.round((-pmy * 7 + (1 - e1) * 80) * dpr));
      c.globalAlpha = e2;
      c.drawImage(L.fore, Math.round(pmx * 16 * dpr), Math.round((1 - e2) * 46 * dpr));
      c.globalAlpha = 1;
      if (mobile) {            // fade the figure's lower part so the tagline sits on a calm area
        c.setTransform(dpr, 0, 0, dpr, 0, 0);
        const fadeH = H * 0.34, fg = c.createLinearGradient(0, H - fadeH, 0, H), bg = dark ? "9,9,11" : "239,238,233";
        fg.addColorStop(0, `rgba(${bg},0)`); fg.addColorStop(.55, `rgba(${bg},.85)`); fg.addColorStop(1, `rgba(${bg},1)`);
        c.fillStyle = fg;
        c.fillRect(0, H - fadeH, W, fadeH);
      }
    }
  }

  function resize() {
    const r = hero.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 1.5);
    W = r.width; H = r.height;
    const all = [canvas, mask, buf];
    looks.forEach((L) => all.push(L.layer, L.type, L.fore));
    all.forEach((c) => { c.width = Math.round(W * dpr); c.height = Math.round(H * dpr); });
    if (layersReady) looks.forEach(paintLook);
    dirty = true;
  }

  function heroFallback(err) {
    if (err) console.warn("Hero canvas fallback:", err);
    hero.classList.add("hero--static");
  }
  heroAssets.then(() => {
    try {
      layersReady = true;
      resize();
      compose(performance.now());
      ctx.drawImage(layerA, 0, 0);
      canvas.classList.add("ready");
    } catch (err) { heroFallback(err); }
  });
  canvas.addEventListener("contextlost", () => heroFallback("context lost"));
  setTimeout(() => { if (!canvas.classList.contains("ready")) heroFallback("timeout"); }, 6000);
  fontLoaded.then(() => { if (layersReady) resize(); });
  if (document.fonts) document.fonts.addEventListener && document.fonts.addEventListener("loadingdone", () => { if (layersReady) resize(); });
  resize();
  let rT;
  addEventListener("resize", () => { clearTimeout(rT); rT = setTimeout(resize, 120); });
  hero.addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch" || reduceMotion) return;
    const r = hero.getBoundingClientRect();
    ptx = ((e.clientX - r.left) / r.width) * 2 - 1;
    pty = ((e.clientY - r.top) / r.height) * 2 - 1;
  });
  hero.addEventListener("pointerleave", () => { ptx = 0; pty = 0; });

  const LIFE = 1100;
  let stamps = [], last = null, lastMove = 0, autoT = 0, autoLast = null;
  const brush = () => Math.min(W, H) * (coarse ? 0.15 : 0.105) + 24;

  function addStamp(x, y, now) {
    const b = brush();
    const n = 3 + Math.floor(Math.random() * 3);
    const lobes = [];
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const d = Math.random() * b * 0.45;
      lobes.push({ dx: Math.cos(a) * d, dy: Math.sin(a) * d, r: b * (0.45 + Math.random() * 0.55) });
    }
    stamps.push({ x, y, t: now, lobes });
  }

  function strokeTo(x, y, now) {
    if (last) {
      const step = brush() * 0.3;
      const count = Math.min(Math.floor(Math.hypot(x - last.x, y - last.y) / step), 40);
      for (let i = 1; i <= count; i++) {
        const k = i / (count + 1);
        addStamp(last.x + (x - last.x) * k, last.y + (y - last.y) * k, now);
      }
    }
    addStamp(x, y, now);
    last = { x, y };
  }
  function pointerTo(cx, cy, now) {
    const r = hero.getBoundingClientRect();
    strokeTo(cx - r.left, cy - r.top, now);
    lastMove = now;
  }

  hero.addEventListener("pointermove", (e) => pointerTo(e.clientX, e.clientY, performance.now()));
  hero.addEventListener("pointerleave", () => { last = null; });
  hero.addEventListener("pointerdown", (e) => pointerTo(e.clientX, e.clientY, performance.now()));

  // Touch devices: the brush wanders by itself when idle
  function autoWander(now) {
    if (now - lastMove < 2500) return;
    autoT += 0.016;
    const x = W * (0.5 + Math.sin(autoT * 1.3) * 0.3);
    const y = H * (0.5 + Math.sin(autoT * 0.9 + 1) * 0.22);
    if (!autoLast || Math.hypot(x - autoLast.x, y - autoLast.y) > W * 0.02) {
      addStamp(x, y, now);
      autoLast = { x, y };
    }
  }

  // One gentle sweep after loading, so visitors discover the effect
  function introSweep() {
    if (reduceMotion) return;
    const t0 = performance.now(), dur = 1400;
    let prev = null;
    const step = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      const x = W * (0.18 + e * 0.64), y = H * (0.62 - Math.sin(e * Math.PI) * 0.22);
      if (!prev || Math.hypot(x - prev.x, y - prev.y) > brush() * 0.25) { addStamp(x, y, t); prev = { x, y }; }
      if (p < 1 && performance.now() - lastMove > 200) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  let heroVisible = true;
  new IntersectionObserver(([en]) => { heroVisible = en.isIntersecting; }).observe(hero);

  function frame(now) {
    requestAnimationFrame(frame);
    if (!heroVisible || !layersReady || !W) return;

    if (coarse) autoWander(now);
    stamps = stamps.filter((s) => now - s.t < LIFE);

    try { compose(now); } catch (err) { return heroFallback(err); }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(layerA, 0, 0);
    if (!stamps.length) return;

    // 1. paint the brush mask
    mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    mctx.clearRect(0, 0, W, H);
    mctx.fillStyle = "#000";
    for (const s of stamps) {
      const k = 1 - (now - s.t) / LIFE;
      const scale = k < 0.75 ? k / 0.75 : 1;
      const rs = Math.pow(scale, 0.8);
      mctx.beginPath();
      for (const l of s.lobes) {
        const x = s.x + l.dx * scale, y = s.y + l.dy * scale;
        mctx.moveTo(x + l.r * rs, y);
        mctx.arc(x, y, l.r * rs, 0, Math.PI * 2);
      }
      mctx.fill();
    }

    // 2. back layer clipped to the mask, drawn over the front layer
    bctx.setTransform(1, 0, 0, 1, 0, 0);
    bctx.globalCompositeOperation = "source-over";
    bctx.clearRect(0, 0, buf.width, buf.height);
    bctx.drawImage(mask, 0, 0);
    bctx.globalCompositeOperation = "source-in";
    bctx.drawImage(layerB, 0, 0);
    ctx.drawImage(buf, 0, 0);
  }
  requestAnimationFrame(frame);

  // Running timecode (HH:MM:SS:FF at 25 fps) — a nod to the editing timeline
  const tc = $("#timecode");
  const tcStart = performance.now();
  const pad = (v) => String(v).padStart(2, "0");
  setInterval(() => {
    if (!heroVisible || !tc) return;
    const f = Math.floor((performance.now() - tcStart) / 40);
    tc.textContent = `${pad(Math.floor(f / 90000))}:${pad(Math.floor(f / 1500) % 60)}:${pad(Math.floor(f / 25) % 60)}:${pad(f % 25)}`;
  }, 40);

  /* ---------------------------------------------------------
     5. PRELOADER
     --------------------------------------------------------- */
  const loader = $("#loader");
  const countEl = $("#loaderCount"), barEl = $("#loaderBar");
  let shown = 0, target = 30, finished = false;
  heroAssets.then(() => { target = 100; });
  setTimeout(() => { target = 100; }, 4000); // safety net
  const t0 = performance.now();
  (function tickLoader() {
    const minTime = reduceMotion ? 200 : 1500;
    const cap = target === 100 ? 100 : Math.min(target + (performance.now() - t0) / 60, 90);
    shown += (cap - shown) * 0.12;
    if (performance.now() - t0 < minTime) shown = Math.min(shown, ((performance.now() - t0) / minTime) * 100);
    const v = Math.round(shown);
    countEl.textContent = String(v).padStart(3, "0");
    loader.style.setProperty("--lp", (v / 100).toFixed(3));
    barEl.style.transform = `scaleX(${v / 100})`;
    if (v >= 99 && target === 100 && !finished) {
      finished = true;
      countEl.textContent = "100";
      loader.style.setProperty("--lp", 1);
      setTimeout(() => {
        loader.classList.add("done");
        document.body.classList.remove("is-loading");
        document.body.classList.add("loaded");
        setTimeout(startIntro, 420);          // hero type + figure rise as the shutter opens
        setTimeout(introSweep, 1900);
        setTimeout(() => loader.remove(), 1700);
      }, 260);
      return;
    }
    requestAnimationFrame(tickLoader);
  })();

  /* ---------------------------------------------------------
     6. NAV, TEXT SPLIT, SCROLL REVEAL, COUNTERS, MISC
     --------------------------------------------------------- */
  const nav = $("#nav");
  let lastY = scrollY;
  function onScroll() {
    const y = scrollY, pastHero = y > hero.offsetHeight - 70;
    nav.classList.toggle("is-dark", pastHero);
    nav.classList.toggle("is-light", !pastHero && y > 12);
    lastY = y;
  }
  addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  const menuBtn = $("#menuBtn"), links = $("#links");
  const setMenu = (open) => {
    links.classList.toggle("open", open);
    nav.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("no-scroll", open);
  };
  menuBtn.addEventListener("click", () => setMenu(!links.classList.contains("open")));
  $$("a", links).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  onScroll();

  // Highlight the current section in the nav
  const navLinks = $$('.links a[href^="#"]:not(.cta)');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("section[id]").forEach((s) => spy.observe(s));

  // Split headings into words for a masked, word-by-word reveal
  function splitWords(el) {
    let i = 0;
    const wrap = (text) => {
      const frag = document.createDocumentFragment();
      text.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
        const w = document.createElement("span"); w.className = "w";
        const inner = document.createElement("span"); inner.textContent = part; inner.style.setProperty("--i", i++);
        w.appendChild(inner); frag.appendChild(w);
      });
      return frag;
    };
    [...el.childNodes].forEach((node) => {
      if (node.nodeType === 3) node.replaceWith(wrap(node.textContent));
      else if (node.nodeType === 1) { const t = node.textContent; node.textContent = ""; node.appendChild(wrap(t)); }
    });
  }
  $$("[data-split]").forEach(splitWords);

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  $$("[data-reveal], [data-split]").forEach((el) => io.observe(el));

  // Count-up numbers
  const fmt = (n) => n.toLocaleString("en-US");
  const counter = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      counter.unobserve(en.target);
      const el = en.target, end = +el.dataset.count;
      const pre = el.dataset.prefix || "", suf = el.dataset.suffix || "";
      if (reduceMotion) { el.textContent = pre + fmt(end) + suf; return; }
      const s = performance.now(), dur = 1600;
      const tick = (t) => {
        const p = Math.min((t - s) / dur, 1);
        el.textContent = pre + fmt(Math.round(end * (1 - Math.pow(1 - p, 4)))) + suf;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach((el) => counter.observe(el));

  // Copy email
  const toast = $("#toast");
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast.t);
    showToast.t = setTimeout(() => toast.classList.remove("show"), 1800);
  };
  // WhatsApp button gently follows the cursor ("magnetic")
  const wa = $("#waBtn");
  if (wa && !reduceMotion) {
    wa.addEventListener("pointermove", (e) => {
      if (e.pointerType === "touch") return;
      const r = wa.getBoundingClientRect();
      wa.style.setProperty("--mx", `${((e.clientX - r.left) / r.width - 0.5) * 18}px`);
      wa.style.setProperty("--my", `${((e.clientY - r.top) / r.height - 0.5) * 12}px`);
    });
    wa.addEventListener("pointerleave", () => { wa.style.setProperty("--mx", "0px"); wa.style.setProperty("--my", "0px"); });
  }



  /* ---------------------------------------------------------
     7. SHARED SCROLL HELPERS
     --------------------------------------------------------- */
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const pinMQ = matchMedia("(min-width: 901px) and (min-height: 600px)");
  const onMQ = (mq, fn) => (mq.addEventListener ? mq.addEventListener("change", fn) : mq.addListener(fn));
  const frames = [];                       // functions run once per scroll frame
  let ticking = false;
  addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; frames.forEach((f) => f()); });
  }, { passive: true });

  /* ---------------------------------------------------------
     8. EXPERIENCE — horizontal "editing timeline"
     Large screens: the section pins; scrolling down slides the track sideways,
     with each [data-depth] layer drifting at its own speed (parallax).
     Small screens / reduced motion: clips simply stack.
     --------------------------------------------------------- */
  const xp = $("#xp");
  if (xp) {
    const hud = $(".xp-sticky", xp), track = $(".xp-track", xp);
    const clips = $$(".clip, .xp-outro", xp), layers = $$("[data-depth]", xp);
    const nameEl = $("#xpName"), timeEl = $("#xpTime");
    const two = (v) => String(v).padStart(2, "0");
    let on = false, dist = 0, bases = [], starts = [];

    const draw = () => {
      if (!on) return;
      const p = dist ? clamp(-xp.getBoundingClientRect().top / dist, 0, 1) : 0;
      const x = -p * dist, half = innerWidth / 2;
      track.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
      layers.forEach((el, i) => {
        const c = bases[i] + x - half;                    // distance from screen centre
        if (Math.abs(c) < innerWidth * 1.4) el.style.translate = `${(c * +el.dataset.depth).toFixed(1)}px 0`;
      });
      hud.style.setProperty("--p", p.toFixed(4));
      hud.style.setProperty("--rx", `${(x * 0.35).toFixed(1)}px`);
      let cur = -1;
      starts.forEach((s, i) => { if (s + x < innerWidth * 0.6) cur = i; });
      nameEl.textContent = cur < 0 ? "Experience"
        : clips[cur].classList.contains("xp-outro") ? clips[cur].dataset.name
        : `Clip ${two(cur + 1)} — ${clips[cur].dataset.name}`;
      const f = Math.floor(p * 900);                      // 36 s "timeline" at 25 fps
      timeEl.textContent = `00:00:${two(Math.floor(f / 25))}:${two(f % 25)}`;
    };
    const measure = () => {
      on = pinMQ.matches && !reduceMotion;
      xp.classList.toggle("xp--pinned", on);
      track.style.transform = "";
      layers.forEach((el) => { el.style.translate = ""; });
      if (!on) { xp.style.height = ""; return; }
      // Measure to the end card, not scrollWidth: the oversized ghost words would stretch the track
      const endEl = track.lastElementChild;
      const padR = parseFloat(getComputedStyle(track).paddingRight) || 0;
      dist = Math.max(0, endEl.getBoundingClientRect().right - track.getBoundingClientRect().left + padR - innerWidth);
      xp.style.height = `${innerHeight + dist}px`;
      const t0 = track.getBoundingClientRect().left;
      bases = layers.map((el) => { const r = el.getBoundingClientRect(); return r.left - t0 + r.width / 2; });
      starts = clips.map((el) => el.getBoundingClientRect().left - t0);
      draw();
    };
    measure();
    onMQ(pinMQ, measure);
    frames.push(draw);
    let mT;
    addEventListener("resize", () => { clearTimeout(mT); mT = setTimeout(measure, 150); });
    addEventListener("load", measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);

    // Reveal each clip as it comes into view (works for both layouts)
    if (reduceMotion) clips.forEach((el) => el.classList.add("in"));
    else {
      const clipIO = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); clipIO.unobserve(en.target); } });
      }, { threshold: 0.25 });
      clips.forEach((el) => clipIO.observe(el));
    }

    // Frames tilt toward the cursor with a lime highlight; click opens a lightbox
    $$(".frame", xp).forEach((fr) => {
      fr.addEventListener("pointermove", (e) => {
        if (e.pointerType === "touch" || reduceMotion) return;
        const r = fr.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        fr.style.setProperty("--tx", (px * 2 - 1).toFixed(3));
        fr.style.setProperty("--ty", (py * 2 - 1).toFixed(3));
        fr.style.setProperty("--hx", `${(px * 100).toFixed(1)}%`);
        fr.style.setProperty("--hy", `${(py * 100).toFixed(1)}%`);
      });
      fr.addEventListener("pointerleave", () => { fr.style.setProperty("--tx", 0); fr.style.setProperty("--ty", 0); fr.style.removeProperty("--hy"); });
    });
    const lb = $("#lightbox"), lbImg = $("#lbImg"), lbCap = $("#lbCap");
    let lbReturn = null;
    const closeLb = () => { lb.hidden = true; document.body.classList.remove("no-scroll"); if (lbReturn) lbReturn.focus(); };
    xp.addEventListener("click", (e) => {
      const fr = e.target.closest("[data-zoom]");
      if (!fr) return;
      const img = $("img", fr);
      lbImg.src = img.currentSrc || img.src; lbImg.alt = img.alt;
      lbCap.textContent = img.alt;
      lbReturn = fr; lb.hidden = false;
      document.body.classList.add("no-scroll");
      $(".modal-close", lb).focus();
    });
    lb.addEventListener("click", closeLb);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lb.hidden) closeLb(); });
  }

})();
