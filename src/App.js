import React, { Component } from 'react';
import './App.css';
import Map from "./Map.js"
import FoursquareAPI from "./Api.js"
import Slider from "./Slider.js"

class App extends Component {
  state = {
        venues: [],
        markers: [],
        center: [],
        zoom: 8,
        superState: obj => {
          this.setState(obj)
        }
      }

      closeMarker = () =>{
        const markers = this.state.markers.map(marker => {
          marker.isOpen = false;
          return marker;
        })
        this.setState({marker: Object.assign(this.state.markers, markers)})
      }

      markerClick = marker =>{
        this.closeMarker();
        marker.isOpen = true;
        this.setState({markers: Object.assign(this.state.markers, marker)})
        const venue = this.state.venues.find(venue => venue.id === marker.id)
        FoursquareAPI.getVenueDetails(marker.id)
        .then(res => {
          const newVenue = Object.assign(venue, res.response.venue);
          this.setState({venues: Object.assign(this.state.venues, newVenue)})
        })
      }

      listitemsClick = venue => {
        const marker = this.state.markers.find(marker => marker.id === venue.id)
        this.markerClick(marker)
      }


  componentDidMount(){
    FoursquareAPI.search({
      near: "mumbai",
      query: "food",
      limit: 20
    }).then(results => {
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry;
      const markers = venues.map(venue =>{
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        }
      })
      this.setState({venues, center, markers});
    })
  }

  render() {
    return (
      <div id="app">
        <div className="slider">
          <Slider
            {...this.state}
            listitemsClick = {this.listitemsClick}
          />
          </div>
          <Map
            {...this.state}
            markerClick = {this.markerClick}
          />
      </div>
    )
  }
}

export default App;
