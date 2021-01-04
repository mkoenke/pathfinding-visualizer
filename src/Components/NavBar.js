import "materialize-css"
import React from "react"

class NavBar extends React.Component {
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
                <div>Visualize Algorithm</div>
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

export default NavBar
