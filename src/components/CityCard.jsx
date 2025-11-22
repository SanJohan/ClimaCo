import "../styles/city-card.css";

function CityCard({ city }) {
  return (
    <div className="city-card">
      <div className="city-header">
        <h3>{city.name}</h3>
        <p className="country">
          {city.sys.country === "CO" ? "Colombia" : city.sys.country}
        </p>
      </div>
      <div className="city-temp">
        <h1>{Math.round(city.main.temp)}°</h1>
        <img
          src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
          alt="weather icon"
        />
      </div>
      <div className="city-description">
        <p className="description">{city.weather[0].description}</p>
        <p className="minmax">
          Max: {Math.round(city.main.temp_max)}° / Min:{" "}
          {Math.round(city.main.temp_min)}°
        </p>
      </div>
    </div>
  );
}

export default CityCard;
