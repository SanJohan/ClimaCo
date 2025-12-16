import CitySearchSaver from "../components/CitySearchSaver";
import useLocalStorage from "../hooks/useLocalStorage.jsx";
import citiesCap from "../data/cities.json";
import { useEffect, useState } from "react";
import CityCard from "../components/CityCard";
import "../styles/Home.css";


const API_KEY = "30534b61db087f946044d5f1232b3e47";

function Home() {
  // const [city] = useLocalStorage("city", "Bogota");
  const [capitals, setCapitals] = useLocalStorage("capitals", null);

  const [cities, setCities] = useState([]);
  const CAPITALS = citiesCap.capitals;

  // const { data, loading, error } = useFetch(
  //   `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  // );

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
      <h1>Ciudades recomendadas</h1>
      <p>Una vista general de las ciudades mas populares en Colombia</p>

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
