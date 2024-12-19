import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DriverStandings from './components/DriverStandings';
import ConstructorsStandings from './components/ConstructorsStandings';
import RacesCalendar from './components/RacesCalendar';
import RaceDetails from './components/RaceDetails';
import Navbar from './components/Navbar';
import './styles.css';

function App() {
  const audioRef = useRef(null);
  
  useEffect(() => {
    // Tentar tocar o áudio após interação do usuário
    const handleUserInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.log('Erro ao tentar tocar áudio:', error);
        });
      }
      // Remover eventos após interação
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
    };

    // Adicionar evento para interações do usuário
    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('scroll', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={
            <>
              <h1>Classificação dos Pilotos</h1>
              <DriverStandings />
            </>
          } />

          <Route path="/constructors" element={
            <>
              <h1>Classificação dos Construtores</h1>
              <ConstructorsStandings />
            </>
          } />

          <Route path="/races" element={<RacesCalendar />} />
          <Route path="/races/:year/:round" element={<RaceDetails />} />
        </Routes>

        {/* Áudio escondido */}
        <audio ref={audioRef} loop>
          <source
            src="/musica.mp3"  // Caminho relativo para o arquivo de música (depois de movê-lo para a pasta public)
            type="audio/mp3"
          />
          Seu navegador não suporta áudio.
        </audio>
      </div>
    </Router>
  );
}

export default App;
