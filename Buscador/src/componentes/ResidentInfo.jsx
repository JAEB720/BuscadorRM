import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResidentInfo = ({ url }) => {
  const [resident, setResident] = useState(null);

  useEffect(() => {
    const fetchResident = async () => {
      try {
        const response = await axios.get(url);
        setResident(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResident();
  }, [url]);

  if (!resident) {
    return <div>Loading...</div>;
  }

  const getStatusText = () => {
    if (resident.status === 'Alive') {
      return 'Vivo';
    } else if (resident.status === 'Dead') {
      return 'Muerto';
    } else {
      return 'Desconocido';
    }
  };

  return (
    <div className='Container' >
      <h4>{resident.name}</h4>
      <img src={resident.image} alt={resident.name} />
      <p>Status: {getStatusText()}</p>
      <p>Lugar de origen: {resident.origin.name}</p>
      <p>Cantidad de episodios: {resident.episode.length}</p>
    </div>
  );
};

export default ResidentInfo;
