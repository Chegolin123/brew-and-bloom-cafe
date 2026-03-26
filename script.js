/* ============================================
   BREW & BLOOM CAFÉ — JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAVBAR: scroll effect ---- */
  const navbar = document.getElementById('navbar');

  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active nav link highlight
    highlightNavLink();
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ---- MOBILE MENU ---- */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    // Animate hamburger → X
    const spans = navToggle.querySelectorAll('span');
    navToggle.classList.toggle('active');
    if (navToggle.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  /* ---- ACTIVE NAV LINK ---- */
  const sections = document.querySelectorAll('section[id]');

  function highlightNavLink() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }

  /* ---- MENU TABS ---- */
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const menuGrids = document.querySelectorAll('.menu-grid');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      // Update buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update grids
      menuGrids.forEach(grid => {
        grid.classList.remove('active');
        if (grid.id === `tab-${target}`) {
          grid.classList.add('active');
        }
      });
    });
  });

  /* ---- SCROLL REVEAL ---- */
  const revealElements = document.querySelectorAll(
    '.feature-item, .menu-card, .testimonial-card, .gallery-item, .info-card, .about-text, .about-images, .stat'
  );

  revealElements.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ---- CONTACT FORM ---- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(() => {
        formSuccess.classList.add('show');
        contactForm.reset();
        btn.textContent = 'Send Message ✉️';
        btn.disabled = false;

        setTimeout(() => formSuccess.classList.remove('show'), 5000);
      }, 1200);
    });
  }

  /* ---- NEWSLETTER FORM ---- */
  const newsletterForm = document.getElementById('newsletterForm');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn   = newsletterForm.querySelector('button');
      const input = newsletterForm.querySelector('input');
      btn.textContent = '✓';
      btn.style.background = '#4a7c59';
      input.value = '';
      setTimeout(() => {
        btn.textContent = '→';
        btn.style.background = '';
      }, 3000);
    });
  }

  /* ---- SMOOTH SCROLL for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- GALLERY LIGHTBOX ---- */
  const galleryItems = document.querySelectorAll('.gallery-item');

  // Create lightbox elements
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-overlay"></div>
    <div class="lightbox-content">
      <button class="lightbox-close">✕</button>
      <button class="lightbox-prev">‹</button>
      <img class="lightbox-img" src="" alt="" />
      <button class="lightbox-next">›</button>
      <p class="lightbox-caption"></p>
    </div>
  `;
  document.body.appendChild(lightbox);

  // Lightbox styles (injected)
  const lbStyle = document.createElement('style');
  lbStyle.textContent = `
    .lightbox {
      position: fixed; inset: 0; z-index: 9999;
      display: flex; align-items: center; justify-content: center;
      opacity: 0; pointer-events: none;
      transition: opacity .3s ease;
    }
    .lightbox.open { opacity: 1; pointer-events: all; }
    .lightbox-overlay {
      position: absolute; inset: 0;
      background: rgba(10,4,0,.92);
    }
    .lightbox-content {
      position: relative; z-index: 1;
      display: flex; align-items: center; gap: 16px;
      max-width: 90vw; max-height: 90vh;
      flex-direction: column;
    }
    .lightbox-img {
      max-width: 80vw; max-height: 75vh;
      width: auto; height: auto;
      border-radius: 10px;
      object-fit: contain;
      box-shadow: 0 20px 60px rgba(0,0,0,.5);
    }
    .lightbox-close {
      position: absolute; top: -44px; right: 0;
      background: none; border: none;
      color: #fff; font-size: 1.6rem;
      cursor: pointer; opacity: .7;
      transition: opacity .2s;
    }
    .lightbox-close:hover { opacity: 1; }
    .lightbox-prev, .lightbox-next {
      position: fixed; top: 50%; transform: translateY(-50%);
      background: rgba(255,255,255,.12); border: none;
      color: #fff; font-size: 2.5rem;
      width: 52px; height: 52px;
      border-radius: 50%; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background .2s;
      z-index: 2;
    }
    .lightbox-prev { left: 20px; }
    .lightbox-next { right: 20px; }
    .lightbox-prev:hover, .lightbox-next:hover { background: rgba(255,255,255,.25); }
    .lightbox-caption {
      color: rgba(255,255,255,.7);
      font-size: .9rem;
      letter-spacing: .06em;
      text-transform: uppercase;
      margin-top: 8px;
    }
  `;
  document.head.appendChild(lbStyle);

  let currentIndex = 0;
  const images = Array.from(galleryItems).map(item => ({
    src:     item.querySelector('img').src,
    caption: item.querySelector('.gallery-overlay span')?.textContent || ''
  }));

  function openLightbox(index) {
    currentIndex = index;
    const lbImg     = lightbox.querySelector('.lightbox-img');
    const lbCaption = lightbox.querySelector('.lightbox-caption');
    lbImg.src       = images[index].src;
    lbCaption.textContent = images[index].caption;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + images.length) % images.length;
    openLightbox(currentIndex);
  }

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => navigate(-1));
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => navigate(1));

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   navigate(-1);
    if (e.key === 'ArrowRight')  navigate(1);
  });

  /* ---- COUNTER ANIMATION ---- */
  const statNums = document.querySelectorAll('.stat-num');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const raw = el.textContent.trim();
      const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
      const suffix = raw.replace(/[0-9.]/g, '');
      if (isNaN(num)) return;

      let start = 0;
      const duration = 1600;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * num);
        el.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => counterObserver.observe(el));

  /* ---- PARALLAX HERO (subtle) ---- */
  const hero = document.querySelector('.hero');
  window.addEventListener('scroll', () => {
    if (hero) {
      const scrolled = window.scrollY;
      hero.style.backgroundPositionY = `calc(50% + ${scrolled * 0.3}px)`;
    }
  }, { passive: true });

  /* ---- INIT ---- */
  handleScroll();
});
