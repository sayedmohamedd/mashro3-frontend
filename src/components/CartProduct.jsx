// Hooks
import axios from 'axios';
// React Router
import { Link } from 'react-router-dom';

// React Redux
import { useDispatch } from 'react-redux';
// Actions
import {
  decreaseProduct,
  deleteProduct,
  increaseProduct,
} from '../redux/features/cartReducer';
import url from '../utils/url';
import updateAPIData from '../utils/updateAPIData';
import deleteAPIData from '../utils/deleteAPIData';

const CartProduct = ({ el }) => {
  const { product, number } = el;
  const dispatch = useDispatch();

  // Delete Product Function
  const dropProduct = async () => {
    dispatch(deleteProduct(el?._id));
    await deleteAPIData(`${url}/api/v1/cart/${el?._id}`);
  };

  // Increase Product Function
  const increaseProductByOne = async () => {
    dispatch(increaseProduct(el?._id));
    await updateAPIData(`${url}/api/V1/cart/increase`, { id: el?._id });
  };

  // Decrease Product Function
  const decreaseProductByOne = async () => {
    dispatch(decreaseProduct(el?._id));
    await updateAPIData(`${url}/api/V1/cart/decrease`, { id: el?._id });
  };

  return (
    <div className="md:w-[30%] lg:w-[20%] flex flex-col p-3 shadow-xl rounded-xl bg-white">
      <img
        src={product?.image}
        alt={product?.name}
        className="aspect-square"
        loading="lazy"
      />
      <div className="flex justify-between mt-4">
        <Link to={`/products/${product?.slug}`}>
          <h1 className="font-medium text-xl">{product?.name}</h1>
        </Link>
        <span className="font-medium text-lg">{product?.price * number} $</span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 ml-2 text-gray-500">
          <button
            className={`font-medium text-xl ${
              number === 1 ? 'opacity-40' : 'opacity-100'
            }`}
            disabled={number === 1}
            onClick={decreaseProductByOne}
          >
            -
          </button>
          <span>{number}</span>
          <button
            className="font-medium text-xl"
            onClick={increaseProductByOne}
          >
            +
          </button>
        </div>
        <button
          className="self-end font-medium px-2 py-1.5 rounded-md my-2 bg-red-400"
          onClick={dropProduct}
        >
          REMOVE
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
