export default class LightboxHandler{
    constructor() {
        this.refs = this.getRefs();
    }

    getRefs() {
        const refs = {};
        refs.largeImage = document.querySelector('.lightbox__image');
        refs.lightbox = document.querySelector('.js-lightbox');
        refs.overlay = document.querySelector('.lightbox__overlay');
        return refs;
    }
    openLightbox(event) {
        event.preventDefault();
        if (event.target.nodeName !== 'IMG') return;
        this.refs.largeImage.src = event.target.dataset.source;
        this.refs.lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        this.refs.overlay.addEventListener('click', () => this.closeLightbox());
        window.addEventListener('keydown', event => this.keydownHandler(event));
    }
    closeLightbox() {
        this.refs.lightbox.classList.remove('is-open');
        document.body.style.overflow = 'visible';
        this.refs.largeImage.src = "";
        this.refs.overlay.removeEventListener('click', event => this.closeLightbox(event));
        window.removeEventListener('keydown', event => this.keydownHandler(event));
    }
    keydownHandler(event) {
         if (event.code === "Escape") this.closeLightbox(event);
    }
}


// const largeImageRef = document.querySelector('.lightbox__image');
// const lightboxRef = document.querySelector('.js-lightbox');
// const overlayRef = document.querySelector('.lightbox__overlay');

// function lightboxHandler(event) {
//     event.preventDefault();
//     if (event.target.nodeName !== 'IMG') return;
//     largeImageRef.src =event.target.dataset.source;
//     lightboxRef.classList.add('is-open');
//     document.body.style.overflow = 'hidden';
//     overlayRef.addEventListener('click', closeLightbox);
//     window.addEventListener('keydown', keydownHandler);
// }

// function closeLightbox() {
//     lightboxRef.classList.remove('is-open');
//     document.body.style.overflow = 'visible';
//     largeImageRef.src = "";
//     overlayRef.removeEventListener('click', closeLightbox);
//     window.removeEventListener('keydown', keydownHandler);
// }

// function keydownHandler(event) {
//      if (event.code === "Escape") closeLightbox();
// }
// export default lightboxHandler;