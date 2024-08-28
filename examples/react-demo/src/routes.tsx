import { lazy } from 'react';
import React from 'react';

const Err = lazy(() => import('./pages/err'));

const routes = [
  {
    path: '*',
    element: <div>404</div>,
  },
  {
    path: '/err',
    element: <Err />,
  },
];

export default routes;
