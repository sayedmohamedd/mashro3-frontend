import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoutes = () => {
  const user = useSelector((state) => state.user.user);
  return user.role === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to={'/'} replace={true} />
  );
};

export default AdminRoutes;
