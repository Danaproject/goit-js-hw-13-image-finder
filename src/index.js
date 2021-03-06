import './styles.css';
import refs from './js/refs';
import ApiService from './js/apiService';
import createImagesMarkup from './js/createImagesMarkup';
import LoadMoreBtn from './js/components/loadMoreBtn';
import LightboxHandler from './js/lightbox';
import WelcomeImage from './js/components/welcomeImage';
import notify from './js/notify';

const apiService = new ApiService();
const lightboxHandler = new LightboxHandler();
const loadMoreBtn = new LoadMoreBtn({
  selector: 'button[data-action="load-more"]',
  hidden: true,
});
const searchBtn = new LoadMoreBtn({selector: 'button[data-action="search"]'});
const welcomeImage = new WelcomeImage({selector: '.wonderful'});

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
  welcomeImage.hide();

  apiService.fetchItems()
    .then(images => {
      createImagesMarkup(images);
      loadMoreBtn.show();
      searchBtn.enable();
      refs.gallery.addEventListener('click', event => lightboxHandler.openLightbox(event));
      if (refs.gallery.innerHTML === '') {
        loadMoreBtn.hide();
        welcomeImage.show();
        notify();
      }
    });
}

function loadMoreBtnHandler() {
  loadMoreBtn.disable();
  apiService.fetchItems().then(images => {
    const scrollHeight = refs.gallery.offsetHeight + refs.gallery.offsetTop;
    createImagesMarkup(images);
    loadMoreBtn.enable();
    window.scrollBy({
      top: scrollHeight,
      behavior: 'smooth',
    });
  });
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

