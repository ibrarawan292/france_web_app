import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MainDashboard from "../Components/Dashboard/MainDashboard";
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
      console.log(AdminIsLogin);
      if (isLogin === "true") {
        navigate("/manage-query");
      } else {
        navigate("/login");
      }
      setAdminIsLogin(isLogin);
    }, []);
    return AdminIsLogin === "true" ? <Dashboard /> : <Login />;
};

export default ProtectedRoutes;
