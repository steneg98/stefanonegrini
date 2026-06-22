

// Scroll to item on click
function scrollToItem(el) {
  const gallery = document.getElementById('gallery');
  const itemLeft = el.offsetLeft;
  const galleryWidth = gallery.offsetWidth;
  const itemWidth = el.offsetWidth;
  gallery.scrollTo({
    left: itemLeft - (galleryWidth / 2) + (itemWidth / 2),
    behavior: 'smooth'
  });
}

// Drag to scroll con mouse (desktop)
(function () {
  const gallery = document.getElementById('gallery');
  let isDown = false;
  let startX;
  let scrollLeft;
  let hasDragged = false;

  gallery.addEventListener('mousedown', (e) => {
    isDown = true;
    hasDragged = false;
    startX = e.pageX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
    gallery.style.cursor = 'grabbing';
  });

  gallery.addEventListener('mouseleave', () => {
    isDown = false;
    gallery.style.cursor = 'grab';
  });

  gallery.addEventListener('mouseup', () => {
    isDown = false;
    gallery.style.cursor = 'grab';
  });

  gallery.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - gallery.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) hasDragged = true;
    gallery.scrollLeft = scrollLeft - walk;
  });

  // Blocca il click se c'è stato un drag
  gallery.addEventListener('click', (e) => {
    if (hasDragged) e.stopImmediatePropagation();
  }, true);
})();









// Scroll to item on click
function scrollToItem(el) {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;
  const itemLeft = el.offsetLeft;
  const galleryWidth = gallery.offsetWidth;
  const itemWidth = el.offsetWidth;
  gallery.scrollTo({
    left: itemLeft - (galleryWidth / 2) + (itemWidth / 2),
    behavior: 'smooth'
  });
}

(function () {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;

  // Drag to scroll
  let isDown = false, startX, scrollLeft, hasDragged = false;

  gallery.addEventListener('mousedown', (e) => {
    isDown = true; hasDragged = false;
    startX = e.pageX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
    gallery.style.cursor = 'grabbing';
  });
  gallery.addEventListener('mouseleave', () => { isDown = false; gallery.style.cursor = 'grab'; });
  gallery.addEventListener('mouseup', () => { isDown = false; gallery.style.cursor = 'grab'; });
  gallery.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - gallery.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) hasDragged = true;
    gallery.scrollLeft = scrollLeft - walk;
  });
  gallery.addEventListener('click', (e) => {
    if (hasDragged) e.stopImmediatePropagation();
  }, true);

  // Pallini
  const dotsContainer = document.getElementById('gallery-dots');
  if (!dotsContainer) return;

  const items = gallery.querySelectorAll('.gallery-item');

  items.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('gallery-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      items[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
    dotsContainer.appendChild(dot);
  });

  gallery.addEventListener('scroll', () => {
    const center = gallery.scrollLeft + gallery.offsetWidth / 2;
    let closest = 0, minDist = Infinity;
    items.forEach((item, i) => {
      const dist = Math.abs((item.offsetLeft + item.offsetWidth / 2) - center);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    dotsContainer.querySelectorAll('.gallery-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === closest);
    });
  });

})();