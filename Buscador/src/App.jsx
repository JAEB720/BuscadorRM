import React, { useState, useEffect } from 'react';
import Location from './componentes/Location';
import Loader from './componentes/Loader';
import './App.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulación de una carga de datos o proceso
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2000 ms = 2 segundos
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Location />
        </div>
      )}
    </div>
  );
};

export default App;
