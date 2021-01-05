import "materialize-css"
import React from "react"
import { createPortal } from "react-dom"
import { connect } from "react-redux"
import {
  animateDijkstra,
  Dijkstra,
  getShortestPath,
} from "../Algorithms/Dijkstra"
import {
  finishCol,
  finishRow,
  //   getInitialGrid,
  resetGrid,
  startCol,
  startRow,
} from "../HelperFunctions/initialGrid"
import { setGrid } from "../Redux/actions"

class NavBar extends React.Component {
  visualizeDijkstra = () => {

    let startNode = nodeHelper(this.props.grid, "start")
    let finishNode = nodeHelper(this.props.grid, "finish")

    const visitedNodes = Dijkstra(this.props.grid, startNode, finishNode)
    const shortestPath = getShortestPath(finishNode)
    animateDijkstra(visitedNodes, shortestPath)
  }

  handleNewGrid = () => {
    console.log("clicked")
    resetGrid()
    // const grid = getInitialGrid()
    // this.props.dispatchGrid(grid)
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
                <div onClick={this.visualizeDijkstra}>Visualize Algorithm</div>
              </li>
              <li>
                <div onClick={this.handleNewGrid}>New Grid</div>
              </li>
            </ul>
          </div>
          <div class="nav-content">
            <ul class="tabs tabs-transparent">
              <li class="tab">
                <div>Dijkstra'S Algorithm</div>
              </li>
              <li class="tab">
                <div>A*</div>
              </li>
              <li class="tab">
                <div>Breath-First Search</div>
              </li>
              <li class="tab">
                <div>Depth-First Search</div>
              </li>
            </ul>
          </div>
        </nav>
      </>
    )
  }
}

function nodeHelper(grid, node) {
  let temp
  for (let row of grid) {
    for (let col of row) {
      if (node === "start" && col.isStart) {
        temp = col
      } else if (node === "finish" && col.isFinish) {
        temp = col
      }
    }
  }
  return temp
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

export default connect(msp, mdp)(NavBar)
