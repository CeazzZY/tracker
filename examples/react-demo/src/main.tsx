import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';

window.addEventListener('error', (err) => {
  console.log(err);
});

window.addEventListener('unhandledrejection', (err) => {
  console.log(err);
});

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
