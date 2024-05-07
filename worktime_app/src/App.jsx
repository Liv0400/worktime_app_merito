import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Home,
  Grafik,
  Dyspozycja,
  Wnioski,
  Pracownicy,
  Profil, 
  Administrator, 
   Formularz,
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
          path="/administrator"
          element={
            <BaseLayout>
              <Administrator />
            </BaseLayout>
          }
        />
         <Route
          path="/formularz"
          element={
            <BaseLayout>
              <Formularz />
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
        <Route
          path="/pracownicy/profil"
          element={
            <BaseLayout>
              <Profil />
            </BaseLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
