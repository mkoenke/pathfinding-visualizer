import React from "react"

class Card extends React.Component {
  render() {
    return (
      <>
        <div className="col s4">
          <div class="card hoverable medium">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" src={this.props.cardObj.coverImage} />
            </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4">
                {this.props.cardObj.name}
              </span>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">
                {this.props.cardObj.name}
                <i class="material-icons right">close</i>
              </span>
              <p>{this.props.cardObj.description}</p>
              <img src={this.props.cardObj.chartImage} />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Card
