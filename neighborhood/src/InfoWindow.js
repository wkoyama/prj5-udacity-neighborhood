import React, {Component} from 'react'

class InfoWindow extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.renderInfo();
    }

    renderInfo() {
        let foursquareInfo = this.state.infos ?  this.state.infos.filter(function(info){
            return info.name.toLowerCase().search(
            marker.name.toLowerCase()) !== -1;
        }) : [];

        let info = renderToString(<InfoWindow info={foursquareInfo} marker={marker}/>)
        
        var infowindow = new window.google.maps.InfoWindow({
            content: info
        });
    }

    render() {
        if(marker.isOpen){
            infowindow.open(map, googleMarker);
        } else {

        }
        
        return null;
    }

}

export default InfoWindow;