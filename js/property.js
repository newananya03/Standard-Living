// ============ Property detail page ============

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const property = properties.find((p) => String(p.id) === String(id));

  const root = document.querySelector('[data-property-root]');
  if (!root) return;

  if (!property) {
    root.innerHTML = `
      <section class="not-found">
        <div>
          <h1>We couldn't find that home.</h1>
          <p>It may have been rented out or the link is incorrect.</p>
          <a href="homes.html" class="btn-primary"><svg class="icon" width="16" height="16" viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg> Back to Homes</a>
        </div>
      </section>`;
    return;
  }

  document.title = `${property.name} — Standard Living`;

  root.innerHTML = `
    <section class="section-tight container-px" style="padding-bottom:6rem;">
      <a href="homes.html" class="back-link"><svg class="icon" width="15" height="15" viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg> Back to Homes</a>

      <div class="detail-gallery">
        <div class="detail-gallery-main">
          <span class="dg-letter">${property.name[0]}</span>
          <div class="dg-inner">
            <span class="dg-circle"><svg class="icon" width="20" height="20" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></span>
            <span style="font-size:0.875rem;font-weight:500;">${property.hasPhotos ? 'Photos coming soon' : 'Not photographed yet'}</span>
          </div>
        </div>
        <div class="detail-gallery-side">
          <div><svg class="icon" width="22" height="22" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>
          <div><svg class="icon" width="22" height="22" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>
        </div>
      </div>

      <div class="detail-layout">
        <div class="detail-main">
          <span class="property-badge" style="position:static;display:inline-flex;"><svg class="icon" width="12" height="12" viewBox="0 0 24 24"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/></svg> No Brokerage</span>
          <h1>${property.name}</h1>
          <p class="loc"><svg class="icon" width="15" height="15" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> ${property.location}, Bengaluru</p>

          <div class="detail-types">${property.types.map(t => `<span>${t}</span>`).join('')}</div>

          ${property.amenities.length ? `
          <div class="detail-section">
            <h2>Amenities</h2>
            <div class="amenity-grid">
              ${property.amenities.map(a => `<div><svg class="icon" width="15" height="15" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> ${a}</div>`).join('')}
            </div>
          </div>` : ''}

          <div class="detail-section">
            <h2>About this home</h2>
            <p>A verified ${property.types.join(' / ')} home in ${property.location}, listed directly by the owner — no brokerage, no middlemen. Reach out below to schedule a visit or ask about availability.</p>
          </div>

          ${property.mapLink ? `<a href="${property.mapLink}" target="_blank" rel="noopener noreferrer" class="btn-outline">View on Google Maps <svg class="icon" width="14" height="14" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a>` : ''}
        </div>

        <div>
          <div class="detail-sidebar-card">
            <span class="price-title">Price on request</span>
            <p class="price-sub">Rent shared directly by the owner on enquiry.</p>
            <div class="detail-sidebar-actions">
              <a href="tel:+917090775757" class="btn-primary btn-justify-center"><svg class="icon" width="15" height="15" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> Call to Enquire</a>
              <a href="mailto:standardlivinghomes@gmail.com?subject=${encodeURIComponent(`Enquiry: ${property.name}, ${property.location}`)}" class="btn-outline btn-justify-center"><svg class="icon" width="15" height="15" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><polyline points="22,6 12,13 2,6"/></svg> Email Enquiry</a>
            </div>
            <p class="detail-sidebar-note">Mention "${property.name}, ${property.location}" so our team can pull up the right listing straight away.</p>
          </div>
        </div>
      </div>
    </section>`;
});
