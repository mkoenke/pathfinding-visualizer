import React from "react"
import getInitialGrid from "../HelperFunctions/initialGrid"
import Node from "./Node/Node"

class Body extends React.Component {
  state = {
    grid: [],
  }
  componentDidMount() {
    const grid = getInitialGrid()
    this.setState({ grid })
  }
  render() {
    // console.log(this.state.grid)
    return (
      <>
        <br></br>
        <div className="grid">
          {this.state.grid.map((row, index) => {
            return (
              <div key={index}>
                {row.map((node, index) => {
                  const { row, col, isFinish, isStart, isWall } = node
                  return (
                    <Node
                      key={index}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      row={row}
                    ></Node>
                  )
                })}
              </div>
            )
          })}
        </div>
      </>
    )
  }
}

export default Body
