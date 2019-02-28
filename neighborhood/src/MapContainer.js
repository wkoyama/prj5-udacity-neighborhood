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

function Info(marker) {
    var location = marker.name;

    fetch(`https://api.foursquare.com/v2/venues/search?near=sao%20paulo,sp&query=${location}&client_id=${foursquare.client_id}&client_secret=${foursquare.client_secret}&v=20190223`, {
        // mode: 'no-cors' // 'cors' by default
        method: "GET"
    })
    .then(response => response.json())
    .then(
        data => data.response.venues[0]
    ).catch (error => {
        console.log(error.message);
    });
    
}

const foursquare = {
    client_id: '4YFOMB5TUR11KJ3T0RI0NSFQCD1AKNX13ZLKFHYWIW1VCQZS',
    client_secret: 'GRSQLVQD5WCV1HE551LYGQE5LBKS5ZSLMGWLWZWEMNOGB4ZT'
}



class MapContainer extends Component {
    // static propTypes = {
    //     className: PropTypes.string,
    //     name: PropTypes.string
    // }
    constructor(props) {
        super(props);
        this.onScriptLoad = this.onScriptLoad.bind(this);
        // this.createInfoWindow = this.createInfoWindow.bind(this);

        // this.handleMarkerClick = this.handleMarkerClick.bind(this);
        // this.handleMapClick = this.handleMapClick.bind(this);
    }
    
    componentDidMount() {
        if (!window.google) {
            var script = this.buildMapTagScript();
            var after = document.getElementsByTagName('script')[0];
            after.parentNode.insertBefore(script, after);

            //Importante. So pode acessar o maps apos o load
            script.addEventListener('load', e => {
                this.onScriptLoad();
            })
        } else {
            this.onScriptLoad();
        }

        this.props.markers.map((marker) => {
            if(marker.isOpen) {
                this.setState({currentMarker: marker});
            }

            this.fetchData(marker);
        })
    }

    fetchData(marker){
        var location = encodeURI(marker.name);

        fetch(`https://api.foursquare.com/v2/venues/search?intent=match&ll=${marker.position.lat},${marker.position.lng}&query=${location}&client_id=${foursquare.client_id}&client_secret=${foursquare.client_secret}&v=20190223`, {
            // mode: 'no-cors' // 'cors' by default
            method: "GET"
        })
        .then(response => response.json())
        .then(
            data => !data.response.venues[0] ? [] : this.fetchPlace(data.response.venues[0])
        )
        .catch (error => {
            console.log(error.message);
        });
     
    }

    fetchPlace (place) {
        
        // console.log(`https://api.foursquare.com/v2/venues/${place.id}?client_id=${foursquare.client_id}&client_secret=${foursquare.client_secret}&v=20190223`);

        const details = [
        ];

        details.map(detail => {
            this.setState(prevState => {
                infos: prevState.infos.push({
                    key: detail.name,
                    value: detail
                })
            })
        });
        // fetch(`https://api.foursquare.com/v2/venues/${place.id}?client_id=${foursquare.client_id}&client_secret=${foursquare.client_secret}&v=20190223`, {
        //     // mode: 'no-cors' // 'cors' by default
        //     method: "GET"
        // })
        // .then(response => response.json())
        // .then(
        //     data => data.response.venue
        // ).then (
        //     info => this.setState(prevState => ({
        //         infos: prevState.infos.push({
        //             key: info.name,
        //             value: info
        //         })
        //     }))
        // ).catch (error => {
        //     console.log(error.message);
        // });
    }
    
    state = {
        markers: [],
        infos: [],
        currentMarker: {},
        isShowInfoWindow: false
    }

    onScriptLoad() {
        const map = new window.google.maps.Map(
            document.getElementById("map"), 
            {
                zoom: 10, 
                center: {lat: -23.5505199, lng: -46.6333094 }
            }
        );
        this.setState(prevState => ({ 
            map: map
        }));
        // this.setState({ map:map });
    }

    buildMapTagScript() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://maps.google.com/maps/api/js?key=AIzaSyAyqlRkzuQkEOFiSYkn198oWO5zwAwKWP0`;
        script.async = true;
        script.defer = true;

        return script;
    }

    render(){
        return (
            
            <Map id="map" 
                className={this.props.onCollapse ? "" : "sidebar-size"}
                map={this.state.map} 
                markers={this.props.markers} 
                infos={this.state.infos} 
                showMarker={this.toggleMarker} >
                
            </Map>
        )
    }
}

export default MapContainer;