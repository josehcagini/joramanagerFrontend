import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { FaHome, FaSignInAlt, FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
import { Nav } from './styled';

import PropTypes from 'prop-types';
import axios from '../../services/axios';
import getErrorMessage from '../../utils/getErrorMessage';

export default function Header({authState}) {

  const [acessos, setAcessos] = useState([])
  const location = useLocation();

  useEffect(() => {

    async function getAcessos(){
      try {
        const response = await axios.get(`/grupo/${authState.usuario.grupoId}/acessos`)

        setAcessos(response.data.acessos)

      } catch (error) {
        const message = getErrorMessage(error)
        console.log( 'getacesso',message)
      }
    }

    if (location.pathname !== '/login') getAcessos()

  }, [setAcessos, authState, location])

  return (
    <Nav>
      <Link to="/">
        <FaHome />
      </Link>

      {
      acessos.registrarUsuario &&
        <Link to="/usuario/registrar">
          <FaUserAlt />
        </Link>
      }

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
