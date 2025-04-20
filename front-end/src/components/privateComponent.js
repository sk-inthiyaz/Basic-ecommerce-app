
/**
 * This component is for accesing the products if user log in he/she can acess else it gives log in page
 * 
 */
import React from "react";
import { Navigate,Outlet } from "react-router-dom";
const PrivateComponentRoute=()=>{
    const auth = localStorage.getItem('user')
    return auth?<Outlet/>:<Navigate to="/SignUp"/>
}
export default PrivateComponentRoute;