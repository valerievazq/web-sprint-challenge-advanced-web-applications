import React from "react";
import axios from "axios";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
} from "reactstrap";

class LogIn extends React.Component {
  state = {
    credentials: {
      username: "",
      password: "",
    },
  };

  handleChange = (e) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value,
      },
    });
  };

  logIn = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", this.state.credentials)

      .then((response) => {
        console.log("Credentials", response);
        localStorage.setItem("token", response.data.payload);
        this.props.history.push("/colors");
      })
      .catch();
  };

  componentDidMount() {
    localStorage.clear();
  }

  render() {
    return (
      <div className="container">
        <h1 className="nav1">Login</h1>
        <form onSubmit={this.logIn}>
          <div className="input">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Username</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                name="username"
                value={this.state.credentials.username}
                onChange={this.handleChange}
              />
            </InputGroup>
          </div>
          <br />
          <div className="input">
            {" "}
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Password</InputGroupText>
              </InputGroupAddon>
              <Input
                type="password"
                name="password"
                value={this.state.credentials.password}
                onChange={this.handleChange}
              />
            </InputGroup>
          </div>
          <br />
          {/* username: 'Lambda School', password: 'i<3Lambd4' */}
          <Button color="secondary" size="sm">
            Log In
          </Button>
        </form>
      </div>
    );
  }
}

export default LogIn;
