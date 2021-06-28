import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SyncIcon from '@material-ui/icons/Sync';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';

import './styles.css';

const useStyles = makeStyles({
  root: {
    border: '1px solid white',
    borderRadius: '50%',
    width: '35px',
    height: '35px'
  }
})

const refresh = () => {
  window.location.reload();
}

const Weather = (props) => {
  const { weatherData } = props;
  const classes = useStyles();
  return (
    <div className="main">
      <div className="flex header">
        <p>{weatherData?.name}</p>
        <IconButton aria-label='refresh' color="secondary" classes={{
        root: classes.root
        }}>
          <SyncIcon />
        </IconButton>
      </div>

      <section className="container">
        <div className="flex day">
          <p>{moment().format('dddd')}, {moment().format('LL')}</p>
          <p></p>
          <p>{ weatherData?.weather? weatherData?.weather[0].description : ''}</p>
        </div>
        <div className="flex temp">
          <p>Temperature: {weatherData.main?.temp}&deg;C</p>
          <p>Humidity: {weatherData?.main?.humidity}%</p>
        </div>
        <div className="flex temp">
          <p>Sunrise: {new Date(weatherData?.sys?.sunrise*1000).toLocaleTimeString('en-IN')}</p>
          <p>Sunset: {new Date(weatherData?.sys?.sunset*1000).toLocaleTimeString('en-IN')}</p>
        </div>
      </section>
      {/* 
      
      
      <p>Humidity: {weatherData?.main?.humidity}</p>
       */}
    </div>
  )
}

export default Weather;