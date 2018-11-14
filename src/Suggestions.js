import React, { Component } from 'react';
import List from "./Lists.js"


class Suggestions extends Component {

  render(){
    return(
      <React.Fragment>
        <ul className="itemList">
          {this.props.venues &&
            this.props.venues.map((venue, index) => (
              <List
                key={index}
                {...venue}
                listitemsClick = {this.props.listitemsClick}
              />
            ))}
        </ul>
      </React.Fragment>
    )
  }
}


export default Suggestions
