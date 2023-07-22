import Axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const Login = ({ api }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState();
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies(['access_token']);
  const submitForm = (e) => {
    e.preventDefault();
    Axios.post(`${api}api/login`, { email, password })
      .then((res) => {
        setResult(res.data);
        if (res.data.success) {
          setEmail('');
          setPassword('');
          setCookie('access_token', res.data.token);
          window.localStorage.setItem('userId', res.data.userId);
          navigate('/');
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <section className="conatiner mx-auto min-h-[82vh]">
      <form
        onSubmit={submitForm}
        className="flex flex-col gap-4 mx-auto w-[330px] mt-10 rounded-md px-6 py-5 bg-white shadow-md"
      >
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
