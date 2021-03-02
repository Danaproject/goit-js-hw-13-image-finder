import './styles.css';
import refs from './js/refs';
import apiService from './js/apiService';
// import imageCard from './templates/imageCard.hbs';
import createMarkup from './js/createMarkup';

let searchQuery = '';
let page = 1; 

refs.searchForm.addEventListener('submit', event => {
    event.preventDefault();

    const form = event.currentTarget;
    searchQuery = form.elements.query.value.trim();
    refs.gallery.innerHTML = '';
    form.reset();
    refs.loadMoreBtn.classList.add('is-hidden');
    page = 1;
    refs.image.classList.add('is-hidden');
  
    if (searchQuery) { 
      fetchImages(searchQuery, page).then(images => {
        createMarkup(images);
        page += 1;
        refs.loadMoreBtn.classList.remove('is-hidden');
      });
    }},
  );

  function fetchImages(searchQuery, page=1) { 
    const apiKey = '20473685-97e7769accc1d65c6975902f8';
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=${apiKey}`

    return fetch(url)
        .then(response => response.ok ? response.json() : [])
        .then(({hits}) => hits)
        .catch(error => console.log(error));
}
  
refs.loadMoreBtn.addEventListener('click', () => {
    fetchImages(searchQuery, page).then(images => {
      createMarkup(images);
      page += 1;
    });
});

// function createMarkup(images) {
//       refs.gallery.insertAdjacentHTML('beforeend', imageCard(images));
//     }
