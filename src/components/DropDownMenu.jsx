import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/features/userReducer';

const DropDownMenu = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [toggleDropDown, setToggleDropDown] = useState(false);

  return (
    <div className={`relative inline lg:hidden`}>
      <button
        className="flex flex-col gap-1.5"
        onClick={() => setToggleDropDown((prev) => !prev)}
      >
        <div className="w-7 h-1 bg-white"></div>
        <div className="w-7 h-1 bg-white"></div>
        <div className="w-7 h-1 bg-white"></div>
      </button>

      {/* <!-- Dropdown menu --> */}
      <div
        className={`${
          toggleDropDown ? '' : 'hidden'
        } z-10 absolute top-8 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 overflow-hidden`}
      >
        {user && (
          <div className="px-4 py-3 text-sm text-gray-900 hover:bg-gray-600 hover:text-white">
            <div className="font-medium text-lg">{user?.username}</div>
            <div className="font-medium text-gray-400">{user?.email}</div>
          </div>
        )}
        <ul className="py-2 text-sm text-gray-700">
          {user?.role === 'admin' && (
            <li onClick={() => setToggleDropDown(false)}>
              <Link
                to="/dashboard"
                className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
              >
                Dashboard
              </Link>
            </li>
          )}
          <li onClick={() => setToggleDropDown(false)}>
            <Link
              to="/store"
              className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
            >
              Store
            </Link>
          </li>
          <li onClick={() => setToggleDropDown(false)}>
            <Link
              to="/contact"
              className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
            >
              Contact Us
            </Link>
          </li>
        </ul>
        {user && (
          <button
            className="block p-4 w-full text-sm text-gray-700 hover:bg-gray-600 hover:text-white"
            onClick={() => {
              dispatch(logout());
              setToggleDropDown(false);
            }}
          >
            Sign out
          </button>
        )}
        {!user && (
          <Link
            to="/login"
            className="block p-4 text-sm text-gray-700 hover:bg-gray-600 hover:text-white p"
            onClick={() => setToggleDropDown(false)}
          >
            login
          </Link>
        )}
      </div>
    </div>
  );
};

export default DropDownMenu;
