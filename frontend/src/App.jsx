import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Assets from "./pages/Assets";
import Alerts from "./pages/Alerts";
import Incidents from "./pages/Incidents";
import Reports from "./pages/Reports";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <div className="app">

        {/* Top Navigation */}
        <Navbar />

        {/* Sidebar + Main Content */}
        <div className="app-body">

          <Sidebar />

          <main className="content">

            <Routes>

              <Route
                path="/"
                element={<Dashboard />}
              />

              <Route
                path="/assets"
                element={<Assets />}
              />

              <Route
                path="/alerts"
                element={<Alerts />}
              />

              <Route
                path="/incidents"
                element={<Incidents />}
              />

              <Route
                path="/reports"
                element={<Reports />}
              />

            </Routes>

          </main>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;