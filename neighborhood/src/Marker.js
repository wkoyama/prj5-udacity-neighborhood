import React, {Component} from 'react'

class Marker extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        if(!this.marker){
            this.showMarker();
        }
    }
    
    showMarker() {
        if(!this.marker) {
            this.marker = new window.google.maps.Marker({
                position: this.props.marker.position,
                map: this.props.map,
                title: this.props.marker.title
            });
        }

        if(this.props.currentMarker && this.props.marker.name === this.props.currentMarker.name){
            let map = this.props.map;
            map && map.setZoom(13);
            map && map.setCenter(this.marker.getPosition());
        }

        this.marker.addListener('click', this.handleEvent(this.props.marker));
        this.props.addGoogleMarker(this.marker, this.props.marker.name);
    }

    handleEvent(marker) {
        return (e) => {

            if(this.props.currentMarker !== marker){
            
                if(!marker.isOpen){
                    this.props.showMarker(marker);
                }
            }
            
        }
    }

    render() {
        return null;
    }

}

export default Marker;