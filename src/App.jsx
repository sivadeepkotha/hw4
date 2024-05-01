import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = '5205556dc7c6f08a76c0b761b55cf071';
  const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

  const fetchWeatherData = () => {
    fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found. Please try again.');
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
        setError(null);
      })
      .catch(error => {
        setWeatherData(null);
        setError(error.message);
      });
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeatherData}>Get Weather</button>
      </div>
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-container">
          <h2>{weatherData.name}</h2>
          <p className="temperature">{weatherData.main.temp}°C</p>
          <p className="description">{weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;