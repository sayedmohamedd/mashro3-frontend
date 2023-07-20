import { useEffect, useState } from 'react';
import CartProduct from './CartProduct';
import { Link } from 'react-router-dom';
import Axios from 'axios';
const Cart = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await Axios.get('http://localhost:3002/api/products');
      setProducts(res.data);
    };
    fetchProducts();
  }, [products]);
  return (
    <>
      <section className="min-h-[100vh]">
        <div className="container mx-auto px-12 py-6 flex flex-col my-7">
          <h1 className="font-semibold text-2xl mb-5 text-slate-900">
            Your Shopping Cart
          </h1>
          {products.length === 0 && (
            <h1 className="text-center font-medium text-slate-900 text-3xl my-5">
              Empty
            </h1>
          )}
          <div className="flex flex-col md:flex-row flex-wrap justify-center space-y-1 gap-5">
            {products.map((product) => (
              <CartProduct product={product} key={product._id} />
            ))}
          </div>
          <div className="flex justify-between items-center mt-5 md:px-6">
            <h1 className="font-medium text-lg md:text-xl">
              Subtotal: <span>250$</span>
            </h1>
            <div className="flex flex-col md:flex-row gap-3">
              <button className="font-medium px-3 py-2 bg-green-400 rounded-md text-sm md:text-base">
                EMPTY CART
              </button>
              <Link to="/checkout">
                <button className="font-medium px-3 py-2 bg-red-400 rounded-md text-base">
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
