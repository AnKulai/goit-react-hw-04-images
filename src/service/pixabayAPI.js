import axios from 'axios';
import config from 'configuration/config';

let lastQuery = '';

const requestImages = async (query, page = 1) => {
  try {
    lastQuery = query ?? lastQuery;
    const { data } = await axios.get(`${config.BASE_URL}`, {
      params: {
        key: config.API_KEY,
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
