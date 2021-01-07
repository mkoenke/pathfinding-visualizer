import React from "react"
import Card from "../Components/Card"
import aStar from "../images/aStar.gif"
import aStarChart from "../images/astarchart.png"
import bfs_png from "../images/bfs.png"
import bfsChart from "../images/bfschart.png"
import dfs_gif from "../images/dfs.gif"
import dfsChart from "../images/dfschart.png"
import dijkstraChart from "../images/dijkstrachart.png"
import dijkstra_gif from "../images/dijkstra_gif.gif"

class InfoPageContainer extends React.Component {
  cardObjects = () => {
    return [
      {
        id: 1,
        name: "Dijkstra's Algorithm",
        coverImage: dijkstra_gif,
        description:
          "The grandfather of all search algorithms. Dijkstra’s has many variants and is the base for many other algorithms. This algorithm uses a breadth-first search (BFS) to traverse a graph and find the shortest path. While a BFS is not a single-source algorithm, Dijkstra’s implements it in a way to solve the single-source version of the shortest path problem. The BFS traverses a graph by visiting every node and edge in a well-defined order and marking each node along the way. Dijkstra’s algorithm cannot have edges with a negative weight. Dijkstra’s algorithm has a time complexity of O(|E|+|V|log|V|), or O(|V|²) when using an array.",
        chartImage: dijkstraChart,
      },
      {
        id: 2,
        name: "Breadth First Search",
        coverImage: bfs_png,
        description:
          "A BFS is a way of traversing a graph by visiting every node and edge in a well-defined order by marking each node as visited along the way. Specifically, a BFS starts at a defined node and visits all of its connected neighbors. These neighbors all possess one degree of separation from the start node. This is level one, or layer one. Once level one has been cleared all the nodes in level two are visited, and so-on and so-forth. It is important to note that the nodes in each level are visited in a very specific order, as we will see in just a moment, and their children nodes are visited in this same order. This process continues until every node in the graph has been visited, or the end node has been found.",
        chartImage: bfsChart,
      },
      {
        id: 3,
        name: "Depth First Search",
        coverImage: dfs_gif,
        description: "Description",
        chartImage: dfsChart,
      },
      {
        id: 4,
        name: "A*",
        coverImage: aStar,
        description:
          "A* algorithm, pronounces ‘A-star’, is a best-first search algorithm. A best-first search algorithm, often called a greedy algorithm, is an algorithm that makes optimal local choices in pursuit of an optimal global path. For instance, when choosing which edge to traverse next the algorithm will always choose the edge with the smallest weight. A* works by building a tree of paths that begin at the start node and end once a specific criteria is met. Some branches will prove to never be able to be the shortest path, so they are discontinued. When selecting which edge to traverse next, a heuristic is used to determine how to queue each adjacent node. The nodes are prioritized based on their weight, smallest being considered most likely to provide an optimal solution. The node with the smallest edge weight is checked, its nodes are queued up, and the process continues. Once the end node is located, the sequence of traversals can be reversed in order to point back at the start node. A* will always find the solution. One drawback to the A* algorithm is that it has a large space complexity. It requires added memory to build its traversal tree.",
        chartImage: aStarChart,
      },
    ]
  }
  arrayOfCards = () => {
    console.log(this.cardObjects)
    return this.cardObjects().map((card) => {
      console.log(card.coverImage)
      return <Card key={card.id} cardObj={card} />
    })
  }
  render() {
    return (
      <div className="container" >
        <div className="row" style={{marginTop: "10%"}}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {this.arrayOfCards()}
          </div>
        </div>
      </div>
    )
  }
}

export default InfoPageContainer
