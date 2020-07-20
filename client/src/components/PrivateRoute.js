import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log("you are in Route render");
        if (localStorage.getItem("token")) {
          console.log("found token");
          return <Component {...props} />;
        } else {
          console.log("redirecting!");
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
