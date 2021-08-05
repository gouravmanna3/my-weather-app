import axios from 'axios';

export const getCityWeather = async (city) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
  return response;
}

export const getCurrentLocationWeather = async (coordinates) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/weather/?lat=${coordinates.lat}&lon=${coordinates.long}&units=metric&cnt=10&APPID=${process.env.REACT_APP_API_KEY}`)
  return response;
}