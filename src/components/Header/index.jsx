import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FaHome, FaSignInAlt, FaUserAlt, FaSignOutAlt, FaRegUserCircle } from 'react-icons/fa';
import { Nav } from './styled';

import PropTypes from 'prop-types';
import Acessos from '../../services/acessos';
import { useSelector } from 'react-redux';

export default function Header({authState}) {

  const [isLoading, setIsLoading] = useState(true)
  const [registrarUsuario, setRegistrarUsuario] = useState(false)
  const auth = useSelector((state) => state.auth );
  const [, setAcessosHeader] = useState([])

  useEffect(()=> {
    async function fecthAcess(){
      if(!auth.usuario.grupoId) {
        return
      }
      const res = await Acessos.getAcessos(auth.usuario.grupoId)
      setAcessosHeader(res)
      setRegistrarUsuario(!!res.find(acesso => acesso.path === "/usuario/listar" && acesso.hasAccess))

      setIsLoading(false)
    }
    fecthAcess()
  }, [isLoading, auth.usuario.grupoId])

  return (
    !isLoading &&
    <Nav>
      <Link to="/">
        <FaHome />
      </Link>

      {
      registrarUsuario &&
        <Link to="/usuario/listar">
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
      {
        authState.isLoggedIn &&
          <Link reloadDocument to={`/usuario/${authState.usuario.id}/editar`} state={ {usuarioEdit: authState.usuario, selfEdit: true} }>
            <FaRegUserCircle />
          </Link>
      }
    </Nav>
  );
}

Header.propTypes = {
  authState: PropTypes.object,
};
