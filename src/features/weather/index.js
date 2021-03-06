import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Loader from "react-loader-spinner";
import WeatherIcon from './weatherIcon';
import SearchCity from '../searchCityWeather/index';
import moment from 'moment';
import { Navbar, NavbarBrand } from 'reactstrap';
import logo from '../../assets/images/logo.gif';
import CityNotFound from './cityNotFound';
import { reducer, initialState } from '../../reducer/reducer';
import  { getCityWeather, getCurrentLocationWeather } from '../weatherSlice';

import './weather.css';

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

  const callApi = useCallback(() => {
    dispatch({type: 'SET_WEATHER_DATA_API_STATUS', payload: 'inProgress'})
    getCurrentLocationWeather(coordinates)
    .then(res => {
      dispatch({type: 'SET_WEATHER_DATA', payload: res.data})
      dispatch({type: 'SET_WEATHER_DATA_API_STATUS', payload: 'found'})
    })
    .catch(err => {
      dispatch({type: 'SET_WEATHER_DATA_API_STATUS', payload: 'error'})
    })
  },[coordinates.lat, coordinates.long])

  const cityWeather = (e) => {
    e.preventDefault();
    dispatch({type: 'SET_WEATHER_DATA_API_STATUS', payload: 'inProgress'});
    const { city } = state;
    getCityWeather(city)
    .then(response => {
      dispatch({type: 'SET_WEATHER_DATA', payload: response.data});
      dispatch({type: 'SET_WEATHER_DATA_API_STATUS', payload: 'found'})
    })
    .catch(err => {
      dispatch({type: 'SET_WEATHER_DATA_API_STATUS', payload: 'error'})
    })
  }

  useEffect(() => {
    fetchData();
    if(coordinates.lat && coordinates.long) {
      callApi();
    }
  },[coordinates.lat, coordinates.long]);

  const { weatherData, weatherDataApiStatus } = state;
  // const { forecastData } = state;
  const iconData = weatherData?.weather ? weatherData?.weather[0] : {};
  return (
    <main>
      <Navbar className="container-fluid" color="transparent" full={true} light expand="md">
        <NavbarBrand className="brandText" href="/">
          My Weather App
          <img src={logo} alt="logo" className="brandImg"/>
        </NavbarBrand>
      </Navbar>
      <WeatherContext.Provider value={{ state, dispatch, cityWeather }}>
        <SearchCity />
      </WeatherContext.Provider>
      { weatherDataApiStatus === 'inProgress' || weatherDataApiStatus === 'notStarted' ?
          <div className="loading">
            <Loader
              type="TailSpin"
              color="#FFF"
              height={100}
              width={100}
            />
          </div>
           : weatherDataApiStatus === 'error' ? 
              <CityNotFound />
           :
          <div className="weather-container">
            <article className="header">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="locationIcon"/>
              <span> {weatherData?.name}, {weatherData?.sys?.country}</span>
              <h4>{moment().format('dddd MMMM Do, YYYY')}</h4>
            </article>
            
            <section className="weather">
              <article className="desc">
                <WeatherIcon  iconData={iconData} className='icon'/>
                <span className="descText">{ weatherData?.weather ? weatherData?.weather[0].description : ''}</span>
              </article>
              <article className="temp">
                <span>{parseInt(weatherData.main?.temp)}&deg;c</span>
              </article>
              <article className="detailsContainer">
                <article>
                  <h4>{parseInt(weatherData?.main?.temp_min)}&deg;c</h4>
                  <span>Low</span>
                </article>
                <article>
                  <h4>{weatherData?.wind?.speed} m/s</h4>
                  <span>Wind</span>
                </article>
                <article>
                  <h4>{weatherData.main?.humidity}%</h4>
                  <span>Humidity</span>
                </article>
                <article>
                  <h4>{parseInt(weatherData?.main?.temp_max)}&deg;c</h4>
                  <span>High</span>
                </article>
                <article>
                  <h4>{new Date(weatherData?.sys?.sunrise*1000).toLocaleTimeString('en-IN',{hour: '2-digit', minute:'2-digit'})}</h4>
                  <span>Sunrise</span>
                </article>
                <article>
                  <h4>{new Date(weatherData?.sys?.sunset*1000).toLocaleTimeString('en-IN',{hour: '2-digit', minute:'2-digit'})}</h4>
                  <span>Sunset</span>
                </article>
              </article>
            </section>
          </div>
        } 
      {/* <WeatherContext.Provider value={{forecastData}}>
        <Forecast />
      </WeatherContext.Provider> */}
    </main>
  )
}

export default Weather;