// Hooks
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Utils
import { scrollTop } from '../utils/helper';
import url from '../utils/url';
import { toast, ToastContainer } from 'react-toastify';

const AddProduct = () => {
  const naviagte = useNavigate();
  // state
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  // Scroll TOP
  useEffect(() => {
    scrollTop();
    return () => {};
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('image', image);

    axios
      .post(`${url}/api/v1/products`, formData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        toast.success('product added');
        setTimeout(() => naviagte('/dashboard'), [1000]);
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="w-4/5 p-3">
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
      <h1 className="mb-3 font-medium text-lg">Products</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          className="px-4 py-2 rounded border-b"
          type="text"
          placeholder="product name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="px-4 py-2 rounded border-b"
          type="number"
          placeholder="price"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          className="px-4 py-2 rounded border-b"
          type="text"
          placeholder="desciption"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          className="px-4 py-2 rounded border-b"
          type="text"
          placeholder="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          className="px-4 py-2 rounded border-b"
          type="number"
          placeholder="number in stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button
          type="submit"
          className="py-2 rounded-md text-white
             bg-green-400"
        >
          Add
        </button>
      </form>
      <div>{error}</div>
    </div>
  );
};

export default AddProduct;
