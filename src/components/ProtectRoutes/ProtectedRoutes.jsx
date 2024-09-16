import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const user = useSelector((state) => state.user.user);
  return user ? <Outlet /> : <Navigate to={'/login'} replace={true} />;
};

export default ProtectedRoutes;
