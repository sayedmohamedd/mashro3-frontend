// Hooks
import { useEffect, useState } from 'react';

// Components
import Product from './../components/Product';
// Icons
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

// React Redux
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { fetchAllProducts } from '../redux/features/productReducer';
import { scrollTop } from '../utils/helper';
import { TailSpin } from 'react-loader-spinner';

const Store = ({ api }) => {
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('-created_at');
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);

  // Fetch Products
  useEffect(() => {
    dispatch(fetchAllProducts({ page, category, sort }));
  }, [dispatch]);

  const onNext = () => {
    setPage((prev) => prev + 1);
    setLoading(true);
    dispatch(fetchAllProducts({ page: page + 1, category, sort }));
    scrollTop();
  };

  const onPrev = () => {
    if (page > 1) {
      setPage((page) => page - 1);
      setLoading(true);
      dispatch(fetchAllProducts({ page: page - 1, category, sort }));
      scrollTop();
    }
  };

  useEffect(() => {
    if (status === 'success') {
      setLoading(false);
    }
  }, [status]);

  // Scroll Top
  useEffect(() => {
    scrollTop();
    return () => {};
  }, []);

  return (
    <>
      <h1 className="text-3xl font-medium text-center mt-10 mb-2 text-slate-900">
        Our Store
      </h1>
      <div className="max-w-4xl lg:container mx-auto px-6 py-5 flex flex-col md:flex-row gap-5 mb-5 min-h-[100vh]">
        <section className=" bg-white rounded-xl">
          <h1 className="text-xl font-medium p-3">Filter by</h1>
          <hr />
          <div className="my-2 px-3 flex gap-3">
            <span>Category</span>
            <select
              className="bg-gray-200 rounded-md px-3 py-1"
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
                dispatch(
                  fetchAllProducts({ page: 1, category: e.target.value, sort })
                );
              }}
              value={category}
            >
              <option value="">default</option>
              <option value="mobiles">mobiles</option>
              <option value="computers">computers</option>
              <option value="clothes">clothes</option>
              <option value="electronics">electronics</option>
            </select>
          </div>
        </section>
        {/* Store */}
        <section className="md:w-[80%] bg-white rounded-md pb-3">
          <div className="flex gap-3 px-10 py-3 border-b-2 rounded-md">
            <span className="font-medium text-lg">sort by</span>
            <select
              className="bg-gray-200 rounded-md px-3 py-1"
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
                dispatch(
                  fetchAllProducts({ page: 1, category, sort: e.target.value })
                );
              }}
              value={sort}
            >
              <option value="-created_at">default</option>
              <option value="price">lowestPrice</option>
              <option value="-price">heightPrice</option>
            </select>
          </div>
          <div className="min-h-[80vh] mx-auto px-6 py-5 flex flex-col items-center justify-center md:flex-row flex-wrap gap-5">
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
            {products.map((product) => (
              <Product
                product={product}
                loading={loading}
                api={api}
                key={product._id}
              />
            ))}
          </div>
          {/* slider */}
          <div className="flex gap-5 items-center justify-center py-3 text-xl text-slate-900 box-content">
            <AiOutlineArrowLeft
              className="rounded-full w-6 h-6 cursor-pointer hover:opacity-80"
              onClick={onPrev}
            />
            <span style={{ userSelect: 'none' }}>{page}</span>
            <AiOutlineArrowRight
              className="rounded-full w-6 h-6 cursor-pointer hover:opacity-80"
              onClick={onNext}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Store;
