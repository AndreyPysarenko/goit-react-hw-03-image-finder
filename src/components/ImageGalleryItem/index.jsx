import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types'

const ImageGalleryItem = ({ webformatURL, tags, onOpenModal }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={css.ImageGalleryItemImage}
        onClick={() => onOpenModal()}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {  
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
