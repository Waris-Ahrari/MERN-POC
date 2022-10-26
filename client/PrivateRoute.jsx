import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuth } from '../helpers/auth';

function PrivateRoute({ children }) {
    const auth = isAuth();
    console.log(auth)
    return auth ? children : <Navigate to="/login" />;
  }


export default PrivateRoute;