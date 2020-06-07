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
        <div style={{height: "685px"}}>
          <ToastContainer />
          <NavBar />
          <Switch>
            <Route exact path="/patient" component={Patient} />
            <Route exact path="/record/:id" component={Record} />
            <Route exact path="/record" component={Record} />
            <Route exact path="/" component={Home} />
          </Switch>                    
        </div>
        <p className="pr-3 float-right">Developed by Soft & Sharing</p>
      </BrowserRouter>
    );
  }
}

export default App;
