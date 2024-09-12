// Hooks
import { useState, useRef } from 'react';

// React Router
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { determineTotalPrice } from '../utils/helper';

const Checkout = () => {
  // Redux State
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.user);
  const shipping = useRef(0);
  const order = useRef(0);
  const bill = useRef(0);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [zip_code, setZipCode] = useState('');
  const [card_number, setCardNumber] = useState('');

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  const next = (e) => {
    e.preventDefault();
    scrollTop();
    if (first_name && last_name && email && address && city && zip_code) {
      shipping.current.classList.add('hidden');
      order.current.classList.remove('hidden');
      scrollTop();
    }
  };

  const back = (e) => {
    e.preventDefault();
    shipping.current.classList.remove('hidden');
    order.current.classList.add('hidden');
    scrollTop();
  };

  const pay = (e) => {
    e.preventDefault();
    if (card_number) {
      shipping.current.classList.add('hidden');
      order.current.classList.add('hidden');
      bill.current.classList.remove('hidden');
      scrollTop();
    }
  };

  return (
    <>
      <section>
        <div className="container mx-auto px-6 py-5 flex flex-col items-center h-fit bg-white">
          <h1 className="font-semibold text-2xl my-5 text-slate-900">
            Checkout
          </h1>
          <div className="shadow-lg p-10">
            <ul className="flex gap-5 text-heading">
              <li>
                <span className="mr-1.5 px-2 py-0.5 rounded-full text-white bg-blue-600">
                  1
                </span>
                <span>Shipping address</span>
              </li>
              <li>
                <span className="mr-1.5 px-2 py-0.5 rounded-full text-white bg-gray-600">
                  2
                </span>
                <span>Payment details</span>
              </li>
            </ul>

            <div className="relative ">
              {/* shipping */}
              <div ref={shipping} className=" w-full">
                <h3 className="font-medium text-xl text-heading my-5">
                  Shipping Address
                </h3>
                <div className="flex flex-col gap-5 md:space-x-1">
                  <input
                    type="text"
                    placeholder="First name *"
                    name="first_name"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="px-3 py-2 border-0 border-b border-gray-400 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Last name *"
                    name="last_name"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    className="px-3 py-2 border-0 border-b border-gray-400 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Address *"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="px-3 py-2  border-0 border-b border-gray-400 focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-3 py-2  border-0 border-b border-gray-400 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="City *"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="px-3 py-2  border-0 border-b border-gray-400 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Zip / Postal code *"
                    name="zip_code"
                    value={zip_code}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="px-3 py-2  border-0 border-b border-gray-400 focus:outline-none"
                  />

                  {/* Country */}
                  <label className="text-heading">Country</label>
                  <select
                    name="country"
                    className="px-3 py-2  border-0 border-b border-gray-400 focus:outline-none"
                  >
                    <option value="">-- Please choose an option --</option>
                    <option value="egypt">Egypt</option>
                    <option value="india">India</option>
                    <option value="russia">Russia</option>
                  </select>

                  {/* Shipping Subdivision */}
                  <label className="text-heading">Shipping Subdivision</label>
                  <select
                    name="country"
                    className="px-3 py-2  border-0 border-b border-gray-400 focus:outline-none"
                  >
                    <option value="">-- Please choose an option --</option>
                    <option value="egypt">Egypt</option>
                    <option value="india">India</option>
                    <option value="russia">Russia</option>
                  </select>

                  {/* Shipping Options */}
                  <label className="text-heading">Shipping Options</label>
                  <select
                    name="country"
                    className="px-3 py-2  border-0 border-b border-gray-400 focus:outline-none"
                  >
                    <option value="">-- Please choose an option --</option>
                    <option value="egypt">Egypt</option>
                    <option value="india">India</option>
                    <option value="russia">Russia</option>
                  </select>
                  <div className="flex justify-between px-2">
                    <Link to="/cart">
                      <button className="px-3 py-1 rounded-lg font-medium text-white bg-red-400">
                        Back to Cart
                      </button>
                    </Link>
                    <button
                      onClick={next}
                      className="px-10 py-1 rounded-lg font-medium text-white bg-blue-400"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div ref={order} className=" hidden  w-full">
                <h3 className="font-medium text-xl text-heading my-5">
                  Order Summary
                </h3>
                <div className="flex flex-col gap-5 md:space-x-1">
                  <ul className="flex flex-col space-y-4">
                    {cart.map((el) => (
                      <li
                        key={el?.product._id}
                        className="flex justify-between items-center"
                      >
                        <p className="flex flex-col">
                          <span>{el?.product?.name}</span>
                          <span>Quantity: {el?.number}</span>
                        </p>
                        <span>${el?.product?.price * el?.number}</span>
                      </li>
                    ))}
                    <li className="flex justify-between items-center">
                      <p className="flex flex-col">
                        <span>Keyboard</span>
                        <span>Quantity: 1</span>
                      </p>
                      <span>$65.00</span>
                    </li>

                    <li className="flex py-2 justify-between border-0 border-b-2">
                      <span className="text-lg">Total</span>
                      <span>${determineTotalPrice(cart)}</span>
                    </li>
                  </ul>
                  <h1>Payment Method</h1>
                  <div>
                    <input
                      type="text"
                      placeholder="card number *"
                      name="card_number"
                      value={card_number}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="px-3 py-2  border-0 border-b border-gray-400 focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-between px-2">
                    <button
                      className="w-28 py-1 rounded-lg font-medium text-white bg-red-400"
                      onClick={back}
                    >
                      Back
                    </button>
                    <button
                      className="w-28 py-1 rounded-lg font-medium text-white bg-blue-400"
                      onClick={pay}
                    >
                      Pay ${determineTotalPrice(cart)}
                    </button>
                  </div>
                </div>
              </div>

              {/* bill */}
              <div ref={bill} className=" hidden w-full">
                <h3 className="font-medium text-xl text-heading my-5">
                  Thank You for your purchase, {user?.username}
                </h3>
                <p className="my-2 text-slate-600">Order-ref:JDSJFHSJ-213681</p>
                <Link to="/">
                  <button className="w-32 py-2 rounded-lg font-medium text-slate-900 bg-gray-300">
                    Back To Home
                  </button>
                </Link>
              </div>
            </div>

            {/* end */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
