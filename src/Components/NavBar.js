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
    startRow: 4,
    startCol: 5,
    finishRow: 17,
    finishCol: 36,
  }

  handleNewGrid = () => {
    // resetGrid()
    const grid = getInitialGrid(this.state)
    clearGridClasses(this.props.grid)
    console.log(grid)
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
          style={{ backgroundColor: "#70566dff" }}
        >
          <div class="nav-wrapper">
            <a href="#" class="brand-logo right">
              Pathfinding Algorithm Visualizer
            </a>

            <ul id="nav-mobile" class="hide-on-med-and-down">
              <li onClick={this.props.isRunning ? null : this.handleNewGrid}>
                <NavLink to="/">
                  <div
                    style={
                      this.props.onInfo
                        ? { display: "none" }
                        : { display: "block" }
                    }
                  >
                    New Grid</div>
                </NavLink>
              </li>
              <li onClick={this.props.isRunning ? null : this.handleVisualize}>
                <NavLink to="/">
                  <div
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
            </ul>
          </div>
          <div class="nav-content">
            <ul class="tabs tabs-transparent">
              <li class="tab" onClick={
                this.props.isRunning
                  ? null
                  : () => this.setAlgorithm("dijkstra")
              }>
                <NavLink to="/">
                  <div

                  >
                    Dijkstra'S Algorithm
                  </div>
                </NavLink>
              </li>
              <li onClick={
                this.props.isRunning
                  ? null
                  : () => this.setAlgorithm("a*")
              } class="tab">
                <NavLink to="/">
                  <div

                  >
                    A*
                  </div>
                </NavLink>
              </li>
              <li class="tab" onClick={
                this.props.isRunning
                  ? null
                  : () => this.setAlgorithm("bfs")
              }>
                <NavLink to="/">
                  <div>
                    Breath-First Search
                  </div>
                </NavLink>
              </li>
              <li class="tab" onClick={
                this.props.isRunning
                  ? null
                  : () => this.setAlgorithm("dfs")
              }>
                <NavLink to="/">
                  <div

                  >
                    Depth-First Search
                  </div>
                </NavLink>
              </li>
              <li class="hide-on-med-and-down tab" onClick={this.props.onInfo ? null : this.handleOnInfo}>
                <NavLink to="/info">
                  <div >
                    Algorithm Info
                  </div>
                </NavLink>
              </li>
              <li class="right hide-on-med-and-down tab" onClick={this.props.onInfo ? null : this.handleOnInfo}>
                <NavLink to="/info">
                  <div >
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
