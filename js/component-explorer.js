const model = document.querySelector('model-viewer');
const status = document.getElementById('model-status');
const info = document.getElementById('component-info');
const close = document.getElementById('close-info');
const buttons = [...document.querySelectorAll('[data-part]')];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const parts = JSON.parse(document.getElementById('component-data').textContent);
let selectedButton;
const description = document.getElementById('part-description');
const screen = document.querySelector('.screen');
let typingFrame;

function stopTyping() {
  cancelAnimationFrame(typingFrame);
  description.classList.remove('is-typing');
}

function typeDescription(text) {
  stopTyping();
  description.textContent = '';
  screen.scrollTop = 0;
  description.classList.add('is-typing');
  const start = performance.now();
  function type(now) {
    const followText = screen.scrollHeight - screen.scrollTop - screen.clientHeight < 32;
    const length = Math.max(0, Math.min(text.length, Math.floor((now - start) / 28)));
    description.textContent = text.slice(0, length);
    if (followText) screen.scrollTop = screen.scrollHeight;
    if (length < text.length) typingFrame = requestAnimationFrame(type);
    else stopTyping();
  }
  typingFrame = requestAnimationFrame(type);
}

function setCamera(orbit) {
  model.cameraOrbit = orbit;
  model.cameraTarget = 'auto auto auto';
  model.resetTurntableRotation?.();
  if (reducedMotion.matches && model.loaded) model.jumpCameraToGoal();
}

function selectPart(index) {
  const part = parts[index];
  selectedButton = buttons[index];
  document.getElementById('part-title').textContent = part.title;
  document.getElementById('terminal-announcement').textContent = `${part.title}. ${part.text}`;
  buttons.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.part) === index)));
  info.hidden = false;
  typeDescription(part.text);
  setCamera(part.orbit);
}

function closeInfo() {
  stopTyping();
  info.hidden = true;
  buttons.forEach(button => button.setAttribute('aria-pressed', 'false'));
  selectedButton?.focus({ preventScroll: true });
}

// Native hotspots track each model; these lines connect them to offset labels.
function updateLines() {
  document.querySelectorAll('.callout').forEach(callout => {
    const style = getComputedStyle(callout);
    const line = callout.querySelector('line');
    line.setAttribute('x2', parseFloat(style.getPropertyValue('--label-x')));
    line.setAttribute('y2', parseFloat(style.getPropertyValue('--label-y')));
  });
}
new ResizeObserver(updateLines).observe(model);
buttons.forEach(button => button.addEventListener('click', () => selectPart(Number(button.dataset.part))));
close.addEventListener('click', closeInfo);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !info.hidden) closeInfo();
});
model.addEventListener('load', () => {
  status.hidden = true;
});
model.addEventListener('error', () => {
  status.hidden = false;
  status.textContent = 'Model gagal dimuat. Muat ulang halaman atau gunakan tautan unduh model.';
});
try {
  await import('../assets/vendor/model-viewer.min.js');
} catch {
  status.textContent = 'Penampil 3D tidak tersedia. Muat ulang halaman atau buka Semua materi.';
}
