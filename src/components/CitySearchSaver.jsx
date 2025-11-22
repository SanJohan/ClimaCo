import useLocalStorage from "../hooks/useLocalStorage.jsx";
import { useState } from "react";
import "../styles/city-search-saver.css";

function CitySearchSaver() {
  const [, setCity] = useLocalStorage("city", "Bogota");
  const [value, setValue] = useState("");

  const handleSearch = () => {
    console.log(value);
    if (value.trim() !== "") setCity(value);
  };

  return (
    <>
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-bar">
          <span class="material-symbols-outlined">search</span>
          <input
            placeholder="Search city"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="search-input"
          />
          <button>Search</button>
        </div>
      </form>
    </>
  );
}

export default CitySearchSaver;
