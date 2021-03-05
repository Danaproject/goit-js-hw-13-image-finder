import refs from './refs';
import imageCard from '../templates/imageCard.hbs';

function createImagesMarkup(images) {
    refs.gallery.insertAdjacentHTML('beforeend', imageCard(images));
}

export default createImagesMarkup;
