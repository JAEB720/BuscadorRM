import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResidentInfo from './ResidentInfo';

const Location = () => {
  const [location, setLocation] = useState(null);
  const [locationId, setLocationId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [residentsPerPage, setResidentsPerPage] = useState(5);

  const handleInputChange = (event) => {
    setLocationId(event.target.value);
  };

  const fetchLocation = async () => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/location/${locationId}`);
      setLocation(response.data);
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetLocation = () => {
    if (locationId) {
      fetchLocation();
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!location) {
    return (
      <div className='BuscadorL'>
        <input type="text" value={locationId} onChange={handleInputChange} placeholder="Enter Location ID" />
        <button onClick={handleGetLocation}>Get Location</button>
        <div className='Uso'>los id’s de las ubicaciones
van del 1 al 126</div>
      </div>
    );
  }

  // Paginate residents
  const indexOfLastResident = currentPage * residentsPerPage;
  const indexOfFirstResident = indexOfLastResident - residentsPerPage;
  const currentResidents = location.residents.slice(indexOfFirstResident, indexOfLastResident);

  return (
    <div className='ContainerP'>
        <div className='ContaninerP1'>
      <h2 className='NameL'>{location.name}</h2>
      <p className='TypeL'>Type: {location.type}</p>
      <p className='DimensionL'>Dimension: {location.dimension}</p>
      <p className='NoRL'>Number of Residents: {location.residents.length}</p>

      <input className='inputL' type="text" value={locationId} onChange={handleInputChange} placeholder="Enter Location ID" />
      <button className='buttonL' onClick={handleGetLocation}>Get Location</button>
</div> <h3 className='ResidenL'>Residents:</h3>
<div className='H3RL'>
     
      {currentResidents.map((residentUrl) => (
        <ResidentInfo key={residentUrl} url={residentUrl} />
      ))}</div>

      <div className='buttons'>
        {location.residents.length > residentsPerPage && (
          <div className='Bts'>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous Page
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={indexOfLastResident >= location.residents.length}
            >
              Next Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Location;
