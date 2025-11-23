// Lightweight lightbox and gallery carousel for images marked with data-lightbox attributes.
const CLASS_HIDDEN = 'dc-lightbox-hidden';

const template = () => {
  const overlay = document.createElement('div');
  overlay.className = `dc-lightbox ${CLASS_HIDDEN}`;
  overlay.innerHTML = `
    <div class="dc-lightbox__backdrop"></div>
    <figure class="dc-lightbox__frame">
      <button class="dc-lightbox__close" aria-label="Close lightbox">&times;</button>
      <img class="dc-lightbox__image" alt="" />
      <figcaption class="dc-lightbox__caption"></figcaption>
      <div class="dc-lightbox__controls">
        <button class="dc-lightbox__prev" aria-label="Previous image">&#8249;</button>
        <button class="dc-lightbox__next" aria-label="Next image">&#8250;</button>
      </div>
    </figure>
  `;
  return overlay;
};

export default function setupLightbox() {
  if (typeof window === 'undefined') return;
  const overlay = template();
  document.body.append(overlay);

  const backdrop = overlay.querySelector('.dc-lightbox__backdrop') as HTMLElement;
  const imgEl = overlay.querySelector('.dc-lightbox__image') as HTMLImageElement;
  const captionEl = overlay.querySelector('.dc-lightbox__caption') as HTMLElement;
  const closeBtn = overlay.querySelector('.dc-lightbox__close') as HTMLElement;
  const prevBtn = overlay.querySelector('.dc-lightbox__prev') as HTMLElement;
  const nextBtn = overlay.querySelector('.dc-lightbox__next') as HTMLElement;

  let currentGroup: HTMLElement[] = [];
  let currentIndex = 0;

  const update = () => {
    const target = currentGroup[currentIndex];
    if (!target) return;
    const src = target.getAttribute('data-full') || target.getAttribute('src') || '';
    imgEl.src = src;
    imgEl.alt = target.getAttribute('alt') || '';
    captionEl.textContent = target.closest('figure')?.querySelector('figcaption')?.textContent || '';
    prevBtn.style.display = currentGroup.length > 1 ? 'block' : 'none';
    nextBtn.style.display = currentGroup.length > 1 ? 'block' : 'none';
  };

  const open = (target: HTMLElement) => {
    const gallery = target.getAttribute('data-gallery');
    currentGroup = gallery
      ? Array.from(document.querySelectorAll(`[data-lightbox="image"][data-gallery="${gallery}"]`)) as HTMLElement[]
      : [target];
    currentIndex = currentGroup.indexOf(target);
    overlay.classList.remove(CLASS_HIDDEN);
    document.body.style.overflow = 'hidden';
    update();
  };

  const close = () => {
    overlay.classList.add(CLASS_HIDDEN);
    document.body.style.overflow = '';
  };

  const showNext = () => {
    if (currentGroup.length < 2) return;
    currentIndex = (currentIndex + 1) % currentGroup.length;
    update();
  };

  const showPrev = () => {
    if (currentGroup.length < 2) return;
    currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length;
    update();
  };

  const bind = () => {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const lightboxTarget = target?.closest('[data-lightbox="image"]') as HTMLElement | null;
      if (lightboxTarget) {
        event.preventDefault();
        open(lightboxTarget);
      }
    });
  };

  bind();

  [closeBtn, backdrop].forEach((el) => el.addEventListener('click', close));
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  document.addEventListener('keydown', (event) => {
    if (overlay.classList.contains(CLASS_HIDDEN)) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowRight') showNext();
    if (event.key === 'ArrowLeft') showPrev();
  });
}
