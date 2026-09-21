export function initVideoBackground() {
  const video = document.getElementById('home-background');
  const button = document.getElementById('video-play');
  const status = document.getElementById('video-status');
  const title = document.getElementById('main-title');
  let animationFrame;

  // Update tiap refresh layar; timeupdate video terlalu jarang untuk gerakan halus.
  function updateTitle() {
    cancelAnimationFrame(animationFrame);
    const progress = Number.isFinite(video.duration) && video.duration > 0
      ? Math.max(0, Math.min(1, video.currentTime / video.duration)) : 0;
    title.style.transform = `translate(-50%, ${10 + progress * 75}vh) scale(${1 - progress * 0.4})`;
    if (!video.paused && !video.ended) animationFrame = requestAnimationFrame(updateTitle);
  }

  for (const event of ['play', 'pause', 'ended', 'seeked', 'loadedmetadata']) {
    video.addEventListener(event, updateTitle);
  }

  function updateButton() {
    button.textContent = video.paused ? '\u25b6 Play' : '\u23f8 Pause';
  }

  button.addEventListener('click', async () => {
    status.hidden = true;
    if (!video.paused) {
      video.pause();
      return;
    }
    try {
      await video.play();
    } catch {
      status.textContent = 'Video belum bisa diputar. Silakan coba lagi.';
      status.hidden = false;
    }
  });
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
  video.addEventListener('ended', updateButton);
  video.addEventListener('error', () => {
    status.textContent = 'Video gagal dimuat. Muat ulang halaman untuk mencoba lagi.';
    status.hidden = false;
  });
}
