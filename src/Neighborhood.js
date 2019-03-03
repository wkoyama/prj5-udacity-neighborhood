import React, {Component} from 'react'
import MapContainer from './MapContainer';
import FilterMap from './FilterMap';
import Navbar from 'react-bootstrap/Navbar';
import NavbarToggle from 'react-bootstrap/NavbarToggle';


var model = {

    buildMarkers: function(){
        var markers = [];

        const muuburger = new model.Marker( {lat:-23.5861822, lng: -46.6801062}, 'Hamburgueria artesanal', 'Muuburger');
        const icarros = new model.Marker( {lat:-23.585512, lng: -46.672682}, 'iCarros', 'iCarros');
        const pavilhaoJapones = new model.Marker( {lat:-23.5859989, lng: -46.6619324}, 'Pavilhão histórico japonês com jardim, carpas e sala de chá, além de hall para exibição de obras de arte.', 'Pavilhão Japonês');
        const bluePub = new model.Marker( {lat:-23.5630475, lng: -46.6503268}, 'The Blue Pub', 'Blue Pub');
        
        /* lat/lon correta no foursquare -23.5493696,-46.5713796 */
        const goodBarber = new model.Marker( {lat:-23.5492413, lng: -46.5690508}, 'Good Barber Barbearia', 'GoodBarber');
        
        const samsTatuape = new model.Marker( {lat:-23.5441402, lng: -46.5877014}, 'Rede de lojas exclusiva para associados que vende vários itens de mercearia, eletrônicos e UD.', 'Sams club Tatuapé');
        const teatroRenault = new model.Marker( {lat:-23.5542898, lng: -46.6385248}, 'Clássico e renomado, destinado às grandes montagens da Broadway, em casarão tombado pelo patrimônio histórico.', 'Teatro Renault');
        const soulbox = new model.Marker( {lat:-23.5901545, lng: -46.6763188}, 'Academia Soulbox', 'Studio SoulBox');
        const shoppingAnalia = new model.Marker( {lat:-23.5614376, lng: -46.5604314}, 'Shopping Analia Franco', 'Shopping Anália Franco');
        const hooters = new model.Marker( {lat:-23.566724, lng: -46.6516762}, 'Hooters Brasil', 'Hooters');
        
        markers.push(muuburger);
        markers.push(icarros);
        markers.push(pavilhaoJapones);
        markers.push(bluePub);
        markers.push(goodBarber);
        markers.push(samsTatuape);
        markers.push(teatroRenault);
        markers.push(soulbox);
        markers.push(shoppingAnalia);
        markers.push(hooters);

        return markers;
    },
    
    Marker: function(position, title, name) {
        this.position = position;
        this.title = title;
        this.name = name;
        this.isOpen = false;
        this.gMarker = {};
    }    
}

const markers = model.buildMarkers();

class Neighborhood extends Component {
    
    constructor(props) {
        super(props);
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.addGoogleMarker = this.addGoogleMarker.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
        this.closeAllMarkers = this.closeAllMarkers.bind(this);
        this.lastInfoWindow = this.lastInfoWindow.bind(this);
    }

    state = {
        currentMarker: {},
        isShowInfoWindow: false,
        navExpanded: false,
        width: window.innerWidth,
        markers: markers,
        prevInfoWindow: {}
    }
    
    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }
    
    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    toggleSidebar(){
        this.setState({ navExpanded: !this.state.navExpanded });
    }

    addGoogleMarker(gMarker, name) {
        this.setState(prevState => {
            markers: prevState.markers.map( m => {
                if(m.name === name){
                    m.gMarker = gMarker;
                    return m;
                }

                return m;
            })
        })
    }

    onMarkerClick(marker) {
        this.closeAllMarkers();
        
        this.setState(prevState => ({
            markers: prevState.markers.map( m => {
                if(m.name === marker.name){
                    m.isOpen = !m.isOpen;
                    return m;
                }

                return m;
            }),
            currentMarker: marker,
            isShowInfoWindow: true
        }))
    }

    lastInfoWindow(last) {
        this.setState({
            prevInfoWindow: last
        })
    }

    onInfoWindowClose(marker){
        this.setState(prevState => ({
            markers: prevState.markers.map( m => {
                if(m.name === marker.name){
                    m.isOpen = !m.isOpen;
                    return m;
                }

                return m;
            }),
            currentMarker: null,
            isShowInfoWindow: false
        }))
    }

    closeAllMarkers(){
        this.setState(prevState => ({
            markers: prevState.markers.map( m => {
                m.isOpen = false;
                return m;
            }),
            currentMarker: null,
            isShowInfoWindow: false
        }))
    }

    render() {
        const { width } = this.state;
        const isDesktop = width >= 991;
        
        return (
            <div>
                <header className="bg-dark shadow-lg">
                    <Navbar onClick={this.toggleSidebar} onToggle={this.toggleSidebar} expand="lg" variant="dark" bg="dark" className="p-3">
                        <NavbarToggle />
                    </Navbar>
                    <h1 className="justify-content-end">Meus marcadores</h1>
                </header>
                <main>
                    <div id="main-content">
                        <FilterMap 
                            onCollapse={this.state.navExpanded && !isDesktop} 
                            markers={ this.state.markers }
                            showMarker={this.onMarkerClick}
                            isShowInfoWindow={this.state.isShowInfoWindow}
                            closeAllMarkers={this.props.closeAllMarkers} />
                        <MapContainer 
                            onCollapse={this.state.navExpanded && !isDesktop} 
                            markers={ this.state.markers } 
                            showMarker={this.onMarkerClick}
                            addGoogleMarker={this.addGoogleMarker}
                            currentMarker={this.state.currentMarker}
                            isShowInfoWindow={this.state.isShowInfoWindow}
                            lastInfoWindow={this.lastInfoWindow}
                            prevInfoWindow={this.state.prevInfoWindow}
                            onInfoWindowClose={this.onInfoWindowClose} 
                            closeAllMarkers={this.closeAllMarkers} />
                    </div>                    
                </main>
                <footer className="d-inline-flex position-fixed bg-dark">
                    <p className="mt-2">Desenvolvido por Wesley Kenji Oyama - 2019</p>
                </footer>
            </div>
        )
    }
}

export default Neighborhood;
