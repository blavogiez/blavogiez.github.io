// Mobile UX enhancements: menu, arrows, swipe, lightbox tweaks
(function () {
  'use strict';

  const onReady = (fn) => {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  };

  onReady(() => {
    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-toggle');
    const navLinks = document.getElementById('mobile-menu');
    if (menuBtn && navLinks) {
      const closeMenu = () => {
        document.body.classList.remove('nav-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      };
      menuBtn.addEventListener('click', () => {
        const open = !document.body.classList.contains('nav-open');
        document.body.classList.toggle('nav-open', open);
        menuBtn.setAttribute('aria-expanded', String(open));
      });
      navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') closeMenu();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
      });
    }

    // Normalize navigation arrows with inline SVGs
    const prev = document.getElementById('prev-project');
    const next = document.getElementById('next-project');
    if (prev && prev.children.length === 0) {
      prev.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>';
    }
    if (next && next.children.length === 0) {
      next.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m10 6-1.41 1.41L13.17 12l-4.58 4.59L10 18l6-6z"/></svg>';
    }

    // Lightbox: ensure clean buttons and add touch swipe
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement)) return;
          const lb = n.matches?.('.lightbox') ? n : n.querySelector?.('.lightbox');
          if (!lb) return;

          const closeBtn = lb.querySelector('.lightbox-close');
          const prevBtn = lb.querySelector('.lightbox-prev');
          const nextBtn = lb.querySelector('.lightbox-next');
          if (closeBtn) closeBtn.textContent = '×';
          if (prevBtn) prevBtn.innerHTML = '&#8249;';
          if (nextBtn) nextBtn.innerHTML = '&#8250;';

          // Swipe in lightbox
          const content = lb.querySelector('.lightbox-content');
          if (content) {
            let sx = 0, sy = 0, trk = false;
            content.addEventListener('touchstart', (e) => {
              const t = e.changedTouches[0]; sx = t.clientX; sy = t.clientY; trk = true;
            }, { passive: true });
            content.addEventListener('touchend', (e) => {
              if (!trk) return; const t = e.changedTouches[0];
              const dx = t.clientX - sx; const dy = t.clientY - sy;
              if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
                if (dx < 0) nextBtn?.click(); else prevBtn?.click();
              }
              trk = false;
            }, { passive: true });
          }
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();

