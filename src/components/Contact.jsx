import { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-[100vh] container mx-auto mt-7">
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
          className="border-b py-2 px-3 rounded-md bg-gray-200 focus:bg-gray-100"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="email"
          type="email"
          className="border-b py-2 px-3 rounded-md bg-gray-200 focus:bg-gray-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="message"
          className="border-b py-2 px-3 rounded-md min-h-[100px] bg-gray-200 focus:bg-gray-100"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-300 w-[30%] py-2 rounded-md font-medium text-white mx-auto"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;
