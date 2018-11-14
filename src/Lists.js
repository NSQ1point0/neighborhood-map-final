import React, { Component } from 'react';

class Lists extends Component {
  render(){
    return(
      <React.Fragment>
        <li
          className="sg-list"
          onClick = {()=> this.props.listitemsClick(this.props)}
        >
          <h6>{this.props.name}</h6>
          <p>{this.props.location.address}
              {this.props.location.crossStreet}</p>
        </li>
      </React.Fragment>
    )
  }
}


export default Lists
