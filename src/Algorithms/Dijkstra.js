function Dijkstra(grid, startNode, finishNode) {
  const visitedNodes = []
  startNode.distance = 0
  const unvisitedNodes = getAllNodes(grid)
  while (!!unvisitedNodes.length) {
    sortByDistance(unvisitedNodes)
    const nextNode = unvisitedNodes.shift()
    if (nextNode.isWall) continue
    if (nextNode.distance === Infinity) return visitedNodes
    nextNode.isVisited = true
    visitedNodes.push(nextNode)
    if (nextNode === finishNode) return visitedNodes
    updateNextNeighbors(nextNode, grid)
  }
}

function sortByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
}

function updateNextNeighbors(node, grid) {
  const nextNeighbors = getNextNeighbors(node, grid)
  for (const neighbor of nextNeighbors) {
    neighbor.distance = node.distance + 1
    neighbor.previousNode = node
  }
}

function getNextNeighbors(node, grid) {
  const neighbors = []
  const { col, row } = node
  if (row > 0) neighbors.push(grid[row - 1][col])
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
  if (col > 0) neighbors.push(grid[row][col - 1])
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
  return neighbors.filter((neighbor) => !neighbor.isVisited)
}

function getAllNodes(grid) {
  const allNodes = []
  for (const row of grid) {
    for (const node of row) {
      allNodes.push(node)
    }
  }
  return allNodes
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

function animateDijkstra(visitedNodes, shortestPath, props) {
  console.log("visited nodes length:", visitedNodes.length)
  for (let i = 0; i <= visitedNodes.length; i++) {
    if (i === visitedNodes.length) {
      console.log("visited nodes length:", visitedNodes.length)
      setTimeout(() => {
        animateShortestPath(shortestPath, props)
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

function animateShortestPath(shortestPath, props) {
  for (let i = 0; i < shortestPath.length; i++) {
    setTimeout(() => {
      const node = shortestPath[i]
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node shortest-path"
    }, 50 * i)
  }
  props.dispatchSetFinishedRunning()
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

export function visualizeDijkstra(props) {
  let grid = props.grid
  let startNode = nodeHelper(grid, "start")
  let finishNode = nodeHelper(grid, "finish")

  const visitedNodes = Dijkstra(grid, startNode, finishNode)
  const shortestPath = getShortestPath(finishNode)
  animateDijkstra(visitedNodes, shortestPath, props)
  // props.dispatchSetFinishedRunning()
}
