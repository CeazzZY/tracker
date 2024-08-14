import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
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
