import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DriverCard from './DriverCard';

const DriverStandings = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await axios.get('https://ergast.com/api/f1/current/driverStandings.json');
        const standingsList = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        setStandings(standingsList);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  if (loading) {
    return <p>A carregar classificações...</p>;
  }

  return (
    <div className="standings">
      {standings.map((driver) => (
        <DriverCard key={driver.Driver.driverId} driver={driver} />
      ))}
    </div>
  );
};

export default DriverStandings;
