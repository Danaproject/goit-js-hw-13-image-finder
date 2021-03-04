import './styles.css';
import refs from './js/refs';
import ApiService from './js/apiService';
import LoadMoreBtn from './js/components/loadMoreBtn';
import createImagesMarkup from './js/createImagesMarkup';
import largeImageDisplayHandler from './js/lightbox';

const apiService = new ApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: 'button[data-action="load-more"]',
  hidden: true,
});

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

