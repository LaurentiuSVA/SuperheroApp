import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SuperheroesPage from "./SuperheroesPage";
import SuperheroForm from "./SuperheroForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./index.css";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <ToastContainer position="top-right" autoClose={2000} />
        <Routes>
          <Route path="/" element={<SuperheroesPage />} />
          <Route path="/add" element={<SuperheroForm />} />
        </Routes>
        <footer className="text-center py-4 mt-auto bg-blue-600 text-white">
          <p>&copy; 2025 Superheroes. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
