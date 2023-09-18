import css from './ButtonLoadMore.module.css';
import PropTypes from 'prop-types'

const Button = ({ handleLoadMore }) => {
  return (
    <div className={css.ButtonContainer}>
      <button type="button" className={css.Button} onClick={handleLoadMore}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
}

export default Button;
