import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import { initWeb } from '@ceazzzy-tracing/web';

initWeb({});

function App() {
  return (
    <Suspense fallback="">
      {<RouterProvider router={createHashRouter(routes)}></RouterProvider>}
    </Suspense>
  );
}

ReactDOM.createRoot(document.querySelector('#app')!).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
