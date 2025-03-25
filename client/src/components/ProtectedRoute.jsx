import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ element, allowedRoles }) => {
  let token = localStorage.getItem("adminToken") || localStorage.getItem("customerToken");

  if (!token) {
    return <Navigate to="/customer-login" replace />;
  }

  try {
    // Decode the token
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

    // Check role authorization
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to={userRole === "admin" ? "/admin-dashboard" : "/customer-dashboard"} replace />;
    }

    return element;
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("customerToken");
    return <Navigate to="/customer-login" replace />;
  }
};

export default ProtectedRoute;
