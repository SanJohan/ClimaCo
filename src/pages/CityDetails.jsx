import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import CityCard from "../components/CityCard";
import CityDetailCard from "../components/CityDetailCard";
import { formatDate } from "../utils/dateUtils";
import "../styles/city-details.css";

const API_KEY = "30534b61db087f946044d5f1232b3e47";

function CityDetails() {

  const {city} = useParams();

  const myDate = new Date();

  const { data, loading, error } = useFetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );


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
    </main>
  );
}

export default CityDetails;
