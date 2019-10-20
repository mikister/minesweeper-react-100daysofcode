import React, { Component } from 'react';
import './App.css';

import Cell from "./components/Cell.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cellContents: [],
      cellsRevealed: [],
      cellsFlaged: [],
      bombCount: 40,
      contentGenerated: false,
      colsNum: 10,
      rowsNum: 18,
    };

    this.gridRef = React.createRef();
  }

  setAsyncState = (newState) => {
    return new Promise((resolve) => this.setState(newState, () => resolve()));
  }

  componentDidMount() {
    console.dir(this);
    let cellCount = this.state.rowsNum * this.state.colsNum;

    this.gridRef.current.style.setProperty("--larger-dimension", this.state.rowsNum);
    this.gridRef.current.style.setProperty("--smaller-dimension", this.state.colsNum);

    this.setState({
      cellContents: Array(cellCount).fill(""),
      cellsRevealed: Array(cellCount).fill(false),
      cellsFlaged: Array(cellCount).fill(false),
    });
  }

  getNeighboringCells(cellIndex) {
    var neighbors = [];
    
    let cellCount = this.state.rowsNum * this.state.colsNum;
    let rowAboveCell = cellIndex - this.state.colsNum;
    let rowBellowCell = cellIndex + this.state.colsNum;

    if (rowAboveCell > 0) {
      neighbors.push(rowAboveCell);

      if ((cellIndex + 1) % this.state.colsNum !== 1)
        neighbors.push(rowAboveCell - 1)

      if ((cellIndex + 1) % this.state.colsNum !== 0)
        neighbors.push(rowAboveCell + 1);
    }

    if ((cellIndex + 1) % this.state.colsNum !== 1)
      neighbors.push(cellIndex - 1);
    if ((cellIndex + 1) % this.state.colsNum !== 0)
      neighbors.push(cellIndex + 1);

    if (rowBellowCell < cellCount) {
      neighbors.push(rowBellowCell);

      if ((cellIndex + 1) % this.state.colsNum !== 1)
        neighbors.push(rowBellowCell - 1);
      
      if ((cellIndex + 1) % this.state.colsNum !== 0)
        neighbors.push(rowBellowCell + 1);
    }

    console.log(cellIndex, neighbors);

    return neighbors;
  }

  renderGrid() {
    var cells = [];

    for(var cellIndex = 0; cellIndex < (this.state.colsNum * this.state.rowsNum); cellIndex++) {
      cells.push(
        <Cell 
          cellClicked={this.cellClicked.bind(this)} 
          cellFlag={this.cellFlag.bind(this)}
          content={this.state.cellContents[cellIndex]} 
          revealed={this.state.cellsRevealed[cellIndex]} 
          flaged={this.state.cellsFlaged[cellIndex]}
          cellIndex={cellIndex} 
          key={cellIndex} 
        />);
    }

    return cells;
  }

  generateCellContents(protectedCellIndex=null) {
    let cellCount = this.state.rowsNum * this.state.colsNum;
    var bombsPlaced = 0;
    var newCellContents = Array(cellCount).fill("");
    var neighboringCells = [];

    while(bombsPlaced < this.state.bombCount) {
      let bombCellIndex = Math.floor(Math.random() * cellCount);

      if (newCellContents[bombCellIndex] !== "b") {
        if (protectedCellIndex === null) {
          newCellContents[bombCellIndex] = "b";
          bombsPlaced++;
        }
        else {
          if (bombCellIndex === protectedCellIndex)
            continue;

          neighboringCells = this.getNeighboringCells(protectedCellIndex);
          var bombInProtectedArea = false;

          neighboringCells.forEach((neighborIndex) => {
            if (neighborIndex === bombCellIndex) {
              bombInProtectedArea = true;
            }
          });

          if (bombInProtectedArea) {
            continue;
          }

          newCellContents[bombCellIndex] = "b";
          bombsPlaced++;
        }
      }
    }

    for(var cellIndex = 0; cellIndex < cellCount; cellIndex++) {
      if (newCellContents[cellIndex] === "b")
        continue;

      var bombsAroundCell = 0;
      neighboringCells = this.getNeighboringCells(cellIndex);

      neighboringCells.forEach((neighborIndex) => {
        if (newCellContents[neighborIndex] === "b") {
          bombsAroundCell++;
        }
      });

      if (bombsAroundCell > 0) {
        newCellContents[cellIndex] = bombsAroundCell.toString();
      }
    }

    return this.setAsyncState({
      cellContents: newCellContents,
    });
  }

  cellFlag(cellIndex) {
    var newCellsFlaged = this.state.cellsFlaged;
    newCellsFlaged[cellIndex] = !newCellsFlaged[cellIndex];

    this.setState({
      cellsFlaged: newCellsFlaged,  
    });
  }

  cellClicked = async (cellIndex) => {
    if (!this.state.contentGenerated) {
      await this.generateCellContents(cellIndex);

      this.setState({
        contentGenerated: true,  
      });
    }

    if (this.state.cellsRevealed[cellIndex] === false && this.state.cellsFlaged[cellIndex] === false) {
      var newCellsRevealed = this.state.cellsRevealed;
      newCellsRevealed[cellIndex] = true;
      await this.setAsyncState({
        cellsRevealed: newCellsRevealed,
      });

      this.checkCell(cellIndex);
    }
  }

  checkCell = async (cellIndex) => {
    if (this.state.cellContents[cellIndex] === "b") {
      this.gameOver();
    }
    else if (this.state.cellContents[cellIndex] === "") {
      var neighboringCells = this.getNeighboringCells(cellIndex)

      neighboringCells.forEach((neighborIndex) => {
        if (this.state.cellContents[neighborIndex] !== "b") {
          this.cellClicked(neighborIndex);
        }
      });
    }
  }

  gameOver() {
    let cellCount = this.state.rowsNum * this.state.colsNum;

    this.setState({
      cellsRevealed: Array(cellCount).fill(true),
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
