import React, { useState, createContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import Login from "./Pages/Auth/Login";
import ManageQuery from "./Pages/ManageQuery/ManageQuery";
import { useStateContext } from "./contexts/ContextProvider";
import CreateQuery from "./Pages/CreateQuery/CreateQuery";
export const ThemeContext = createContext();
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [activeMenu, setActiveMenu] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [showZipped, setShowZipped] = useState(false);
  const [editZippedData, setEditZippedData] = useState([]);
  const [isEditZipped, setIsEditZipped] = useState(false)

  const [DarkMode, setDarkMode] = useState(false);
  return (
    <div className="App">
      <ToastContainer />
      <ThemeContext.Provider
        value={{
          activeMenu,
          setActiveMenu,
          showModal,
          setShowModal,
          editData,
          setEditData,
          DarkMode,
          setDarkMode,
          isEdit,
          setIsEdit,
          showZipped,
          setShowZipped,
          editZippedData,
          setEditZippedData,
          isEditZipped, 
          setIsEditZipped
        }}
      >
        <Router>
          <Routes key={document.pathname}>
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoutes />}>
                <Route index element={<ManageQuery />} />
                <Route path="manage-query" element={<ManageQuery />} />
                <Route path="create-query" element={<CreateQuery />} />
              </Route>
            </>
          </Routes>
        </Router>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
