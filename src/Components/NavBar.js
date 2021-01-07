import "materialize-css"
import React from "react"
// import { createPortal } from "react-dom"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import { visualizeAStar } from "../Algorithms/AStar"
import { visualizeDepthFirstSearch } from "../Algorithms/DepthFirstSearch"
import { visualizeDijkstra } from "../Algorithms/Dijkstra"
import { clearGridClasses, getInitialGrid, resetGrid } from "../HelperFunctions/initialGrid"
import {
  setAlgorithm,
  setFinishedRunning,
  setGrid,
  setIsRunning,
  setOffInfo,
  setOnInfo,
} from "../Redux/actions"

class NavBar extends React.Component {
  state = {
    startRow: 1,
    startCol: 1,
    finishRow: 8,
    finishCol: 28
  }

  handleNewGrid = () => {
    // resetGrid()
    clearGridClasses(this.props.grid)
    const grid = getInitialGrid(this.state)
    this.props.dispatchGrid(grid)
  }

  setAlgorithm = (algo) => {
    this.props.dispatchSetAlgorithm(algo)
    this.props.dispatchSetOffInfo()
  }

  handleOnInfo = () => {
    this.props.dispatchSetOnInfo()
  }

  handleVisualize = () => {
    this.props.dispatchSetOffInfo()
    this.props.dispatchSetIsRunning()
    console.log("Running")
    let currentAlgorithm = this.props.algorithm
    let grid = this.props.grid
    switch (currentAlgorithm) {
      case "dijkstra":
        console.log('running dijkstra')
        return visualizeDijkstra(this.props)
      case "a*":
        return visualizeAStar(this.props)
      // case "bfs":
      //   visualizeBFS(grid)
      case "dfs":
        return visualizeDepthFirstSearch(this.props)
      default:
        return visualizeDijkstra(this.props)
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

            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li>
                <NavLink to="/">
                  <div
                    onClick={this.props.isRunning ? null : this.handleVisualize}
                    style={
                      this.props.onInfo
                        ? { display: "none" }
                        : { display: "block" }
                    }
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
                  <div
                    onClick={
                      this.props.isRunning
                        ? null
                        : () => this.setAlgorithm("dijkstra")
                    }
                  >
                    Dijkstra'S Algorithm
                  </div>
                </NavLink>
              </li>
              <li class="tab">
                <NavLink to="/">
                  <div
                    onClick={
                      this.props.isRunning
                        ? null
                        : () => this.setAlgorithm("a*")
                    }
                  >
                    A*
                  </div>
                </NavLink>
              </li>
              <li class="tab">
                <NavLink to="/">
                  <div
                    onClick={
                      this.props.isRunning
                        ? null
                        : () => this.setAlgorithm("bfs")
                    }
                  >
                    Breath-First Search
                  </div>
                </NavLink>
              </li>
              <li class="tab">
                <NavLink to="/">
                  <div
                    onClick={
                      this.props.isRunning
                        ? null
                        : () => this.setAlgorithm("dfs")
                    }
                  >
                    Depth-First Search
                  </div>
                </NavLink>
              </li>
              <li class="hide-on-med-and-down tab">
                <NavLink to="/info">
                  <div onClick={this.props.onInfo ? null : this.handleOnInfo}>
                    Algorithm Info
                  </div>
                </NavLink>
              </li>
              <li class="right hide-on-med-and-down tab">
                <NavLink to="/info">
                  <div onClick={this.props.onInfo ? null : this.handleOnInfo}>
                    Sorting Algorithm Visualizer
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
    isRunning: state.isRunning,
    onInfo: state.onInfo,
  }
}
function mdp(dispatch) {
  return {
    dispatchGrid: (gridArray) => dispatch(setGrid(gridArray)),
    dispatchSetAlgorithm: (algo) => dispatch(setAlgorithm(algo)),
    dispatchSetIsRunning: () => dispatch(setIsRunning()),
    dispatchSetFinishedRunning: () => dispatch(setFinishedRunning()),
    dispatchSetOnInfo: () => dispatch(setOnInfo()),
    dispatchSetOffInfo: () => dispatch(setOffInfo()),
  }
}

export default connect(msp, mdp)(NavBar)
