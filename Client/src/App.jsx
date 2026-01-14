import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Equipments from "./pages/Equipments";
import Interventions from "./pages/Interventions";
import Stock from "./pages/Stock";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/equipments" element={<Equipments />} />
        <Route path="/interventions" element={<Interventions />} />
        <Route path="/stock" element={<Stock />} />
      </Routes>
    </Router>
  );
}

export default App;
