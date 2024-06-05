import { Route, Routes } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./services/UserContext";
import ProtectedRoute from "./ProtectedRoute";
//import { Logowanie } from "./components/pages/Logowanie";
import {
  Logowanie,
  Home,
  Grafik,
  // Dyspozycja,
  Wnioski,
  WnioskiPracownik,
  Pracownicy,
  Profil,
  NowyWniosek,
  Administrator,
  Formularz,
  Stworz_grafik,
  // UsersList,
  EdycjaFormularz, 
  UsersDetailPage,
  UsersListDyspo,
  // WeekListManager,
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
              <ProtectedRoute requiredRoles={["Menadżer", "Administrator"]}>
              <BaseLayout>
                <UsersListDyspo />
              </BaseLayout>
              </ProtectedRoute>
            }/>

            <Route
            path="/dyspozycja/:userId"
            element={
              <ProtectedRoute requiredRoles={["Menadżer", "Administrator"]}>
              <BaseLayout>
                <UsersDetailPage />
              </BaseLayout>
              </ProtectedRoute>
            }/>

          <Route
            path="/dyspozycjapracownik"
            element={
              <ProtectedRoute requiredRoles={["Pracownik", "Administrator"]}>
              <BaseLayout>
                <WeekList />
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
        </Routes>
      </div>
    </UserProvider>
  );
};

export default App;
