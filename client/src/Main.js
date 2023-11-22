// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // Import Navigate
import { useSelector } from "react-redux";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/DashBoard";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import EventInfoPage from "./pages/EventInfoPage";
import SuggestionPage from "./pages/Suggestion";

const Main = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/event-info/:id"
          element={isAuthenticated ? <EventInfoPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/suggestion"
          element={isAuthenticated ? <SuggestionPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/u-booking"
          element={<HomePage />}
        />
        <Route index element={<Navigate to="u-booking" />} />
      </Routes>
    </Router>
  );
};

export default Main;
