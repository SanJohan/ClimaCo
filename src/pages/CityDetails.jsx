import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import CityCard from "../components/CityCard";


const API_KEY = "30534b61db087f946044d5f1232b3e47";

function CityDetails() {

  const {city} = useParams();



  const { data, loading, error } = useFetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}

      {data && (
        <div>
          <CityCard city={data} />
        </div>
      )}
    </>
  );
}

export default CityDetails;
