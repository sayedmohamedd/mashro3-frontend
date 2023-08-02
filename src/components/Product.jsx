import { Link, useNavigate } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import { BsStarFill, BsStarHalf, BsStar, BsCartPlus } from 'react-icons/bs';

import Axios from 'axios';
import { useCookies } from 'react-cookie';
import { motion } from 'framer-motion';

const Product = ({ product, loading }) => {
  const [cookie] = useCookies();
  const navigate = useNavigate();
  const addToCart = async (
    id,
    name,
    price,
    description,
    category,
    offer,
    image,
    rate,
    slug
  ) => {
    if (!cookie['_auth']) {
      navigate('/login');
    } else {
      const user_id = cookie['_auth_state']['userId'];
      await Axios.post(
        'https://mashro3-backend.onrender.com/api/cart/addproduct',
        // 'http://localhost:3002/api/cart/addproduct',
        {
          user_id,
          name,
          product_id: id,
          price,
          description,
          category,
          offer,
          image,
          rate,
          slug,
        }
      )
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="md:w-1/5 flex flex-col p-3 shadow-xl space-y-1 rounded-2xl relative">
      <img
        src={product.image}
        alt={product.name}
        className={`aspect-square ${loading ? 'opacity-70' : 'opacity-100'}`}
      />
      <div className="flex justify-between">
        <h1 className="font-medium text-xl">
          <Link to={`/products/${product.slug}`}>{product.name}</Link>
        </h1>
        <span className="font-medium text-lg">{product.price}$</span>
      </div>
      <p className="text-slate-500 text-left">{product.description}</p>
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
            onClick={() =>
              addToCart(
                product._id,
                product.name,
                product.price,
                product.description,
                product.category,
                product.offer,
                product.image,
                product.rate,
                product.slug
              )
            }
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Product;
