import './App.css';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { useState, useEffect } from 'react'
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Showtimes from "./components/dashboard/Showtimes";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = { apiResponse: "" };
  // }
  const [apiResponse, setApiresponse] = ('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const callAPI = () => {
  //     fetch("http://localhost:9001/testAPI")
  //         .then(res => res.text())
  //         .then(res => setApiresponse(res));
  // }

//   const callTheatre = (town) => {
//     fetch("http://localhost:9001/theatres/list?town=Metz")
//         .then(res => res.text())
//         .then(res => setApiresponse(res));
// }
  useEffect(() => {
    console.log("App")
        //callAPI();
        //callTheatre("Metz");
  }, [])
  

  return (
    <Provider store={store}>
      <Router >
          <div className="App">
          <Navbar />
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
                <Route exact path='/dashboard' element={<Dashboard/>}/>
                <Route exact path='/showtimes' element={<Showtimes/>}/>
            </Routes>
          </div>
      </Router>
    </Provider>
        
  );
}
  

export default App;
