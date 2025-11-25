import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import MemberDashboard from "./Pages/Dashboard/MemberDashboard/MemberDashboard";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard/AdminDashboard";
import Allbooks from "./Pages/Allbooks";
import Header from "./Components/Header";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Header />

      <div className="App">
        <Switch>
          {/* Home */}
          <Route exact path="/">
            <Home />
          </Route>

          {/* Signin → Redirect if logged in */}
          <Route exact path="/signin">
            {user ? (
              user.isAdmin ? (
                <Redirect to="/dashboard@admin" />
              ) : (
                <Redirect to="/dashboard@member" />
              )
            ) : (
              <Signin />
            )}
          </Route>

          {/* Member Dashboard */}
          <Route exact path="/dashboard@member">
            {user ? (
              user.isAdmin === false ? (
                <MemberDashboard />
              ) : (
                <Redirect to="/" />
              )
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          {/* Admin Dashboard */}
          <Route exact path="/dashboard@admin">
            {user ? (
              user.isAdmin === true ? (
                <AdminDashboard />
              ) : (
                <Redirect to="/" />
              )
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          {/* All Books */}
          <Route exact path="/books">
            <Allbooks />
          </Route>

        </Switch>
      </div>
    </Routes>
    </
  );
}

export default App;
