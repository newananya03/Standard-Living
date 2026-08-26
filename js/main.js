// ============ Shared site behaviour (runs on every page) ============

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initReveal();
  initSearchForms();
  initFooterYear();
  initContactForm();
  if (window.lucide) lucide.createIcons();
});

// ---------- Header: solid background on scroll / menu open, mobile menu ----------
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const menuBtn = document.querySelector('[data-menu-toggle]');
  const searchBtn = document.querySelector('[data-search-toggle]');
  const menuPanel = document.querySelector('.mobile-menu-panel');
  const searchPanel = document.querySelector('.mobile-search-panel');
  const logo = document.querySelector('[data-header-logo]');

  let open = false;
  let searchOpen = false;

  function updateSolid() {
    const solid = window.scrollY > 40 || open || searchOpen;
    header.classList.toggle('solid', solid);
    if (logo) logo.src = solid ? 'images/logo-navy-mark.png' : 'images/logo-white-mark.png';
    const menuIcon = menuBtn ? menuBtn.querySelector('svg, i') : null;
  }

  window.addEventListener('scroll', updateSolid);

  if (menuBtn && menuPanel) {
    menuBtn.addEventListener('click', () => {
      open = !open;
      menuPanel.classList.toggle('open', open);
      menuBtn.innerHTML = open
        ? '<svg class="icon" width="26" height="26" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
        : '<svg class="icon" width="26" height="26" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
      updateSolid();
    });
  }

  if (searchBtn && searchPanel) {
    searchBtn.addEventListener('click', () => {
      searchOpen = !searchOpen;
      searchPanel.classList.toggle('open', searchOpen);
      if (searchOpen) searchPanel.querySelector('input')?.focus();
      updateSolid();
    });
  }

  updateSolid();
}

// ---------- Reveal-on-scroll ----------
function initReveal() {
  const revealed = new WeakSet();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealed.add(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });

  document.querySelectorAll('.reveal:not(.in-view)').forEach((el) => {
    if (!revealed.has(el)) io.observe(el);
  });
}

// ---------- Search forms (header + hero + mobile) redirect to homes.html?q= ----------
function initSearchForms() {
  document.querySelectorAll('[data-search-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="text"]');
      const q = input ? input.value.trim() : '';
      window.location.href = 'homes.html' + (q ? `?q=${encodeURIComponent(q)}` : '');
    });
  });
}

// ---------- Footer year ----------
function initFooterYear() {
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

// ---------- Contact quick-enquiry form (opens mail client, same as original) ----------
function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value;
    const phone = form.querySelector('[name="phone"]').value;
    const message = form.querySelector('[name="message"]').value;
    const subject = encodeURIComponent(`Enquiry from ${name || 'the website'}`);
    const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\n\n${message}`);
    window.location.href = `mailto:standardlivinghomes@gmail.com?subject=${subject}&body=${body}`;
  });
}

// ---------- Helper: build the drawn-line SVG motif ----------
function lineMotifSVG(flip) {
  return `<svg class="line-motif${flip ? ' flip' : ''}" viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true" style="${flip ? 'transform:scaleY(-1)' : ''}">
    <path d="M0 60 C 150 60, 180 10, 260 10 C 340 10, 370 55, 450 55 C 530 55, 560 15, 640 15 C 720 15, 750 60, 830 60 C 910 60, 940 20, 1020 20 C 1080 20, 1120 40, 1200 40"
      fill="none" stroke="#0B1E3D" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`;
}
