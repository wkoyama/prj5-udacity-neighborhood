import {Component} from 'react'
import { visible } from 'ansi-colors';

class Marker extends Component {
    
    componentDidMount(){
        if(this.props.marker.gMarker){
            this.showMarker();
        }
    }

    showMarker() {

        // Necessário validar se já existe marcador do google para nao ter sobreposicao
        if(Object.entries(this.props.marker.gMarker).length === 0 && this.props.marker.gMarker.constructor === Object) {
            this.marker = new window.google.maps.Marker({
                position: this.props.marker.position,
                map: this.props.map,
                animation: window.google.maps.Animation.DROP,
                title: this.props.marker.title,
                visible: false
            });
        } else {
            this.marker = this.props.marker.gMarker;
        }

        //caso seja marcador atual, setar as configuracoes de centralizacao
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
            
                if(!marker.isOpen && marker.isVisible){
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