import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
import css from './ImageGallery.module.css';
import { Modal } from 'components/Modal';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  state = {
    largeImageURL: null,
    showModal: false,
  };

  openModal = largeImageURL => {
    this.setState({ largeImageURL: largeImageURL, showModal: true });
  };

  closeModal = () => {
    this.setState({ largeImageURL: null, showModal: false });
  };

  render() {
    const { galleryImages } = this.props;
    const { showModal, largeImageURL } = this.state;
    return (
      <>
        <ul className={css.ImageGallery}>
          {galleryImages.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              tags={tags}
              onOpenModal={() => this.openModal(largeImageURL)}
            />
          ))}
          {showModal && (
            <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
          )}
        </ul>
      </>
    );
  }
}

ImageGallery.propTypes = {
  galleryImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
