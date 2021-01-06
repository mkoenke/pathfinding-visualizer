export const DepthFirstSearch = (grid, startNode, finishNode) => {
  const unvisited = []
  const visitedNodes = []
  startNode.isVisted = true
  startNode.previousNode = null
  unvisited.push(startNode)
  visitedNodes.push(startNode)
  while (unvisited.length !== 0) {
    let currentNode = unvisited.pop()
    if (currentNode === finishNode) return visitedNodes
    currentNode.isVisited = true
    visitedNodes.push(currentNode)
    let neighbors = getNextNeighbors(currentNode, grid)

    for (const neighbor of neighbors) {
      neighbor.previousNode = currentNode
      unvisited.push(neighbor)
    }
  }
  return visitedNodes
}

const getNextNeighbors = (node, grid) => {
  let neighbors = []
  const { col, row } = node
  if (row > 0) neighbors.push(grid[row - 1][col])
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
  if (col > 0) neighbors.push(grid[row][col - 1])
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
  neighbors = neighbors.filter((neighbor) => !neighbor.isVisited)
  return neighbors.filter((neighbor) => !neighbor.isWall)
}

function getShortestPath(finishNode) {
  const shortestPath = []
  let currentNode = finishNode
  while (currentNode !== null) {
    shortestPath.unshift(currentNode)
    currentNode = currentNode.previousNode
  }
  return shortestPath
}

function animateDepthFirstSearch(visitedNodes, shortestPath) {
  for (let i = 0; i <= visitedNodes.length; i++) {
    if (i === visitedNodes.length) {
      setTimeout(() => {
        animateShortestPath(shortestPath)
      }, 10 * i)
      return
    }
    setTimeout(() => {
      const node = visitedNodes[i]
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node visited"
    }, 10 * i)
  }
}

export function animateShortestPath(shortestPath) {
  for (let i = 0; i < shortestPath.length; i++) {
    setTimeout(() => {
      const node = shortestPath[i]
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node shortest-path"
    }, 50 * i)
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

export function visualizeDepthFirstSearch(grid) {
  let startNode = nodeHelper(grid, "start")
  let finishNode = nodeHelper(grid, "finish")

  const visitedNodes = DepthFirstSearch(grid, startNode, finishNode)
  const shortestPath = getShortestPath(finishNode)
  animateDepthFirstSearch(visitedNodes, shortestPath)
}
