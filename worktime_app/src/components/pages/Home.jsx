
// import React from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";

import { redirect } from "react-router-dom";
import { getCurrentUser } from "../../services/auth";


//.Asia blokada strony głownej dla niezalogowanych pracownikow

export const loader = async() =>{
const user = await getCurrentUser()
if (user == null) {
  return redirect("/") //zapytac Justyny o dobra sciezke do Logowania 
}
return{
  user: user
}
}

export const Home = () => {
  return <h1>Główna</h1>
  
};
