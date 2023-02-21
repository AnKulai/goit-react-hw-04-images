import Button from 'components/Button/Button';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import PropTypes from 'prop-types';
import React from 'react';
import { CustomGallery } from './ImageGallery.styled';

const ImageGallery = ({ images, loadMore, process, openPopup }) => {
  if (!images.length) {
    return <h1>Sorry I`m not found results... Try again...</h1>;
  }
  return (
    <CustomGallery>
      {images.map(el => (
        <ImageGalleryItem
          key={el.id}
          openPopup={openPopup}
          webformatURL={el.webformatURL}
          largeImageURL={el.largeImageURL}
        />
      ))}
      <Button loadMore={loadMore} process={process} />
      {process.isLoading && <Loader />}
    </CustomGallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  process: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    endOfList: PropTypes.bool.isRequired,
  }).isRequired,
  loadMore: PropTypes.func.isRequired,
  openPopup: PropTypes.func.isRequired,
};

export default ImageGallery;
