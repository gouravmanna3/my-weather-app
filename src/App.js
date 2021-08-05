import React from 'react';
import Weather from './features/weather/index';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './App.css';

function App() {
  return (
    <div className="App">
      <Weather />
      <footer>
        Developed by Gourav &#10084; Buy me a  
        <a href="https://www.buymeacoffee.com/gouravmanna3"> coffee &#9749;</a>
      </footer>
    </div>
  );
}

export default App;
