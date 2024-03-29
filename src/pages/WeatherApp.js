import React, { useState } from 'react';
import Config from "../Services/Config";
import './WeatherApp.css';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);

  const API_KEY = Config.API_KEY;

  const fetchWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${API_KEY}`);
      const data = await response.json();
      if (data.cod === '404') {
        setWeather('No City Found');
      } else {
        const weatherDescription = data.weather[0].main;
        const temp = Math.round(data.main.temp);
        const iconCode = data.weather[0].icon;
        setWeather({ weather: weatherDescription, temp });
        setWeatherIcon(`http://openweathermap.org/img/w/${iconCode}.png`);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>
      {weather && (
        <div>
          <img src={weatherIcon} alt="Weather Icon" className="weather-icon" />
          <p>The weather in {city} is: {weather.weather}</p>
          <p>The temperature in {city} is: {weather.temp}°F</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
