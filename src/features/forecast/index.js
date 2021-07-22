import React, { useContext } from 'react';
import { WeatherContext } from '../weather/index';
import WeatherIcon from '../weather/weatherIcon';

import './forecast.css';

const Forecast = () => {
  const weatherContext = useContext(WeatherContext);
  const { forecastData: { city, list: hourlyWeather } } = weatherContext;
  return (
    <div className="forecastContainer">
      <header>Forecast</header>
      <section className="hourTemp">
      { hourlyWeather?.map((hourWeather,key) => (
        
          <section key={key}>
            <WeatherIcon  iconData={hourWeather?.weather[0]} className='hourlyIcon'/>
            
            <h4>{parseInt(hourWeather?.main?.temp)}&deg;c</h4>
          </section>
        
      ))}
      </section>
    </div>
  )
}

export default Forecast;