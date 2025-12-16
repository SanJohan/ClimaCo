import "../styles/city-detail-card.css";

function CityDetailCard({ city }) {
  return (
    <div className="city-card-detail">
      <div className="city-temp">
        <h1>{Math.round(city.main.temp)}°</h1>
        <img
          src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
          alt="weather icon"
        />
      </div>
      <div className="city-description-weather">
        <p className="description-weather">{city.weather[0].description}</p>
        <p className="minmax">
          Max: {Math.round(city.main.temp_max)}° / Min:{" "}
          {Math.round(city.main.temp_min)}°
        </p>
      </div>
    </div>
  );
}

export default CityDetailCard;
