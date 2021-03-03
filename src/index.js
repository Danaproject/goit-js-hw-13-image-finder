import './styles.css';
import refs from './js/refs';
// import loadMoreBtn from './js/components/loadMoreBtn'
import apiService from './js/apiService';
import createImagesMarkup from './js/createImagesMarkup';

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

function fetchItems() {
  loadMoreButton.hide();
  hideWelcomeImage();

  apiService.fetchImages()
    .then(images => {
      createImagesMarkup(images);
      loadMoreButton.show();
    });
}

function searchFormSubmitHandler(event) {
    event.preventDefault();

    const form = event.currentTarget;
    apiService.query = form.elements.query.value.trim();

    clearGallery();
    apiService.resetPage();
    fetchItems();
    form.reset();
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

const loadMoreButton = {
  show() {
    refs.loadMoreBtn.classList.remove('is-hidden');
  },
  hide() {
    refs.loadMoreBtn.classList.add('is-hidden');
  },
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
function hideWelcomeImage() {
  refs.image.classList.add('is-hidden');
}

