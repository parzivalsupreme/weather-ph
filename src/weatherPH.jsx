import React, { useState, useEffect } from "react";

export default function WeatherPH() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const apiKey = "4fb9bb5018bc50d1a7766dcdc8f46bfa";
    const cities = [
      "Davao",
      "Cebu",
      "Quezon",
      "Manila",
      "Pasay",
      "Muntinlupa",
      "Makati",
      "Iloilo",
      "Cagayan De Oro",
      "Bacolod",
      "Valenzuela",
      "Pasig",
      "	General Santos",
      "	Caloocan",
      "Mandaue",
      "Mandaluyong",
      "Taguig",
      "Baguio",
      "Puerto Princesa",
      "Paranaque",
    ]; 

    const fetchData = async () => {
      const weatherPromises = cities.map(async (city) => {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        return {
          city,
          temperature: data.main.temp,
          weatherIcon: data.weather[0].icon,
        };
      });

      const weatherData = await Promise.all(weatherPromises);
      setWeatherData(weatherData);
    };

    fetchData();
  }, []);

  return (
    <div className="widgets-container">
      {weatherData.map((cityWeather, index) => (
        <div className="widgets" key={index}>
          <div className="weatherIcon">
            <img
              src={`http://openweathermap.org/img/wn/${cityWeather.weatherIcon}.png`}
              alt="weatherIcon"
            />
          </div>
          <div className="temperature">
            <h1>{cityWeather.temperature}°C</h1>
          </div>
          <div className="cityName">
            <h2>{cityWeather.city}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}