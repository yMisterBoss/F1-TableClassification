import React from 'react';
import { Link } from 'react-router-dom';  // Importando o Link para navegação
import './Navbar.css';


const Navbar = () => {
  return (
    <>
    <nav className="navbar">
      <ul>
        <li><Link to="/">Classificação dos Pilotos</Link></li>
        <li><Link to="/constructors">Classificação dos Construtores</Link></li>
        <li><Link to="/races">Calendário de Corridas</Link></li>
      </ul>
    </nav>
    <br></br>
    </>
  );
};

export default Navbar;
