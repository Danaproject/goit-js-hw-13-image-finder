const apiKey = '20473685-97e7769accc1d65c6975902f8';


export default {
  searchQuery: '',
  page: 1,
  fetchImages() {
    const url = `https://pixabay.com/api/?key=${apiKey}&image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12`
    
    return fetch(url)
        .then(response => response.ok ? response.json() : [])
        .then(({hits}) => {
          this.incrementPage();
          return hits;
        })
        .catch(error => console.log(error));
  },
  resetPage() {
    this.page = 1;
  },
  incrementPage() {
    this.page += 1;
  },
  get query() {
    return this.searchQuery;
  },
  set query(value) {
    this.searchQuery = value;
  },
};
