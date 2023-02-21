import axios from 'axios';
import config from 'configuration/config';

let lastQuery = '';

const requestImages = async (query, page = 1) => {
  try {
    lastQuery = query ?? lastQuery;
    // const { data } = await axios.get(`${config.BASE_URL}`, {
    const { data } = await axios.get(`https://pixabay.com/api/`, {
      params: {
        // key: config.API_KEY,
        key: `32974638-4592caedf5e0332eeb1bc81de`,
        q: lastQuery,
        image_type: `photo`,
        orientation: `horizontal`,
        safesearch: true,
        per_page: config.PER_PAGE,
        page: page,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default requestImages;
