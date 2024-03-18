import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import UserCheck from "./components/UserCheck";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/UserCheck" element={<UserCheck />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
