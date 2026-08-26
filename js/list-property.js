// ============ List Property page ============

document.addEventListener('DOMContentLoaded', () => {
  initChips('[data-unit-types] .chip');
  initChips('[data-amenities] .chip');
  initUploader('[data-uploader-photos]', 'image');
  initUploader('[data-uploader-video]', 'video');
  initFormSubmit();
});

function initChips(selector) {
  document.querySelectorAll(selector).forEach((chip) => {
    chip.addEventListener('click', () => chip.classList.toggle('active'));
  });
}

function initUploader(rootSelector, type) {
  const root = document.querySelector(rootSelector);
  if (!root) return;
  const drop = root.querySelector('.uploader-drop');
  const input = root.querySelector('input[type="file"]');
  const previews = root.querySelector('.uploader-previews');

  const handleFiles = (fileList) => {
    Array.from(fileList).forEach((file) => {
      const url = URL.createObjectURL(file);
      const cell = document.createElement('div');
      cell.className = 'uploader-preview';
      cell.innerHTML = type === 'video'
        ? `<video src="${url}" muted></video>`
        : `<img src="${url}" alt="${file.name}">`;
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.innerHTML = '<svg class="icon" width="13" height="13" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
      removeBtn.addEventListener('click', () => cell.remove());
      cell.appendChild(removeBtn);
      previews.appendChild(cell);
    });
  };

  drop.addEventListener('click', () => input.click());
  drop.addEventListener('dragover', (e) => e.preventDefault());
  drop.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  });
  input.addEventListener('change', (e) => {
    if (e.target.files?.length) handleFiles(e.target.files);
  });
}

function initFormSubmit() {
  const form = document.querySelector('[data-list-property-form]');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // No backend wired up yet — this is where you'd POST the form fields,
    // selected unit types / amenities, and uploaded files to your API.
    const data = Object.fromEntries(new FormData(form).entries());
    const unitTypes = Array.from(document.querySelectorAll('[data-unit-types] .chip.active')).map(c => c.textContent.trim());
    const amenities = Array.from(document.querySelectorAll('[data-amenities] .chip.active')).map(c => c.textContent.trim());
    console.log({ ...data, unitTypes, amenities });

    document.querySelector('[data-list-property-form-wrap]').classList.add('hidden');
    document.querySelector('[data-list-property-success]').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const listAnotherBtn = document.querySelector('[data-list-another]');
  if (listAnotherBtn) {
    listAnotherBtn.addEventListener('click', () => {
      form.reset();
      document.querySelectorAll('.chip.active').forEach(c => c.classList.remove('active'));
      document.querySelectorAll('.uploader-previews').forEach(p => p.innerHTML = '');
      document.querySelector('[data-list-property-success]').classList.add('hidden');
      document.querySelector('[data-list-property-form-wrap]').classList.remove('hidden');
    });
  }
}
