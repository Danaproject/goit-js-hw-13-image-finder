import './styles.css';
import refs from './js/refs';
import apiService from './js/apiService';
import createMarkup from './js/createMarkup';

refs.searchForm.addEventListener('submit', event => {
    event.preventDefault();

    const form = event.currentTarget;
    apiService.query = form.elements.query.value.trim();

    refs.gallery.innerHTML = '';
    form.reset();
    apiService.resetPage();
    refs.loadMoreBtn.classList.add('is-hidden');

    refs.image.classList.add('is-hidden');
  
    if (apiService.query) { 
      apiService.fetchImages().then(images => {
        createMarkup(images);
        refs.loadMoreBtn.classList.remove('is-hidden');
      });
    }},
  );
  
refs.loadMoreBtn.addEventListener('click', () => {
    apiService.fetchImages().then(images => {
      createMarkup(images);
    });
});