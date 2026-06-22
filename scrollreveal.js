/* ── SCROLL REVEAL – aggiungi questo in fondo a script2.js ── */

(function () {

  /* Per ogni sezione, l'immagine si trova a destra o a sinistra
     in base alla struttura HTML: se è il primo figlio di section-inner
     → viene da sinistra, altrimenti → da destra. */

  const sectionInners = document.querySelectorAll('.section-inner');

  sectionInners.forEach(function (inner) {
    const children = Array.from(inner.children);

    children.forEach(function (child) {
      const isImage =
        child.tagName === 'IMG' ||
        child.classList.contains('eng-img') ||
        child.classList.contains('eng-img-panel') ||
        child.classList.contains('eng-img-pezzo') ||
        child.classList.contains('moon-img');

      if (!isImage) return;

      const index = children.indexOf(child);
      const isLast = index === children.length - 1;

      /* L'immagine a destra (ultimo figlio) entra da destra,
         quella a sinistra (primo figlio) entra da sinistra. */
      if (isLast) {
        child.classList.add('slide-from-right');
      } else {
        child.classList.add('slide-from-left');
      }
    });
  });

  /* IntersectionObserver: appena l'immagine è visibile → aggiunge .visible */
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); /* si attiva una sola volta */
        }
      });
    },
    { threshold: window.innerWidth <= 768 ? 0.55 : 0.15 }
  );

  document.querySelectorAll(
    '.slide-from-right, .slide-from-left'
  ).forEach(function (el) {
    observer.observe(el);
  });

  /* Rispetta prefers-reduced-motion */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.slide-from-right, .slide-from-left').forEach(
      function (el) { el.classList.add('visible'); }
    );
  }

})();