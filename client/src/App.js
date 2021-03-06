import { Fragment, useState, useEffect } from "react";
import "./App.css";
import "antd/dist/antd.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// components
import Dashboard from "./views/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import UploadItem from "./components/UploadItem";
import DatabaseSelectionView from "./views/DatabaseSelectionView";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [database, setDatabase] = useState("");

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verified/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseResponse = await response.json();

      parseResponse === true
        ? setIsAuthenticated(true)
        : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    isAuth();
  });

  return (
    <div className="App">
      <Fragment>
        <Router>
          <div className="container">
            <Switch>
              <Route
                exact
                path="/selectDatabase"
                render={(props) =>
                  database === "" ? (
                    <DatabaseSelectionView setDatabase={setDatabase} />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              ></Route>
              <Route
                exact
                path="/login"
                render={(props) =>
                  !isAuthenticated ? (
                    <Login {...props} db={database} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/dashboard" />
                  )
                }
              ></Route>
              <Route
                exact
                path="/register"
                render={(props) =>
                  !isAuthenticated ? (
                    <Register {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/selectDatabase" />
                  )
                }
              ></Route>
              <Route
                exact
                path="/dashboard"
                render={(props) =>
                  isAuthenticated ? (
                    <Dashboard {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/selectDatabase" />
                  )
                }
              ></Route>
            </Switch>
          </div>
        </Router>
      </Fragment>
    </div>
  );
}

export default App;
