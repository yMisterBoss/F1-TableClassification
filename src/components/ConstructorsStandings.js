import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ConstructorsStandings() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Caminhos locais para os logotipos
  const teamLogos = {
    'Mercedes': '/logos/mercedes.png',
    'Ferrari': '/logos/ferrari.png',
    'Red Bull': '/logos/redbull.png',
    'McLaren': '/logos/mclaren.png',
    'Aston Martin': '/logos/astonmartin.png',
    'Alpine F1 Team': '/logos/alpine.png',
    'RB F1 Team': '/logos/alphatauri.png',
    'Haas F1 Team': '/logos/haas.png',
    'Williams': '/logos/williams.png',
    'Sauber': '/logos/sauber.png',
  };

  useEffect(() => {
    const fetchStandings = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('https://ergast.com/api/f1/current/constructorStandings.json');
        const constructors = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        setStandings(constructors);
      } catch (err) {
        setError('Erro ao carregar a classificação dos construtores. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  if (loading) {
    return <p>Carregando classificação...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="standings-container">
      {standings.map((team, index) => (
        <div key={team.Constructor.constructorId} className="team-card">
          <span className="position">#{index + 1}</span>
          {teamLogos[team.Constructor.name] ? (
            <img
              src={teamLogos[team.Constructor.name]}
              alt={`${team.Constructor.name} logo`}
              className="team-logo"
            />
          ) : (
            <span className="no-logo">Logo indisponível</span>
          )}
          <span className="team-name">{team.Constructor.name}</span>
          <span className="team-points">{team.points} pts</span>
        </div>
      ))}
    </div>
  );
}

export default ConstructorsStandings;
