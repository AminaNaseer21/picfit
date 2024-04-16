import React, { useState, useEffect, useCallback } from 'react';
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Config from "../Services/Config";
import './WeatherApp.css';

function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [userLocation, setUserLocation] = useState('');

  const API_KEY = Config.API_KEY;

  const fetchWeather = useCallback(async (location) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=${API_KEY}`);
      const data = await response.json();
      if (data.cod === '404') {
        setWeather('No City Found');
      } else {
        const weatherDescription = data.weather[0].description;
        const temp = Math.round(data.main.temp);
        setWeather({ weather: weatherDescription, temp });
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, [API_KEY]);

  useEffect(() => {
    const fetchUserLocation = async () => {
      const auth = getAuth();
      const firestore = getFirestore();
      const user = auth.currentUser;
      
      if (user) {
        try {
          const userDocRef = doc(firestore, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserLocation(userData.location || '');
            fetchWeather(userData.location || '');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserLocation();
  }, [fetchWeather]);

  return (
    <div className="weather-container">
      {weather && (
        <div>
          <p className="weather-info">The weather condition in {userLocation} is: {weather.weather}</p>
          <p className="weather-info">The temperature in {userLocation} is: {weather.temp}°F</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
