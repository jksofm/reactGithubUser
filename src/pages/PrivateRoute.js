import React from "react";
import { Route, Navigate,useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({children}) => {
  const {isAuthenticated,user} =useAuth0();
  const isUser = isAuthenticated;
  console.log(isUser);
 

  if(isUser){
    return children
  }else{
    return <Navigate to="/login" />
  }

};
export default PrivateRoute;
