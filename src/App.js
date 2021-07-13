import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import Weather from './features/weather';
import SearchCity from './features/searchCity/index';

import './App.css';

export const WeatherContext = React.createContext();

const initialState = {
  city: ''
};

const reducer = (state, action) => {
  switch(action.type) {
    case 'SET_CITY':
      return {
        ...state, city: action.payload
      }
    default:
      return state;
  }
}

function App() {

  const [lat, setLat] = useState([0]);
  const [long, setLong] = useState(0);
  const [data, setData] = useState([]);

  const [state, dispatch] = useReducer(reducer, initialState);

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

  const cityWeather = (e) => {
    e.preventDefault();
    const { city } = state;
    axios.get(`${process.env.REACT_APP_API_URL}/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
    .then(response => {
      setData(response.data);
    })
    .catch(err => {
      console.log(err);
    })
  }
  return (
    <WeatherContext.Provider value={{ city: state.city, dispatch}}>
      <div>
        <SearchCity getCityWeather={cityWeather}/>
        { (typeof data.main!= undefined) ? (
          <Weather weatherData={data}/>
        ) : (
          <div>False</div>
        )}
      </div>
    </WeatherContext.Provider>
  );
}

export default App;
