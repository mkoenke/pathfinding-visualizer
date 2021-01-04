import React from "react"
import "./Node.css"

class Node extends React.Component {
  render() {
    const { col, isFinish, isStart, isWall, row } = this.props

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
      ></div>
    )
  }
}
export default Node
