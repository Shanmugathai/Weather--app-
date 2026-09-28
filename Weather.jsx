import React, { useEffect, useState, useRef } from "react";
import "./Weather.css";

import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";

const Weather = () => {
  const inputRef = useRef();

  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter city name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=397dcd91f20a575feee180522745cdf5`;

      const response = await fetch(url);
      const data = await response.json();

      console.log(data);

      if (data.cod !== 200) {
        alert("Entered city name is wrong");
        setWeatherData(false);
        return;
      }

      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: allIcons[data.weather[0].icon] || clear_icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data");
    }
  };

  useEffect(() => {
    search("LONDON");
  }, []);

  return (
    <div className="Weather">

      <div className="search_bar">

        <input
          ref={inputRef}
          type="text"
          placeholder="Search city"
        />

        <img
          src={search_icon}
          alt="search"
          onClick={() => search(inputRef.current.value)}
        />

      </div>

      {weatherData ? (
        <>

          <img
            src={weatherData.icon}
            alt="weather"
            className="Weather_icon"
          />

          <p className="temperature">
            {weatherData.temperature}°C
          </p>

          <p className="Location">
            {weatherData.location}
          </p>

          <div className="Weather_data">

            <div className="col">

              <img
                src={humidity_icon}
                alt="humidity"
              />

              <div>
                <p>{weatherData.humidity}%</p>
                <span>humidity</span>
              </div>

            </div>

            <div className="col">

              <img
                src={wind_icon}
                alt="wind"
              />

              <div>
                <p>{weatherData.windspeed} km/h</p>
                <span>wind speed</span>
              </div>

            </div>

          </div>

        </>
      ) : (
        <p>Entered city name is wrong</p>
      )}

    </div>
  );
};

export default Weather;