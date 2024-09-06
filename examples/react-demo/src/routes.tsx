import { lazy } from 'react';
import React from 'react';
import { Navigate } from 'react-router-dom';

const Err = lazy(() => import('./pages/err'));
const Home = lazy(() => import('./pages/home'));
const Pv = lazy(() => import('./pages/pv.tsx'));

const routes = [
  {
    path: '*',
    element: <div>404</div>,
  },
  {
    path: '',
    element: <Navigate to="/home" />,
  },
  {
    path: 'home',
    element: <Home />,
  },
  {
    path: 'pv',
    element: <Pv />,
  },
  {
    path: 'err',
    element: <Err />,
  },
];

export default routes;
