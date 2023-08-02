import { useEffect, useState } from 'react';
import Axios from 'axios';
import Product from './Product';
// import { useParams } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
const Store = ({ api }) => {
  // const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('default');
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('default');
  // console.log(params);
  useEffect(() => {
    console.log(sort);
    const fetchProducts = async () => {
      await Axios.get(`${api}api/products/${pageNumber}/${category}/${sort}`)
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };
    fetchProducts();
  }, [pageNumber, category, api, sort]);

  useEffect(() => {
    scrollTop();
  }, []);

  const onNext = () => {
    setPageNumber((prev) => prev + 1);
    setLoading(true);
    scrollTop();
  };

  const onPrev = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
      setLoading(true);
      scrollTop();
    }
  };

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

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
                setPageNumber(1);
              }}
              value={category}
            >
              <option value="default">default</option>
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
                setPageNumber(1);
              }}
              value={sort}
            >
              <option value="default">default</option>
              <option value="lowestPrice">lowestPrice</option>
              <option value="heightPrice">heightPrice</option>
            </select>
          </div>
          <div className="mx-auto px-6 py-5 flex flex-col items-center justify-center md:flex-row flex-wrap gap-5">
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
            <span style={{ userSelect: 'none' }}>{pageNumber}</span>
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
