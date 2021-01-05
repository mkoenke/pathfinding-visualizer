export const startRow = 2
export const startCol = 2
export const finishRow = 9
export const finishCol = 28

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
  for (let row = 0; row < 10; row++) {
    const currentRow = []
    for (let col = 0; col < 30; col++) {
      currentRow.push(createNode(col, row, bodyState))
    }
    grid.push(currentRow)
  }
  // console.log(grid)
  return grid
}

const createNode = (col, row, bodyState) => {
  console.log(bodyState.finishRow, bodyState.finishCol)
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

export { getInitialGrid, gridWithWall, resetGrid }
