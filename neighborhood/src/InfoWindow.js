import React, {Component} from 'react'
import {renderToString} from 'react-dom/server'

function FoursquareInfo(props) {
    var marker = props.marker;
    var encodeName = encodeURI(marker.name);
    let detail = [{
        "meta": {
            "code": 200,
            "requestId": "5c76d058db04f505a61301ce"
        },
        "response": {
        "venue": {
        id: "5b58012d1ffe970039838a20",
        name: "iCarros",
        contact: { },
        location: {
        address: "Avenida Presidente Juscelino Kubitschek, 180 - 2° andar",
        lat: -23.585611,
        lng: -46.672764,
        labeledLatLngs: [
        {
        label: "display",
        lat: -23.585611,
        lng: -46.672764
        }
        ],
        postalCode: "04543-000",
        cc: "BR",
        city: "São Paulo",
        state: "SP",
        country: "Brasil",
        formattedAddress: [
        "Avenida Presidente Juscelino Kubitschek, 180 - 2° andar",
        "São Paulo, SP",
        "04543-000",
        "Brasil"
        ]
        },
        canonicalUrl: "https://foursquare.com/v/icarros/5b58012d1ffe970039838a20",
        categories: [
        {
        id: "4bf58dd8d48988d124941735",
        name: "Escritório",
        pluralName: "Escritórios",
        shortName: "Escritório",
        icon: {
        prefix: "https://ss3.4sqi.net/img/categories_v2/building/default_",
        suffix: ".png"
        },
        primary: true
        }
        ],
        verified: false,
        stats: {
        tipCount: 0
        },
        likes: {
        count: 0,
        groups: [ ]
        },
        dislike: false,
        ok: false,
        venueRatingBlacklisted: true,
        beenHere: {
        count: 0,
        unconfirmedCount: 0,
        marked: false,
        lastCheckinExpiredAt: 0
        },
        specials: {
        count: 0,
        items: [ ]
        },
        photos: {
        count: 1,
        groups: [
        {
        type: "checkin",
        name: "Fotos de check-ins de amigos",
        count: 0,
        items: [ ]
        },
        {
        type: "venue",
        name: "Fotos do lugar",
        count: 1,
        items: [
        {
        id: "5b5801b3ad910e002c3752a3",
        createdAt: 1532494259,
        source: {
        name: "Foursquare for Android",
        url: "https://foursquare.com/download/#/android"
        },
        prefix: "https://fastly.4sqi.net/img/general/",
        suffix: "/115121360_38JYZnwlkw6UirLaVSSZCqUj9slcgexS3XX7L0Sx8NA.jpg",
        width: 512,
        height: 512,
        user: {
        id: "115121360",
        firstName: "Guilherme",
        lastName: "Pretto",
        gender: "male",
        photo: {
        prefix: "https://fastly.4sqi.net/img/user/",
        suffix: "/115121360-BUBMBA3X1HLG4PDB.jpg"
        }
        },
        visibility: "public"
        }
        ]
        }
        ],
        summary: "1 foto"
        },
        reasons: {
        count: 0,
        items: [ ]
        },
        hereNow: {
        count: 0,
        summary: "Não há ninguém aqui",
        groups: [ ]
        },
        createdAt: 1532494125,
        tips: {
        count: 0,
        groups: [
        {
        type: "others",
        name: "Todas as dicas",
        count: 0,
        items: [ ]
        }
        ]
        },
        shortUrl: "https://4sq.com/2JS6BaT",
        timeZone: "America/Sao_Paulo",
        listed: {
        count: 0,
        groups: [
        {
        type: "others",
        name: "Listas de outras pessoas",
        count: 0,
        items: [ ]
        }
        ]
        },
        pageUpdates: {
        count: 0,
        items: [ ]
        },
        inbox: {
        count: 0,
        items: [ ]
        },
        attributes: {
        groups: [ ]
        },
        bestPhoto: {
        id: "5b5801b3ad910e002c3752a3",
        createdAt: 1532494259,
        source: {
        name: "Foursquare for Android",
        url: "https://foursquare.com/download/#/android"
        },
        prefix: "https://fastly.4sqi.net/img/general/",
        suffix: "/115121360_38JYZnwlkw6UirLaVSSZCqUj9slcgexS3XX7L0Sx8NA.jpg",
        width: 512,
        height: 512,
        visibility: "public"
        },
        colors: {
        highlightColor: {
        photoId: "5b5801b3ad910e002c3752a3",
        value: -14655288
        },
        highlightTextColor: {
        photoId: "5b5801b3ad910e002c3752a3",
        value: -1
        },
        algoVersion: 3
        }
        }
        }
        }]
    return (
        <article key={encodeName} className="location-details">
            <div key={encodeName} className="location-details-container">
                <section id={`card-section-${encodeName}`} key={encodeName}>
                    <h5>
                        {detail[0].response.venue.name}
                    </h5>
                    {
                        detail[0].response.venue.location.formattedAddress.map(address => {
                            return <p key={`address-${encodeName}`} className="address">{address}</p>
                        })
                    }               
                </section>
                <div>
                    <a target="_blank" rel="noopener noreferrer" href={detail[0].response.venue.canonicalUrl}>Saiba mais</a>
                </div>
            </div>
        </article>
    )
}

