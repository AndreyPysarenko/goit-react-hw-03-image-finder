import css from './ButtonLoadMore.module.css';
import PropTypes from 'prop-types'

const Button = ({ onClick }) => {
  return (
    <div className={css.ButtonContainer}>
      <button type="button" className={css.Button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Button;
