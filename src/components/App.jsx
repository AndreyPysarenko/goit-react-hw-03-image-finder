import { Component } from 'react';
import Notiflix from 'notiflix';
import SearchBar from './Searchbar';
import Loader from './Loader';
import Button from './Button';
import { ImageGallery } from './ImageGallery';
import { getImageBySearch, PER_PAGE } from './Api/api-search';
import css from './App.module.css';

export class App extends Component {
  state = {
    galleryImages: [],
    searchQuery: '',
    page: 1,
    isLoading: false,
    error: null,
    showLoadMore: true,
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (
      (prevState.searchQuery !== searchQuery || prevState.page !== page) &&
      searchQuery.trim() !== ''
    ) {
      this.setState({
        isLoading: true,
        error: null,
      });

      try {
        const data = await getImageBySearch(searchQuery, page);

        const images = data.hits;
        const totalPages = Math.ceil(data.totalHits / PER_PAGE);
        const hasMoreImages = page < totalPages;

        if (prevState.searchQuery !== searchQuery) {
          this.setState({
            galleryImages: images,
            showLoadMore: hasMoreImages,
          });
        } else {
          this.setState(prevState => ({
            galleryImages: [...prevState.galleryImages, ...images],
            showLoadMore: hasMoreImages,
          }));
        }

        if (images.length === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSetSearchQuery = value => {
    this.setState({ searchQuery: value, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { galleryImages, isLoading, showLoadMore } = this.state;

    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.handleSetSearchQuery} />

        {galleryImages.length > 0 && (
          <>
            <ImageGallery galleryImages={galleryImages} />
            {isLoading && <Loader />}
            {showLoadMore && <Button handleLoadMore={this.handleLoadMore} />}
          </>
        )}
      </div>
    );
  }
}
