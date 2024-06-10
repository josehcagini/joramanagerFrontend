import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function MyRoute({ isClosed = false, ...rest }) {

  const location = useLocation();

  if (isClosed ) {
    return <Navigate to="/login" state={{ prevPath: location }} />;
  }

  return <Outlet {...rest} />;
}

MyRoute.propTypes = {
  isClosed: PropTypes.bool,
};
