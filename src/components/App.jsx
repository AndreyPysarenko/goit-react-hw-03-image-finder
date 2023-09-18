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
    totalPage: 0,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages(prevState);
    }
  }

  fetchImages = async (prevState) => {
    try {
      // this.loaderToggle();
      this.setState({ galleryImages: null, totalPage: 0, isLoading: true, });

      const data = await getImageBySearch(
        this.state.searchQuery,
        this.state.page
      );
      
      this.setState({
        galleryImages:
          this.state.page === 1 ? data.hits : [...prevState.galleryImages, ...data.hits],
          totalPage: Math.ceil(data.totalHits / data.hits.length),
      })
    
      // if (data) {
      //   const totalPage = Math.ceil(data.totalHits / data.hits.length);
      //   // this.loaderToggle();
      //   this.setState({
      //     galleryImages: data.hits,
      //     totalPage: totalPage,
      //   });
      // }

      // this.setState(prevState => ({
      //   galleryImages: [...prevState.galleryImages, ...data.hits],
      // }));

    } catch (error) {
      this.setState({ error: true, isLoading: false });
      Notiflix.Notify.failure('Oops... Something went wrong please try again!');
      // this.loaderToggle();
    } finally {
      this.setState({ isLoading: false });
    }
  };

  // loaderToggle = () => {
  //   this.setState(({ isLoading }) => ({
  //     isLoading: !isLoading,
  //   }));
  // };

  handleSetSearchQuery = value => {
    this.setState({ searchQuery: value, page: 1 });
  };

  handleLoadMore = () => {
    // this.loaderToggle();
    this.setState(prevState => ({ page: (prevState.page += 1) }));
    // this.loaderToggle();
    // const data = await getImageBySearch(this.state.searchQuery, this.state.page);
    // this.setState(
    //             prevState => ({
    //               galleryImages: [...prevState.galleryImages, ...data.hits],
    //             }),
    //             () => this.loaderToggle()
    //           );
  };

  // handleLoadMore = async () => {
  //   try {
  //     this.loaderToggle();
  //     this.setState(
  //       prevState => ({
  //         page: (prevState.page += 1),
  //       }),
  //       async () => {
  //         const data = await getImageBySearch(
  //           this.state.searchQuery,
  //           this.state.page
  //         );

  //         this.setState(
  //           prevState => ({
  //             galleryImages: [...prevState.galleryImages, ...data.hits],
  //           }),
  //           () => this.loaderToggle()
  //         );
  //       }
  //     );
  //   } catch (error) {
  //     this.setState({ error: true });
  //     this.loaderToggle();
  //   }
  // };

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
        {totalPage > 1 && page < totalPage && galleryImages && (
          <Button handleLoadMore={this.handleLoadMore} />
        )}
      </div>
    );
  }
}
