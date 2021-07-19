import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import WeatherIcon from './weatherIcon';
import SearchCity from '../searchCityWeather/index';
import moment from 'moment';
import {
  Navbar,
  NavbarBrand,
} from 'reactstrap';

import logo from '../../assets/images/logo.gif'

import './weather.css';

const initialState = {
  city: '',
  weatherData: []
};

const reducer = (state, action) => {
  switch(action.type) {
    case 'SET_CITY':
      return {
        ...state, city: action.payload
      };
    case 'SET_WEATHER_DATA':
      return {
        ...state, weatherData: action.payload
      }
    default:
      return state;
  }
}

export const WeatherContext = React.createContext();

const Weather = () => {

  const [coordinates,  setCoordinates] = useState({
    lat: '',
    long: ''
  });

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoordinates(prevState => ({
          ...prevState,
          lat: position.coords.latitude,
          long: position.coords.longitude
        })
      )
    });
  }

  const callApi = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/weather/?lat=${coordinates.lat}&lon=${coordinates.long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
    .then(result => {
      dispatch({type: 'SET_WEATHER_DATA', payload: result.data})
    })
    .catch(err => {
      console.log('error')
    })
  }

  const cityWeather = (e) => {
    e.preventDefault();
    const { city } = state;
    axios.get(`${process.env.REACT_APP_API_URL}/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
    .then(response => {
      dispatch({type: 'SET_WEATHER_DATA', payload: response.data});
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchData();
    callApi();
  },[coordinates.lat, coordinates.long]);

  const { weatherData } = state;
  const iconData = weatherData?.weather ? weatherData?.weather[0] : {};

  return (
    <main>
      <Navbar className="container-fluid" color="transparent" full={true} light expand="md">
        <NavbarBrand className="brandText" href="/">
          My Weather App
          <img src={logo} alt="logo"/>
        </NavbarBrand>
      </Navbar>
      <WeatherContext.Provider value={{ state, dispatch, cityWeather }}>
        <SearchCity />
      </WeatherContext.Provider>
      <div className="weather-container">
        <article className="header">
          <h2>{weatherData?.name}, {weatherData?.sys?.country}</h2>
          <h4>{moment().format('dddd MMMM Do, YYYY')}</h4>
        </article>
        
        <section className="weather">
          <article className="desc">
            <WeatherIcon  iconData={iconData}/>
            <span className="descText">{ weatherData?.weather ? weatherData?.weather[0].description : ''}</span>
          </article>
          <article className="temp">
            <span>{parseInt(weatherData.main?.temp)}&deg;c</span>
          </article>
          <article className="wind">
            <p>Wind: {weatherData?.wind?.speed} m/s</p>
            <p>Sunrise: {new Date(weatherData?.sys?.sunrise*1000).toLocaleTimeString('en-IN')}</p>
            <p>Sunset: {new Date(weatherData?.sys?.sunset*1000).toLocaleTimeString('en-IN')}</p>
          </article>
        </section>
      </div>
    </main>
  )
}

export default Weather;