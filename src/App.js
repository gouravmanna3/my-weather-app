import React from 'react';
import Weather from './features/weather/index';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './App.css';

function App() {
  return (
      <div className="App">
        <Weather />
      </div>
  );
}

export default App;
