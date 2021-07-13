import React, { useState, useEffect } from 'react';
import Weather from './features/weather';
import SearchCity from './features/searchCity/index';

import './App.css';

function App() {

  const [lat, setLat] = useState([0]);
  const [long, setLong] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
      console.log('Outside')
    }

    const callApi = async () => {
      await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
      })
      .catch(err => {
        console.log('error')
      })
    }
    
    fetchData();
    callApi();
    
  }, [lat,long]);

  return (
    <div>
      <SearchCity />
      { (typeof data.main!= undefined) ? (
        <Weather weatherData={data}/>
      ) : (
        <div>False</div>
      )}
    </div>
  );
}

export default App;
