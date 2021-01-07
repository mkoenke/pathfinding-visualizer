const resetGrid = () => {
  console.log("reset grid")
  // let nodes = document.getElementsByClassName("node")
  // console.log("nodes:", nodes)

  // /// iterate through nodes to find nodes that have classname of visited and shortest path and remove those classes

  // // nodes.classList.remove("visited")
  // // nodes..classList.remove("shortest-path")
  // getInitialGrid()

  window.location.reload(true)
}

const getInitialGrid = (bodyState) => {
  const grid = []
  for (let row = 0; row < 22; row++) {
    const currentRow = []
    for (let col = 0; col < 42; col++) {
      currentRow.push(createNode(col, row, bodyState))
    }
    grid.push(currentRow)
  }
  // console.log(grid)
  return grid
}

const createNode = (col, row, bodyState) => {
  return {
    col,
    row,
    isStart: row === bodyState.startRow && col === bodyState.startCol,
    isFinish: row === bodyState.finishRow && col === bodyState.finishCol,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  }
}

//maybe need to update this function so that it works for all adjustments
//and not just with the walls. make it dynamic with conditionals
const gridWithWall = (grid, row, col) => {
  const newGrid = [...grid]
  const node = newGrid[row][col]
  const walledNode = {
    ...node,
    isWall: !node.isWall,
  }
  newGrid[row][col] = walledNode
  return newGrid
}

const updateMainNodes = (grid, row, col) => {
  for (let i of grid) {
    for (let j of i) {
      if (j.isStart === true) {
        return j.isStart = false
      }
    }
  }
  grid[row][col].isStart = true
  return grid
}

const clearGridClasses = (grid) => {
  for (let row of grid) {
    for (let col of row) {
      console.log(col.isStart)
      if (col.isStart){
        document.getElementById(`node-${col.row}-${col.col}`).className = "node start"
      } else if (col.isFinish){
        document.getElementById(`node-${col.row}-${col.col}`).className = "node finish"
      } else {
        document.getElementById(`node-${col.row}-${col.col}`).className = "node"
      }
    }
  }
}


export { getInitialGrid, gridWithWall, resetGrid, updateMainNodes, clearGridClasses }
