import React, { Component } from "react";

class Record extends Component {
  state = {};
  render() {
    const { id } = this.props.match.params;

    return <h1> { id } </h1>;
  }
}

export default Record;
