import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloud,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from '@fortawesome/free-solid-svg-icons';

import './weather.css';

const WeatherIcon = (props) => {
  const { iconData, className } = props;
  const icon = iconData?.icon;
  const iconId = iconData?.id;
  const main = iconData?.main;
  const description = iconData?.description;
  let fIcon = null;

  if(main === 'Rain') {
    fIcon = faCloudShowersHeavy;
  } else if (main === 'Clouds') {
    fIcon = faCloud;
  } else if (main === 'Drizzle') {
    fIcon = faCloudRain;
  } else if (main === 'Snow') {
    fIcon = faSnowflake;
  } else if (main === 'Clear') {
    fIcon = faSun;
  } else {
    fIcon = faSmog;
  }

  return (
    <span className={className}>
      <FontAwesomeIcon icon={fIcon} />
    </span>
  )
}

export default WeatherIcon;