import CitySearchSaver from "../components/CitySearchSaver";
import useLocalStorage from "../hooks/useLocalStorage.jsx";
import useFetch from "../hooks/useFetch";

const API_KEY = "30534b61db087f946044d5f1232b3e47";

function Home() {
  const [city] = useLocalStorage("city");

  const { data, loading, error } = useFetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${
      city ? city : "London"
    }&appid=${API_KEY}&units=metric`
  );

  return (
    <>
      <CitySearchSaver />

      <p>{city}</p>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}

      {data && (
        <div>
          <h2>{data.name}</h2>
          <p>{data.main.temp} °C</p>
          <p>{data.weather[0].description}</p>
          <img
            alt="clima"
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          />
        </div>
      )}
    </>
  );
}

export default Home;
