import React, { useRef, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Input } from 'reactstrap';
import { WeatherContext } from '../weather/index';

import './search.css';

const SearchCity = () => {

  const weatherContext = useContext(WeatherContext);
  const { city, dispatch, cityWeather } = weatherContext;


  const onChange = (e) => {
    dispatch({type: 'SET_CITY', payload: e.target.value });
  }

  return (
    <div className="searchContainer">
      <Form className="searchForm" onSubmit={cityWeather}>
        <FormGroup>
          <Input
            type="text" 
            name="city"
            value={city}
            placeholder="Enter city" 
            className="searchInput" 
            onChange={onChange}
          />
        </FormGroup>
      </Form>
    </div>
  )
}

export default SearchCity;