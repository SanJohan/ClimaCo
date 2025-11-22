import CitySearchSaver from "../components/CitySearchSaver";
import useLocalStorage from "../hooks/useLocalStorage.jsx";
import useFetch from "../hooks/useFetch";
import citiesCap from "../data/cities.json";
import { useEffect, useState } from "react";
import CityCard from "../components/CityCard";
import "../styles/Home.css";


const API_KEY = "30534b61db087f946044d5f1232b3e47";

function Home() {
  const [city] = useLocalStorage("city");
  const [capitals, setCapitals] = useLocalStorage("capitals", null);

  const [cities, setCities] = useState([]);
  const CAPITALS = citiesCap.capitals;

  const { data, loading, error } = useFetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  useEffect(() => {
    const fetchCapital = async () => {
      const TTL = 10 * 60 * 1000;

      const cached = capitals;

      if (cached) {
        const cachedObj = cached;
        const isExpired = Date.now() - cachedObj.timestamp > TTL;

        if (!isExpired) {
          setCities(cachedObj.data);
          return;
        }
      }

      const urls = CAPITALS.map(
        (capital) =>
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}&units=metric`
      );

      const responses = await Promise.all(urls.map((url) => fetch(url)));
      const data = await Promise.all(responses.map((res) => res.json()));

      setCities(data);

      const payload = {
        timestamp: Date.now(),
        data,
      };

      setCapitals(payload);
    };

    fetchCapital();
  }, [CAPITALS, capitals, setCapitals]);

  return (
    <>
      <CitySearchSaver />
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

      <main className="home-grid">
        {cities.length > 0 &&
          cities.map(
            (city) => (
              console.log(city), (<CityCard key={city.id} city={city} />)
            )
          )}
      </main>
    </>
  );
}

export default Home;
