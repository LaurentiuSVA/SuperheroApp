import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import SuperheroesPage from "./SuperheroesPage";
import SuperheroForm from "./SuperheroForm";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<SuperheroesPage />} />
      <Route path="/add" element={<SuperheroForm />} />
    </Routes>
  </Router>
);

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("Root element not found!");
}
