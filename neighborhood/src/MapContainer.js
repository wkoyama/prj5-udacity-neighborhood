import React, {Component} from 'react'
// import ReactDOM, { render } from 'react-dom';
// import PropTypes from 'prop-types'
import Map from './Map'
import Marker from './Marker'
import InfoWindow from './InfoWindow';
// import * as WikipediaAPI from './WikipediaAPI'
// import * as InfoWindow from './InfoWindow'

class MapContainer extends Component {
    // static propTypes = {
    //     className: PropTypes.string,
    //     name: PropTypes.string
    // }
    constructor(props) {
        super(props);
        // this.createInfoWindow = this.createInfoWindow.bind(this);

        // this.handleMarkerClick = this.handleMarkerClick.bind(this);
        // this.handleMapClick = this.handleMapClick.bind(this);
    }
    
    componentWillMount() {
        this.setState({markers:this.props.markers})
    }
    
    state = {
        markers: [],
        infos: [],
        currentMarker: {},
        isShowInfoWindow: false
    }

    // handleMarkerClick = (props, marker, e) => {
    //     if(this.state.isShowInfoWindow) {
    //         this.setState({
    //             currentMarker: marker,
    //             isShowInfoWindow: true
    //         });
    //     }
    // }

    // buildGoogleMarkers() {
    //     this.setState({markers: this.props.markers});
    //     let markers = [];

    //     this.state.markers.map( marker => {
    //         let googleMarker = new window.google.maps.Marker({
    //             position: marker.position,
    //             title: marker.title
    //         });

    //         markers.push(googleMarker);
    //     });

    //     return markers;
    // }

    render(){
        return (
            
            <Map id="map" 
                className="map-container"
                opt={{
                    zoom: 10, 
                    center: {lat: -23.5505199, lng: -46.6333094 }
                }}
                onMapLoad={map => {
                    
                    {
                        this.state.markers.map( marker => {
                            
                            var googleMarker = new window.google.maps.Marker({
                                position: marker.position,
                                map: map,
                                title: marker.title
                            });
                            
                        })
                    }
                    
                  }} > 
                    <InfoWindow />
                  </Map>
        )
    }
}

export default MapContainer;