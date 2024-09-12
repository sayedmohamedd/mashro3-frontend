import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthProvider = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  // const token = localStorage.getItem('token');
  return user ? children : <Navigate to="/login" replace={true}></Navigate>;
};

export default AuthProvider;
