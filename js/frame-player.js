/** Resolve an image directly from the supplied 300-frame sequence. @param {number} index */
export function sourceFrame(index) {
  const frame = Math.max(0, Math.min(299, Number.isFinite(index) ? Math.round(index) : 0));
  return `ezgif-3e0acb79ac1c6e30-jpg/ezgif-frame-${String(frame + 1).padStart(3, '0')}.jpg`;
}

/** Share bounded image decoding between the background and component visualization. */
export function createFramePlayer(canvas, fallback, loading) {
  const context = canvas.getContext('2d');
  const cache = new Map();
  const pending = new Set();
  const failed = new Set();
  let target = 0;
  let desired = 0;
  let visual = 0;
  let drawn = -1;
  let visible = false;
  let queue = [];
  let easingFrame = 0;

  /** Paint complete frames only, preserving the previous picture while loading. */
  function draw(frame = Math.round(visual)) {
    if (!context || !visible) return;
    const available = cache.has(frame) ? frame : [...cache.keys()].sort((a, b) => Math.abs(a - frame) - Math.abs(b - frame))[0];
    if (!Number.isInteger(available)) return;
    const image = cache.get(available);
    // Cover the viewport so the frame is a real background, even when the screen ratio differs.
    const scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
    const width = image.naturalWidth * scale;
    const height = image.naturalHeight * scale;
    context.fillStyle = '#b9b9b9';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
    drawn = available;
    canvas.dataset.frame = available;
    loading.hidden = true;
    fallback.hidden = true;
  }

  /** Ease both the scroll target and displayed frame so wheel bursts do not snap. */
  function easeToTarget() {
    if (!visible) { easingFrame = 0; return; }
    const targetDistance = desired - target;
    target = Math.abs(targetDistance) < 0.35 ? desired : target + targetDistance * 0.11;
    const distance = target - visual;
    visual = Math.abs(distance) < 0.35 ? target : visual + distance * 0.18;
    draw();
    if (Math.abs(desired - visual) >= 0.35) easingFrame = requestAnimationFrame(easeToTarget);
    else easingFrame = 0;
  }

  /** Report missing assets without blocking the rest of the page. */
  function reportFailure() {
    loading.hidden = false;
    loading.textContent = 'Frame tidak tersedia. Gambar sebelumnya tetap ditampilkan.';
  }

  /** Limit work to three requests and sixteen decoded images per player. */
  function pump() {
    if (!visible || !context) return;
    while (pending.size < 3 && queue.length) {
      const index = queue.shift();
      if (cache.has(index) || pending.has(index) || failed.has(index)) continue;
      pending.add(index);
      const image = new Image();
      image.decoding = 'async';
      image.onload = () => {
        pending.delete(index);
        cache.set(index, image);
        for (const key of [...cache.keys()].sort((a, b) => Math.abs(b - desired) - Math.abs(a - desired))) {
          if (cache.size <= 16) break;
          if (key !== target && key !== drawn) cache.delete(key);
        }
        if (index === target || index === desired || Math.abs(index - visual) < 3) requestAnimationFrame(draw);
        pump();
      };
      image.onerror = () => { pending.delete(index); failed.add(index); if (index === target) reportFailure(); pump(); };
      image.src = sourceFrame(index);
    }
  }

  /** Prioritize the selected frame ahead of nearby images. @param {number} index */
  function select(index) {
    if (!Number.isFinite(index)) return;
    desired = Math.max(0, Math.min(299, Math.round(index)));
    queue = [0, 1, -1, 2, -2, 3, 4, 5, 6, 7, 8, 9, 10].map(offset => desired + offset).filter(frame => frame >= 0 && frame < 300);
    if (failed.has(desired)) reportFailure();
    pump();
    if (!easingFrame) easingFrame = requestAnimationFrame(easeToTarget);
  }

  /** Match the backing resolution to the canvas layout. */
  function resize() {
    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(bounds.width * ratio);
    canvas.height = Math.round(bounds.height * ratio);
    draw();
  }

  /** Suspend loading and drawing while a player is outside the viewport. */
  function setVisible(active) {
    visible = Boolean(active) && !document.hidden;
    if (visible) { resize(); select(desired); }
    else { queue = []; cancelAnimationFrame(easingFrame); easingFrame = 0; }
  }

  new ResizeObserver(resize).observe(canvas);
  if (!context) { canvas.hidden = true; loading.textContent = 'Canvas tidak tersedia. Gambar statis tetap ditampilkan.'; }
  return { select, setVisible };
}

/** Animate all 300 source images behind the homepage introduction. */
export function initScrollBackground() {
  const section = document.getElementById('home-scroll');
  const stage = document.getElementById('home-scroll-stage');
  const player = createFramePlayer(document.getElementById('home-background'), document.getElementById('home-background-fallback'), document.getElementById('home-background-loading'));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let scheduled = false;

  /** Map the sticky travel to a reversible frame index. */
  function update() {
    scheduled = false;
    if (!visible || document.hidden) return;
    const top = parseFloat(getComputedStyle(stage).top) || 0;
    const travel = section.offsetHeight - stage.offsetHeight;
    const progress = travel <= 0 ? 0 : Math.max(0, Math.min(1, (top - section.getBoundingClientRect().top) / travel));
    player.select(Math.round(progress * 299));
  }

  /** Coalesce scroll events into one animation frame. */
  function schedule() {
    if (!visible || scheduled) return;
    scheduled = true; requestAnimationFrame(update);
  }

  /** Resume the background only when its page and viewport are visible. */
  function refresh() {
    const bounds = stage.getBoundingClientRect();
    visible = !document.getElementById('beranda').hidden && bounds.bottom > 0 && bounds.top < innerHeight;
    player.setVisible(visible); schedule();
  }

  new IntersectionObserver(refresh).observe(stage);
  new ResizeObserver(schedule).observe(stage);
  window.addEventListener('scroll', schedule, { passive: true });
  document.addEventListener('routechange', refresh);
  document.addEventListener('visibilitychange', refresh);
  reduced.addEventListener('change', refresh);
  refresh();

  window.scrollToFrameProgress = function(targetProgress) {
    const travel = section.offsetHeight - stage.offsetHeight;
    if (travel > 0) {
      const topOffset = parseFloat(getComputedStyle(stage).top) || 0;
      const targetScrollY = window.scrollY + section.getBoundingClientRect().top + (targetProgress * travel) - topOffset;
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  };

}
