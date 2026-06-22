
/* ============================================
   HAMBURGER MENU
   ============================================ */
 
const menuToggle = document.querySelector('.menu-toggle');
const navlinks   = document.querySelector('.navlinks');
 
if (menuToggle && navlinks) {
 
  menuToggle.addEventListener('click', function () {
    navlinks.classList.toggle('open');
  });
 
  // Chiude il menu cliccando fuori
  document.addEventListener('click', function (e) {
    if (!navlinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navlinks.classList.remove('open');
    }
  });
 
  // Chiude il menu dopo aver cliccato un link
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
    // Scrollando giù — nasconde la navbar
    navbar.classList.add('navbar-nascosta');
  } else {
    // Scrollando su — mostra la navbar
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
    if (okCategoria && okCitta) {
      img.classList.remove('nascosta');
    } else {
      img.classList.add('nascosta');
    }
  });

  // Filtro render
  const renders = document.querySelectorAll('.render-project');
  renders.forEach(function (render) {
    const okCategoria = categoriaAttiva === 'all' || render.dataset.categoria === categoriaAttiva;
    if (okCategoria) {
      render.classList.remove('nascosta');
    } else {
      render.classList.add('nascosta');
    }
  });
}

if (bottoni.length > 0) {
  bottoni.forEach(function (bottone) {
    bottone.addEventListener('click', function () {
      bottoni.forEach(b => b.classList.remove('attivo-filtro'));
      this.classList.add('attivo-filtro');
      applicaFiltri();
    });
  });
}

if (selectCitta) {
  selectCitta.addEventListener('change', applicaFiltri);
}





/* ============================================
   FILTRI DA MOBILE(galleria foto + render)
   ============================================ */



const filtri = document.querySelector('.filtri');
const wrapper = document.querySelector('.filtri-wrapper');
if (filtri && wrapper) {
  filtri.addEventListener('scroll', () => {
    if (filtri.scrollLeft > 10) {
      wrapper.classList.add('scrolled');
    } else {
      wrapper.classList.remove('scrolled');
    }
  });

  document.querySelectorAll('.filtro').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  });
}













