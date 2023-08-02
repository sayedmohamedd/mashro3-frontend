import React, { useEffect, useState } from 'react';
import Advertisments from './Advertisments';
// import Offers from './Offers';
import Categories from './Categories';
import Product from './Product';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const MainPage = ({ api }) => {
  const [latestProducts, setLastestProducts] = useState([]);
  const [clothes, setClothes] = useState([]);
  const [elecrtonics, setElecrtonics] = useState([]);
  const [mobiles, setMobiles] = useState([]);
  // Fetch Latest Products
  useEffect(() => {
    const fetchLatestProducts = async () => {
      await Axios.get(api + 'api/latestProducts')
        .then((res) => setLastestProducts(res.data))
        .catch((err) => console.log(err));
    };
    fetchLatestProducts();
  }, [latestProducts, api]);

  // Fetch Clothes
  useEffect(() => {
    const fetchClothes = async () => {
      await Axios.get(`${api}api/products/1/clothes/default`)
        .then((res) => setClothes(res.data))
        .catch((err) => console.log(err));
    };
    fetchClothes();
  }, [clothes, api]);

  // Fetch Mobiles
  useEffect(() => {
    const fetchClothes = async () => {
      await Axios.get(`${api}api/products/1/mobiles/default`)
        .then((res) => setClothes(res.data))
        .catch((err) => console.log(err));
    };
    fetchClothes();
  }, [mobiles, api]);

  // Fetch Electronics
  useEffect(() => {
    const fetchElecrtonics = async () => {
      await Axios.get(`${api}api/products/1/electronics/default`)
        .then((res) => setElecrtonics(res.data))
        .catch((err) => console.log(err));
    };
    fetchElecrtonics();
  }, [elecrtonics, api]);

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
            {latestProducts.slice(0, 5).map((product) => (
              <Product product={product} loading={0} />
            ))}
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
          <h1 className="mb-5 text-3xl font-medium text-heading">Clothes</h1>
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
