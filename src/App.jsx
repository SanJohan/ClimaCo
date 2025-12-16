import "./App.css";
import CitySearchSaver from "./components/CitySearchSaver";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CityDetails from "./pages/CityDetails";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CityDetails/:city" element={<CityDetails />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
