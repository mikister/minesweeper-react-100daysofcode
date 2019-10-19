import React, { Component } from 'react';
import './Cell.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBomb } from '@fortawesome/free-solid-svg-icons'

class Cell extends Component {
  constructor(props) {
    super(props);
  }

  onCellClick() {
    this.props.cellClicked(this.props.cellIndex);
  }

  renderContent() {
    if(this.props.content === "") {
      return( null );
    }
    else if(this.props.content === "b") {
      return( <FontAwesomeIcon icon={faBomb} /> );
    }
    else {
      return( <span>{ this.props.content }</span> );
    }
  }

  render() {
    return(
      <div className={"cell " + (this.props.revealed ? "cell--revealed " : "") } onClick={this.onCellClick.bind(this)}>
        { this.renderContent() }
      </div>
    );
  }
}

export default Cell;