import React, {Component} from 'react'
import { renderToString } from 'react-dom/server'

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
                    
                    
                        this.props.markers.map( (marker, index) => {
                            
                            let foursquareInfo = this.props.infos ?  this.props.infos.filter(function(info){
                                return info.name.toLowerCase().search(
                                marker.name.toLowerCase()) !== -1;
                            }) : [];
                            let info = renderToString(<InfoWindow info={foursquareInfo} marker={marker}/>);
                            
                            if(!this.props.showMarker){
                                var infowindow = window.google && new window.google.maps.InfoWindow({
                                    content: info
                                });
                            }
                            

                            var googleMarker = window.google && new window.google.maps.Marker({
                                position: marker.position,
                                map: this.props.map,
                                title: marker.title
                            });

                            infowindow && infowindow.close();

                            if(marker.isOpen){
                                
                                infowindow && infowindow.open(this.props.map, googleMarker);
                                this.props.map && this.props.map.setZoom(13);
                                this.props.map && this.props.map.setCenter(googleMarker.getPosition());
                            }

                            var self = this;
                            googleMarker && googleMarker.addListener('click', function() {
                                infowindow && infowindow.open(self.props.map, googleMarker);
                                self.props.map && self.props.map.setZoom(13);
                                self.props.map && self.props.map.setCenter(googleMarker.getPosition());
                            });

                            
                            
                        })
                    }
                    
                  
            </div>
        </div>
        
      );
    }
  }
  
  export default Map;