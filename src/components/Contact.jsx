// Hooks
import { useState, useEffect } from 'react';
// Utils
import { scrollTop } from '../utils/helper';
import emailjs from 'emailjs-com';
import { toast, ToastContainer } from 'react-toastify';

const serviceID = 'service_yqo2wof';
const templateID = 'template_tl3kxz8';
const userID = '_Rz7rINg07A9kFJyv';

const Contact = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    emailjs
      .send(serviceID, templateID, formData, userID)
      .then(() => {
        toast.success('Email successfully sent');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((err) => console.log(err));
  };

  // Scroll Top
  useEffect(() => {
    scrollTop();
    return () => {};
  }, []);

  return (
    <section className="min-h-[100vh] container mx-auto px-5 mt-8">
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
      <h1 className="text-center text-2xl text-slate-900 font-medium mb-6">
        Contact Us
      </h1>
      <form
        onSubmit={submitForm}
        className="flex flex-col gap-8 mx-auto max-w-[350px] px-7 py-10 shadow-md bg-white rounded-md"
      >
        <input
          placeholder="name"
          type="text"
          name="name"
          className="border-b py-2 px-3 rounded-md bg-gray-200 focus:bg-gray-100"
          value={formData?.name}
          onChange={handleChange}
        />
        <input
          placeholder="email"
          type="email"
          name="email"
          className="border-b py-2 px-3 rounded-md bg-gray-200 focus:bg-gray-100"
          value={formData?.email}
          onChange={handleChange}
        />
        <textarea
          placeholder="message"
          className="border-b py-2 px-3 rounded-md min-h-[100px] bg-gray-200 focus:bg-gray-100"
          name="message"
          value={formData?.message}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-300 w-[30%] py-2 rounded-md font-medium text-white mx-auto"
        >
          Send
        </button>
      </form>
    </section>
  );
};

export default Contact;
