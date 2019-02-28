import React, {Component} from 'react'

class Marker extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.showMarker();
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
    }

    handleEvent(marker) {
        return (e) => {
            this.props.showMarker(marker);
        }
    }

    render() {
        if(this.props.marker.isOpen) {
            this.showMarker();
        }
        
        return null;
    }

}

export default Marker;