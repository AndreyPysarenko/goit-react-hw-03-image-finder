import axios from 'axios';

const API_KEY = '38625005-f79611fee8f18f75e79bc18c8';
const BASE_URL = 'https://pixabay.com/api/';

export const getImageBySearch = async (query, page) => {
  const { data } = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      imageType: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page: page,
    },
  });

  return data;
};