function ImageCard (props) {
    let location = `${props.marker.position.lat},${props.marker.position.lng}`;
    
    let streetviewUrl = `https://maps.googleapis.com/maps/api/streetview?location=${location}&source=outdoor&fov=120&size=300x200&key=AIzaSyAyqlRkzuQkEOFiSYkn198oWO5zwAwKWP0`;
    let addressAlt = `${props.marker.name} view`
    return (
        <img id="local-view" 
        className="card-img"
        src={streetviewUrl}
        alt={addressAlt}
        />
    )
}

function InfoWindowDiv(props){
    return (
      <div key={`card-container-${props.marker.name}`}>
        <ImageCard marker = {props.marker} />
        <FoursquareInfo info={props.info} marker={props.marker} />
      </div>
    );
}

class InfoWindow extends Component {

    constructor(props) {
        super(props);
        this.renderInfo = this.renderInfo.bind(this);    
        this.handleCloseClick = this.handleCloseClick.bind(this);
    }

    componentDidMount(){
        

        if(this.props.currentMarker.isOpen){
            if(this.props.prevInfoWindow && this.props.prevInfoWindow.content){
                this.props.prevInfoWindow.close();
            }
            this.renderInfo();
        }
    }

    componentDidUpdate(prevProps){
        if(!prevProps.currentMarker.isOpen){
            
            if(prevProps.prevInfoWindow && prevProps.prevInfoWindow.content){
                prevProps.prevInfoWindow.close();
            }

            this.renderInfo();
        }
        console.log('update');
    }

    renderInfo() {
        if(this.props.currentMarker.isOpen){
            let foursquareInfo = this.props.infos ?  this.props.infos.filter(function(info){
                return info.name.toLowerCase().search(
                    this.props.currentMarker.name.toLowerCase()) !== -1;
            }) : [];
                debugger
            let info = renderToString(<InfoWindowDiv info={foursquareInfo} marker={this.props.currentMarker}/>)

            this.infowindow = new window.google.maps.InfoWindow({
                content: info
            });
            this.infowindow.addListener('closeclick', this.handleCloseClick());
            this.props.lastInfoWindow(this.infowindow);           
        }
            
        if(this.props.currentMarker.isOpen){
            this.infowindow.open(this.props.map, this.props.currentMarker.gMarker);
        } else {
            this.infowindow.close();
        }
            
    }

    handleCloseClick(){
        return (e) => {
            this.props.onClose(this.props.currentMarker);
        }
    }

    render() {
        // if(this.props.currentMarker.isOpen){
        //     this.renderInfo();
        // }
        return null;
    }

}

export default InfoWindow;