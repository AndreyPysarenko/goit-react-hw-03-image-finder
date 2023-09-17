import { Component } from 'react';
import Notiflix from 'notiflix';

import SearchBar from './Searchbar';
import Loader from './Loader';
import Button from './Button';

import css from './App.module.css';
import { ImageGallery } from './ImageGallery';
import { getImageBySearch } from './Api/api-search';

export class App extends Component {
  state = {
    galleryImages: null,
    searchQuery: '',
    page: 1,
    isLoading: false,
    error: false,
    totalPage: 1,
  };

  componentDidUpdate(_, prevState) {
    prevState.searchQuery !== this.state.searchQuery && this.fetchImages();
  }

  fetchImages = async () => {
    try {
      this.loaderToggle();
      this.setState(
        { galleryImages: null, totalPage: 1, page: 1 },
        async () => {
          const data = await getImageBySearch(
            this.state.searchQuery,
            this.state.page,
            this.loaderToggle
          );

          if (data) {
            const totalPage = Math.ceil(data.totalHits / data.hits.length);

            this.loaderToggle();
            this.setState({
              galleryImages: data.hits,
              totalPage: totalPage,
            });
          }
        }
      );
    } catch (error) {
      this.setState({ error: true });
      Notiflix.Notify.failure('Oops... Something went wrong please try again!');
      this.loaderToggle();
    }
  };

  loaderToggle = () => {
    this.setState(({ isLoading }) => ({
      isLoading: !isLoading,
    }));
  };

  handleSetSearchQuery = value => {
    if (value === '') {
      this.setState({
        error: true,
        page: 1,
        totalPage: 1,
        galleryImages: null,
      });
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      this.setState({ searchQuery: value, error: false });
    }
  };

  handleLoadMore = async () => {
    try {
      this.loaderToggle();
      this.setState(
        prevState => ({
          page: (prevState.page += 1),
        }),
        async () => {
          const data = await getImageBySearch(
            this.state.searchQuery,
            this.state.page
          );

          this.setState(
            prevState => ({
              galleryImages: [...prevState.galleryImages, ...data.hits],
            }),
            () => this.loaderToggle()
          );
        }
      );
    } catch (error) {
      this.setState({ error: true });
      this.loaderToggle();
    }
  };

  render() {
    const { galleryImages, searchQuery, isLoading, totalPage, page } =
      this.state;

    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.handleSetSearchQuery} />
        {galleryImages && searchQuery && (
          <ImageGallery galleryImages={galleryImages} />
        )}
        {isLoading && <Loader />}
        {totalPage > page && galleryImages && (
          <Button onClick={this.handleLoadMore} />
        )}
      </div>
    );
  }
}
