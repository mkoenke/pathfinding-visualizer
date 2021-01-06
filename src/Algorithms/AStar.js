function AStar(grid, startNode, finishNode) {
  const visitedNodes = []
  const unvisitedNodes = []
  startNode.distance = 0
  unvisitedNodes.push(startNode)
  while (unvisitedNodes.length !== 0) {
    unvisitedNodes.sort((a, b) => a.totalDistance - b.totalDistance)
    let nextNode = unvisitedNodes.shift()
    if (nextNode === finishNode) return visitedNodes

    nextNode.isVisited = true
    visitedNodes.push(nextNode)

    let neighbors = getNeighbors(nextNode, grid)
    for (let neighbor of neighbors) {
      let distance = nextNode.distance + 1
      //f(n) = g(n) + h(n)
      if (neighborNotInUnvisitedNodes(neighbor, unvisitedNodes)) {
        unvisitedNodes.unshift(neighbor)
        neighbor.distance = distance
        neighbor.totalDistance =
          distance + manhattanDistance(neighbor, finishNode)
        neighbor.previousNode = nextNode
      } else if (distance < neighbor.distance) {
        neighbor.distance = distance
        neighbor.totalDistance =
          distance + manhattanDistance(neighbor, finishNode)
        neighbor.previousNode = nextNode
      }
    }
  }
  console.log("Visited Nodes:", visitedNodes)
  return visitedNodes
}

function neighborNotInUnvisitedNodes(neighbor, unvisitedNodes) {
  for (let node of unvisitedNodes) {
    if (node.row === neighbor.row && node.col === neighbor.col) {
      return false
    }
  }
  return true
}

function getNeighbors(node, grid) {
  let neighbors = []
  let { row, col } = node
  if (col !== grid[0].length - 1) neighbors.push(grid[row][col + 1])
  if (row !== grid.length - 1) neighbors.push(grid[row + 1][col])
  if (col !== 0) neighbors.push(grid[row][col - 1])
  if (row !== 0) neighbors.push(grid[row - 1][col])
  return neighbors.filter((neighbor) => !neighbor.isWall && !neighbor.isVisited)
}

function manhattanDistance(node, finishNode) {
  let x = Math.abs(node.row - finishNode.row)
  let y = Math.abs(node.col - finishNode.col)
  return x + y
}

function getShortestPath(finishNode) {
  const shortestPath = []
  let currentNode = finishNode
  while (currentNode !== null) {
    shortestPath.unshift(currentNode)
    currentNode = currentNode.previousNode
  }
  console.log("Shortest Path:", shortestPath)
  return shortestPath
}

function animateAStar(visitedNodes, shortestPath) {
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
  console.log("temp:", temp)
  return temp
}

export function visualizeAStar(props) {
  let grid = props.grid
  let startNode = nodeHelper(grid, "start")
  let finishNode = nodeHelper(grid, "finish")
  console.log("start Node:", startNode)
  console.log("finish Node:", finishNode)

  const visitedNodes = AStar(grid, startNode, finishNode)
  const shortestPath = getShortestPath(finishNode)
  animateAStar(visitedNodes, shortestPath)
  props.dispatchSetFinishedRunning()
}
