import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DriverStandings from './components/DriverStandings';
import ConstructorsStandings from './components/ConstructorsStandings';
import RacesCalendar from './components/RacesCalendar';
import RaceDetails from './components/RaceDetails';
import Navbar from './components/Navbar';
import './styles.css';

function App() {
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
      </div>
    </Router>
  );
}

export default App;
