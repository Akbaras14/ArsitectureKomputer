import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const video = new EventTarget();
const button = new EventTarget();
const status = { hidden: true };
const title = { style: {} };
const frames = new Map();
let frameId = 0;
globalThis.requestAnimationFrame = callback => {
  frames.set(++frameId, callback);
  return frameId;
};
globalThis.cancelAnimationFrame = id => frames.delete(id);
video.duration = 10;
video.currentTime = 0;
video.paused = true;
video.play = async () => {
  video.paused = false;
  video.dispatchEvent(new Event('play'));
};
video.pause = () => {
  video.paused = true;
  video.dispatchEvent(new Event('pause'));
};
globalThis.document = {
  getElementById: id => ({ 'home-background': video, 'video-play': button, 'video-status': status, 'main-title': title })[id]
};
const source = await readFile(new URL('../js/video-player.js', import.meta.url), 'utf8');
const { initVideoBackground } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
initVideoBackground();
button.dispatchEvent(new Event('click'));
assert.equal(video.paused, false);
assert.match(button.textContent, /Pause/);
assert.equal(frames.size, 1);
assert.equal(title.style.transform, 'translate(-50%, 10vh) scale(1)');
video.currentTime = 5;
[...frames.values()][0]();
assert.equal(title.style.transform, 'translate(-50%, 47.5vh) scale(0.8)');
assert.equal(frames.size, 1);
button.dispatchEvent(new Event('click'));
assert.equal(video.paused, true);
assert.match(button.textContent, /Play/);
assert.equal(frames.size, 0);
video.currentTime = 10;
video.dispatchEvent(new Event('seeked'));
assert.equal(title.style.transform, 'translate(-50%, 85vh) scale(0.6)');
assert.equal(frames.size, 0);
video.play = async () => { throw new Error('Playback blocked'); };
button.dispatchEvent(new Event('click'));
await new Promise(resolve => setImmediate(resolve));
assert.equal(status.hidden, false);
assert.match(status.textContent, /coba lagi/);
video.dispatchEvent(new Event('error'));
assert.match(status.textContent, /gagal dimuat/);
video.dispatchEvent(new Event('ended'));
assert.match(button.textContent, /Play/);
console.log('Video controls: play, pause, ended, and errors passed.');
