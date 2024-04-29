import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/user/is-authenticated",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(res.data.isAuthenticated);
      } catch (err) {
        console.log(err);
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, [isAuthenticated]);

  return isAuthenticated === null ? (
    <div className="w-full h-[100vh] flex flex-center ">
      <div className="loader">
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
      </div>
    </div>
  ) : isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
