import React, {Component} from 'react'
import { renderToString } from 'react-dom/server'
import Marker from './Marker'

function FoursquareInfo(props) {
    var marker = props.marker;

    return (
        <div>
        <div>{
            props.info
        }</div></div>
    )
}

function InfoWindow (props) {
    // console.log(props);
    return (
      <div>
        <ImageCard marker = {props.marker} />
        <FoursquareInfo info={props.info} marker = {props.marker} />
      </div>
    );
}

function ImageCard (props) {
    let address = `${props.marker.position.lat},${props.marker.position.lng}`;
    
    let streetviewUrl = `https://maps.googleapis.com/maps/api/streetview?location=${address}&source=outdoor&fov=120&size=300x200&key=AIzaSyAyqlRkzuQkEOFiSYkn198oWO5zwAwKWP0`;
    let addressAlt = `${address} view`
    return (
        <img id="local-view" 
        className="card-img"
        src={streetviewUrl}
        alt={addressAlt}
        />
    )
}

class Map extends Component {

    render() {
      return (
        <div id="map-container" className={this.props.className}>
            <div id="map" className="d-inline-flex container-fluid">
                <div style={{display: 'flex', flexDirection: 'column', margin: 'auto', alignItems: 'center', alignContent: 'center'}}/>
                { 
                    this.props.map && this.props.markers.map(marker => {
                        return (<Marker key={marker.name} 
                            marker={marker}
                            currentMarker={this.props.currentMarker}
                            map={this.props.map}
                            showMarker={this.props.showMarker} />)
                    })
                }
            </div>
        </div>
        
      );
    }
  }
  
  export default Map;