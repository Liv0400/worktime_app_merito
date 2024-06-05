// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./services/UserContext";
<<<<<<< HEAD
=======
import ProtectedRoute from "./ProtectedRoute";
//import { Logowanie } from "./components/pages/Logowanie";
>>>>>>> 70ab759603c68d0d6746b642d88c488993cc9c4e
import {
  Logowanie,
  Home,
  Grafik,
  Dyspozycja,
  Wnioski,
  WnioskiPracownik,
  Pracownicy,
  Profil,
  // PokazWnioski,
  // PrzeslaneWnioski,
  NowyWniosek,
  Administrator,
  Formularz,
  Stworz_grafik,
<<<<<<< HEAD
  EdycjaFormularz, UsersDetailPage, 
  WeekListManager,
=======
  // UsersList,
  EdycjaFormularz, 
>>>>>>> 70ab759603c68d0d6746b642d88c488993cc9c4e
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
          <Route
           path="/" loader={homeLoader}
          element={<Logowanie />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
              <BaseLayout>
                <Home />
                <CalendarLongTermEventView />
              </BaseLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/grafik"
            element={
              <ProtectedRoute requiredRoles={["Pracownik", "Menadżer", "Administrator"]}>
              <BaseLayout>
                <Grafik />
                <CalendarViewOnly />
              </BaseLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/Stworz_grafik"
            element={
              <ProtectedRoute requiredRoles={["Menadżer", "Administrator"]}>
              <BaseLayout>
                <Stworz_grafik />
                <CalendarWithManagement />
              </BaseLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dyspozycja"
            element={
              <ProtectedRoute requiredRoles={["Pracownik", "Administrator"]}>
              <BaseLayout>
                <Dyspozycja />
              </BaseLayout>
              </ProtectedRoute>
            }/>

          <Route
            path="/wnioski"
            element={
              <ProtectedRoute requiredRoles={["Menadżer", "Administrator"]}>
              <BaseLayout>
                <Wnioski />
              </BaseLayout>
              </ProtectedRoute>
            }
          />
           <Route
            path="/wnioskiPracownik"
            element={
              <ProtectedRoute requiredRoles={["Pracownik", "Administrator"]}>
              <BaseLayout>
                <WnioskiPracownik />
              </BaseLayout>
              </ProtectedRoute>
            }
          />
             <Route
            path="/wnioskiPracownik/nowyWniosek"
            element={
              <ProtectedRoute requiredRoles={["Pracownik", "Administrator"]}>
              <BaseLayout>
                <NowyWniosek />
              </BaseLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/administrator"
            element={
              <ProtectedRoute requiredRoles={["Administrator"]}>
              <BaseLayout>
                <Administrator />
              </BaseLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/formularz"
            element={
              <ProtectedRoute requiredRoles={["Administrator"]}>
              <BaseLayout>
                <Formularz />
              </BaseLayout>
              </ProtectedRoute>
            }
          />

<<<<<<< HEAD
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
=======
          {/* <Route path="/" element={<UsersList />} /> */}
          {/* <Route path="/formularz" element={<Formularz />} /> */}
          <Route 
          path="/edycja/:userId" 
          element={
          <ProtectedRoute requiredRoles={["Administrator"]}>
          <EdycjaFormularz />
          </ProtectedRoute>
          }
        />
>>>>>>> 70ab759603c68d0d6746b642d88c488993cc9c4e

         
          <Route
            path="/pracownicy"
            element={
              <ProtectedRoute requiredRoles={["Menadżer", "Administrator"]}>
              <BaseLayout>
                <Pracownicy />
              </BaseLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profil"
            element={
              <ProtectedRoute requiredRoles={["Pracownik", "Administrator"]}>
              <BaseLayout>
                <Profil />
              </BaseLayout>
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/wnioski/pokazWnioski"
            element={
              <BaseLayout>
                <PokazWnioski />
              </BaseLayout>
            }
          /> */}
          {/* <Route
            path="/wnioski/przeslaneWnioski"
            element={
              <BaseLayout>
                <PrzeslaneWnioski />
              </BaseLayout>
            }
          />
        */}
        </Routes>
      </div>
    </UserProvider>
  );
};

export default App;
