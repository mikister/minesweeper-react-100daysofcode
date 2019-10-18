import React, { Component } from 'react';
import './Cell.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBomb } from '@fortawesome/free-solid-svg-icons'

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      revealed: false,
    };
  }

  onCellClick() {
    this.setState({
      revealed: true
    });

    // Emit event that cell is clicked wiht cell ID
  }

  render() {
    return(
      <div className={"cell " + (this.state.revealed ? "cell--revealed " : "") } onClick={this.onCellClick.bind(this)}>
        <FontAwesomeIcon icon={faBomb} />
      </div>
    );
  }
}

export default Cell;