// React
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Components
import Checkout from './pages/Checkout';
import Contact from './components/Contact';
import Layout from './components/Layout/Layout';

// Pages
import MainPage from './pages/MainPage';
import Store from './pages/Store';
import Cart from './pages/Cart';
import ProductPage from './pages/ProductPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PaymentPage from './pages/PaymentPage';
import Dashboard from './pages/Dashboard';

// Protect Routes Components
import ProtectedRoutes from './components/ProtectRoutes/ProtectedRoutes';
import AuthRoutes from './components/ProtectRoutes/AuthRoutes';

// React Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import AdminRoutes from './components/ProtectRoutes/AdminRoutes';
import UpdateProduct from './pages/UpdateProduct';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/store" element={<Store />} />
            {/* Protected Routes */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<PaymentPage />} />
            </Route>
            {/* Admin Routes*/}
            <Route element={<AdminRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/dashboard/update/:slug"
                element={<UpdateProduct />}
              />
            </Route>
            <Route path="/products/:slug" element={<ProductPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route element={<AuthRoutes />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
