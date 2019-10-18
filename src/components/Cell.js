import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      revealed: false,
    };
  }

  render() {
    return(
      <div className="cell"></div>
    );
  }
}

export default Cell;