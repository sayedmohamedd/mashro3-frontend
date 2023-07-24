import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useCookies } from 'react-cookie';
const Nav = ({ api }) => {
  const [categories, setCategories] = useState([]);
  // const [cart, setCart] = useState([]);
  const categoryDropDown = useRef();
  const [cookie, setCookie, removeCookie] = useCookies(['access_token']);

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      await Axios.get(`${api}api/categories`)
        .then((res) => setCategories(res.data))
        .catch((err) => console.log(err));
    };
    fetchCategories();
  }, [api]);

  // useEffect(() => {
  //   const fetchCart = async () => {
  //     const user_id = window.localStorage.getItem('userId');
  //     await Axios.post(api + `api/cart`, { user_id })
  //       .then((res) => {
  //         setCart(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   };
  //   fetchCart();
  // }, [api]);

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
    <nav className="bg-[#131921] sticky top-0 z-10">
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
            to="/cart"
            className="text-bold text-lg flex space-x-2 items-center relative"
          >
            {/* <span>Cart</span> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="32"
              height="32"
            >
              <path
                d="M4.00436 6.41662L0.761719 3.17398L2.17593 1.75977L5.41857 5.00241H20.6603C21.2126 5.00241 21.6603 5.45012 21.6603 6.00241C21.6603 6.09973 21.6461 6.19653 21.6182 6.28975L19.2182 14.2898C19.0913 14.7127 18.7019 15.0024 18.2603 15.0024H6.00436V17.0024H17.0044V19.0024H5.00436C4.45207 19.0024 4.00436 18.5547 4.00436 18.0024V6.41662ZM6.00436 7.00241V13.0024H17.5163L19.3163 7.00241H6.00436ZM5.50436 23.0024C4.67593 23.0024 4.00436 22.3308 4.00436 21.5024C4.00436 20.674 4.67593 20.0024 5.50436 20.0024C6.33279 20.0024 7.00436 20.674 7.00436 21.5024C7.00436 22.3308 6.33279 23.0024 5.50436 23.0024ZM17.5044 23.0024C16.6759 23.0024 16.0044 22.3308 16.0044 21.5024C16.0044 20.674 16.6759 20.0024 17.5044 20.0024C18.3328 20.0024 19.0044 20.674 19.0044 21.5024C19.0044 22.3308 18.3328 23.0024 17.5044 23.0024Z"
                fill="rgba(255,255,255,1)"
              ></path>
            </svg>
            <span
              className={`after:content-[''] after:right-0 after:-top-3 after:text-red-400 after:absolute text-lg font-medium text-slate-700`}
            ></span>
          </Link>
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
    </nav>
  );
};

export default Nav;
