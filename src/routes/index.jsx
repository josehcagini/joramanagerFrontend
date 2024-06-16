import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MyRoute from './MyRoute';

import Login from '../pages/Login';
import Home from '../pages/Home';
import Page404 from '../pages/Page404';
import Logout from '../pages/Logout';
import UsuarioCreate from '../pages/UsuarioCreate';
import UsuarioList from '../pages/UsuarioList';
import UsuarioEdit from '../pages/UsuarioEdit';
import AtividadeCreate from '../pages/Atividade/Registrar';
import AtividadeList from '../pages/Atividade/Listar';
import AtividadeEdit from '../pages/Atividade/Editar';
import PropTypes from 'prop-types';


export default function Routers({acessos}) {
  return (
    <Routes>
      <Route path="/login" element={<MyRoute acessos={acessos} isClosed={false} />}>
        <Route index element={<Login />} />
      </Route>

      <Route path="/logout" element={<MyRoute acessos={acessos} isClosed={true} />}>
        <Route index element={<Logout />} />
      </Route>

      <Route path='/' element={<MyRoute acessos={acessos} isClosed={true} />}>
        <Route index element={<Home />} />
      </Route>

      <Route path='/usuario' element={<MyRoute acessos={acessos} isClosed={true} />}>
        <Route path='/usuario/registrar' element={<UsuarioCreate />} />
        <Route path='/usuario/listar' element={<UsuarioList />} />
        <Route path='/usuario/:usuarioId/editar' element={<UsuarioEdit />} />
      </Route>

      <Route path='/atividade' element={<MyRoute acessos={acessos} isClosed={true} />}>
        {/* <Route path='/atividade/registrar' element={<AtividadeCreate />} /> */}
        <Route path='/atividade/listar' element={<AtividadeList />} />
        {/* <Route path='/atividade/:atividadeId/editar' element={<AtividadeEdit />} /> */}
      </Route>

      <Route path="*" element={<MyRoute />}>
        <Route path='*' element={<Page404 />} />
      </Route>
    </Routes>
  );
}

Routers.propTypes = {
  acessos: PropTypes.array,
};
