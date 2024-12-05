import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function RacesCalendar() {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRaces = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('https://ergast.com/api/f1/current.json');
        console.log('API Response:', response.data); // Log para depuração
        const calendar = response.data.MRData.RaceTable.Races.map((race) => ({
          round: race.round,
          season: race.season, // Incluí o ano
          raceName: race.raceName,
          date: race.date,
          completed: new Date(race.date) < new Date(), // Verifica se a corrida já ocorreu
        }));
        setRaces(calendar);
      } catch (error) {
        console.error('Erro ao buscar o calendário de corridas:', error);
        setError('Não foi possível carregar o calendário. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchRaces();
  }, []);

  if (loading) {
    return <p className="loading">Carregando calendário de corridas...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="calendar-container">
      <h1>Calendário de Corridas</h1>
      {races.length > 0 ? (
        races.map((race) => (
          
          <div key={race.round} className="race-card">
            <h3>{race.raceName}</h3>
            <p>
              <strong>Data:</strong> {new Date(race.date).toLocaleDateString()}
            </p>
            {race.completed ? (
              <Link to={`/races/${race.season}/${race.round}`} className="details-link">
                Ver Detalhes
              </Link>
            ) : (
              <span className="disabled">Corrida Não Realizada</span>
            )}
          </div>
        ))
      ) : (
        <p className="no-races">Nenhuma corrida encontrada para esta temporada.</p>
      )}
    </div>
  );
}

export default RacesCalendar;
