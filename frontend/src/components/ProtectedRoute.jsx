import React from 'react';
import {Outlet} from "react-router-dom";

function ProtectedRoute({authRole}) {

    //get token and role info
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    //if not logged in or logged in but role does not match protected route role
    if(!token || (authRole && role !== authRole)){
        return (
            <div>
                "Access Denied"
            </div>
        );
    }

    return <Outlet />
}

export default ProtectedRoute;