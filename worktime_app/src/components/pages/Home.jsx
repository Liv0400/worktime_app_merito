// import React from "react";

import { redirect } from "react-router-dom";
import { getCurrentUser } from "../../services/auth";

//.Asia blokada strony głownej dla niezalogowanych pracownikow

export const loader = async () => {
  const user = await getCurrentUser();
  if (user == null) {
    return redirect("/zaloguj"); //zapytac Justyny o dobra sciezke do Logowania
  }
  return {
    user: user,
  };
};

export const Home = () => {
  return <h1></h1>;
};
