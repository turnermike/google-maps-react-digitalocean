import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './Map';

const keys = require('./config/keys');
// console.log('key', keys.googleAPIKey);

// const mapStyles = {
//   width: '100%',
//   height: '100%'
// };

export class MapContainer extends Component {

  constructor(props) {

    super(props);

    this.state = {
      stores: [
        { lat: 43.394348, lng: -79.822962, name: 'Marker One' },
        { lat: 43.519860, lng: -79.862151, name: 'Marker Two' },
        { lat: 43.521502, lng: -79.865997, name: 'Marker Three' }
      ],
      showingInfoWindow: true,  //Hides or the shows the infoWindow
      activeMarker: {},          //Shows the active marker upon click
      selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker

    };

  }

  // onMarkerClick = (props, marker, e) => {

  //   console.log('onMarkerClick()', marker);

  //   this.setState({
  //     selectedPlace: props,
  //     activeMarker: marker,
  //     showingInfoWindow: true
  //   });

  // }

  onMarkerClick = (props, marker, e) => {

    console.log('onMarkerClick()', marker);

    // this.setState({
    //   selectedPlace: props,
    //   activeMarker: marker,
    //   showingInfoWindow: true
    // });

  }


  onClose = props => {

    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }

  };

  render() {

    console.log('render()');
    
    return (

      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >

        { this.displayMarkers() }

{/*
        <Marker onClick={this.onMarkerClick} name={'Mike\'s House'} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
        <Marker key="test" position={{ lat: 43.519860, lng: -79.862151 }} name="EW Foster" onClick={this.onMarkerClick} />        
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
*/}        

      </CurrentLocation>

    );

  }  

  displayMarkers = () => {

    return this.state.stores.map( (store, index) => {

      console.log('store.name', store.name);
      
      return ( 
  
        <Marker 
          key={index} 
          id={index} 
          position={{ lat: store.lat, lng: store.lng }}
          onClick={this.onMarkerClick}
          name={store.name}
        >
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>test</h4>
          </div>
        </InfoWindow>        
        </Marker>

      );

    });

  };





}



export default GoogleApiWrapper(
  (props) => ({
    apiKey: keys.googleAPIKey
  })
)(MapContainer);




