import React, { useState, createContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import Login from "./Pages/Auth/Login";
import ManageQuery from "./Pages/ManageQuery/ManageQuery";
export const ThemeContext = createContext();
import "react-toastify/dist/ReactToastify.css";
import ManageZipCode from "./Pages/ManageZipCode/ManageZipCode";
function App() {
  const [activeMenu, setActiveMenu] = useState(true);
  const [DarkMode, setDarkMode] = useState(false);
  return (
    <div className="App">
      <ToastContainer />
      <ThemeContext.Provider
        value={{
          activeMenu,
          setActiveMenu,
          DarkMode,
          setDarkMode,
        }}
      >
        <Router>
          <Routes key={document.pathname}>
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoutes />}>
                <Route index element={<ManageQuery />} />
                <Route path="manage-query" element={<ManageQuery />} />
                <Route path="manage-zipcode" element={<ManageZipCode />} />
              </Route>
            </>
          </Routes>
        </Router>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
