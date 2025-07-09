import axios from 'axios';

const updateAPIData = async (url, data) => {
  const res = await axios.patch(url, data, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return res.data;
};

export default updateAPIData;
