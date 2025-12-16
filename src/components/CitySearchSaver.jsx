import useLocalStorage from "../hooks/useLocalStorage.jsx";
import { useState } from "react";
import "../styles/city-search-saver.css";
import { useNavigate } from "react-router-dom";

function CitySearchSaver() {
  const [, setCity] = useLocalStorage("city", "Bogota");
  const [value, setValue] = useState("");
  const navigate = useNavigate();


  const handleSearch = () => {
    console.log(value);
    if (value.trim() !== ""){
      setCity(value);
      navigate(`/CityDetails/${value}`);
    }
  };

  const cancelSearch = () => {
    if(value !== "") setValue("")
  }

  return (
    <>
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-bar">
          <span className="material-symbols-outlined">search</span>
          <input
            placeholder="Search city"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="search-input"
          />
          <span onClick={cancelSearch}>{value !== "" ? "X" : ""}</span>
        </div>
      </form>
    </>
  );
}

export default CitySearchSaver;
