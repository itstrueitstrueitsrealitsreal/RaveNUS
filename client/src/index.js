import React from 'react';
import ReactDOM from 'react-dom/client';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";

import AdminLayout from "./layouts/Admin.jsx";
import AuthLayout from "./layouts/Auth.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router basename="/" className="App">
    <Routes>
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/auth/*" element={<AuthLayout />} />
      {/* Redirect to login page if 404 */}
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  </Router>
);
