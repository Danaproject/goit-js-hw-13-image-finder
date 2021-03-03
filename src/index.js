import './styles.css';
import refs from './js/refs';
import LoadMoreBtn from './js/components/loadMoreBtn'
import apiService from './js/apiService';
import createImagesMarkup from './js/createImagesMarkup';
import largeImageDisplayHandler from './js/lightbox';

const loadMoreBtn = new LoadMoreBtn('button[data-action="load-more"]');

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
loadMoreBtn.refs.node.addEventListener('click', loadMoreBtnHandler);

function searchFormSubmitHandler(event) {
    event.preventDefault();

    const form = event.currentTarget;
    apiService.query = form.elements.query.value.trim();

    clearGallery();
    apiService.resetPage();
    fetchItems();
  
    form.reset();
}

function fetchItems() {
  loadMoreBtn.hide();
  hideWelcomeImage();

  apiService.fetchImages()
    .then(images => {
      createImagesMarkup(images);
      loadMoreBtn.show();
      refs.gallery.addEventListener('click', largeImageDisplayHandler);
    });
}

function loadMoreBtnHandler() {
  apiService.fetchImages().then(images => {
    createImagesMarkup(images);
    window.scrollTo({
      top: document.documentElement.offsetHeight,
      behavior: 'smooth',
    });
  });
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
function hideWelcomeImage() {
  refs.image.classList.add('is-hidden');
}

