// Hooks
import { useEffect, useState } from 'react';

// Components
import Advertisments from './../components/Advertisments';
import Categories from './../components/Categories';
import Product from './../components/Product';
import axios from 'axios';

// React Router
import { Link } from 'react-router-dom';

// React Redux
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { fetchAllProducts } from '../redux/features/productReducer';

import url from './../utils/url';
import SkeletonProduct from '../components/Skeleton/SkeletonProduct';

const MainPage = ({ api }) => {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);
  const [clothes, setClothes] = useState([]);
  const [elecrtonics, setElecrtonics] = useState([]);
  const [mobiles, setMobiles] = useState([]);

  // Fetch Latest Products
  useEffect(() => {
    dispatch(fetchAllProducts({ page: 1, category: '' }));
    return () => {};
  }, [dispatch]);

  // Fetch Clothes
  useEffect(() => {
    const fetchClothes = async () => {
      await axios
        .get(`${url}/api/v1/products?page=1&category=clothes`)
        .then((res) => setClothes(res.data.data.products))
        .catch((err) => console.log(err));
    };
    fetchClothes();
    return () => {};
  }, []);

  // Fetch Mobiles
  useEffect(() => {
    const fetchMobiles = async () => {
      await axios
        .get(`${url}/api/v1/products?page=1&category=mobiles`)
        .then((res) => setMobiles(res.data.data.products))
        .catch((err) => console.log(err));
    };
    fetchMobiles();
    return () => {};
  }, []);

  // Fetch Electronics
  useEffect(() => {
    const fetchEloctronics = async () => {
      await axios
        .get(`${url}/api/v1/products?page=1&category=electronics`)
        .then((res) => setElecrtonics(res.data.data.products))
        .catch((err) => console.log(err));
    };
    fetchEloctronics();
    return () => {};
  }, []);

  return (
    <>
      <Advertisments />
      {/* <Offers /> */}
      <Categories api={api} />
      {/* latest */}
      <section className="my-12">
        <div className="container mx-auto px-6 py-5 text-center rounded-3xl shadow-2xl bg-white">
          <h1 className="mb-5 text-3xl font-medium text-heading">Latest</h1>
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {status !== 'success' ? (
              <>
                <SkeletonProduct />
                <SkeletonProduct />
                <SkeletonProduct />
                <SkeletonProduct />
                <SkeletonProduct />
              </>
            ) : (
              products
                ?.slice(0, 5)
                .map((product) => (
                  <Product product={product} loading={0} key={product._id} />
                ))
            )}
          </div>
          <Link to="/store">
            <button className="px-6 py-2.5 rounded-3xl text-white bg-gray-700  mt-5 hover:bg-gray-500 hover:text-black ease-in duration-100">
              VIEW MORE
            </button>
          </Link>
        </div>
      </section>

      {/* clothes */}
      <section className="my-12">
        <div className="container mx-auto px-6 py-5 text-center rounded-3xl shadow-2xl bg-white">
          <h1 className="mb-5 text-3xl font-medium text-heading">Clothes</h1>
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {clothes.slice(0, 5).map((product) => (
              <Product product={product} key={product._id} />
            ))}
          </div>
          <Link to="/store">
            <button className="px-6 py-2.5 rounded-3xl text-white bg-gray-700  mt-5 hover:bg-gray-500 hover:text-black ease-in duration-100">
              VIEW MORE
            </button>
          </Link>
        </div>
      </section>

      {/* mobiles */}
      <section className="my-12">
        <div className="container mx-auto px-6 py-5 text-center rounded-3xl shadow-2xl bg-white">
          <h1 className="mb-5 text-3xl font-medium text-heading">Mobiles</h1>
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {mobiles.slice(0, 5).map((product) => (
              <Product product={product} key={product._id} />
            ))}
          </div>
          <Link to="/store">
            <button className="px-6 py-2.5 rounded-3xl text-white bg-gray-700  mt-5 hover:bg-gray-500 hover:text-black ease-in duration-100">
              VIEW MORE
            </button>
          </Link>
        </div>
      </section>

      {/* elecrtonics */}
      <section className="my-12">
        <div className="container mx-auto px-6 py-5 text-center rounded-3xl shadow-2xl bg-white">
          <h1 className="mb-5 text-3xl font-medium text-heading">
            Elecrtonics
          </h1>
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {elecrtonics.slice(0, 5).map((product) => (
              <Product product={product} key={product._id} />
            ))}
          </div>
          <Link to="/store">
            <button className="px-6 py-2.5 rounded-3xl text-white bg-gray-700  mt-5 hover:bg-gray-500 hover:text-black ease-in duration-100">
              VIEW MORE
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default MainPage;
