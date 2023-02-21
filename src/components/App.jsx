import { useEffect, useState } from 'react';
import requestImages from 'service/pixabayAPI';
import config from './../configuration/config';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import Section from './Section/Section';

const App = () => {
  const [popup, setPopup] = useState({ open: false, imageUrl: null });
  const [imageList, setImageList] = useState(null);
  const [request, setRequest] = useState({
    page: 1,
    query: null,
  });
  const [err, setErr] = useState(null);
  const [process, setProcess] = useState({
    isLoading: false,
    endOfList: false,
  });

  // Set query for request

  const changeSearchQuery = query => {
    setRequest({ page: 1, query: query });
  };

  // Pagination

  const incrementPage = () => {
    setRequest(prevState => {
      return { ...prevState, page: ++prevState.page };
    });
  };

  // Update images list

  const putImageList = images => {
    if (request.page !== 1)
      return setImageList(prevState => {
        return [...prevState, ...images];
      });
    return setImageList(images);
  };

  // Toggle loading status

  const toggleLoading = () => {
    setProcess(prevState => {
      return { ...prevState, isLoading: !prevState.isLoading };
    });
  };

  // Determine if an image still exists in the database

  const checkEndPage = totalHits => {
    const countOfPages = totalHits / config.PER_PAGE;
    const result = countOfPages < request.page;
    setProcess(prevState => {
      return { ...prevState, endOfList: result };
    });
  };

  // fetchImages && fetchMoreImages && fetchSearchImages in one function

  const universalPixabayFetch = async () => {
    try {
      toggleLoading();
      const { hits: images, totalHits: totalImages } = await requestImages(
        request.query,
        request.page
      );
      putImageList(images);
      checkEndPage(totalImages);
    } catch (error) {
      setErr(error.message);
      return err;
    } finally {
      toggleLoading();
    }
  };

  // Popup controller (open / close)

  const handleOpenPopup = url => {
    setPopup({ imageUrl: url, open: true });
  };

  const handleClosePopup = event => {
    if (event.keyCode === 27) {
      setPopup(prevState => {
        return { ...prevState, open: false };
      });
    }

    if (event.type === `click` && event.target.tagName !== `IMG`) {
      setPopup(prevState => {
        return { ...prevState, open: false };
      });
    }
  };

  // First load page and initial default request

  useEffect(() => {
    universalPixabayFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Toggle popup

  useEffect(() => {
    if (popup.open === false) return;
    document.addEventListener('keydown', handleClosePopup);
    document.addEventListener('click', handleClosePopup);

    return () => {
      document.removeEventListener('keydown', handleClosePopup);
      document.removeEventListener('click', handleClosePopup);
    };
  }, [popup.open]);

  // Search request by query

  useEffect(() => {
    if (request.query === null) return;
    universalPixabayFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request.query]);

  // Pagination requests

  useEffect(() => {
    if (request.page === 1) return;
    universalPixabayFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request.page]);

  return (
    <>
      <Searchbar onSubmit={changeSearchQuery} />
      <Section>
        {imageList != null ? (
          <ImageGallery
            images={imageList}
            loadMore={incrementPage}
            openPopup={handleOpenPopup}
            process={process}
          />
        ) : (
          <Loader mainLoader />
        )}
      </Section>
      {popup.open && <Modal url={popup.imageUrl} />}
    </>
  );
};

export default App;
