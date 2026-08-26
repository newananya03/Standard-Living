// ============ Homes listing page ============

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const urlQuery = params.get('q') || '';

  const input = document.querySelector('[data-homes-search]');
  if (input) input.value = urlQuery;

  renderProperties(urlQuery);

  if (input) {
    input.addEventListener('input', () => renderProperties(input.value));
  }

  if (window.lucide) lucide.createIcons();
});

function renderProperties(query) {
  const grid = document.querySelector('[data-properties-grid]');
  if (!grid) return;

  const q = (query || '').toLowerCase();
  const filtered = properties.filter((p) =>
    `${p.name} ${p.location} ${p.types.join(' ')}`.toLowerCase().includes(q)
  );

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="no-results">No homes match that search yet.</p>`;
    return;
  }

  grid.innerHTML = filtered.map((p, i) => `
    <a href="property.html?id=${p.id}" class="reveal in-view property-card" style="animation-delay:${i * 60}ms">
      <div class="property-card-media">
        <span class="pcm-letter">${p.name[0]}</span>
        <div class="pcm-inner">
          <span class="pcm-circle"><svg class="icon" width="18" height="18" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></span>
          <span class="pcm-text">${p.hasPhotos ? 'Photos coming soon' : 'Not photographed yet'}</span>
        </div>
        <span class="property-badge"><svg class="icon" width="12" height="12" viewBox="0 0 24 24"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4M10 10h4M10 14h4M10 18h4"/></svg> No Brokerage</span>
      </div>
      <div class="property-card-body">
        <h3>${p.name}</h3>
        <p class="property-card-loc"><svg class="icon" width="13" height="13" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> ${p.location}</p>
        <div class="property-types">${p.types.map(t => `<span>${t}</span>`).join('')}</div>
        ${p.amenities.length ? `<p class="property-amenities">${p.amenities.join(' · ')}</p>` : ''}
        <div class="property-card-footer">
          <span class="price">Price on request</span>
          <span class="view-details">View Details <svg class="icon" width="13" height="13" viewBox="0 0 24 24"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></span>
        </div>
      </div>
    </a>
  `).join('');

  if (window.lucide) lucide.createIcons();
}
