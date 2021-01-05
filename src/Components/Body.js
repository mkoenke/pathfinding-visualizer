import React from "react"
import { connect } from "react-redux"
import { getInitialGrid, gridWithWall } from "../HelperFunctions/initialGrid"
import { setGrid } from "../Redux/actions"
import Node from "./Node/Node"

class Body extends React.Component {
  state = {
    mousePressed: false,
  }
  componentDidMount() {
    const grid = getInitialGrid()
    this.props.dispatchGrid(grid)
  }

  handleMouseDown = (row, col) => {
    // console.log("handle mouse down", row, col)
    this.setState({ mousePressed: true })
    const newGrid = gridWithWall(this.props.grid, row, col)
    this.props.dispatchGrid(newGrid)
  }
  handleMouseEnter = (row, col) => {
    // console.log("handle mouse enter", row, col)
    if (!this.state.mousePressed) return
    const newGrid = gridWithWall(this.props.grid, row, col)
    this.props.dispatchGrid(newGrid)
  }

  handleMouseUp = () => {
    this.setState({ mousePressed: false })
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
                      mousePressed={this.state.mousePressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={this.handleMouseUp}
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
