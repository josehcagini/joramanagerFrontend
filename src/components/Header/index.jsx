import React from 'react';
import { Link } from 'react-router-dom';

import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';

export default function Header() {
  return (
    <nav>
      <Link to="/">
        <FaHome />
      </Link>
      <Link to="/register">
        <FaUserAlt />
      </Link>
      <Link to="/login">
        <FaSignInAlt />
      </Link>
    </nav>
  );
}
