// React
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Redux
import {
  fetchAllProducts,
  removeProductFromState,
} from '../redux/features/productReducer';
import { useDispatch, useSelector } from 'react-redux';
// Components
import AddProduct from '../components/AddProduct';
// Utils
import { scrollTop } from '../utils/helper';
import deleteAPIData from '../utils/deleteAPIData';
import url from '../utils/url';

const Dashbaord = () => {
  // Redux
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const [route, setRoute] = useState('products');

  // Fetch All Products
  useEffect(() => {
    dispatch(fetchAllProducts({ page: 3, category: '', sort: '-created_at' }));
    return () => {};
  }, [dispatch]);

  // Scroll TOP
  useEffect(() => {
    scrollTop();
    return () => {};
  }, []);

  const deleteProduct = async (id) => {
    dispatch(removeProductFromState(id));
    await deleteAPIData(`${url}/api/v1/products/${id}`);
  };

  return (
    <section>
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
            <input
              type="search"
              placeholder="product name"
              className="mb-5 px-3 py-2 rounded-md border-b w-full"
            />
            <ul className="flex flex-col gap-3">
              {products?.map((product) => (
                <li
                  key={product._id}
                  className="flex items-center justify-between p-2.5 px-4 rounded-md bg-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <Link>{product?.name}</Link>
                    <img
                      src={product?.image}
                      alt={product?.slug}
                      className="w-8 h-8 rounded-md"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Link
                      to={`/dashboard/update/${product?.slug}`}
                      className="px-2 py-1 rounded-md text-white bg-green-400"
                    >
                      Update
                    </Link>
                    <button
                      className="px-2 py-1 rounded-md text-white bg-red-400"
                      onClick={() => deleteProduct(product?._id)}
                    >
                      Delete
                    </button>
                  </div>
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
