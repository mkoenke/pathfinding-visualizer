import React from "react"
import Card from "../Components/Card"

class InfoPageContainer extends React.Component {
  cardObjects = () => {
    return [
      {
        id: 1,
        name: "Dijkstra's Algorithm",
        coverImage: "Url",
        description: "Description",
        chartImage: "Url",
      },
      {
        id: 2,
        name: "Breadth First Search",
        coverImage: "Url",
        description: "Description",
        chartImage: "Url",
      },
      {
        id: 3,
        name: "Depth First Search",
        coverImage: "Url",
        description: "Description",
        chartImage: "Url",
      },
      {
        id: 4,
        name: "A*",
        coverImage: "Url",
        description: "Description",
        chartImage: "Url",
      },
    ]
  }
  arrayOfCards = () => {
    return this.cardObjects().map((card) => {
      return <Card key={card.id} cardObj={card} />
    })
  }
  render() {
    return <div className="row">{this.arrayOfCards()}</div>
  }
}

export default InfoPageContainer
