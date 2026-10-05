/* ==========================================================
   Bytescreen — script.js
   Content lives in index.html and styling in styles.css.
   This file only handles behaviour.
   ========================================================== */

(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Mobile navigation ---------- */
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.getElementById('site-nav');

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  }

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    // Close after choosing a link
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
    // Close with Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Nav dropdowns (Products) ---------- */
  const dropdowns = document.querySelectorAll('[data-dropdown]');

  function setDropdown(dropdown, open) {
    const button = dropdown.querySelector('[data-dropdown-toggle]');
    button.setAttribute('aria-expanded', String(open));
    dropdown.classList.toggle('is-open', open);
  }

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector('[data-dropdown-toggle]');
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      dropdowns.forEach((other) => { if (other !== dropdown) setDropdown(other, false); });
      setDropdown(dropdown, open);
    });
    // Close when keyboard focus moves out of the dropdown
    dropdown.addEventListener('focusout', (e) => {
      if (!dropdown.contains(e.relatedTarget)) setDropdown(dropdown, false);
    });
  });

  // Close on outside click or Escape
  document.addEventListener('click', (e) => {
    dropdowns.forEach((dropdown) => { if (!dropdown.contains(e.target)) setDropdown(dropdown, false); });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    dropdowns.forEach((dropdown) => {
      if (dropdown.classList.contains('is-open')) {
        setDropdown(dropdown, false);
        const button = dropdown.querySelector('[data-dropdown-toggle]');
        if (button.offsetParent) button.focus(); // skip if the mobile menu just closed around it
      }
    });
  });

  /* ---------- Header background + mobile demo button on scroll ---------- */
  const header = document.querySelector('[data-header]');
  const mobileDemo = document.querySelector('.mobile-demo');
  const hero = document.querySelector('.hero');
  const cta = document.querySelector('.cta');

  function onScroll() {
    const y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 40);

    if (mobileDemo && hero) {
      const pastHero = y > hero.offsetHeight * 0.8;
      const atCta = cta ? cta.getBoundingClientRect().top < window.innerHeight : false;
      mobileDemo.classList.toggle('is-visible', pastHero && !atCta);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Hero: status lights switch on once the page is ready ---------- */
  window.requestAnimationFrame(() => {
    setTimeout(() => document.body.classList.add('is-ready'), reduceMotion.matches ? 0 : 400);
  });

  /* ---------- Demo video: respect reduced motion, pause when off-screen ---------- */
  const video = document.querySelector('[data-demo-video]');
  if (video) {
    if (reduceMotion.matches) {
      video.removeAttribute('autoplay');
      video.pause();
    } else if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const p = video.play();
            if (p && p.catch) p.catch(() => {});
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.25 });
      io.observe(video);
    }
  }

  /* ---------- Client logos: fall back to the name if an image fails ---------- */
  document.querySelectorAll('.client-logo img').forEach((img) => {
    const fallback = () => {
      const li = img.closest('.client-logo');
      if (!li) return;
      const span = document.createElement('span');
      span.textContent = li.dataset.name || img.alt;
      img.replaceWith(span);
    };
    if (img.complete && img.naturalWidth === 0) fallback();
    else img.addEventListener('error', fallback, { once: true });
  });

  /* ---------- Footer year ---------- */
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
