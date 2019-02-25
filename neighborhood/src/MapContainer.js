import React, {Component} from 'react'
// import ReactDOM, { render } from 'react-dom';
// import PropTypes from 'prop-types'
import Map from './Map'
import Marker from './Marker'

import { renderToString } from 'react-dom/server'
import * as FoursquareAPI from './FoursquareAPI'
// import InfoWindow from './InfoWindow';
import * as WikipediaAPI from './WikipediaAPI'
// import * as InfoWindow from './InfoWindow'

// class WikipediaInfo extends Component {
    
//     state = {
//         links: []
//     }

//     componentDidMount() {
//         console.log('mount');
//         const cityStr = 'jk180';
//         //&callback=wikiCallback
//         fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${cityStr}&format=json&origin=*`, {
//             // mode: 'no-cors' // 'cors' by default
//             method: "GET"
//         })
//         .then(response => response.json())
//         .then(json => {
//             var articleList = json[1];
//             var articles = []; 
//             for(var i = 0; i < articleList.length; i++) {
//                 var articleStr = articleList[i];
//                 var url = "https://en.wikipedia.org/wiki/" + articleStr;
//                 this.setState(prevState => {
//                     links: this.state.links.push({"key": articleStr,"value": url})
//                 })
//             }
            
//         }).catch (error => {
//             console.log(error.message);
//         });
        
//     }
    
//     render() {
//         const { links } = this.state;
//         let items = '';
// if (this.state.links.length) {
//     return <div>
//             <ul>
//                 {this.links.map( link => {
//                     <React.Fragment><li key={link.key}><a href={link.value}>{link.key}</a></li></React.Fragment>
//                 })}
//             </ul>
//         </div>
// }
// return null;
        
//     }
// }

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

function FoursquareInfo(props) {

    return (
        <div>
        <FoursquareInfo marker = {props.marker} />
        <div>info</div></div>
    )
}

function InfoWindow (props) {
    return (
      <div>
        <ImageCard marker = {props.marker} />
      </div>
    );
}

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

    componentDidMount() {
        // this.state.markers.map(marker => {
        //     FoursquareAPI.getInfo(marker).then((venues) => {
        //         this.setState({"key": marker.name, "value": venues});
        //     });
        // })
    }
    
    state = {
        markers: [],
        infos: [],
        currentMarker: {},
        isShowInfoWindow: false
    }

    renderToString() {
        return renderToString(<InfoWindow />)
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
                className={this.props.onCollapse ? "" : "sidebar-size"}
                opt={{
                    zoom: 10, 
                    center: {lat: -23.5505199, lng: -46.6333094 }
                }}
                onMapLoad={map => {
                    
                    {
                        this.state.markers.map( (marker, index) => {
                            // var contentString = '<div id="content">'+
                            //     '<div id="siteNotice">'+
                            //     '</div>'+
                            //     '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
                            //     '<div id="bodyContent">'+
                            //     '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
                            //     'sandstone rock formation in the southern part of the '+
                            //     'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
                            //     'south west of the nearest large town, Alice Springs; 450&#160;km '+
                            //     '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
                            //     'features of the Uluru - Kata Tjuta National Park. Uluru is '+
                            //     'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
                            //     'Aboriginal people of the area. It has many springs, waterholes, '+
                            //     'rock caves and ancient paintings. Uluru is listed as a World '+
                            //     'Heritage Site.</p>'+
                            //     '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
                            //     'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
                            //     '(last visited June 22, 2009).</p>'+
                            //     '</div>'+
                            //     '</div>';
                            let info = renderToString(<InfoWindow marker={marker}/>)
                            
                            var infowindow = new window.google.maps.InfoWindow({
                                content: info
                              });

                            var googleMarker = new window.google.maps.Marker({
                                position: marker.position,
                                map: map,
                                title: marker.title
                            });

                            googleMarker.addListener('click', function() {
                                infowindow.open(map, googleMarker);
                            });
                            
                        })
                    }
                    
                  }} >
                  </Map>
        )
    }
}

export default MapContainer;