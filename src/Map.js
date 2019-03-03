import React, {Component} from 'react'
import Marker from './Marker'
import InfoWindow from './InfoWindow'

class Map extends Component {

    render() {
      return (
        <div id="map-container" className={this.props.className}>
            <div id="map" className="d-inline-flex container-fluid">
                <div style={{display: 'flex', flexDirection: 'column', margin: 'auto', alignItems: 'center', alignContent: 'center'}}/>
                { 
                    this.props.map && this.props.markers.map(marker => {
                        return (
                                <Marker key={marker.name} 
                                    marker={marker}
                                    currentMarker={this.props.currentMarker}
                                    map={this.props.map}
                                    showMarker={this.props.showMarker}
                                    addGoogleMarker={this.props.addGoogleMarker}
                                    onInfoWindowClose={this.props.onInfoWindowClose}
                                    closeAllMarkers={this.props.closeAllMarkers}
                                    toggleMarker={this.props.toggleMarker} />
                        )
                    })

                }

                { this.props.isShowInfoWindow 
                    && this.props.currentMarker && 
                    <InfoWindow
                        map={this.props.map}
                        currentMarker={this.props.currentMarker}
                        onClose={this.props.onInfoWindowClose}
                        lastInfoWindow={this.props.lastInfoWindow}
                        prevInfoWindow={this.props.prevInfoWindow}
                        infos={this.props.infos}/>
                }
            </div>
        </div>
        
      );
    }
  }
  
  export default Map;