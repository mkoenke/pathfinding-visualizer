const startRow = 2
const startCol = 2
const finishRow = 9
const finishCol = 28

const getInitialGrid = () => {
  const grid = []
  for (let row = 0; row < 10; row++) {
    const currentRow = []
    for (let col = 0; col < 30; col++) {
      currentRow.push(createNode(col, row))
    }
    grid.push(currentRow)
  }
  console.log(grid)
  return grid
}
const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === startRow && col === startCol,
    isFinish: row === finishRow && col === finishCol,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  }
}

export default getInitialGrid
