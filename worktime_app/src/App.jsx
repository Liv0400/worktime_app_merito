// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./services/UserContext";
import {
  Logowanie,
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
  Stworz_grafik,
  EdycjaFormularz, UsersDetailPage, 
  WeekListManager,
} from "./components/pages";
import BaseLayout from "./components/BaseLayout";
import CalendarWithManagement from "./components/Calendar/CalendarWithManagement";
import CalendarViewOnly from "./components/Calendar/CalendarViewOnly";
import CalendarLongTermEventView from "./components/Calendar/CalendarLongTermEventView";
import { loader as homeLoader } from "./components/pages";
import WeekList from "./components/pages/weeklist";

const App = () => {
  
  return (
    <UserProvider>
      <div className="App">
        <Routes>
          <Route path="/zaloguj" loader={homeLoader} element={<Logowanie />} />
          <Route
            path="/home"
            element={
              <BaseLayout>
                <Home />
                <CalendarLongTermEventView />
              </BaseLayout>
            }
          />
          <Route
            path="/grafik"
            element={
              <BaseLayout>
                <Grafik />
                <CalendarViewOnly />
              </BaseLayout>
            }
          />
          <Route
            path="/Stworz_grafik"
            element={
              <BaseLayout>
                <Stworz_grafik />
                <CalendarWithManagement />
              </BaseLayout>
            }
          />
          <Route
            path="/dyspozycja"
            element={
              <BaseLayout>
                <Dyspozycja />
              </BaseLayout>
            }/>

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
          path="/formularz" 
          element={<Formularz />} />

          <Route 
          path="/edycja/:userId" 
          element=
          {   <BaseLayout>
          <EdycjaFormularz />
          </BaseLayout>} 
          />

          <Route 
          path="/dyspozycja"
          element=
          {<WeekListManager />} /> 
          
          <Route 
          path="/dyspozycjapracownik" 
          element={
          <BaseLayout>
          <WeekList/>
          </BaseLayout>}
           /> 

          <Route 
          path="/dyspozycjamenager/:userId" 
          element={ 
          <BaseLayout>
          <UsersDetailPage /> 
           </BaseLayout> } 
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
            path="/profil"
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
    </UserProvider>
  );
};

export default App;
