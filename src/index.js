import { Router, Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";

import { history } from "./utils/history";
import Login from "./pages/Login/Login";
import MainLayout from "./components/Layout/MainLayout";
import Register from "./pages/Register/RegisterForm";
import ApplyEmail from "./pages/Register/ApplyEmail";
import RegisterToMail from "./pages/Register/RegisterToMail";
//------------------------ Redux----------------------------||
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "./reducers";
import logger from "redux-logger";
/* style */

import "./index.css";
import "./app.less";

function PrivateRoute({ children, ...rest }) {
  console.log(">>>>>>",{...children})
  return (
    <div>
      <Route
        {...rest}
        render={({ location }) => {
          return localStorage.getItem("userLogin") ? (
            children
          ) : (
            <Redirect to={{ pathname: "/login", state: { from: location } }} />
          );
        }}
      />
    </div>
  );
}

const App = () => (
 
  <div className="nav">
    { console.log("App")}
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/applymail" component={ApplyEmail} />
        <Route exact path="/verifytomail" component={RegisterToMail} />
        <PrivateRoute path="/">
          <MainLayout />
        </PrivateRoute>
      </Switch>
    </Router>
  </div>
);
var middlewares = (middlewares = applyMiddleware(thunk, logger));

const store = createStore(reducers, middlewares);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
