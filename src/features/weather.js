import React from 'react';
import WeatherIcon from './weatherIcon';

import './styles.css';

const Weather = (props) => {
  const { weatherData } = props;
  const iconData = weatherData?.weather ? weatherData?.weather[0] : {};

  return (
    <div className="container">
      <header>{weatherData?.name}</header>
      <section className="weather">
        <article className="desc">
          <WeatherIcon  iconData={iconData}/>
          <span>{ weatherData?.weather ? weatherData?.weather[0].description : ''}</span>
        </article>
        <article className="temp">
          <span>{weatherData.main?.temp}&deg;c</span>
        </article>
        <article className="wind">
          <p>Wind: {weatherData?.wind?.speed} m/s</p>
          <p>Sunrise: {new Date(weatherData?.sys?.sunrise*1000).toLocaleTimeString('en-IN')}</p>
          <p>Sunset: {new Date(weatherData?.sys?.sunset*1000).toLocaleTimeString('en-IN')}</p>
        </article>
      </section>
    </div>
  )
}

export default Weather;