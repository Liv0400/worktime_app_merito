import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Logowanie } from "./components/Logowanie";
import {
  Home,
  Grafik,
  Dyspozycja,
  Wnioski,
  WnioskiPracownik,
  Pracownicy,
  Profil,
  PokazWnioski,
  PrzeslaneWnioski,
  NowyWniosek,
  Administrator,
  Formularz,
  Grafik_formularz,
  Stworz_grafik,
} from "./components/pages";
import BaseLayout from "./components/BaseLayout";
import Calendar from "./components/Calendar/Calendar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Logowanie />} />
        <Route
          path="/home"
          element={
            <BaseLayout>
              <Home />
              <Calendar />
            </BaseLayout>
          }
        />
        <Route
          path="/grafik"
          element={
            <BaseLayout>
              <Grafik />
              <Calendar />
            </BaseLayout>
          }
        />
        <Route
          path="/Stworz_grafik"
          element={
            <BaseLayout>
              <Stworz_grafik />
              <Grafik_formularz />
              <Calendar />
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
          path="/wnioskiPracownik"
          element={
            <BaseLayout>
              <WnioskiPracownik />
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
        <Route
          path="/wnioski/pokazWnioski"
          element={
            <BaseLayout>
              <PokazWnioski />
            </BaseLayout>
          }
        />
        <Route
          path="/wnioski/przeslaneWnioski"
          element={
            <BaseLayout>
              <PrzeslaneWnioski />
            </BaseLayout>
          }
        />
        <Route
          path="/wnioski/nowyWniosek"
          element={
            <BaseLayout>
              <NowyWniosek />
            </BaseLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
