/* ============================================================
   script.js  —  Ain Shuhada's Website
   ============================================================ */

/* ── Background Audio ── */
const audio   = document.getElementById('bgAudio');
const muteBtn = document.getElementById('muteBtn');

// Browsers block autoplay until first user interaction
document.addEventListener('click', function startAudio() {
  if (audio && audio.paused) {
    audio.play().catch(() => {});
  }
  document.removeEventListener('click', startAudio);
}, { once: true });

function toggleMute() {
  if (!audio) return;
  audio.muted = !audio.muted;
  muteBtn.textContent = audio.muted ? '🔇' : '🔊';
  muteBtn.title = audio.muted ? 'Unmute' : 'Mute';
}

/* ── Dropdown: toggle on button click (works on touch too) ── */
function toggleDropdown() {
  const dd = document.getElementById('mainDropdown');
  if (dd) dd.classList.toggle('open');
}

/* ── Footer: copyright year & last updated ── */
(function() {
  const yearEl = document.getElementById('copy-year');
  const updatedEl = document.getElementById('last-updated');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (updatedEl) {
    const d = new Date(document.lastModified);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    updatedEl.textContent = d.toLocaleDateString('en-GB', options);
  }
})();

// Close dropdown when clicking anywhere outside it
document.addEventListener('click', function(e) {
  const dd = document.getElementById('mainDropdown');
  if (dd && !dd.contains(e.target)) {
    dd.classList.remove('open');
  }
});

/* ── Last Updated Date ── */
// Shows today's date as the "last updated" value in the footer.
// To set a fixed date instead, replace `new Date()` with e.g. new Date('2025-06-06')
window.addEventListener('DOMContentLoaded', function () {
  const el = document.getElementById('lastUpdated');
  if (el) {
    const d = new Date();
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    el.textContent = d.toLocaleDateString('en-GB', options);
  }
});

// LOADING SCREEN
window.addEventListener('DOMContentLoaded', function () {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;
  setTimeout(function () {
    screen.classList.add('fade-out');
    setTimeout(function () { screen.style.display = 'none'; }, 800);
  }, 2200);
});

// TYPING ANIMATION
window.addEventListener('DOMContentLoaded', function () {
  const target = document.getElementById('typed-text');
  if (!target) return;
  const text = "Welcome, ";
  let i = 0;
  setTimeout(function () {
    const interval = setInterval(function () {
      target.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 100);
  }, 2600);
});

// CURSOR SPARKLE
(function () {
  const colours = ['#FFEDAB', '#EA8871', '#4F6815', '#75070C', '#fff0c0'];
  const shapes  = ['✦', '✿', '·', '❀', '⋆', '✺'];
  document.addEventListener('mousemove', function (e) {
    const sparkle = document.createElement('span');
    sparkle.classList.add('sparkle');
    sparkle.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    sparkle.style.left   = e.pageX + 'px';
    sparkle.style.top    = e.pageY + 'px';
    sparkle.style.color  = colours[Math.floor(Math.random() * colours.length)];
    sparkle.style.fontSize = (Math.random() * 10 + 10) + 'px';
    document.body.appendChild(sparkle);
    setTimeout(function () { sparkle.remove(); }, 800);
  });
})();

// QUOTE CAROUSEL
(function () {
  const quotes = [
    "To being perfectly imperfect; to live life between the pages.",
    "It only has to make sense to you; after all we are here only once.",
    "The beauty you see in anything is a reflection of the beauty in you.✨",
    "Look at you comforting others with the words you wish to hear."
  ];

  let current = 0;
  const textEl = document.getElementById('quote-text');
  const dots   = document.querySelectorAll('.qdot');

  if (!textEl) return;

  function showQuote(index) {
    // Fade out
    textEl.style.opacity = '0';
    setTimeout(function () {
      textEl.textContent = quotes[index];
      // Fade in
      textEl.style.opacity = '1';
    }, 400);

    // Update dots
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === index);
    });
  }

  // Auto-rotate every 4 seconds
  setInterval(function () {
    current = (current + 1) % quotes.length;
    showQuote(current);
  }, 4000);
})();


