import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoutes = () => {
  const user = useSelector((state) => state.user.user);
  return !user ? <Outlet /> : <Navigate to={'/'} replace={true} />;
};

export default AuthRoutes;
