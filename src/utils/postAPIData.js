import axios from 'axios';

const postAPIData = async (url, data) => {
  const res = await axios.gpostet(url, data, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return res.data;
};

export default postAPIData;
