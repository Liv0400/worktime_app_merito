import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import {
  Home,
  Grafik,
  Dyspozycja,
  Wnioski,
  Pracownicy,
} from "./components/pages";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/grafik" element={<Grafik />} />
        <Route path="/dyspozycja" element={<Dyspozycja />} />
        <Route path="/wnioski" element={<Wnioski />} />
        <Route path="/pracownicy" element={<Pracownicy />} />
      </Routes>
    </div>
  );
}

export default App;
