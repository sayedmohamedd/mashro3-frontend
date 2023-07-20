import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import Store from './components/Store';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Contact from './components/Contact';
import { useState } from 'react';

function App() {
  const [api, setApi] = useState('https://mashro3-backend.onrender.com/');
  return (
    <>
      <BrowserRouter>
        <Nav api={api} />
        <Routes>
          <Route path="/" element={<MainPage api={api} />} />
          <Route path="/store" element={<Store api={api} />} />
          <Route path="/cart" element={<Cart api={api} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
