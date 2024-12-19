import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Troca entre Dark Mode e Light Mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Atualiza a classe do body baseado no modo atual
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/">Classificação dos Pilotos</Link>
        <Link to="/constructors">Classificação dos Construtores</Link>
        <Link to="/races">Calendário de Corridas</Link>
      </div>
      <button onClick={toggleDarkMode} className="dark-mode-button">
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </nav>
  );
}

export default Navbar;
