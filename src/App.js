// React
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Components
import Nav from './components/Nav';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import Store from './components/Store';
import Checkout from './pages/Checkout';
import Contact from './components/Contact';
import AuthProvider from './pages/auth/AuthProvider';

// Pages
import Cart from './pages/Cart';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProductPage from './pages/ProductPage';

// react auth
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  // const [api] = useState('https://mashro3-backend.onrender.com/');
  const api = 'http://localhost:3002/';
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
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
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products/:slug" element={<ProductPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
