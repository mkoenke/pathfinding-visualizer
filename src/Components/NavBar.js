import "materialize-css"
import React from "react"
import { connect } from "react-redux"
// import {
//   animateDijkstra,
//   Dijkstra,
//   getShortestPath,
// } from "../Algorithms/Dijkstra"
import {
  //   finishCol,
  //   finishRow,
  //   startCol,
  //   startRow,
  resetGrid,
} from "../HelperFunctions/initialGrid"
import { setAlgorithm, setGrid } from "../Redux/actions"

class NavBar extends React.Component {
  //   visualizeDijkstra = () => {
  //     const startNode = this.props.grid[startRow][startCol]
  //     const finishNode = this.props.grid[finishRow][finishCol]
  //     const visitedNodes = Dijkstra(this.props.grid, startNode, finishNode)
  //     const shortestPath = getShortestPath(finishNode)
  //     animateDijkstra(visitedNodes, shortestPath)
  //   }

  handleNewGrid = () => {
    resetGrid()
    // const grid = getInitialGrid()
    // this.props.dispatchGrid(grid)
  }

  setAlgorithm = (algo) => {
    this.props.dispatchSetAlgorithm(algo)
  }

  handleVisualize = () => {
    let currentAlgorithm = this.props.algorithm
    switch (currentAlgorithm) {
      case "dijkstra":
        return this.visualizeDijkstra()
      //   case "a*":
      //     return this.visualizeA()
      //   case "bfs":
      //     return visualizeBFS()
      //   case "dfs":
      //     return visualizeDFS()

      default:
        return this.visualizeDijkstra()
    }
  }

  render() {
    return (
      <>
        <nav
          class="nav-extended"
          style={{ backgroundColor: "rgb(52, 157, 238)" }}
        >
          <div class="nav-wrapper">
            <a href="#" class="brand-logo">
              Pathfinding Algorithm Visualizer
            </a>
            <a href="#" data-target="mobile-demo" class="sidenav-trigger">
              <i class="material-icons">menu</i>
            </a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li>
                <div onClick={this.handleVisualize}>Visualize Algorithm</div>
              </li>
              <li>
                <div onClick={this.handleNewGrid}>New Grid</div>
              </li>
            </ul>
          </div>
          <div class="nav-content">
            <ul class="tabs tabs-transparent">
              <li class="tab">
                <div onClick={() => this.setAlgorithm("dijkstra")}>
                  Dijkstra'S Algorithm
                </div>
              </li>
              <li class="tab">
                <div onClick={() => this.setAlgorithm("a*")}>A*</div>
              </li>
              <li class="tab">
                <div onClick={() => this.setAlgorithm("bfs")}>
                  Breath-First Search
                </div>
              </li>
              <li class="tab">
                <div onClick={() => this.setAlgorithm("dfs")}>
                  Depth-First Search
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </>
    )
  }
}

function msp(state) {
  return {
    grid: state.grid,
    algo: state.algo,
  }
}
function mdp(dispatch) {
  return {
    dispatchGrid: (gridArray) => dispatch(setGrid(gridArray)),
    dispatchSetAlgorithm: (algo) => dispatch(setAlgorithm(algo)),
  }
}

export default connect(msp, mdp)(NavBar)
