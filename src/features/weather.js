import React from 'react';
import WeatherIcon from './weatherIcon';

import './styles.css';

const Weather = (props) => {
  const { weatherData } = props;
  const iconData = weatherData?.weather ? weatherData?.weather[0] : {};

  return (
    <main className="container">
      <header>{weatherData?.name}</header>
      <section className="weather">
        <article className="desc">
          <WeatherIcon  iconData={iconData}/>
          <p>{ weatherData?.weather ? weatherData?.weather[0].description : ''}</p>
        </article>
        <article className="temp">
          <p>{weatherData.main?.temp}&deg;c</p>
        </article>
        <article className="wind">
          <p>Wind: {weatherData?.wind?.speed} m/s</p>
          <p>Sunrise: {new Date(weatherData?.sys?.sunrise*1000).toLocaleTimeString('en-IN')}</p>
          <p>Sunset: {new Date(weatherData?.sys?.sunset*1000).toLocaleTimeString('en-IN')}</p>
        </article>
      </section>
    </main>
  )
}

export default Weather;