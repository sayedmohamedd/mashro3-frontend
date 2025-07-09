// react
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// icons
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

// framer motion animation
import { motion } from 'framer-motion';
import { scrollTop } from '../utils/helper';

import url from './../utils/url';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartProducts } from '../redux/features/cartReducer';

const ProductPage = () => {
  const [product, setProduct] = useState({});
  const { slug } = useParams();

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch Product
  useEffect(() => {
    axios
      .get(`${url}/api/v1/products/${slug}`)
      .then((res) => setProduct(res.data.data.products[0]))
      .catch((err) => console.log(err));
  }, [slug]);

  const addToCart = async () => {
    if (user) {
      axios
        .post(
          `${url}/api/v1/cart`,
          { product_id: product?._id },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then(() => dispatch(fetchCartProducts()))
        .catch((err) => console.log(err));
    } else {
      navigate('/login');
    }
  };

  // Scroll Top
  useEffect(() => {
    scrollTop();
    return () => {};
  }, []);

  return (
    <section className="min-h-[100vh]">
      <h1 className="text-center text-3xl font-medium text-slate-900 mt-12 my-7">
        {product?.name}
      </h1>
      <div className="container mx-auto my-5 p-5 flex flex-col md:flex-row gap-7 rounded-md bg-white">
        <div className="md:w-1/2 max-h-[70vh] flex justify-center items-center p-5 rounded-md">
          <img
            src={product?.image}
            className="aspect-square object-contain max-h-[90%] max-w-[90%] md:max-h-[100%] md:max-w-[100%]"
            alt={product?.name}
            loading="lazy"
          />
        </div>
        <div className="md:w-[40%] flex flex-col justify-evenly">
          <p className="text-slate-500 my-3 leading-7 text-justify">
            Imagine each paragraph as a sandwich. The real content of the
            sandwich—the meat or other filling—is in the middle. It includes all
            the evidence you need to make the point. But it gets kind of messy
            to eat a sandwich without any bread. Your readers don’t know what to
            do with all the evid… Problem: the paragraph has more than one
          </p>
          <p className="text-slate-500">
            Price: <span>{product?.price} $</span>
          </p>
          <div className="flex my-3 text-yellow-500">
            {Array(3)
              .fill(1)
              .map((star, index) => (
                <BsStarFill key={index} />
              ))}
            <BsStarHalf />
            <BsStar />
          </div>
          <motion.button
            whileTap={{ scale: 1.1, opacity: 0.9 }}
            transition={{ duration: 0.5 }}
            onClick={addToCart}
            className="px-7 py-2.5 rounded-md bg-green-400 text-white"
          >
            Add To Cart
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
