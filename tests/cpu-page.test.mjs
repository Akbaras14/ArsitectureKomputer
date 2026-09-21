// Run with the site served at http://127.0.0.1:8085.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';

const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless', '--no-sandbox', '--enable-unsafe-swiftshader', '--remote-debugging-port=9335',
  `--user-data-dir=${process.cwd()}/.browser-check/cpu-test`, 'about:blank'
], { stdio: 'ignore' });
let socket;
try {
  let pages;
  for (let i = 0; i < 40; i++) {
    try { pages = await (await fetch('http://127.0.0.1:9335/json')).json(); break; }
    catch { await delay(250); }
  }
  assert.ok(pages, 'Chrome must start');
  socket = new WebSocket(pages.find(page => page.type === 'page').webSocketDebuggerUrl);
  await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }));
  let id = 0;
  const pending = new Map();
  socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data);
    if (pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      message.error ? reject(new Error(message.error.message)) : resolve(message.result);
    }
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    pending.set(++id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async expression => {
    const result = await send('Runtime.evaluate', { expression, returnByValue: true });
    assert.ok(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  const until = async expression => {
    for (let i = 0; i < 120; i++) {
      if (await evaluate(expression)) return;
      await delay(250);
    }
    assert.fail(`Timed out: ${expression}`);
  };
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  await send('Page.navigate', { url: 'http://127.0.0.1:8085/index.html' });
  await until(`!!document.querySelector('#component-buttons a[href="cpu.html"]')`);
  await evaluate(`document.querySelector('#component-buttons a[href="cpu.html"]').click()`);
  await until('location.pathname === "/cpu.html" && document.querySelector("#cpu-model")?.loaded');
  assert.equal(await evaluate('document.getElementById("model-status").hidden'), true);
  assert.equal(await evaluate('document.getElementById("cpu-model").autoRotate'), true);
  assert.equal(await evaluate('document.querySelector("#rotate, #flip, #reset-view")'), null);
  const hotspotX = await evaluate('document.getElementById("cpu-model").queryHotspot("hotspot-substrate").canvasPosition.x');
  await delay(1600);
  assert.ok(Math.abs(await evaluate('document.getElementById("cpu-model").queryHotspot("hotspot-substrate").canvasPosition.x') - hotspotX) > 1, 'CPU rotates without clicking a control');
  assert.equal(await evaluate('document.getElementById("component-info").hidden'), true);
  assert.equal(await evaluate('document.querySelector("#instruction-mode")'), null);
  assert.equal(await evaluate('document.querySelectorAll(".callout line").length'), 3);
  assert.equal(await evaluate('Math.abs(document.getElementById("cpu-model").getBoundingClientRect().width / 2 - document.documentElement.clientWidth / 2) < 1'), true);
  assert.equal(await evaluate('document.querySelector(".callout line").getAttribute("x2")'), '-190');
  await evaluate(`document.querySelector('[data-part="0"]').click()`);
  const initialLength = await evaluate('document.getElementById("part-description").textContent.length');
  assert.ok(initialLength < 100, `Description starts typing instead of appearing all at once: ${initialLength}, reduced=${await evaluate('matchMedia("(prefers-reduced-motion: reduce)").matches')}, typing=${await evaluate('document.getElementById("part-description").className')}`);
  await delay(150);
  assert.ok(await evaluate('document.getElementById("part-description").textContent.length') > initialLength);
  await evaluate(`document.querySelector('[data-part="1"]').click(); document.querySelector('[data-part="0"]').click()`);
  await until('!document.getElementById("part-description").classList.contains("is-typing")');
  assert.equal(await evaluate('document.getElementById("terminal-announcement").textContent'), await evaluate('document.getElementById("part-title").textContent + ". " + document.getElementById("part-description").textContent'));
  assert.equal(await evaluate('document.getElementById("part-title").textContent'), 'Pelindung panas');
  assert.equal(await evaluate('document.getElementById("component-info").hidden'), false);
  assert.equal(await evaluate('document.getElementById("cpu-model").cameraOrbit'), '0deg 25deg 115%');
  await evaluate('document.getElementById("close-info").click()');
  assert.equal(await evaluate('document.getElementById("component-info").hidden'), true);
  await evaluate(`document.querySelector('[data-part="2"]').click()`);
  assert.equal(await evaluate('document.getElementById("part-title").textContent'), 'Sisi bawah');
  assert.equal(await evaluate('document.getElementById("cpu-model").autoRotate'), true);
  await evaluate('document.getElementById("close-info").click()');
  const stoppedText = await evaluate('document.getElementById("part-description").textContent');
  await delay(100);
  assert.equal(await evaluate('document.getElementById("part-description").textContent'), stoppedText);
  assert.equal(await evaluate('document.getElementById("component-info").hidden'), true);
  await evaluate(`document.querySelector('[data-part="1"]').click()`);
  assert.equal(await evaluate('document.getElementById("part-title").textContent'), 'Substrat');
  assert.equal(await evaluate('document.getElementById("cpu-model").cameraOrbit'), '-45deg 65deg 115%');
  await mkdir('tests/screenshots', { recursive: true });
  await until('!document.getElementById("part-description").classList.contains("is-typing")');
  const screenshot = await send('Page.captureScreenshot');
  await writeFile('tests/screenshots/cpu.png', Buffer.from(screenshot.data, 'base64'));
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'), true);
  await delay(500);
  const mobile = await send('Page.captureScreenshot');
  await writeFile('tests/screenshots/cpu-mobile.png', Buffer.from(mobile.data, 'base64'));
  assert.equal(await evaluate('document.querySelector(".callout line").getAttribute("x2")'), '-60');
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  assert.equal(await evaluate('document.getElementById("component-info").hidden'), true);
  assert.equal(await evaluate('document.activeElement.dataset.part'), '1');
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await evaluate(`document.querySelector('[data-part="2"]').click()`);
  assert.equal(await evaluate('document.getElementById("part-description").classList.contains("is-typing")'), true);
  assert.ok(await evaluate('document.getElementById("part-description").textContent.length') < 100);
  await until('!document.getElementById("part-description").classList.contains("is-typing")');
  assert.equal(await evaluate('document.getElementById("terminal-announcement").textContent'), await evaluate('document.getElementById("part-title").textContent + ". " + document.getElementById("part-description").textContent'));
  await evaluate('document.getElementById("cpu-model").dispatchEvent(new Event("error"))');
  assert.equal(await evaluate('!document.getElementById("model-status").hidden'), true);
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: 'http://127.0.0.1:8085/index.html' });
  await until(`!!document.querySelector('#component-buttons a[href="ssd.html"]')`);
  assert.equal(await evaluate(`document.querySelector('#component-buttons a[href="ssd.html"]').textContent`), 'SSD NVMe');
  await evaluate(`document.querySelector('#component-buttons a[href="ssd.html"]').click()`);
  await until('location.pathname === "/ssd.html" && document.getElementById("ssd-model")?.loaded');
  assert.equal(await evaluate('document.getElementById("ssd-model").autoRotate'), true);
  assert.equal(await evaluate('document.getElementById("model-status").hidden'), true);
  await evaluate('document.getElementById("ssd-model").autoRotate = false; document.getElementById("ssd-model").resetTurntableRotation()');
  await delay(500);
  const ssd = await send('Page.captureScreenshot');
  await writeFile('tests/screenshots/ssd.png', Buffer.from(ssd.data, 'base64'));
  for (const [index, title] of ['Memori NAND', 'Papan sirkuit', 'Konektor M.2'].entries()) {
    await evaluate(`document.querySelector('[data-part="${index}"]').click()`);
    assert.equal(await evaluate('document.getElementById("part-title").textContent'), title);
    assert.equal(await evaluate('document.getElementById("component-info").hidden'), false);
    assert.equal(await evaluate('document.getElementById("part-description").classList.contains("is-typing")'), true);
  }
  await until('!document.getElementById("part-description").classList.contains("is-typing")');
  assert.equal(await evaluate('document.getElementById("terminal-announcement").textContent'), await evaluate('document.getElementById("part-title").textContent + ". " + document.getElementById("part-description").textContent'));
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await delay(500);
  assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'), true);
  const ssdMobile = await send('Page.captureScreenshot');
  await writeFile('tests/screenshots/ssd-mobile.png', Buffer.from(ssdMobile.data, 'base64'));
  await evaluate('document.getElementById("close-info").click()');
  assert.equal(await evaluate('document.getElementById("component-info").hidden'), true);
  console.log('CPU and SSD navigation, models, component labels, terminal typing, mobile layout, and error feedback passed.');
} finally {
  socket?.close();
  chrome.kill();
}
