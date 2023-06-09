import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../Pages/Auth/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";

const ProtectedRoutes = () => {
  // const { RefreshAdminLogin } = useContext(ThemeContext);
  let navigate = useNavigate();
  const [AdminIsLogin, setAdminIsLogin] = useState(
    localStorage.getItem("UserIsLogin")
  );
  useEffect(() => {
    var isLogin = localStorage.getItem("UserIsLogin");
    if (isLogin === "true") {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
    setAdminIsLogin(isLogin);
  }, []);
  return AdminIsLogin === "true" ? <Dashboard /> : <Login />;
};

export default ProtectedRoutes;
