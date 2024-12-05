import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Importa o componente App

// Não há necessidade do 'reportWebVitals' neste caso
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  // Onde o React irá renderizar o conteúdo
);
