import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';

const CityNotFound = () => {
  return (
    <div className="errorContainer">
        <FontAwesomeIcon className="searchIcon" icon={faSearchLocation} />
        <h2>city not found</h2><span>&#x1F614;</span>
    </div>
  )
}

export default CityNotFound;