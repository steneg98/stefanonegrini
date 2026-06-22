/* ============================================
   HAMBURGER MENU
   ============================================ */

const menuToggle = document.querySelector('.menu-toggle');
const navlinks   = document.querySelector('.navlinks');

if (menuToggle && navlinks) {

  menuToggle.addEventListener('click', function () {
    navlinks.classList.toggle('open');
  });

  document.addEventListener('click', function (e) {
    if (!navlinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navlinks.classList.remove('open');
    }
  });

  navlinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navlinks.classList.remove('open');
    });
  });

}


/* ============================================
   NAVBAR HIDE/SHOW ON SCROLL
   ============================================ */

let ultimoScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
  const scrollAttuale = window.scrollY;

  if (scrollAttuale > ultimoScroll && scrollAttuale > 80) {
    navbar.classList.add('navbar-nascosta');
  } else {
    navbar.classList.remove('navbar-nascosta');
  }

  ultimoScroll = scrollAttuale;
});


/* ============================================
   LIGHTBOX
   ============================================ */

const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const chiudi      = document.getElementById('chiudi');

function apriLightbox(img) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = img.src;
  lightbox.classList.add('attivo');
}

if (chiudi) {
  chiudi.addEventListener('click', function () {
    lightbox.classList.remove('attivo');
  });
}

if (lightbox) {
  lightbox.addEventListener('click', function (e) {
    if (e.target === this) {
      this.classList.remove('attivo');
    }
  });
}


/* ============================================
   PILL BAR — indicatore scorrevole
   ============================================ */

const pillBar  = document.getElementById('pillBar');
const indicator = document.getElementById('indicator');

function moveIndicator(btn) {
  if (!pillBar || !indicator || !btn) return;
  const barRect = pillBar.getBoundingClientRect();
  const btnRect = btn.getBoundingClientRect();
  indicator.style.left   = (btnRect.left - barRect.left) + 'px';
  indicator.style.top    = (btnRect.top  - barRect.top)  + 'px';
  indicator.style.width  = btnRect.width  + 'px';
  indicator.style.height = btnRect.height + 'px';
}

// Posiziona l'indicatore al caricamento senza animazione
window.addEventListener('load', function () {
  if (!pillBar || !indicator) return;
  const active = pillBar.querySelector('.filtro.attivo-filtro');
  if (active) {
    indicator.style.transition = 'none';
    moveIndicator(active);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        indicator.style.transition = '';
      });
    });
  }
});

// Ricalcola al resize (es. orientamento mobile)
window.addEventListener('resize', function () {
  if (!pillBar || !indicator) return;
  const active = pillBar.querySelector('.filtro.attivo-filtro');
  if (active) {
    indicator.style.transition = 'none';
    moveIndicator(active);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        indicator.style.transition = '';
      });
    });
  }
});


/* ============================================
   FILTRI (galleria foto + render)
   ============================================ */

const bottoni     = document.querySelectorAll('.filtro');
const selectCitta = document.querySelector('.select-citta');

function applicaFiltri() {
  const categoriaAttiva = document.querySelector('.filtro.attivo-filtro')?.dataset.filtro || 'all';
  const cittaAttiva     = selectCitta ? selectCitta.value : 'all';

  // Filtro foto
  const immagini = document.querySelectorAll('.image');
  immagini.forEach(function (img) {
    const okCategoria = categoriaAttiva === 'all' || img.dataset.categoria === categoriaAttiva;
    const okCitta     = cittaAttiva     === 'all' || img.dataset.citta      === cittaAttiva;
    img.classList.toggle('nascosta', !(okCategoria && okCitta));
  });

  // Filtro render
  const renders = document.querySelectorAll('.render-project');
  renders.forEach(function (render) {
    const okCategoria = categoriaAttiva === 'all' || render.dataset.categoria === categoriaAttiva;
    render.classList.toggle('nascosta', !okCategoria);
  });
}

if (bottoni.length > 0) {
  bottoni.forEach(function (bottone) {
  bottone.addEventListener('click', function () {
    bottoni.forEach(b => b.classList.remove('attivo-filtro'));
    this.classList.add('attivo-filtro');
    const btn = this;
    moveIndicator(btn);                    // indicatore parte subito
    setTimeout(() => {
      applicaFiltri();                     // foto cambiano 80ms dopo
    }, 200);
  });
});
}

if (selectCitta) {
  selectCitta.addEventListener('change', applicaFiltri);
}


/* ============================================
   FADE-OUT BORDO DESTRA filtri su mobile
   ============================================ */

const filtersRow = document.querySelector('.filters-row');
const wrapper    = document.querySelector('.filtri-wrapper');

if (filtersRow && wrapper) {
  filtersRow.addEventListener('scroll', () => {
    wrapper.classList.toggle('scrolled', filtersRow.scrollLeft > 10);
  });
}





document.addEventListener('DOMContentLoaded', () => {
  const categorie = document.querySelectorAll('.categoria');

  categorie.forEach((cat, i) => {
    setTimeout(() => {
      cat.classList.add('visible');
    }, 350 * i); // 0ms, 150ms, 300ms
  });
});