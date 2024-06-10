import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MyRoute from './MyRoute';

import Login from '../pages/Login';
import Home from '../pages/Home';
import Page404 from '../pages/Page404';


export default function Routers() {
  return (
    <Routes>
      <Route path="/login" element={<MyRoute isClosed={false} />}>
        <Route index element={<Login />} />
      </Route>

      <Route path='/' element={<MyRoute isClosed />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="*" element={<MyRoute />}>
        <Route index element={<Page404 />} />
      </Route>
    </Routes>
  );
}
