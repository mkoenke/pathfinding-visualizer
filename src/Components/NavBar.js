import "materialize-css"
import React from "react"
// import { createPortal } from "react-dom"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import { visualizeAStar } from "../Algorithms/AStar"
import { visualizeDepthFirstSearch } from "../Algorithms/DepthFirstSearch"
import { visualizeDijkstra } from "../Algorithms/Dijkstra"
import { resetGrid } from "../HelperFunctions/initialGrid"
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
      case "a*":
        console.log("A Star")
        visualizeAStar(grid)
      // case "bfs":
      //   visualizeBFS(grid)
      case "dfs":
        visualizeDepthFirstSearch(grid)
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
            {/* <a href="#" data-target="mobile-demo" class="sidenav-trigger">
              <i class="material-icons">menu</i>
            </a> */}
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li>
                <NavLink to="/">
                  <div
                    onClick={this.handleVisualize}
                    // style={
                    //   this.props.onInfo
                    //     ? { display: "none" }
                    //     : { display: "block" }
                    // }
                  >
                    Visualize Algorithm
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/">
                  <div onClick={this.handleNewGrid}>New Grid</div>
                </NavLink>
              </li>
            </ul>
          </div>
          <div class="nav-content">
            <ul class="tabs tabs-transparent">
              <li class="tab">
                <NavLink to="/">
                  <div onClick={() => this.setAlgorithm("dijkstra")}>
                    Dijkstra'S Algorithm
                  </div>
                </NavLink>
              </li>
              <li class="tab">
                <NavLink to="/">
                  <div onClick={() => this.setAlgorithm("a*")}>A*</div>
                </NavLink>
              </li>
              <li class="tab">
                <NavLink to="/">
                  <div onClick={() => this.setAlgorithm("bfs")}>
                    Breath-First Search
                  </div>
                </NavLink>
              </li>
              <li class="tab">
                <NavLink to="/">
                  <div onClick={() => this.setAlgorithm("dfs")}>
                    Depth-First Search
                  </div>
                </NavLink>
              </li>
              <li class="right hide-on-med-and-down tab">
                <NavLink to="/info">
                  <div onClick={this.props.onInfo ? null : this.handleOnInfo}>
                    Algorithm Info
                  </div>
                </NavLink>
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
    algorithm: state.algorithm,
  }
}
function mdp(dispatch) {
  return {
    dispatchGrid: (gridArray) => dispatch(setGrid(gridArray)),
    dispatchSetAlgorithm: (algo) => dispatch(setAlgorithm(algo)),
  }
}

export default connect(msp, mdp)(NavBar)
