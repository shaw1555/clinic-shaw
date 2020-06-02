import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/home";
import Patient from "./components/patient";
import NavBar from "./components/navBar";
import Record from "./components/record";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter>
        <div>
          <ToastContainer />
          <NavBar />
          <Switch>
            <Route exact path="/patient" component={Patient} />
            <Route exact path="/record/:id" component={Record} />
            <Route exact path="/record" component={Record} />
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
