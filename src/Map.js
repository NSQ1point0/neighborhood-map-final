/*global google*/
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    zoom={props.zoom}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    center={props.center}
  >
  {
    props.markers &&
    props.markers.filter(marker => marker.isVisible).map((marker, index, arr) => {
      const venueInfo = props.venues.find(venue => venue.id === marker.id)

      return <Marker
                key={index}
                position={{lat: marker.lat, lng: marker.lng}}
                onClick ={() => props.markerClick(marker)}
                animation={arr.length === 1 ? 
                  google.maps.Animation.BOUNCE : google.maps.Animation.DROP }
              >
                {marker.isOpen && venueInfo.bestPhoto &&(
                  <InfoWindow>
                    <div>
                      <img
                      src={`${venueInfo.bestPhoto.prefix}150x150${venueInfo.bestPhoto.suffix}`}
                      alt={`${venueInfo.name} Image`}
                      />
                      <h5>{venueInfo.name}</h5>
                    </div>
                </InfoWindow>)}
            </Marker>
      })
  }
  </GoogleMap>
))

class Map extends Component {
  render() {
    return (
      <MyMapComponent
        {...this.props}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places,key=AIzaSyDRuyRlaIG2oB-zM91ZHOesDQJS-HDOX38"
        loadingElement={<div style={{ height: `100vh` }} />}
        containerElement={<div style={{ height: `100vh`, width:`75%`, float: `right`}} />}
        mapElement={<div style={{ height: `100vh` }} />}
      />
    )
  }
}

export default Map;
