import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllProducts } from '../redux/features/productReducer';
import { scrollTop } from '../utils/helper';
import { ToastContainer } from 'react-toastify';
import AddProduct from '../components/AddProduct';
import { TailSpin } from 'react-loader-spinner';

const Dashbaord = () => {
  const { products, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [route, setRoute] = useState('products');

  // Fetch All Products
  useEffect(() => {
    dispatch(fetchAllProducts({ page: 1, category: '', sort: '-created_at' }));
    return () => {};
  }, [dispatch]);

  // Scroll TOP
  useEffect(() => {
    scrollTop();
    return () => {};
  }, []);

  return (
    <section>
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
      <div className="container mx-auto p-5 shadow-md flex flex-col lg:flex-row gap-8 bg-white rounded-md">
        <div className="lg:w-[18%] p-3 text-white font-medium text-lg rounded-md lg:rounded-tr-none rounded-br-none bg-[#131921]">
          <ul className="flex flex-row lg:flex-col gap-5 p-3 h-full">
            <li>
              <button onClick={() => setRoute('products')}>Products</button>
            </li>
            <li>
              <button onClick={() => setRoute('addProducts')}>
                Add Product
              </button>
            </li>
          </ul>
        </div>
        {route === 'products' && (
          <div className="lg:w-4/5 p-3 min-h-[70.5vh]">
            <h1 className="mb-3 font-medium text-lg">Products</h1>
            {status === 'loading' && (
              <div className="flex justify-center items-center">
                <TailSpin
                  visible={true}
                  height="50"
                  width="50"
                  color="#4fa94d"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                />
              </div>
            )}
            <ul className="flex flex-col gap-3">
              {products?.map((product) => (
                <li
                  key={product._id}
                  className="flex items-center gap-3 p-2 bg-white"
                >
                  <Link>{product?.name}</Link>
                  <img
                    src={product?.image}
                    alt={product?.slug}
                    className="w-8 h-8 rounded-md"
                    loading="lazy"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        {route === 'addProducts' && <AddProduct />}
      </div>
    </section>
  );
};

export default Dashbaord;
