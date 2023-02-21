import React from 'react';
import { FallingLines, InfinitySpin } from 'react-loader-spinner';
import { CustomLoader, CustomLoaderMain } from './Loader.styled';
import PropTypes from 'prop-types';

const Loader = ({ mainLoader }) => {

  switch (mainLoader) {
    case true:
      return (
        <CustomLoaderMain>
          <FallingLines
            color="#4fa94d"
            width="100"
            visible={true}
            ariaLabel="falling-lines-loading"
          />
        </CustomLoaderMain>
      );
    default:
      return (
        <CustomLoader>
          <InfinitySpin width="200" color="#4fa94d" />
        </CustomLoader>
      );
  }
};

Loader.propTypes = {
  mainLoader: PropTypes.bool,
};

export default Loader;
