// Hooks
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// icons
import { IoMdArrowDropdown } from 'react-icons/io';
import { AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai';

// animation
import { motion } from 'framer-motion';
// React Redux
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { logout } from './../redux/features/userReducer';
import { fetchCartProducts } from '../redux/features/cartReducer';
import { fetchCategories } from '../redux/features/categoryReducer';

// Images
import logo from './../assets/commerce.png';

import { scrollTop } from './../utils/helper';

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

  const cartCount = () => {
    let count = 0;
    cart.forEach((el) => {
      count += el.number;
    });
    return count;
  };

  // fetch categories
  useEffect(() => {
    dispatch(fetchCategories());
    return () => {};
  }, [dispatch]);

  // Fetch Cart
  useEffect(() => {
    dispatch(fetchCartProducts());
    return () => {};
  }, [dispatch]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch(logout());
  };

  // Search
  const searchFunction = async (searchValue) => {
    if (searchValue) {
      await axios
        .get(`http://localhost:3002/api/v1/products/${searchValue}`)
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
        <div>
          <Link to="/" onClick={scrollTop}>
            <img src={logo} alt="logo" width="44px" height="44px" />
          </Link>
        </div>
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
          <div
            className="relative"
            // onMouseLeave={setProducts([])}
            onClick={() => setProducts([])}
          >
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
                  <li key={product?._id} className="flex gap-3 px-3">
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

        <ul className="hidden md:flex space-x-5">
          <li>
            <Link to="/" onClick={scrollTop}>
              Home
            </Link>
          </li>
          <li className="">
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
          <li>Offers</li>
          {/* <li>Favourite</li> */}
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <div className="flex items-center gap-3">
          <div ref={searchIcon}>
            <AiOutlineSearch
              className=" flex lg:hidden cursor-pointer"
              // ref={searchIcon}
              // onClick={toggleSearch}
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
                    {cartCount()}
                  </span>
                </>
              )}
            </div>
          </Link>

          {/* LOGIN */}
          {!user && (
            <Link to="/login" onClick={scrollTop}>
              <span>Login</span>
            </Link>
          )}
          {/* LOGOUT */}
          {user && (
            <Link to="/" onClick={handleLogout}>
              <span>Logout</span>
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Nav;
