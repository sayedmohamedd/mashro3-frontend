// React
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Components
import Nav from './components/Nav';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import Store from './components/Store';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import ProductPage from './components/ProductPage';

// react auth
import { AuthProvider, RequireAuth } from 'react-auth-kit';

function App() {
  const [api] = useState('https://mashro3-backend.onrender.com/');
  // const [api] = useState('http://localhost:3002/');
  return (
    <>
      <AuthProvider
        authType="cookie"
        authName={'_auth'}
        cookieSecure={false}
        cookieDomain={window.location.hostname}
      >
        <BrowserRouter>
          <Nav api={api} />
          <Routes>
            <Route path="/" element={<MainPage api={api} />} />
            <Route path="/store" element={<Store api={api} />} />
            {/* <Route path="/store/:category" element={<Store api={api} />} /> */}
            <Route
              path="/cart"
              element={
                <RequireAuth loginPath="/login">
                  <Cart api={api} />
                </RequireAuth>
              }
            />
            <Route path="/checkout" element={<Checkout api={api} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login api={api} />} />
            <Route path="/register" element={<Register api={api} />} />
            <Route path="/products/:slug" element={<ProductPage api={api} />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
