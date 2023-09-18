import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import css from './Searchbar.module.css';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types'

class SearchBar extends Component {
  state = { value: '' };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.value.trim() === '') {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    this.props.onSubmit(this.state.value.trim());
    this.setState({ value: '' });
  };

  render() {
    return (
      <header className={css.SearchBar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>
              <ImSearch size="20" />
            </span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.value}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  handleSubmit: PropTypes.func,
}

export default SearchBar;
