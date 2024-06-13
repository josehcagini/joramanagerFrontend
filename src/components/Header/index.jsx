import React from 'react';
import { Link } from 'react-router-dom';

import { FaHome, FaSignInAlt, FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
import { Nav } from './styled';

import PropTypes from 'prop-types';

export default function Header({authState}) {



  return (
    <Nav>
      <Link to="/">
        <FaHome />
      </Link>
      <Link to="/register">
        <FaUserAlt />
      </Link>
      {
        authState.isLoggedIn &&
          <Link to="/logout">
            <FaSignOutAlt />
          </Link>
      }
      {
        !authState.isLoggedIn &&
          <Link to="/login">
            <FaSignInAlt />
          </Link>
      }

    </Nav>
  );
}

Header.propTypes = {
  authState: PropTypes.object,
};
