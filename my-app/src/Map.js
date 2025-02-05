import React from 'react';
import ReactDOM from 'react-dom';

const keys = require('./config/keys');

const mapStyles = {
  map: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
};

export class CurrentLocation extends React.Component {

  constructor(props) {

    console.log('constructor()');

    super(props);

    const { lat, lng } = this.props.initialCenter;

    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }
    }

  } // constructor


  componentDidUpdate(prevProps, prevState) {

    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }

    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }  

  }

  componentDidMount() {

    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });
        });
      }
    }
    this.loadMap();  

  }


  loadMap() {

    // console.log('loadMap()', this.props);

    if (this.props && this.props.google) {
      // checks if google is available

      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;

      // reference to the actual DOM element
      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom,
          apiKey: this.props.apiKey
        }
      );

      // maps.Map() is constructor that instantiates the map
      this.map = new maps.Map(node, mapConfig);
    }

  }  


  renderChildren() {

    const { children } = this.props;
    console.log('children', children);

    if (!children) return;

    return React.Children.map(children, c => {
      if (!c) return;
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      });
    });

  }  


  recenterMap() {
    
    const map = this.map;
    const current = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }

  }

  render() {

    const style = Object.assign({}, mapStyles.map);

    return (
      <div>
        <div style={style} ref="map">
          Loading map...
          {this.renderChildren()}
        </div>
        
      </div>
    );

  }  

}


export default CurrentLocation;

// set default props
CurrentLocation.defaultProps = {
  zoom: 11,
  initialCenter: {
    lat: 43.394344,
    lng: -79.822935
  },
  centerAroundCurrentLocation: false,
  visible: true,
  apiKey: keys.googleAPIKey

};




