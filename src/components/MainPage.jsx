import React, { useEffect, useState } from 'react';
import Advertisments from './Advertisments';
// import Offers from './Offers';
import Categories from './Categories';
import Product from './Product';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const MainPage = ({ api }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await Axios.get(api + 'api/products');
      setProducts(res.data);
    };
    fetchProducts();
  }, [api]);
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
            {products.slice(0, 5).map((product) => (
              <Product
                product={product}
                loading={0}
                api={api}
                key={product._id}
              />
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
            {products.slice(0, 5).map((product) => (
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
            {products.slice(0, 5).map((product) => (
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
