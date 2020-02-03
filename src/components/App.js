import React from 'react';
import './App.css';
import Grid from './Grid';
import { generate2DArray } from '../utils';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.gridArray = generate2DArray(5);
    this.state = { size: '5', color: '#e66465', mouseOverColor: '#f6b73c' };
  }

  handleSizeChange = e => {
    const newSize = parseInt(e.target.value);
    this.gridArray = generate2DArray(newSize);
    this.setState({ [e.target.name]: newSize });
  };

  handleColorChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="container">
        <div className="side-bar">
          <div>
            <input
              name="color"
              type="color"
              value={this.state.color}
              onChange={this.handleColorChange}
            />
            <input
              name="mouseOverColor"
              type="color"
              value={this.state.mouseOverColor}
              onChange={this.handleColorChange}
            />
          </div>
          <div className="slidecontainer">
            <input
              type="range"
              min="1"
              max="20"
              value={this.state.size}
              className="slider"
              name="size"
              onChange={this.handleSizeChange}
            />
          </div>
        </div>
        <div>
          <Grid
            gridArray={this.gridArray}
            color={this.state.color}
            mouseOverColor={this.state.mouseOverColor}
          />
        </div>
      </div>
    );
  }
}

export default App;
