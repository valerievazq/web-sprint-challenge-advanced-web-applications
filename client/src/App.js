import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import "./styles.scss";
import ColorList from "./components/ColorList";
import BubblePage from "./components/BubblePage";
import axios from "axios";
function App() {
  const [colorList, setColorList] = useState([]);

  const getColorList = () => {
    axios
      .get("http://localhost:5000/api/colors/")
      .then((res) => setColorList(res.data))
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    getColorList();
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/BubblePage" component={BubblePage} />
          <PrivateRoute
            path="/ColorList"
            colorList={colorList}
            component={ColorList}
          />
          <Route path="/login" component={Login} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
