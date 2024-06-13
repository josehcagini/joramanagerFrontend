import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MyRoute from './MyRoute';

import Login from '../pages/Login';
import Home from '../pages/Home';
import Page404 from '../pages/Page404';
import Logout from '../pages/Logout';


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

      <Route path="*" element={<MyRoute />}>
        <Route path='*' element={<Page404 />} />
      </Route>
    </Routes>
  );
}
