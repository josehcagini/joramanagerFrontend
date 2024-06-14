import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MyRoute from './MyRoute';

import Login from '../pages/Login';
import Home from '../pages/Home';
import Page404 from '../pages/Page404';
import Logout from '../pages/Logout';
import UsuarioCreate from '../pages/UsuarioCreate';


export default function Routers() {
  return (
    <Routes>
      <Route path="/login" element={<MyRoute />}>
        <Route index element={<Login />} />
      </Route>

      <Route path="/logout" element={<MyRoute isClosed />}>
        <Route index element={<Logout />} />
      </Route>

      <Route path='/' element={<MyRoute isClosed />}>
        <Route index element={<Home />} />
      </Route>

      <Route path='/usuario' element={<MyRoute isClosed />}>
        <Route path='/usuario/registrar' element={<UsuarioCreate />} />
      </Route>

      <Route path="*" element={<MyRoute />}>
        <Route path='*' element={<Page404 />} />
      </Route>
    </Routes>
  );
}
