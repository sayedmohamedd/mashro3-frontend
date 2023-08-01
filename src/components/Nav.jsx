import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Axios from 'axios';

// icons
import { IoMdArrowDropdown } from 'react-icons/io';
import { AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai';

// animation
import { motion } from 'framer-motion';

// react auth
import { useAuthUser, useSignOut } from 'react-auth-kit';

const Nav = ({ api }) => {
  // auth
  const AuthUser = useAuthUser();
  const signOut = useSignOut();
  const [cookie] = useCookies(['_auth']);

  // state
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const categoryDropDown = useRef(null);
  const searchIcon = useRef(null);
  const searchInput = useRef(null);

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      await Axios.get(api + 'api/categories')
        .then((res) => setCategories(res.data))
        .catch((err) => console.log(err));
    };
    fetchCategories();
  }, [api]);

  // fetch cart count
  useEffect(() => {
    const fetchCart = async () => {
      const user_id = cookie['_auth_state']['userId'];
      await Axios.post(api + `api/cart`, { user_id })
        .then((res) => {
          setCart(res.data);
        })
        .catch((err) => console.log(err));
    };
    if (cookie['_auth']) {
      fetchCart();
    }
  }, [cart, api, cookie]);

  useEffect(() => {
    scrollTop();
  }, []);

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  const logout = () => {
    signOut();
    scrollTop();
  };

  const searchFunction = async (searchValue) => {
    if (searchValue !== '') {
      await Axios.post(api + 'api/products/search', { searchValue })
        .then((res) => {
          setProducts(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      setProducts([]);
    }
  };

  // const toggleSearch = () => {
  //   searchIcon.classList.add('hidden');
  //   searchInput.classList.remove('flex');
  // };

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
            <img src="./commerce.png" alt="" width="44px" height="44px" />
          </Link>
        </div>
        {/* search */}
        <div className="hidden lg:flex flex-col" ref={searchInput}>
          <input
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
            onMouseLeave={() => searchFunction('')}
            onClick={() => searchFunction('')}
          >
            {products && (
              <ul
                className={`rounded-bl-md rounded-br-md absolute w-full flex flex-col gap-1 ${
                  products.length === 0 ? '' : 'p-2'
                } bg-white text-slate-900`}
              >
                {products.map((product) => (
                  <Link to={`/products/${product.slug}`}>
                    <li key={product._id} className="flex gap-3 px-3">
                      <img
                        className="w-10 h-10"
                        src={product.image}
                        alt={product.name}
                      />
                      <span className="font-medium">{product.name}</span>
                    </li>
                  </Link>
                ))}
              </ul>
            )}
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
          <div>
            <AiOutlineSearch
              className=" flex lg:hidden cursor-pointer"
              ref={searchIcon}
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
              <AiOutlineShoppingCart className="text-3xl" />
              {AuthUser() && (
                <span className="absolute top-[-15px] right-[-5px] text-red-500">
                  {cart.length}
                </span>
              )}
            </div>
          </Link>

          {/* login & register */}
          {!AuthUser() && (
            <Link to="/login" onClick={scrollTop}>
              <span>Login</span>
            </Link>
          )}
          {AuthUser() && (
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
