import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import SemAutorizacao from '../pages/SemAutorizacao';
import Acessos from '../services/acessos';

export default function MyRoute({ isClosed = false, ...rest }) {

  const locationPath = useLocation()

  const auth = useSelector((state) => state.auth );
  const { isLoggedIn } = auth;

  const [acessosHeader, setAcessosHeader] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const { selfEdit } = locationPath?.state || false

  useEffect(()=> {

    async function fecthAcess(){
      if(!auth.usuario.grupoId) {
        setIsLoading(false)
        return
      }
      const res = await Acessos.getAcessos(auth.usuario.grupoId)
      setAcessosHeader(res)
      setIsLoading(false)
    }

    fecthAcess()
  }, [isLoggedIn])

  if (isClosed && !isLoggedIn) {
    return <Navigate to="/login" state={{ prevPath: locationPath }} />;
  }

  if( isLoggedIn && locationPath.pathname === '/login'){
    return <Navigate to="/" replace />
  }

  if(isClosed ){
    if(isLoading) return <SemAutorizacao />;
    const access = acessosHeader.find((e) => {
      if(e.isRegEx ? (new RegExp(e.path)).test(locationPath.pathname) : e.path === locationPath.pathname){
          return selfEdit  ? e.selfEdit : !e.selfEdit
        }
    })

    if(!access?.hasAccess){
      return <SemAutorizacao />;
    }
  }

  return <Outlet {...rest} />;

}

MyRoute.propTypes = {
  isClosed: PropTypes.bool,
};
