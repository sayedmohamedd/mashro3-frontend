import Axios from 'axios';
import { Link } from 'react-router-dom';
const CartProduct = ({ product }) => {
  // const api = 'https://mashro3-backend.onrender.com/';
  const api = 'http://localhost:3002/';

  // Delete Product Function
  const deleteProduct = async (product_id) => {
    const user_id = window.localStorage.getItem('userId');
    await Axios.post(api + 'api/cart/removeProduct', {
      user_id,
      product_id,
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  // Increase Product Function
  const increase = async (product_id) => {
    const user_id = window.localStorage.getItem('userId');
    await Axios.post(api + 'api/cart/increaseProduct', {
      user_id,
      product_id,
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  // Decrease Product Function
  const decrease = async (product_id, number) => {
    if (number !== 1) {
      const user_id = window.localStorage.getItem('userId');
      await Axios.post(api + 'api/cart/decreaseProduct', {
        user_id,
        product_id,
      })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="md:w-[30%] lg:w-[20%] flex flex-col p-3 shadow-xl rounded-xl bg-white">
      <img src={product.image} alt={product.name} className="aspect-square" />
      <div className="flex justify-between mt-4">
        <Link to={`/products/${product.slug}`}>
          <h1 className="font-medium text-xl">{product.name}</h1>
        </Link>
        <span className="font-medium text-lg">
          {product.price * product.number} $
        </span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 ml-2 text-gray-500">
          <button
            className={`font-medium text-xl ${
              product.number === 1 ? 'opacity-40' : 'opacity-100'
            }`}
            onClick={() => decrease(product.product_id, product.number)}
          >
            -
          </button>
          <span>{product.number}</span>
          <button
            className="font-medium text-xl"
            onClick={() => increase(product.product_id)}
          >
            +
          </button>
        </div>
        <button
          className="self-end font-medium px-2 py-1.5 rounded-md my-2 bg-red-400"
          onClick={() => deleteProduct(product.product_id)}
        >
          REMOVE
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
