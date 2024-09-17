// Hooks
import { useEffect, useState } from 'react';
import axios from 'axios';
// React Router
import { Link, useNavigate } from 'react-router-dom';
// React Redux
import { useDispatch } from 'react-redux';
// Actions
import { login } from '../../redux/features/userReducer';
import { fetchCartProducts } from '../../redux/features/cartReducer';
import url from '../../utils/url';
import { scrollTop } from '../../utils/helper';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const navigate = useNavigate();

  // Login Function
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${url}/api/v1/users/login`, { email, password })
      .then((res) => {
        const token = res?.data?.token;
        const user = res?.data?.data?.user;
        dispatch(login({ token, user }));
        dispatch(fetchCartProducts());
        navigate('/');
      })
      .catch((err) => setResult(err?.response?.data?.message));
  };

  // Scroll Top
  useEffect(() => {
    scrollTop();
    return () => {};
  }, []);

  return (
    <section className="conatiner mx-auto min-h-[82vh]">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 mx-auto w-[330px] mt-10 rounded-md px-6 py-5 bg-white shadow-md"
      >
        <div className="w-full mx-auto text-center flex flex-col gap-1">
          {result && <p className="text-red-500">{result}</p>}
          {/* {result?.map((item) => (
            <p key={item.msg} className="text-red-500">
              {item.msg}
            </p>
          ))} */}
        </div>
        <h1 className="text-center font-bold text-2xl text-slate-900">Login</h1>
        <label htmlFor="email" className="text-lg text-slate-800">
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
        <label htmlFor="password" className="text-lg text-slate-800">
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
        <button
          type="submit"
          className="mx-auto w-24 py-1.5 rounded-md text-lg font-medium text-white bg-green-400"
        >
          Login
        </button>
        <p className="text-center text-slate-800">I have not account</p>
        <button className="mx-auto w-24 py-1.5 rounded-md text-lg font-medium text-white bg-gray-400">
          <Link to="/register">Register</Link>
        </button>
      </form>
    </section>
  );
};

export default Login;
