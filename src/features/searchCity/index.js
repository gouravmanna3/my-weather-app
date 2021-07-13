import React, { useRef, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Input } from 'reactstrap';
import { WeatherContext } from '../../App'

import './search.css';

const SearchCity = (props) => {

  const weatherContext = useContext(WeatherContext);
  const { city, dispatch } = weatherContext;
  const { getCityWeather } = props;

  const onChange = (e) => {
    dispatch({type: 'SET_CITY', payload: e.target.value });
  }

  return (
    <div className="searchContainer">
      <Form className="searchForm" onSubmit={getCityWeather}>
        <FormGroup>
          <Input
            type="text" 
            name="city"
            value={city}
            placeholder="Enter city" 
            className="searchInput" 
            bsSize="lg" 
            onChange={onChange}
          />
        </FormGroup>
      </Form>
    </div>
  )
}

export default SearchCity;