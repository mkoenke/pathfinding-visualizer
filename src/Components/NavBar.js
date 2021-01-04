import "materialize-css"
import React from "react"
import { connect } from "react-redux"
import {
  animateDijkstra,
  Dijkstra,
  getShortestPath,
} from "../Algorithms/Dijkstra"
import {
  finishCol,
  finishRow,
  startCol,
  startRow,
} from "../HelperFunctions/initialGrid"

class NavBar extends React.Component {
  visualizeDijkstra() {
    const startNode = this.props.grid[startRow][startCol]
    const finishNode = this.props.grid[finishRow][finishCol]
    const visitedNodes = Dijkstra(this.props.grid, startNode, finishNode)
    const shortestPath = getShortestPath(finishNode)
    animateDijkstra(visitedNodes, shortestPath)
  }
  render() {
    return (
      <>
        <nav class="nav-extended">
          <div class="nav-wrapper">
            <a href="#" class="brand-logo">
              Pathfinding Algorithm Visualizer
            </a>
            <a href="#" data-target="mobile-demo" class="sidenav-trigger">
              <i class="material-icons">menu</i>
            </a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li>
                <div onClick={() => this.visualizeDijkstra()}>
                  Visualize Algorithm
                </div>
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

function msp(state) {
  return {
    grid: state.grid,
  }
}

export default connect(msp)(NavBar)
