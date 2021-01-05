import React from "react"
import "./Node.css"

class Node extends React.Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      row,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
    } = this.props

    const additionalClass = isFinish
      ? "finish"
      : isStart
      ? "start"
      : isWall
      ? "wall"
      : ""

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${additionalClass}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      ></div>
    )
  }
}
export default Node
