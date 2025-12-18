import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import CityCard from "../components/CityCard";
import CityDetailCard from "../components/CityDetailCard";
import { formatDate } from "../utils/dateUtils";
import "../styles/city-details.css";
import { useEffect, useState } from "react";

const API_KEY = "30534b61db087f946044d5f1232b3e47";

function groupForecastByDay(list) {
  return list.reduce((acc, item) => {
    const date = item.dt_txt.split(" ")[0]; // "2025-12-17"
    if (!acc[date]) {
      acc[date] = {
        date,
        min: item.main.temp_min,
        max: item.main.temp_max,
        weather: item.weather[0],
        pop: item.pop,
      };
    } else {
      acc[date].min = Math.min(acc[date].min, item.main.temp_min);
      acc[date].max = Math.max(acc[date].max, item.main.temp_max);
    }

    return acc;
  }, {});
}

function getWindDirection(deg) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(deg / 45) % 8];
}

function CityDetails() {
  const { city } = useParams();

  const myDate = new Date();

  const [forecast, setForecast] = useState([]);

  const { data, loading, error } = useFetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );

        const json = await response.json();
        const groupedForecast = groupForecastByDay(json.list);
        setForecast(Object.values(groupedForecast));
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [city]);

  console.log(data);

  return (
    <main className="city-details-container">
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}

      <h1 className="city-title">{data?.name}</h1>
      <p className="date-title">{formatDate(myDate)}</p>

      {data && (
        <div>
          <CityDetailCard city={data} />
        </div>
      )}

      <div className="principal-grid">
        <div className="forecast-days-container">
          <h2>Next 5 days</h2>

          {forecast.slice(0, 5).map((item, index) => (
            <div key={item.date} className="forecast-item">
              <span className="forecast-day">
                {index === 0 ? "Hoy" : formatDate(new Date(item.date), "day")}
              </span>

              <div className="forecast-weather">
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather.icon}.png`}
                  alt={item.weather.description}
                />
                <span>{item.weather.description}</span>
              </div>

              <span className="forecast-temp">
                {Math.round(item.max)}° / {Math.round(item.min)}°
              </span>
            </div>
          ))}
        </div>

        {data && (
          <section className="day-details">
            <h2>Current day Details</h2>

            <div className="day-details-grid">
              {/* Humedad */}
              <div className="detail-card">
                <span className="detail-icon">💧</span>
                <span className="detail-value">{data.main.humidity}%</span>
                <span className="detail-label">Humedad</span>
              </div>

              {/* Viento */}
              <div className="detail-card">
                <span className="detail-icon">💨</span>
                <span className="detail-value">
                  {Math.round(data.wind.speed * 3.6)} km/h
                </span>
                <span className="detail-label">Viento</span>
              </div>

              {/* Prob. lluvia */}
              <div className="detail-card">
                <span className="detail-icon">🌧️</span>
                <span className="detail-value">
                  {forecast[0] ? Math.round(forecast[0].pop * 100) : 0}%
                </span>
                <span className="detail-label">Prob. Lluvia</span>
              </div>

              {/* Índice / Dirección viento */}
              <div className="detail-card">
                <span className="detail-icon">🧭</span>
                <span className="detail-value">
                  {getWindDirection(data.wind.deg)}
                </span>
                <span className="detail-label">Dirección</span>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default CityDetails;
