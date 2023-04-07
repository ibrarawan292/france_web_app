import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();


export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(true)
  const [DarkMode, setDarkMode] = useState(false)


  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        showModal,
        setShowModal,
        editData, 
        setEditData,
        DarkMode, 
        setDarkMode
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
