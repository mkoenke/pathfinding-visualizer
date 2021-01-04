import React from "react"
import { connect } from "react-redux"
import getInitialGrid from "../HelperFunctions/initialGrid"
import { setGrid } from "../Redux/actions"
import Node from "./Node/Node"

class Body extends React.Component {
  componentDidMount() {
    const grid = getInitialGrid()
    this.props.dispatchGrid(grid)
  }
  render() {
    // console.log(this.state.grid)
    return (
      <>
        <br></br>
        <div className="grid">
          {this.props.grid.map((row, index) => {
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
                    />
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

function msp(state) {
  return {
    grid: state.grid,
  }
}
function mdp(dispatch) {
  return {
    dispatchGrid: (gridArray) => dispatch(setGrid(gridArray)),
  }
}

export default connect(msp, mdp)(Body)
