import React from 'react';

import App from './App';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Register from './Screens/Register';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Screens/Login';
import Profile from './Screens/Profile';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import PersonalProfile from './Screens/PersonalProfile';



import PrivateRoute from './routes/PrivateRoute';


const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<App/>}/>
          <Route path = "/register" element = {<Register/>}/>
          <Route path = "/login" element = {<Login/>}/>
          {/* <Route path = "/profile" element = {<Profile/>}/> */}
          {/* <PrivateRoute path="/profile" exact component={Profile} /> */}
          
          <Route
          path="/profile"
          element={
            <PrivateRoute>
              <PersonalProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/editprofile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
          
        </Routes>
      </BrowserRouter>
);



