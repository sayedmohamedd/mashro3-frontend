import axios from 'axios';

const deleteAPIData = async (url) => {
  await axios.delete(url, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export default deleteAPIData;
