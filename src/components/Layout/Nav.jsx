// Hooks
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
// React Router
import { Link } from 'react-router-dom';

// icons
import { IoMdArrowDropdown } from 'react-icons/io';
import { AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai';

// animation
import { motion } from 'framer-motion';
// React Redux
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { logout } from './../../redux/features/userReducer';
import { fetchCartProducts } from './../../redux/features/cartReducer';

// Images
import logo from './../../assets/commerce.png';

// Utils
import { scrollTop } from './../../utils/helper';
import url from './../../utils/url';

// Components
import DropDownMenu from '../DropDownMenu';

const Nav = () => {
  const dispatch = useDispatch();

  // Redux State
  const cart = useSelector((state) => state.cart.cart);
  const categories = useSelector((state) => state.categories.categories);
  const user = useSelector((state) => state.user.user);

  // Refs
  const categoryDropDown = useRef(null);
  const searchIcon = useRef(null);
  const inputSearch = useRef(null);

  // State
  const [products, setProducts] = useState([]);
  const [toggleMobileSearch, setToggleMobileSearch] = useState(false);

  const cartCount = () => {
    let count = 0;
    cart.forEach((el) => {
      count += el.number;
    });
    return count;
  };

  // Fetch Cart
  useEffect(() => {
    dispatch(fetchCartProducts());
    return () => {};
  }, [dispatch]);

  // Search
  const searchFunction = async (searchValue) => {
    if (searchValue) {
      await axios
        .get(`${url}/api/v1/products/${searchValue}`)
        .then((res) => setProducts(res?.data?.data?.products))
        .catch((err) => console.log(err));
      return;
    }
    setProducts([]);
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8, stiffness: 100 }}
      className="bg-[#131921] sticky top-0 z-10"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center text-white">
        {/* logo */}
        <Link to="/" onClick={scrollTop}>
          <img src={logo} alt="logo" className="w-11 h-11" />
        </Link>

        {/* search */}
        <div className="hidden lg:flex flex-col">
          <input
            ref={inputSearch}
            type="search"
            placeholder="Serach"
            className={`px-10 py-1 text-slate-900 rounded-xl ${
              products.length === 0 ? '' : 'rounded-br-none rounded-bl-none'
            } focus:outline-none`}
            onChange={(e) => searchFunction(e.target.value)}
            onFocus={(e) => searchFunction(e.target.value)}
          />
          {/* Products Search List */}
          <div className="relative" onClick={() => setProducts([])}>
            <ul
              className={`rounded-bl-md rounded-br-md absolute w-full flex flex-col gap-1 ${
                products ? '' : 'p-2'
              } bg-white text-slate-900`}
            >
              {products.map((product) => (
                <Link
                  to={`/products/${product?.slug}`}
                  key={product?._id}
                  onClick={() => (inputSearch.current.value = '')}
                >
                  <li
                    key={product?._id}
                    className="flex gap-3 px-3 items-center"
                  >
                    <img
                      className="w-10 h-10"
                      src={product?.image}
                      alt={product?.name}
                    />
                    <span className="font-medium">{product?.name}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>

        {/* Navbar Buttons */}
        <ul className="hidden lg:flex space-x-5">
          <li>
            <Link to="/" onClick={scrollTop}>
              Home
            </Link>
          </li>
          <li>
            <div
              className="flex gap-1 items-center cursor-pointer"
              onClick={() =>
                categoryDropDown.current.classList.toggle('hidden')
              }
            >
              <button>Categories</button>
              <IoMdArrowDropdown className="text-2xl" />
            </div>
            <ul
              onMouseLeave={() =>
                categoryDropDown.current.classList.add('hidden')
              }
              ref={categoryDropDown}
              className="flex hidden flex-col gap-3 px-5 py-2 absolute z-10 bg-[#131921]"
            >
              {categories.map((category) => (
                <li key={category._id}>{category.name}</li>
              ))}
            </ul>
          </li>
          <li>
            <Link to="/store">Store</Link>
          </li>
          <li>
            <Link to="/contact" className="">
              Contact Us
            </Link>
          </li>
          {user?.role === 'admin' && (
            <li>
              <Link to="/dashboard">Dashbaord</Link>
            </li>
          )}
          {/* <li>Favourite</li> */}
        </ul>

        <div className="flex items-center gap-3">
          <div
            className={`${
              toggleMobileSearch ? 'inline' : 'hidden'
            } flex-col lg:hidden`}
            onMouseLeave={() => setToggleMobileSearch(false)}
          >
            <input
              ref={inputSearch}
              type="search"
              placeholder="Serach"
              className={`lg:hidden px-4 py-1 text-slate-900 rounded-xl ${
                products.length === 0 ? '' : 'rounded-br-none rounded-bl-none'
              } focus:outline-none`}
              onChange={(e) => searchFunction(e.target.value)}
              onFocus={(e) => searchFunction(e.target.value)}
            />
            {/* Products Search List */}
            <div className="relative" onClick={() => setProducts([])}>
              <ul
                className={`rounded-bl-md rounded-br-md absolute w-full flex flex-col gap-1 ${
                  products ? '' : 'p-2'
                } bg-white text-slate-900`}
              >
                {products.map((product) => (
                  <Link
                    to={`/products/${product?.slug}`}
                    key={product?._id}
                    onClick={() => (inputSearch.current.value = '')}
                  >
                    <li
                      key={product?._id}
                      className="flex gap-3 px-3 items-center"
                    >
                      <img
                        className="w-10 h-10"
                        src={product?.image}
                        alt={product?.name}
                      />
                      <span className="font-medium">{product?.name}</span>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>

          <div
            ref={searchIcon}
            className={`${toggleMobileSearch ? 'hidden' : 'inline'}`}
            onClick={() => setToggleMobileSearch((prev) => !prev)}
          >
            <AiOutlineSearch
              className="flex lg:hidden cursor-pointer"
              size={24}
            />
          </div>
          <Link
            to="/cart"
            className="text-bold text-lg flex space-x-2 items-center relative"
            onClick={scrollTop}
          >
            <div className="relative">
              {user && (
                <>
                  <AiOutlineShoppingCart className="text-3xl" />
                  <span className="absolute top-[-15px] right-[-5px] text-red-500">
                    {cartCount() ? cartCount() : ''}
                  </span>
                </>
              )}
            </div>
          </Link>

          {/* LOGIN */}
          {!user && (
            <Link to="/login" className="hidden lg:inline">
              Login
            </Link>
          )}
          {/* LOGOUT */}
          {user && (
            <Link
              to="/"
              onClick={() => dispatch(logout())}
              className="hidden lg:inline"
            >
              Logout
            </Link>
          )}
          {/* Drop Menu */}
          <DropDownMenu />
        </div>
      </div>
    </motion.nav>
  );
};

export default Nav;
