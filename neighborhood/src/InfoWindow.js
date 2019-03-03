import React, {Component} from 'react'
import {renderToString} from 'react-dom/server'

function FoursquareInfo(props) {
    var marker = props.marker;
    var encodeName = encodeURI(marker.name);
    
    var sectionId = `card-section-${encodeName}`;
    var p = `address-${encodeName}`;

    debugger
    return (
        <article key={encodeName} className="location-details">
            <div key={encodeName} className="location-details-container">
                <section id={sectionId} key={encodeName}>
                    <h5>
                        {props.info.name}
                    </h5>
                    {
                        props.info.location.formattedAddress.map(address => {
                            return <p key={p} className="address">{address}</p>
                        })
                    }               
                </section>
                <div>
                    <a target="_blank" rel="noopener noreferrer" href={props.info.canonicalUrl}>Saiba mais</a>
                </div>

                <div className="footer-card">Informação por Foursquare</div>
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
    var encodeName = encodeURI(props.marker.name);
    var div = `card-container-${encodeName}`;
    return (
      <div key={div}>
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
    }

    renderInfo() {
        if(this.props.currentMarker.isOpen){
            let markerName = this.props.currentMarker.name;
            
            let item = this.props.infos.filter(function(info){
                return info.key.toLowerCase().search(
                    markerName.toLowerCase()) !== -1;
            });

            // console.log(item);

            let info = 'Ocorreu um erro ao obter os detalhes ou não encontramos informações para esse estabelecimento :('
            
            if(item && item.length > 0){
                info = renderToString(<InfoWindowDiv info={item[0].value} marker={this.props.currentMarker}/>)
            }

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