/* ── Fav Song Player ── */
document.addEventListener('DOMContentLoaded', function () {
  const song       = document.getElementById('favSong');
  const playBtn    = document.getElementById('playPauseBtn');
  const progressEl = document.getElementById('am-progress');

  if (!song) return;

  window.togglePlay = function () {
    if (song.paused) {
      song.play();
      playBtn.textContent = '⏸';
    } else {
      song.pause();
      playBtn.textContent = '▶';
    }
  };

  window.skipBack = function () {
    song.currentTime = Math.max(0, song.currentTime - 10);
  };

  window.skipForward = function () {
    song.currentTime = Math.min(song.duration || 0, song.currentTime + 10);
  };

  window.seekSong = function (val) {
    if (song.duration) song.currentTime = (val / 100) * song.duration;
  };

  song.addEventListener('timeupdate', function () {
    if (song.duration) {
      progressEl.value = (song.currentTime / song.duration) * 100;
    }
  });

  song.addEventListener('ended', function () {
    playBtn.textContent = '▶';
    progressEl.value = 0;
  });
});

/* ── Photo Sliders ── */
document.addEventListener('DOMContentLoaded', function () {
  const sliders = {
    family: { current: 0 },
    mypic:  { current: 0 }
  };

  window.moveSlide = function (id, dir) {
    const wrap   = document.getElementById(id + '-slider');
    const slides = wrap.querySelectorAll('.slide');
    const dots   = document.querySelectorAll('#' + id + '-dots .sdot');
    const state  = sliders[id];

    slides[state.current].classList.remove('active');
    dots[state.current].classList.remove('active');

    state.current = (state.current + dir + slides.length) % slides.length;

    slides[state.current].classList.add('active');
    dots[state.current].classList.add('active');
  };

  // Auto-slideshow every 3.5 seconds
  setInterval(function () { window.moveSlide('family', 1); }, 3500);
  setInterval(function () { window.moveSlide('mypic',  1); }, 4000);
});

/* ── Lightbox ── */
window.openLightbox = function(src, caption) {
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox-caption').textContent = caption;
  document.getElementById('lightbox').classList.add('active');
};

window.closeLightbox = function() {
  document.getElementById('lightbox').classList.remove('active');
  document.getElementById('lightbox-img').src = '';
};

/* ── Album Slider ── */
document.addEventListener('DOMContentLoaded', function () {
  let current = 0;
  const slides = document.querySelectorAll('.album-slide');
  const dots   = document.querySelectorAll('.aldot');

  window.moveAlbum = function(dir) {
    if (!slides.length) return;
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (current + dir + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  };
});

/* Craft Sliders */
const craftState = { lego: 0 };
document.addEventListener('DOMContentLoaded', function () {
  window.moveCraft = function(id, dir) {
    const wrap   = document.getElementById(id + 'Slider');
    if (!wrap) return;
    const slides = wrap.querySelectorAll('.craft-slide');
    const dots   = document.querySelectorAll('#' + id + '-dots .crdot');
    slides[craftState[id]].classList.remove('active');
    dots[craftState[id]].classList.remove('active');
    craftState[id] = (craftState[id] + dir + slides.length) % slides.length;
    slides[craftState[id]].classList.add('active');
    dots[craftState[id]].classList.add('active');
  };
});

/* ── Album Song Player ── */
let currentAlbumAudio = null;
let currentAlbumSrc = null;

window.playAlbumSong = function(src) {
  // Same song clicked
  if (currentAlbumSrc === src) {
    if (currentAlbumAudio.paused) {
      currentAlbumAudio.play();
    } else {
      currentAlbumAudio.pause();
    }
    return;
  }
  // Different song clicked
  if (currentAlbumAudio) {
    currentAlbumAudio.pause();
    currentAlbumAudio.currentTime = 0;
  }
  currentAlbumAudio = new Audio(src);
  currentAlbumSrc = src;
  currentAlbumAudio.play();
};

/* ── Back to Top Button ── */
window.addEventListener('scroll', function () {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  if (window.scrollY > 300) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
});

function openLightbox(src, caption) {
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox-caption').textContent = caption;
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden'; // prevent background scroll
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

// Close with Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});