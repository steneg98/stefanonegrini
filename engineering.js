(function () {
  const sections = Array.from(document.querySelectorAll('main section'));
  if (sections.length === 0) return;

  const LOCK_MS = 600;
  const SWIPE_THRESHOLD = 30;
  const INTENSITY_THRESHOLD = 100;

  let locked = false;
  let unlockTimer = null;

  function getCurrentIndex() {
    const mid = window.innerHeight / 2;
    let closest = 0;
    let minDist = Infinity;
    sections.forEach((s, i) => {
      const rect = s.getBoundingClientRect();
      const dist = Math.abs(rect.top + rect.height / 2 - mid);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    return closest;
  }

  function snapTo(index) {
    index = Math.max(0, Math.min(index, sections.length - 1));
    if (index === getCurrentIndex()) return;

    locked = true;
    clearTimeout(unlockTimer);
    sections[index].scrollIntoView({ behavior: 'smooth' });
    unlockTimer = setTimeout(() => { locked = false; }, LOCK_MS);
  }

  let wheelAccum = 0;
  let wheelTimer = null;

  window.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (locked) return;

    wheelAccum += e.deltaY;
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(() => { wheelAccum = 0; }, 80);

    if (Math.abs(wheelAccum) < 20) return;

    const dir = wheelAccum > 0 ? 1 : -1;
    const steps = Math.abs(wheelAccum) >= INTENSITY_THRESHOLD ? 2 : 1;
    wheelAccum = 0;
    snapTo(getCurrentIndex() + dir * steps);

  }, { passive: false });

  let touchStartY = 0;

  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (locked) return;
    const dy = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(dy) < SWIPE_THRESHOLD) return;
    const steps = Math.abs(dy) > 120 ? 2 : 1;
    snapTo(getCurrentIndex() + (dy > 0 ? 1 : -1) * steps);
  }, { passive: true });

})();



