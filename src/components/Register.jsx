import Axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = ({ api }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    scrollTop();
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    // if (username && email && password && phone) {
    Axios.post(api + 'api/register', { username, email, password, phone })
      .then((res) => {
        setResult(res.data.msg);
        if (res.data.success) {
          setUsername('');
          setEmail('');
          setPassword('');
          setPhone('');
          navigate('/login');
        }
      })
      .catch((err) => console.log(err));
    // }
  };

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className="conatiner mx-auto min-h-[100vh]">
      {/* <div className="w-[20%] mx-auto text-center flex flex-col gap-1">
        {result?.map((msg) => (
          <p key={msg} className="text-red-500 bg-gray-300 px-2">
            {msg}
          </p>
        ))}
      </div> */}
      <form
        onSubmit={submitForm}
        className="flex flex-col gap-4 mx-auto w-[330px] mt-8 rounded-md px-6 py-5 shadow-md bg-white"
      >
        <h1 className="text-center font-bold text-2xl text-slate-900">
          Register
        </h1>
        <label htmlFor="username" className="text-lg text-slate-800">
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
          minLength="8"
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
        <label htmlFor="phone" className="text-lg text-slate-800">
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
          className="mx-auto w-24 py-1.5 rounded-md text-lg font-medium text-white bg-green-400"
        >
          Register
        </button>
        <p className="text-center text-slate-800">I already have account</p>
        <button className="mx-auto w-24 py-1.5 rounded-md text-lg font-medium text-white bg-gray-400">
          <Link to="/login">Login</Link>
        </button>
      </form>
    </section>
  );
};

export default Register;
