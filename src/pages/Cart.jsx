// Hooks
import { useEffect } from 'react';
import axios from 'axios';
// React Router
import { Link } from 'react-router-dom';
// Components
import CartProduct from './../components/CartProduct';
// React Redux
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { fetchCartProducts, resetCart } from '../redux/features/cartReducer';
// Utils
import { determineTotalPrice, scrollTop } from '../utils/helper';

import url from './../utils/url';
import { TailSpin } from 'react-loader-spinner';

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, status } = useSelector((state) => state.cart);

  // Fetch Cart Products
  useEffect(() => {
    dispatch(fetchCartProducts());
    return () => {};
  }, [dispatch]);

  // Empty Cart
  const emptyCart = async () => {
    await axios
      .delete(`${url}/api/v1/cart`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(() => {
        dispatch(resetCart());
      })
      .catch((err) => console.log(err));
  };

  // Scroll Top
  useEffect(() => {
    scrollTop();
    return () => {};
  }, []);

  return (
    <>
      <section className="min-h-[100vh]">
        <div className="container mx-auto px-12 py-6 flex flex-col my-7">
          <h1 className="font-semibold text-2xl mb-5 text-slate-900">
            Your Shopping Cart
          </h1>
          {cart.length === 0 && status === 'success' && (
            <h1 className="text-center font-medium text-slate-900 text-3xl my-5">
              Empty
            </h1>
          )}
          <div className="flex flex-col md:flex-row flex-wrap justify-center space-y-1 gap-5">
            {status === 'loading' && (
              <div className="flex justify-center items-center">
                <TailSpin
                  visible={true}
                  height="50"
                  width="50"
                  color="#4fa94d"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                />
              </div>
            )}
            {cart.map((el) => (
              <CartProduct el={el} key={el?._id} />
            ))}
          </div>
          <div className="flex justify-between items-center mt-5 md:px-6">
            <h1 className="font-medium text-lg md:text-xl">
              Subtotal:
              <span> {determineTotalPrice(cart)} $</span>
            </h1>
            <div className="flex flex-col md:flex-row gap-3">
              <button
                onClick={emptyCart}
                className="font-medium px-3 py-2 bg-green-400 rounded-md text-sm md:text-base"
              >
                EMPTY CART
              </button>
              <Link to="/checkout">
                <button
                  className="font-medium px-3 py-2 bg-red-400 rounded-md text-base"
                  disabled={!cart.length}
                >
                  CHECKOUT
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Cart;
