// React Router
import { Link, useNavigate } from 'react-router-dom';

// Icons
import { AiFillHeart } from 'react-icons/ai';
import { BsStarFill, BsStarHalf, BsStar, BsCartPlus } from 'react-icons/bs';

import axios from 'axios';

// Animation
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

// React Redux
import { useDispatch, useSelector } from 'react-redux';

// Utils
import { fetchCartProducts } from '../redux/features/cartReducer';
import url from '../utils/url';

const Product = ({ product, loading }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const addToCart = async () => {
    if (user) {
      axios
        .post(
          `${url}/api/v1/cart`,
          { product_id: product._id },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then(() => {
          toast.success('Added To Cart');
          dispatch(fetchCartProducts());
        })
        .catch((err) => console.log(err));
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <div className="md:w-1/5 flex flex-col p-3 shadow-xl space-y-1 rounded-2xl relative">
        <img
          src={product?.image}
          alt={product?.name}
          className={`aspect-square ${loading ? 'opacity-70' : 'opacity-100'}`}
        />
        <div className="flex justify-between">
          <h1 className="font-medium text-xl">
            <Link to={`/products/${product?.slug}`}>{product?.name}</Link>
          </h1>
          <span className="font-medium text-lg">{product?.price}$</span>
        </div>
        <p className="text-slate-500 text-left">{product?.description}</p>
        <div className="flex text-yellow-500">
          {/* {Array(product.rate)
          .fill(1)
          .map((star, index) => (
            <BsStarFill key={index} />
          ))} */}
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStarHalf />
          <BsStar />
        </div>

        <div className="flex justify-between px-2 py-3">
          {/* like icon */}
          <motion.div whileTap={{ scale: 1.1 }}>
            <AiFillHeart
              onClick={(e) => e.target.classList.toggle('text-red-500')}
              className="text-2xl cursor-pointer hover:opacity-90 text-gray-300"
            />
          </motion.div>

          {/* cart icon */}
          <motion.div
            whileTap={{
              scale: 1.1,
              color: '#182032',
            }}
            transition={{ duration: 0.6 }}
          >
            <BsCartPlus
              className="text-[26px] cursor-pointer hover:opacity-90 text-slate-900 hover:text-red-500 duration-100 ease-out"
              onClick={() => addToCart(product?._id)}
            />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Product;
