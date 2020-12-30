import React from "react";
// import HomePage from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import route from "../router";
import LoginAndRegister from "./LoginAndRegis/index";

const Main = () => {
  return (
    <>
      <Router>
        {/* <NavBar /> */}
        <LoginAndRegister/>

        <Switch>{showRoute(route)}</Switch>
      </Router>
      {/* <HomePage /> */}
    </>
  );
};

const showRoute = (route) => {
  var result = null;
  result = route.map((item) => {
    return <Route key={item.path} path={item.path} exact={item.exact} component={item.main} />;
  });
  return result;
};

export default Main;
