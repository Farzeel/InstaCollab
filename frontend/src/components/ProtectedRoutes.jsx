import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((store) => store.auth);

  useEffect(() => {
    // If the user is not authenticated, navigate to login
    if (!isAuthenticated) {
      console.log("not auth")
      if (location.pathname !== "/signup") {
        navigate("/login");
      }
    }
  }, [isAuthenticated, location.pathname, navigate]);

  // If the user is authenticated, render the children components
  if (isAuthenticated) {
   
    return <>{children}</>;
  }

  // You could also return a loader or null while navigating
  return null;
};

export default ProtectedRoutes;
