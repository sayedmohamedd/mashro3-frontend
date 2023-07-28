import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Axios from 'axios';

// icons
import { IoMdArrowDropdown } from 'react-icons/io';
import { AiOutlineShoppingCart } from 'react-icons/ai';

// animation
import { motion } from 'framer-motion';

const Nav = ({ api }) => {
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const categoryDropDown = useRef();
  const [cookie, setCookie, removeCookie] = useCookies(['access_token']);

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      await Axios.get(api + 'api/categories')
        .then((res) => setCategories(res.data))
        .catch((err) => console.log(err));
    };
    fetchCategories();
  }, [api]);

  // fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      const user_id = window.localStorage.getItem('userId');
      await Axios.post(api + `api/cart`, { user_id })
        .then((res) => {
          setCart(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchCart();
  }, [cart, api]);

  useEffect(() => {
    scrollTop();
  }, []);

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  const logout = () => {
    removeCookie('access_token');
    window.localStorage.removeItem('userId');
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
            <img
              src={require('./../images/commerce.png')}
              alt=""
              width="44px"
              height="44px"
            />
          </Link>
        </div>
        {/* search */}
        <input
          type="search"
          placeholder="Serach"
          className="hidden lg:flex px-7 py-1 text-slate-900 rounded-3xl focus:outline-none "
        />
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
        <div className="flex gap-4">
          <Link
            to={cookie.access_token ? '/cart' : '/login'}
            className="text-bold text-lg flex space-x-2 items-center relative"
            onClick={scrollTop}
          >
            {/* <span>Cart</span> */}
            <div className="relative">
              <AiOutlineShoppingCart className="text-3xl" />
              {cookie.access_token && (
                <span className="absolute top-[-15px] right-[-5px] text-red-500">
                  {cart.length}
                </span>
              )}
            </div>
          </Link>

          {/* login & register */}
          {!cookie.access_token && (
            <Link to="/login">
              <span>Login</span>
            </Link>
          )}
          {cookie.access_token && (
            <Link to="/" onClick={logout}>
              <span>Logout</span>
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Nav;
