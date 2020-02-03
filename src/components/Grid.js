import React from 'react';
import './Grid.css';
import Button from './Button';
import { nestedCopy } from '../utils';

let squareCounter = 1;

class Grid extends React.Component {
  constructor(props) {
    super(props);
    const { gridArray } = this.props;
    this.state = {
      originalGridModel: gridArray,
      gridModel: gridArray,
      clickedRowNumber: '',
      clickedColumnNumber: ''
    };
  }

  setGridModel = (rowNumber, columnNumber, gridArray) => {
    gridArray[rowNumber][columnNumber] = -1; // visited
    const rowSize = gridArray.length;
    const columnSize = gridArray[0].length;
    // to the left
    if (columnNumber - 1 >= 0 && gridArray[rowNumber][columnNumber - 1] === 1) {
      squareCounter++;
      this.setGridModel(rowNumber, columnNumber - 1, gridArray);
      gridArray[rowNumber][columnNumber - 1] = -1;
    }
    // to the right
    if (
      columnNumber + 1 < columnSize &&
      gridArray[rowNumber][columnNumber + 1] === 1
    ) {
      squareCounter++;
      this.setGridModel(rowNumber, columnNumber + 1, gridArray);
      gridArray[rowNumber][columnNumber + 1] = -1;
    }

    // to the up
    if (rowNumber - 1 >= 0 && gridArray[rowNumber - 1][columnNumber] === 1) {
      squareCounter++;
      this.setGridModel(rowNumber - 1, columnNumber, gridArray);
      gridArray[rowNumber - 1][columnNumber] = -1;
    }

    // to the down
    if (
      rowNumber + 1 < rowSize &&
      gridArray[rowNumber + 1][columnNumber] === 1
    ) {
      squareCounter++;
      this.setGridModel(rowNumber + 1, columnNumber, gridArray);
      gridArray[rowNumber + 1][columnNumber] = -1;
    }
  };

  changeGridModel = (rowNumber, columnNumber, isClick) => {
    squareCounter = 1;
    const newGridModel = nestedCopy(this.state.originalGridModel);
    this.setGridModel(rowNumber, columnNumber, newGridModel);
    if (isClick) {
      newGridModel[rowNumber][columnNumber] = squareCounter;
      this.setState({
        gridModel: newGridModel,
        clickedRowNumber: rowNumber,
        clickedColumnNumber: columnNumber
      });
    } else {
      this.setState({
        gridModel: newGridModel,
        clickedRowNumber: '',
        clickedColumnNumber: ''
      });
    }
  };

  handleClick = (itemValue, rowNumber, columnNumber) => {
    if (
      itemValue !== 0 &&
      (this.state.clickedRowNumber !== rowNumber ||
        this.state.clickedRowNumber !== columnNumber)
    ) {
      this.changeGridModel(rowNumber, columnNumber, true);
    }
  };

  handleMouseHover = (itemValue, rowNumber, columnNumber) => {
    if (itemValue === 0) {
      this.resetGridModel();
    } else {
      this.changeGridModel(rowNumber, columnNumber, false);
    }
  };

  resetGridModel = () => {
    this.setState({
      gridModel: this.state.originalGridModel,
      clickedRowNumber: '',
      clickedColumnNumber: ''
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (props.gridArray !== state.originalGridModel) {
      return {
        originalGridModel: props.gridArray,
        gridModel: props.gridArray,
        clickedRowNumber: '',
        clickedColumnNumber: ''
      };
    }
    return null;
  }

  render() {
    const { gridModel, clickedRowNumber, clickedColumnNumber } = this.state;
    const { color, mouseOverColor } = this.props;
    let isMouseOver = clickedRowNumber === '';

    const gridRows = gridModel.map((rowItem, rowNumber) => {
      const rowItems = rowItem.map((itemValue, columnNumber) => {
        let isClickedButton =
          rowNumber === clickedRowNumber && columnNumber === clickedColumnNumber
            ? true
            : false;

        let buttonColor =
          isMouseOver && itemValue === -1
            ? mouseOverColor
            : itemValue !== 0
            ? color
            : '';

        return (
          <Button
            key={columnNumber}
            row={rowNumber}
            column={columnNumber}
            showItemValue={isClickedButton}
            value={itemValue}
            color={buttonColor}
            handleClick={this.handleClick}
            handleMouseOver={this.handleMouseHover}
          />
        );
      });

      return (
        <div key={rowNumber} className="grid-row">
          {rowItems}
        </div>
      );
    });

    return <div className="grid">{gridRows}</div>;
  }
}

export default Grid;
