import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CustomHeader } from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = ({ target }) => {
    const inputValue = target.value;
    setQuery(inputValue);
  };

  const handleSearchImage = event => {
    event.preventDefault();
    onSubmit(query);
  };

  return (
    <CustomHeader>
      <form>
        <button type="submit" onClick={handleSearchImage}>
          <span>Search</span>
        </button>
        <input
          type="text"
          placeholder="Search images and photos"
          name="query"
          onChange={handleInputChange}
        />
      </form>
    </CustomHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
