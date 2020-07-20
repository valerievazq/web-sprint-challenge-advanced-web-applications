import React, { useState } from "react";
import { axiosWithAuth } from "./axios/axiosWithAuth";
import { useHistory } from "react-router-dom";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
} from "reactstrap";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const cred = { username: "", password: "" };
  const [state, setState] = useState(cred);
  const { push } = useHistory();

  const handleChange = (e) => {
    e.persist();

    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .post("http://localhost:5000/api/login", state)
      .then((res) => {
        console.log("POST response: ", res);
        localStorage.setItem("token", res.data.payload);

        push("/protected");
      })
      .catch((err) => {
        console.log(err);
        const error = document.querySelector(".error");
        error.textContent = "Incorrect Login";
      });
  };

  return (
    <div>
      {" "}
      <div className="container">
        <form onSubmit={login} className="form">
          <h1>Log In</h1>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Username</InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              name="username"
              value={state.username}
              onChange={handleChange}
              placeholder="username"
            />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Password</InputGroupText>
            </InputGroupAddon>
            <Input
              type="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              placeholder="password"
            />
          </InputGroup>
          <br />
          <Button color="secondary" size="sm">
            Log In
          </Button>

          <span className="error"></span>
        </form>
      </div>
    </div>
  );
};

export default Login;
