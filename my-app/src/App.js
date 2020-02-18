import React, { Component } from 'react';
// import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './Map';

const keys = require('./config/keys');
// console.log('key', keys.googleAPIKey);

// const mapStyles = {
//   width: '100%',
//   height: '100%'
// };

export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {

    console.log('test', this.props);
    
    return (

      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >
{/*        <Marker onClick={this.onMarkerClick} name={'Mike\'s House'} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>*/}
      </CurrentLocation>


      // <Map
      //   google={this.props.google}
      //   zoom={10}
      //   style={mapStyles}
      //   initialCenter={{ lat: 43.394344, lng: -79.822935 }}
      // >
      //   <Marker
      //     onClick={this.onMarkerClick}
      //     name={'Mike\'s House'}
      //   />
      //   <InfoWindow
      //     marker={this.state.activeMarker}
      //     visible={this.state.showingInfoWindow}
      //     onClose={this.onClose}
      //   >
      //     <div>
      //       <h4>{this.state.selectedPlace.name}</h4>
      //     </div>
      //   </InfoWindow>
      // </Map>

    );

  }

}



export default GoogleApiWrapper(
  (props) => ({
    apiKey: keys.googleAPIKey
  })
)(MapContainer);




