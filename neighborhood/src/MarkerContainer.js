import React, {Component} from 'react'

var model = {
    Marker: function(position, title, name) {
        this.position = position;
        this.title = title;
        this.name = name;
    }    
}

const uluru = new model.Marker( {lat: -25.344, lng: 131.036} , 'Hello Uluru!', "Uluru");
const casa = new model.Marker( {lat: -23.5407026, lng: -46.4330621} , 'Casa do Kenji', "Casa");
// const uluru = {lat: -25.344, lng: 131.036};

const markers = [ casa, uluru ];

class Marker extends Component {
    state = {
        
    }
}

class MarkerContainer extends Component {
    state = {
        markers: []
    }
    
    buildGoogleMarkers() {
        this.setState({markers: markers});
        let markers = [];

        this.state.markers.map( marker => {
            let googleMarker = new window.google.maps.Marker({
                position: marker.position,
                title: marker.title
            });

            markers.push(googleMarker);
        });

        return markers;
    }

    <Marker
        onClick = { this.onMarkerClick }
        title = { 'Changing Colors Garage' }
        position = {{ lat: 39.648209, lng: -75.711185 }}
        name = { 'Changing Colors Garage' }
    />    
}