import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./component/Home";
import "./App.css";
import Login from "./component/Login";
import Register from "./component/Register";
import Basepage from "./component/Basepage";
import NotFound from "./component/NotFound";
import Form from "./component/Form";
import Form1 from "./component/Form1";
import Form2 from "./component/Form2";
import PendingRequests from "./component/PendingRequests";
import History from "./component/History";
import Dashboard from "./component/Dashboard";
import DailyUpdates from "./component/DailyUpdates";
import SalesTable from "./component/SalesTable";
// Function to simulate authentication
const isAuthenticated = () => {
  // Check if a token exists in local storage
  const token = localStorage.getItem("token");

  // Return true if a token exists and is not expired, otherwise return false
  return token !== null;
};

// ProtectedRoute component to handle protected routes
const ProtectedRoute = ({ path, element: Element }) => {
  return isAuthenticated() ? <Element /> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Basepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dailyUpdatesform"
          element={<ProtectedRoute element={Form} />}
        />
        <Route path="/salesform" element={<ProtectedRoute element={Form2} />} />
        <Route
          path="/Requestform"
          element={<ProtectedRoute element={Form1} />}
        />
        <Route path="/sale" element={<ProtectedRoute element={SalesTable} />} />
        <Route path="/home" element={<ProtectedRoute element={Home} />} />
        <Route
          path="/pending-requests"
          element={<ProtectedRoute element={PendingRequests} />}
        />
        <Route path="/history" element={<ProtectedRoute element={History} />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={Dashboard} />}
        />
        <Route
          path="/dailyUpdates"
          element={<ProtectedRoute element={DailyUpdates} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
