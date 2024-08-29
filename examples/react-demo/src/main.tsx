import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import { initWeb } from '@ceazzzy-tracing/web';

initWeb({});

function App() {
  return (
    <>{<RouterProvider router={createHashRouter(routes)}></RouterProvider>}</>
  );
}

ReactDOM.createRoot(document.querySelector('#app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
