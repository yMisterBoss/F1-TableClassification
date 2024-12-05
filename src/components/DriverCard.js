import React from 'react';

const DriverCard = ({ driver }) => {
  const { Driver, Constructors, position, points } = driver;

  return (
    <div className="driver-card">
      <h2>
        {position}. {Driver.givenName} {Driver.familyName}
      </h2>
      <p>Equipe: {Constructors[0].name}</p>
      <p>Pontos: {points}</p>
    </div>
  );
};

export default DriverCard;
