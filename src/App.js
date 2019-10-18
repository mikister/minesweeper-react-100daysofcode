import React, { Component } from 'react';
import './App.css';

import Cell from "./components/Cell.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colsNum: 10,
      rowsNum: 12,
    };

    this.gridRef = React.createRef();
  }

  componentDidMount() {
    this.gridRef.current.style.setProperty("--colsNum", this.state.colsNum);
  }

  renderGrid() {
    var cells = [];

    for(var ii = 1; ii < (this.state.colsNum * this.state.rowsNum); ii++) {
      cells.push(<Cell />);
    }

    return cells;
  }
  


  render() {
    return (
      <div className="App">
        <header className="header">
          {/* menu button here */}
          <h1>Minesweeper</h1>
        </header>
        <main className="grid" ref={this.gridRef}>
          { this.renderGrid.bind(this)() }
          <div className="cell"></div>
        </main>
      </div>
    );
  }
}

export default App;
