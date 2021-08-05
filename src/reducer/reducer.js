export const initialState = {
  city: '',
  weatherData: [],
  weatherDataApiStatus: 'notStarted',
  forecastData: []
};

export const reducer = (state, action) => {
  switch(action.type) {
    case 'SET_CITY':
      return {
        ...state, city: action.payload
      };
    case 'SET_WEATHER_DATA':
      return {
        ...state, weatherData: action.payload
      }
    case 'SET_FORECAST_DATA':
      return {
        ...state, forecastData: action.payload
      }
    case 'SET_WEATHER_DATA_API_STATUS':
      return {
        ...state, weatherDataApiStatus: action.payload
    }
    default:
      return state;
  }
}