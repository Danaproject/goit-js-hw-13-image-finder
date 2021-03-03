import refs from './refs';

const largeImageRef = document.querySelector('.lightbox__image');
const lightboxRef = document.querySelector('.js-lightbox');
const overlayRef = document.querySelector('.lightbox__overlay');

refs.gallery.addEventListener('click', onGaleryClick);

function onGaleryClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') return;
    largeImageRef.src =event.target.dataset.source;
    lightboxRef.classList.add('is-open');
    overlayRef.addEventListener('click', closeLightbox);
    window.addEventListener('keydown', onKeydown);
}

function closeLightbox() {
    lightboxRef.classList.remove('is-open');
    largeImageRef.src = "";
    overlayRef.removeEventListener('click', closeLightbox);
    window.removeEventListener('keydown', onKeydown);
}

function onKeydown(event) {
     if (event.code === "Escape") closeLightbox();
}
