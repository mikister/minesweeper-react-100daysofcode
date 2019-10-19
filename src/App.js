import React, { Component } from 'react';
import './App.css';

import Cell from "./components/Cell.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cellContents: [],
      bombCount: 10,
      contentGenerated: false,
      colsNum: 10,
      rowsNum: 18,
    };

    this.gridRef = React.createRef();
  }

  componentDidMount() {
    let cellCount = this.state.rowsNum * this.state.colsNum;

    this.gridRef.current.style.setProperty("--larger-dimension", this.state.rowsNum);
    this.gridRef.current.style.setProperty("--smaller-dimension", this.state.colsNum);

    this.setState({
      cellContents: Array(cellCount).fill(""),
    });
  }

  renderGrid() {
    var cells = [];

    for(var ii = 0; ii < (this.state.colsNum * this.state.rowsNum); ii++) {
      cells.push(<Cell content={this.state.cellContents[ii]} key={ii} />);
    }

    return cells;
  }

  generateCellContents(protectedCellIndex=null) {
    let cellCount = this.state.rowsNum * this.state.colsNum;
    var bombsPlaced = 0;
    var newCellContents = [];
    console.log(protectedCellIndex);

    while(bombsPlaced < this.state.bombCount) {
      let bombCell = Math.floor(Math.random() * cellCount);

      if (newCellContents[bombCell] !== "b") {
        if (protectedCellIndex === null) {
          newCellContents[bombCell] = "b";
          bombsPlaced++;
        }
        else {
          var aa = protectedCellIndex - this.state.colsNum;
          var bb = protectedCellIndex + this.state.colsNum;

          if (bombCell == protectedCellIndex)
            continue;
  
          if (aa > 0) {
            if ((protectedCellIndex + 1) % this.state.colsNum !== 1)
              if (aa - 1 === bombCell)
                continue;
    
            if (aa === bombCell)
            continue;
    
            if ((protectedCellIndex + 1) % this.state.colsNum !== 0)
              if (aa + 1 === bombCell)
                continue;
          }
    
          if ((protectedCellIndex + 1) % this.state.colsNum !== 1)
            if (protectedCellIndex - 1 === bombCell)
              continue;
          if ((protectedCellIndex + 1) % this.state.colsNum !== 0)
            if (protectedCellIndex + 1 === bombCell)
              continue;
    
          if (bb < cellCount) {
            if ((protectedCellIndex + 1) % this.state.colsNum !== 1)
              if (bb - 1 === bombCell)
                continue;
    
            if (bb === bombCell)
              continue;
            
            if ((protectedCellIndex + 1) % this.state.colsNum !== 0)
              if (bb + 1 === bombCell)
                continue;
          }

          newCellContents[bombCell] = "b";
          bombsPlaced++;
        }
      }
    }

    for(var ii = 0; ii < cellCount; ii++) {
      var bombsAroundCell = 0;
      var aa = ii - this.state.colsNum;
      var bb = ii + this.state.colsNum;

      if (newCellContents[ii] === "b")
        continue;

      if (aa > 0) {
        if ((ii + 1) % this.state.colsNum !== 1)
          bombsAroundCell += newCellContents[aa - 1] === "b" ? 1 : 0;

        bombsAroundCell += newCellContents[aa] === "b" ? 1 : 0;

        if ((ii + 1) % this.state.colsNum !== 0)
          bombsAroundCell += newCellContents[aa + 1] === "b" ? 1 : 0;
      }

      if ((ii + 1) % this.state.colsNum !== 1)
        bombsAroundCell += newCellContents[ii - 1] === "b" ? 1 : 0;
      if ((ii + 1) % this.state.colsNum !== 0)
        bombsAroundCell += newCellContents[ii + 1] === "b" ? 1 : 0;

      if (bb < cellCount) {
        if ((ii + 1) % this.state.colsNum !== 1)
          bombsAroundCell += newCellContents[bb - 1] === "b" ? 1 : 0;

        bombsAroundCell += newCellContents[bb] === "b" ? 1 : 0;
        
        if ((ii + 1) % this.state.colsNum !== 0)
          bombsAroundCell += newCellContents[bb + 1] === "b" ? 1 : 0;
      }

      if (bombsAroundCell > 0) {
        newCellContents[ii] = bombsAroundCell.toString();
      }
    }

    this.setState({
      cellContents: newCellContents,
    });
  }
  


  render() {
    return (
      <div className="App">
        <header className="header">
          {/* menu button here */}
          <h1>Minesweeper</h1>
        </header>
        <div className="grid-wrapper">
          <main className="grid" ref={this.gridRef}>
            { this.renderGrid.bind(this)() }
          </main>
        </div>
      </div>
    );
  }
}

export default App;
