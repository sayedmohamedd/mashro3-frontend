import axios from 'axios';

const fetchAPIData = async (url) => {
  const res = await axios.get(url, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return res.data;
};

export default fetchAPIData;
