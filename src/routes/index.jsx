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
import Atividade from '../pages/Atividade/Atividade';
import AtividadeDashBoard from '../pages/Atividade/AtividadeDashBoard';

export default function Routers() {
  return (
    <Routes>
      <Route path="/login" element={<MyRoute isClosed={false} />}>
        <Route index element={<Login />} />
      </Route>

      <Route path="/logout" element={<MyRoute isClosed={true} />}>
        <Route index element={<Logout />} />
      </Route>

      <Route path='/' element={<MyRoute isClosed={true} />}>
        <Route index element={<Home />} />
      </Route>

      <Route path='/usuario' element={<MyRoute isClosed={true} />}>
        <Route path='/usuario/registrar' element={<UsuarioCreate />} />
        <Route path='/usuario/listar' element={<UsuarioList />} />
        <Route path='/usuario/:usuarioId/editar' element={<UsuarioEdit />} />
      </Route>

      <Route path='/atividade' element={<MyRoute isClosed={true} />}>
        <Route path='/atividade/registrar' element={<Atividade />} />
        <Route path='/atividade/listar' element={<AtividadeDashBoard />} />
        <Route path='/atividade/:usuarioId/editar' element={<Atividade />} />
      </Route>

      <Route path="*" element={<MyRoute />}>
        <Route path='*' element={<Page404 />} />
      </Route>
    </Routes>
  );
}
