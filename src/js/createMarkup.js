import refs from './refs';
import imageCard from '../templates/imageCard.hbs';

function createMarkup(images) {
    refs.gallery.insertAdjacentHTML('beforeend', imageCard(images));
}

export default createMarkup;
