// ============ Renders Locations + Testimonials from data.js. ============
// [data-locations-grid]    -> full location list   (locations.html)
// [data-locations-preview] -> top 3 by listings     (index.html)
// [data-testimonials-grid] -> testimonials          (about.html)

document.addEventListener('DOMContentLoaded', () => {
  renderLocations('[data-locations-grid]', locations);
  renderLocations('[data-locations-preview]', [...locations].sort((a, b) => b.listings - a.listings).slice(0, 3));
  renderTestimonials();
  if (window.lucide) lucide.createIcons();
});

const monogramStyles = [
  'linear-gradient(to bottom right, #132C52, #081428)',
  'linear-gradient(to bottom right, rgba(140,109,63,0.8), #081428)',
  'linear-gradient(to bottom right, #0B1E3D, #081428)',
  'linear-gradient(to bottom right, #132C52, #0B1E3D)',
  'linear-gradient(to bottom right, rgba(140,109,63,0.7), #0B1E3D)',
];

function renderLocations(selector, list) {
  const grid = document.querySelector(selector);
  if (!grid) return;

  grid.innerHTML = list.map((loc, i) => `
    <a href="homes.html?q=${encodeURIComponent(loc.name)}" class="reveal location-card" style="animation-delay:${i * 80}ms">
      ${loc.image
        ? `<img class="lc-bg" src="${loc.image}" alt="${loc.name}" style="width:100%;height:100%;object-fit:cover;">`
        : `<div class="lc-bg" style="background:${monogramStyles[i % monogramStyles.length]};width:100%;height:100%;">
             <span class="lc-mono">${loc.name[0]}</span>
             <div class="lc-pin"><span><svg class="icon" width="20" height="20" viewBox="0 0 24 24" stroke="#D9C08C"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span></div>
           </div>`
      }
      <div class="lc-overlay"></div>
      <div class="lc-footer">
        <div>
          <h3>${loc.name}</h3>
          <p>${loc.city} · ${loc.listings} homes</p>
        </div>
        <span class="lc-arrow"><svg class="icon" width="16" height="16" viewBox="0 0 24 24" stroke="#fff"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></span>
      </div>
    </a>
  `).join('');

  initRevealFor(grid);
}

function renderTestimonials() {
  const grid = document.querySelector('[data-testimonials-grid]');
  if (!grid) return;

  grid.innerHTML = testimonials.map((t, i) => `
    <div class="reveal testimonial-card" style="animation-delay:${i * 100}ms">
      <svg class="icon" width="26" height="26" viewBox="0 0 24 24"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21c0 1 0 0 1 0z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
      <p class="quote">"${t.quote}"</p>
      <div class="testimonial-person">
        <div class="testimonial-avatar">${t.name.split(' ').map(n => n[0]).join('')}</div>
        <div>
          <p class="name">${t.name}</p>
          <p class="role">${t.role}</p>
        </div>
      </div>
    </div>
  `).join('');

  initRevealFor(grid);
}

// Re-observe newly injected .reveal elements (main.js's observer already ran
// on DOMContentLoaded before this content existed).
function initRevealFor(root) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
  root.querySelectorAll('.reveal:not(.in-view)').forEach((el) => io.observe(el));
}
