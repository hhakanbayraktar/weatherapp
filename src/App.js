import React, { useEffect, useState } from 'react';
import './App.css';
import { usePosition } from 'use-position';
import axios from 'axios';

function App() {

  const [weather, setWeather] = useState();
  const {
    latitude,
    longitude
  } = usePosition();

  const getWeatherData = async (lat, lon) => {
    const key = process.env.REACT_APP_WEATHER_DATA_KEY;
    const lang = navigator.language.split('-')[0];

    try {
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=${lang}`);
      console.log(data);
      setWeather(data);
    }
    catch {
      alert("Conneciton problem!");
    }
  }

  useEffect(() => {
    latitude && longitude && getWeatherData(latitude, longitude);
  }, [latitude, longitude]);

  // console.log(latitude);
  // console.log(longitude);

  return (
    <div className="App">
      <h1>Weather</h1>
      <h3>Latitude: {latitude}</h3>
      <h3>Longitude: {longitude}</h3>
      <h3>Location: {weather === undefined ? "" : weather.name}</h3>
      <h3>temperature: {weather === undefined ? "" : Math.round(weather.main.temp - 273.15)}</h3>
      <h3>Status: {weather === undefined ? "" : weather.weather.map(data => data.main)} - {weather === undefined ? "" : weather.weather.map(data => data.description)}</h3>
    </div>
  );
}

export default App;
