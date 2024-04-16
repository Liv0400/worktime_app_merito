import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Home,
  Grafik,
  Dyspozycja,
  Wnioski,
  Pracownicy,
} from "./components/pages";
import BaseLayout from "./components/BaseLayout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <BaseLayout>
              <Home />
            </BaseLayout>
          }
        />
        <Route
          path="/grafik"
          element={
            <BaseLayout>
              <Grafik />
            </BaseLayout>
          }
        />
        <Route
          path="/dyspozycja"
          element={
            <BaseLayout>
              <Dyspozycja />
            </BaseLayout>
          }
        />
        <Route
          path="/wnioski"
          element={
            <BaseLayout>
              <Wnioski />
            </BaseLayout>
          }
        />
        <Route
          path="/pracownicy"
          element={
            <BaseLayout>
              <Pracownicy />
            </BaseLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
