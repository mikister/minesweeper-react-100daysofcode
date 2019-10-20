import React, { Component } from 'react';
import './Cell.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBomb, faFlag } from '@fortawesome/free-solid-svg-icons'

class Cell extends Component {
  onCellClick() {
    this.props.cellClicked(this.props.cellIndex);
  }

  onCellFlag(event) {
    this.props.cellFlag(this.props.cellIndex);
    event.preventDefault();
  }

  renderContent() {
    if (this.props.flaged) {
      return( <FontAwesomeIcon icon={faFlag} /> );
    }
    else if(this.props.content === "") {
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
      <div
        className={
          "cell " + 
          (this.props.revealed ? "cell--revealed " : "") + 
          (this.props.flaged ? "cell--flaged " : "") 
        }
        onClick={this.onCellClick.bind(this)}
        onContextMenu={this.onCellFlag.bind(this)}
      >
        { this.renderContent() }
      </div>
    );
  }
}

export default Cell;