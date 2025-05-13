import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Users from "./components/Users";

const usersData = fetch("http://localhost:3000/users").then((res) =>
  res.json()
);

function App() {
  return (
    <>
      <h1>Simple CRUD Application</h1>
      <Users usersData={usersData} />
    </>
  );
}

export default App;
