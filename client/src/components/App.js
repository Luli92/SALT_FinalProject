import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import fetch from 'node-fetch';

function App() {
  const [geolocation, setGeolocation] = useState({});
  const [weather, setWeather] = useState({ daily: { summary: undefined } });
  const [apiResponse, setApiResponse] = useState({ apiRespnse: "" })

  useEffect(() => {
    console.log('this effect runs only on mount')
    callAPI()
  }, [])

  useEffect(() => {
    console.log('this effect runs only when apiResponse changes')
    console.log(apiResponse)
  }, [apiResponse])

  const callAPI = () => {
    fetch("http://localhost:9000/testAPI")
        .then(res => res.text())
        .then(res => setApiResponse({ apiResponse: res }));
  }

  const getGeolocation = () => { 
    navigator.geolocation.getCurrentPosition(function (position) {
      setGeolocation({ lat: position.coords.latitude, long: position.coords.longitude })
    });
  }

  const getWeather = () => {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/269bb9a5c92626a0f53367cd2c92f543/${geolocation.lat},${geolocation.long}?units=si`)
      .then(data => data.json())
      .then(result => {
        if (result) setWeather(result) 
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>WAC</p>
      </header>
      <Login />
    </div>
  );
}

export default App;
