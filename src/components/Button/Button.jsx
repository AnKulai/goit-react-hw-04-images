import React from 'react';
import { CustomBtnWrapper } from './Button.styled';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

const Button = ({ loadMore, process }) => {
  
  const handleLoadMore = () => {
    loadMore();
  };

  const handleClick = throttle(handleLoadMore, 1000);

  if (process.endOfList) return null;

  return (
    <CustomBtnWrapper>
      <button onClick={handleClick}>Load More</button>
    </CustomBtnWrapper>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
  process: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    endOfList: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Button;
