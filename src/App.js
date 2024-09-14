// React
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Components
import Checkout from './pages/Checkout';
import Contact from './components/Contact';
import Layout from './components/Layout/Layout';
import AuthProvider from './pages/auth/AuthProvider';

// Pages
import MainPage from './pages/MainPage';
import Store from './pages/Store';
import Cart from './pages/Cart';
import ProductPage from './pages/ProductPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PaymentPage from './pages/PaymentPage';

// React Redux
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/store" element={<Store />} />
            <Route
              path="/cart"
              element={
                <AuthProvider>
                  <Cart />
                </AuthProvider>
              }
            />
            <Route
              path="/checkout"
              element={
                <AuthProvider>
                  <Checkout />
                </AuthProvider>
              }
            />
            <Route
              path="/payment"
              element={
                <AuthProvider>
                  <PaymentPage />
                </AuthProvider>
              }
            />
            <Route path="/products/:slug" element={<ProductPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/login"
              element={
                !localStorage.getItem('token') ? <Login /> : <MainPage />
              }
            />
            <Route
              path="/register"
              element={
                !localStorage.getItem('token') ? <Register /> : <MainPage />
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
