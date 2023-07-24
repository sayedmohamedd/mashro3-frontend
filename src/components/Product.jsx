import { Link } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import { BsStarFill, BsStarHalf, BsStar, BsCartPlus } from 'react-icons/bs';

import Axios from 'axios';

const Product = ({ product, loading }) => {
  const addToCart = async (
    id,
    name,
    price,
    description,
    category,
    offer,
    image,
    rate
  ) => {
    const user_id = window.localStorage.getItem('userId');
    if (user_id) {
      await Axios.post(
        'https://mashro3-backend.onrender.com/api/cart/addproduct',
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
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h1>
        <span className="font-medium text-lg">{product.price}$</span>
      </div>
      <p className="text-slate-500">{product.description}</p>
      <div className="flex text-yellow-500">
        <BsStarFill />
        <BsStarFill />
        <BsStarFill />
        <BsStarHalf />
        <BsStar />
      </div>
      <div className="flex justify-between px-2 py-3">
        <AiFillHeart
          onClick={(e) => e.target.classList.toggle('text-red-500')}
          // className="absolute left-5 bottom-4 text-2xl cursor-pointer hover:opacity-90 text-gray-300"
          className="text-2xl cursor-pointer hover:opacity-90 text-gray-300"
        />
        <BsCartPlus
          className="text-[26px] cursor-pointer hover:opacity-90 text-slate-900"
          onClick={() =>
            addToCart(
              product._id,
              product.name,
              product.price,
              product.description,
              product.category,
              product.offer,
              product.image,
              product.rate
            )
          }
        />
      </div>
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-8 h-8 self-end hover:opacity-80 ease-in-out duration-100 mt-4 cursor-pointer"
        
      >
        <path d="M4.00436 6.41662L0.761719 3.17398L2.17593 1.75977L5.41857 5.00241H20.6603C21.2126 5.00241 21.6603 5.45012 21.6603 6.00241C21.6603 6.09973 21.6461 6.19653 21.6182 6.28975L19.2182 14.2898C19.0913 14.7127 18.7019 15.0024 18.2603 15.0024H6.00436V17.0024H17.0044V19.0024H5.00436C4.45207 19.0024 4.00436 18.5547 4.00436 18.0024V6.41662ZM6.00436 7.00241V13.0024H17.5163L19.3163 7.00241H6.00436ZM5.50436 23.0024C4.67593 23.0024 4.00436 22.3308 4.00436 21.5024C4.00436 20.674 4.67593 20.0024 5.50436 20.0024C6.33279 20.0024 7.00436 20.674 7.00436 21.5024C7.00436 22.3308 6.33279 23.0024 5.50436 23.0024ZM17.5044 23.0024C16.6759 23.0024 16.0044 22.3308 16.0044 21.5024C16.0044 20.674 16.6759 20.0024 17.5044 20.0024C18.3328 20.0024 19.0044 20.674 19.0044 21.5024C19.0044 22.3308 18.3328 23.0024 17.5044 23.0024Z"></path>
      </svg> */}
    </div>
  );
};

export default Product;
