import React, { Component } from 'react';
import Suggestions from "./Suggestions.js"


class Slider extends Component {
  state = {
    query: "",
    venues: []
  }

  venueFilter = () => {
    if(this.state.query.trim() !== ""){
      const venues = this.props.venues.filter(venue =>
        venue.name.toLowerCase().includes(this.state.query.toLowerCase()))
        return venues
    }
    return this.props.venues
  }

  placeInput = event => {
    this.setState({query: event.target.value})
    const markers = this.props.venues.map(venue =>{
      const isMatched = venue.name.toLowerCase()
      .includes(event.target.value.toLowerCase())
      const marker = this.props.markers.find(marker => marker.id === venue.id)
      if(isMatched){
        marker.isVisible = true;
      }
      else{
        marker.isVisible = false;
      }
      return marker
    })
    this.props.superState({markers})
  }


  render(){
    return(
      <React.Fragment>
        <div className="filter">
            <input
              className="venueFilter"
              type="text"
              placeholder="Filter Venueas By Name"
              onChange = {this.placeInput}
            />
        </div>
      <Suggestions
        {...this.props}
        venues = {this.venueFilter()}
        listitemsClick = {this.props.listitemsClick}
      />
      </React.Fragment>
    )
  }
}


export default Slider
