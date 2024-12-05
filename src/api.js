import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ergast.com/api/f1',
});

export const fetchRaces = async (year) => {
  const response = await api.get(`/${year}.json`);
  return response.data.MRData.RaceTable.Races;
};

export const fetchRaceResults = async (year, round) => {
  const response = await api.get(`/${year}/${round}/results.json`);
  return response.data.MRData.RaceTable.Races[0]; // Retorna dados da corrida
};
