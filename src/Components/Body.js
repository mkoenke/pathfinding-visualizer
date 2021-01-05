import React from "react"
import { connect } from "react-redux"
import { getInitialGrid, gridWithWall } from "../HelperFunctions/initialGrid"
import { setGrid } from "../Redux/actions"
import Node from "./Node/Node"

class Body extends React.Component {
  state = {
    mousePressed: false,
    startNode: false,
    finishNode: false,
    startRow: 1,
    startCol: 1,
    finishRow: 8,
    finishCol: 28
  }
  componentDidMount() {
    const grid = getInitialGrid(this.state)
    this.props.dispatchGrid(grid)
  }

  handleMouseDown = (row, col) => {
    this.setState({ mousePressed: true })

    let tempNode = this.props.grid[row][col]

    if (tempNode.isStart !== true && tempNode.isFinish !== true) {
      let newGrid = gridWithWall(this.props.grid, row, col)
      this.props.dispatchGrid(newGrid)
    } else if (tempNode.isStart === true) {
      this.setState({ startNode: true })
    } else if (tempNode.isFinish === true) {
      this.setState({ finishNode: true })
    }
  }

  handleMouseEnter = (row, col) => {
    if (!this.state.mousePressed) return

    if (this.state.startNode) {
      this.setState({ startRow: row, startCol: col }, () => {
        const grid = getInitialGrid(this.state)
        this.props.dispatchGrid(grid)
      })
    } else if (this.state.finishNode) {
      this.setState({ finishRow: row, finishCol: col }, () => {
        const grid = getInitialGrid(this.state)
        this.props.dispatchGrid(grid)
      })
    } else {
      const newGrid = gridWithWall(this.props.grid, row, col)
      this.props.dispatchGrid(newGrid)
    }
  }


  handleMouseUp = () => {
    this.setState({ mousePressed: false })
    if (this.state.startNode) {
      this.setState({ startNode: false })
    } else if (this.state.finishNode) {
      this.setState({ finishNode: false })
    }
  }

  render() {
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
