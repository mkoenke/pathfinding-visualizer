function AStar(grid, startNode, finishNode) {
  const visitedNodes = []
  //   const unvisitedNodes = []
  startNode.distance = 0
  startNode.heuristic = 0
  const unvisited = getAllNodes(grid)
  while (unvisited.length) {
    sortByDistanceAStar(unvisited)
    const nextNode = unvisited.shift()
    if (nextNode === finishNode) {
      return visitedNodes
    }
    if (nextNode.isWall) continue
    if (nextNode.distance + nextNode.heuristic === Infinity) return visitedNodes
    nextNode.isVisited = true
    visitedNodes.push(nextNode)

    updateNextNeighborsAStar(nextNode, grid, finishNode)
  }
  console.log("Visited Nodes:", visitedNodes)
  return visitedNodes
}

function updateNextNeighborsAStar(node, grid, finishNode) {
  const neighbors = []
  const { row, col } = node
  if (row > 0) neighbors.push(grid[row - 1][col])
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
  if (col > 0) neighbors.push(grid[row][col - 1])
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
  for (const neighbor of neighbors) {
    if (!neighbor.isVisited) {
      neighbor.distance = node.distance + 1
      neighbor.heuristic = manhattanDistance(neighbor, finishNode)
      neighbor.previousNode = node
    }
  }
}

function manhattanDistance(a, b) {
  let { row: ar, col: ac } = a
  let { row: br, col: bc } = b
  return Math.abs(ar - br) + Math.abs(ac - bc)
}

function sortByDistanceAStar(nodes) {
  nodes.sort((a, b) => a.distance + a.heuristic - (b.distance + b.heuristic))
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

function getAllNodes(grid) {
  const allNodes = []
  for (const row of grid) {
    for (const node of row) {
      allNodes.push(node)
    }
  }
  return allNodes
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

export function visualizeAStar(grid) {
  let startNode = nodeHelper(grid, "start")
  let finishNode = nodeHelper(grid, "finish")
  console.log("start Node:", startNode)
  console.log("finish Node:", finishNode)

  const visitedNodes = AStar(grid, startNode, finishNode)
  const shortestPath = getShortestPath(finishNode)
  animateAStar(visitedNodes, shortestPath)
}
