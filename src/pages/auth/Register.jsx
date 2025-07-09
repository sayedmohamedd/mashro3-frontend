// Hooks
import { useEffect, useState } from 'react';
import axios from 'axios';
// React Router
import { Link, useNavigate } from 'react-router-dom';
// Utils
import url from '../../utils/url';
import { scrollTop } from '../../utils/helper';
// React Redux
import { useDispatch } from 'react-redux';
// Actions
import { login } from '../../redux/features/userReducer';
import { fetchCartProducts } from '../../redux/features/cartReducer';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle Register
  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post(`${url}/api/v1/users/register`, {
        username,
        email,
        password,
        phone,
      })
      .then((res) => {
        const token = res?.data?.token;
        const user = JSON.stringify(res?.data?.data?.user);
        dispatch(login({ token, user }));
        dispatch(fetchCartProducts());
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setError(err?.response?.data?.message);
      });
  };

  // Scroll Top
  useEffect(() => {
    scrollTop();
    return () => {};
  }, []);

  return (
    <section className="relative conatiner mx-auto min-h-[100vh]">
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-3 mx-auto w-[330px] mt-8 rounded-md px-6 py-5 shadow-md bg-white"
      >
        <div className="w-full mx-auto text-center flex flex-col gap-1">
          <p className="text-red-500">{error}</p>
        </div>
        <h1 className="text-center font-bold text-2xl text-slate-500">
          Sign Up
        </h1>
        <label htmlFor="username" className="text-base text-slate-500">
          Username
        </label>
        <input
          type="text"
          placeholder="username"
          className="border-b py-2 px-3 rounded-md bg-gray-200 focus:bg-gray-100"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="email" className="text-base text-slate-500">
          Email
        </label>
        <input
          type="email"
          placeholder="email"
          className="border-b py-2 px-3 rounded-md bg-gray-200 focus:bg-gray-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password" className="text-base text-slate-500">
          Password
        </label>
        <input
          type="password"
          placeholder="password"
          className="border-b py-2 px-3 rounded-md bg-gray-200 focus:bg-gray-100"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="phone" className="text-base text-slate-500">
          Phone
        </label>
        <input
          type="tel"
          placeholder="phone number"
          className="border-b py-2 px-3 rounded-md bg-gray-200 focus:bg-gray-100"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button
          type="submit"
          className="mx-auto w-24 py-1 my-1.5 rounded-md text-base font-medium text-white bg-green-400"
        >
          Sign Up
        </button>
        <p className="text-center text-gray-400 text-sm">
          I already have account
          <Link to="/login" className="ml-2 text-green-400">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
