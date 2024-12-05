import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RaceDetails() {
  const { round } = useParams(); // Obtém o número da rodada (corrida)
  const [race, setRace] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRaceDetails = async () => {
      console.log('Fetching race details for round:', round); // Log para verificar o round

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://ergast.com/api/f1/current/${round}/results.json`);
        console.log('API Response:', response.data); // Log da resposta da API

        const raceData = response.data.MRData.RaceTable.Races[0];

        if (raceData) {
          setRace(raceData);
          setResults(raceData.Results);
          console.log('Race Data:', raceData); // Log dos detalhes da corrida
        } else {
          setError('Nenhuma informação encontrada para esta corrida.');
        }
      } catch (err) {
        console.error('Erro ao buscar dados da API:', err); // Log do erro
        setError('Erro ao carregar os detalhes da corrida. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchRaceDetails();
  }, [round]);

  if (loading) {
    return <p className="loading">Carregando detalhes da corrida...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!race) {
    return <p className="error-message">Detalhes da corrida não encontrados.</p>;
  }

  return (
    <div className="details-container">
      <h2 className="race-title">Resultados da Corrida - {race.raceName}</h2>
      <p className="race-date">
        <strong>Data:</strong> {new Date(race.date).toLocaleDateString()}
      </p>
      <p className="race-location">
        <strong>Local:</strong> {race.Circuit.circuitName} ({race.Circuit.Location.locality}, {race.Circuit.Location.country})
      </p>

      {results.length > 0 ? (
        <div className="results-list">
          {results.map((result, index) => (
            <div key={index} className="result-item">
              <span className="position">#{result.position}</span>
              <span className="driver">
                {result.Driver.givenName} {result.Driver.familyName} ({result.Constructor.name})
              </span>
              <span className="points">{result.points} pts</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">Sem resultados disponíveis.</p>
      )}
    </div>
  );
}

export default RaceDetails;
