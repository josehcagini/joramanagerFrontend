import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function MyRoute({ isClosed = false, ...rest }) {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn );
  const location = useLocation();

  if (isClosed && !isLoggedIn) {
    return <Navigate to="/login" state={{ prevPath: location }} />;
  }

  if( isLoggedIn && location.pathname === '/login'){
    return <Navigate to="/" replace />
  }

  return <Outlet {...rest} />;
}

MyRoute.propTypes = {
  isClosed: PropTypes.bool,
};
