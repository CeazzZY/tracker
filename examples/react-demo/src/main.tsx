import React from 'react';
import ReactDOM from 'react-dom/client';
import test from '@ceazzzy-tracker/core';

function App() {
  test();
  return (
    <>
      <div>Hello</div>
    </>
  );
}

ReactDOM.createRoot(document.querySelector('#app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
