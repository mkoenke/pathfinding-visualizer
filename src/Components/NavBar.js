import "materialize-css"
import React from "react"
import { createPortal } from "react-dom"
import { connect } from "react-redux"
import {
  visualizeDijkstra
} from "../Algorithms/Dijkstra"
import {
  resetGrid,
} from "../HelperFunctions/initialGrid"
import { setAlgorithm, setGrid } from "../Redux/actions"

class NavBar extends React.Component {
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
    let grid = this.props.grid
    switch (currentAlgorithm) {
      case "dijkstra":
        visualizeDijkstra(grid)
      // case "a*":
      //   visualizeA(grid)
      // case "bfs":
      //   visualizeBFS(grid)
      // case "dfs":
      //   visualizeDFS(grid)
      default:
        visualizeDijkstra(grid)
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
