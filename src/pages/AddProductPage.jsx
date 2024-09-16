// Hooks
import { useEffect, useState } from 'react';

// Utils
import { Link, useNavigate } from 'react-router-dom';
import { scrollTop } from '../utils/helper';
import axios from 'axios';
import url from '../utils/url';
import { toast, ToastContainer } from 'react-toastify';

const AddProductPage = () => {
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
        console.log(res?.data);
        setTimeout(() => naviagte('/dashboard'), [1000]);
      })
      .catch((err) => setError(err.message));
  };

  return (
    <section className="my-8">
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
      <h1 className="text-center my-3 text-lg font-medium text-slate-900">
        Admin Dashbaord
      </h1>
      <div className="container mx-auto p-5 shadow-md flex gap-8 bg-white rounded-md">
        <div className="w-[18%] p-3 text-white font-medium text-lg rounded-tl-md rounded-bl-md bg-[#131921]">
          <ul className="flex flex-col gap-5 p-3 h-full">
            <li>
              <Link to="/dashboard">Products</Link>
            </li>
            <li>
              <Link to="/dashboard/addProduct">Add Product</Link>
            </li>
          </ul>
        </div>
        <div className="w-4/5 p-3">
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
      </div>
    </section>
  );
};

export default AddProductPage;
