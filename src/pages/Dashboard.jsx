import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllProducts } from '../redux/features/productReducer';
import { scrollTop } from '../utils/helper';

const Dashbaord = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
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
          <h1 className="mb-3">Products</h1>
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
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Dashbaord;
