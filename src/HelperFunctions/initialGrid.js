export const startRow = 2
export const startCol = 2
export const finishRow = 9
export const finishCol = 28

const getInitialGrid = () => {
  const grid = []
  for (let row = 0; row < 10; row++) {
    const currentRow = []
    for (let col = 0; col < 30; col++) {
      currentRow.push(createNode(col, row))
    }
    grid.push(currentRow)
  }
  // console.log(grid)
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
