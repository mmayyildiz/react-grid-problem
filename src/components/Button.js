import React from 'react';

class Button extends React.Component {
  render() {
    const {
      handleClick,
      handleMouseOver,
      row,
      column,
      showItemValue,
      value,
      color
    } = this.props;

    const visibilityStatus = showItemValue ? 'visible' : 'hidden';

    return (
      <button
        style={{
          backgroundColor: color
        }}
        onMouseOver={() => handleMouseOver(value, row, column)}
        onClick={() => handleClick(value, row, column)}
      >
        <span style={{ visibility: visibilityStatus }}>{value}</span>
      </button>
    );
  }
}

export default Button;
