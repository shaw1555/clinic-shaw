import React, { Component } from "react";
import { connect } from "react-redux";

class Home extends Component {
  state = {};
  componentDidMount = () => {
   
  };
  render() {
    return (
      <div>
        <h1> Home</h1>
        
      </div>
    );
  }
}

const mapStateToProps = ({ }) => {
  return {};
};

export default connect(mapStateToProps, {})(Home);
