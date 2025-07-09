// React Router
import { Link, useNavigate } from 'react-router-dom';

// Icons
import { AiFillHeart } from 'react-icons/ai';
import { BsStarFill, BsStarHalf, BsStar, BsCartPlus } from 'react-icons/bs';

import axios from 'axios';

// Animation
import { motion } from 'framer-motion';

// React Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartProducts } from '../redux/features/cartReducer';

// Utils
import url from '../utils/url';

const Product = ({ product, loading }) => {
  const navigate = useNavigate();
  // Redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

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
        .then(() => dispatch(fetchCartProducts()))
        .catch((err) => console.log(err));
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <div className="md:w-2/5 lg:w-1/5 flex flex-col justify-between p-3 shadow-xl space-y-1 rounded-2xl relative">
        <img
          src={product?.image}
          alt={product?.name}
          className={`aspect-square ${loading ? 'opacity-70' : 'opacity-100'}`}
          loading="lazy"
        />
        <div className="flex justify-between">
          <h4 className="font-semibold text-sm">
            <Link to={`/products/${product?.slug}`}>{product?.name}</Link>
          </h4>
          <span className="text-sm">{product?.price}$</span>
        </div>
        <div>
          <p
            className="font-light text-[11px] text-left text-slate-500"
            alt={product?.description}
          >
            {product?.description}
          </p>
          <div className="flex text-yellow-500">
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
      </div>
    </>
  );
};

export default Product;
