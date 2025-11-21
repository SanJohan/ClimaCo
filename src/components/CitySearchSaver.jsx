import useLocalStorage from "../hooks/useLocalStorage.jsx";
import { useState } from "react";

function CitySearchSaver() {
  const [, setCity] = useLocalStorage("city", "Bogota");
  const [value, setValue] = useState("");

  const handleSearch = () => {
    console.log(value);
    if (value.trim() !== "") setCity(value);
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <input
          placeholder="Search city"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button>Search</button>
      </form>
    </>
  );
}

export default CitySearchSaver;
