import './styles.css';
import refs from './js/refs';
import ApiService from './js/apiService';
import imageCard from './templates/imageCard.hbs';
import LoadMoreBtn from './js/components/loadMoreBtn';
import LightboxHandler from './js/lightbox';

const apiService = new ApiService();
const lightboxHandler = new LightboxHandler();
const loadMoreBtn = new LoadMoreBtn({
  selector: 'button[data-action="load-more"]',
  hidden: true,
});
const searchBtn = new LoadMoreBtn({selector: 'button[data-action="search"]'});

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
loadMoreBtn.refs.node.addEventListener('click', loadMoreBtnHandler);

function searchFormSubmitHandler(event) {
    event.preventDefault();

    const form = event.currentTarget;
    apiService.query = form.elements.query.value.trim();

    clearGallery();
    apiService.resetPage();
    fetchImages();
    form.reset();
}

function fetchImages() {
  loadMoreBtn.hide();
  searchBtn.disable();
  hideWelcomeImage();

  apiService.fetchItems()
    .then(images => {
      createImagesMarkup(images);
      loadMoreBtn.show();
      searchBtn.enable();
      refs.gallery.addEventListener('click', event => lightboxHandler.openLightbox(event));
    });
}

function loadMoreBtnHandler() {
  loadMoreBtn.disable();
  apiService.fetchItems().then(images => {
    createImagesMarkup(images);
    loadMoreBtn.enable();
    window.scrollTo({
      top: document.documentElement.offsetHeight,
      behavior: 'smooth',
    });
  });
}

function createImagesMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', imageCard(images));
}
function clearGallery() {
  refs.gallery.innerHTML = '';
}
function hideWelcomeImage() {
  refs.image.classList.add('is-hidden');
}

