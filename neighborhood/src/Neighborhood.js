import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import MapContainer from './MapContainer';
import FilterMap from './FilterMap';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import NavbarToggle from 'react-bootstrap/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';


var model = {

    buildMarkers: function(){
        var markers = [];

        const muuburger = new model.Marker( {lat:-23.5861822, lng: -46.6801062}, 'Hamburgueria artesanal', 'Muuburger');
        const icarros = new model.Marker( {lat:-23.585512, lng: -46.672682}, 'iCarros', 'iCarros');
        const pavilhaoJapones = new model.Marker( {lat:-23.5859989, lng: -46.6619324}, 'Pavilhão histórico japonês com jardim, carpas e sala de chá, além de hall para exibição de obras de arte.', 'Pavilhão Japonês');
        const bluePub = new model.Marker( {lat:-23.5630475, lng: -46.6503268}, 'The Blue Pub', 'Blue Pub');
        const goodBarber = new model.Marker( {lat:-23.5492413, lng: -46.5690508}, 'Good Barber Barbearia', 'GoodBarber');
        const samsTatuape = new model.Marker( {lat:-23.5441402, lng: -46.5877014}, 'Rede de lojas exclusiva para associados que vende vários itens de mercearia, eletrônicos e UD.', 'Sams club Tatuapé');
        const teatroRenault = new model.Marker( {lat:-23.5542898, lng: -46.6385248}, 'Clássico e renomado, destinado às grandes montagens da Broadway, em casarão tombado pelo patrimônio histórico.', 'Teatro Renault');
        const soulbox = new model.Marker( {lat:-23.5901545, lng: -46.6763188}, 'Academia Soulbox', 'Studio SoulBox');
        const shoppingAnalia = new model.Marker( {lat:-23.5614376, lng: -46.5604314}, 'Shopping Analia Franco', 'Shopping Analia Franco');
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
    }    
}

const markers = model.buildMarkers();

class Neighborhood extends Component {
    
    constructor(props) {
        super(props);
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.toggleMarker = this.toggleMarker.bind(this);
    }

    state = {
        navExpanded: false,
        width: window.innerWidth,
        markers: markers
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

    toggleMarker(markerId){
        console.log('toggleMarker');
        this.setState({
            markers: this.state.markers.map( marker => {
                if(marker.name === markerId){
                    marker.isOpen = !marker.isOpen;
                    return marker;
                }

                return marker;
            })
        });
    }

    render() {
        const { width } = this.state;
        const isDesktop = width >= 991;

        console.table(this.state.markers);
        
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
                            showMarker={this.toggleMarker} />
                        <MapContainer 
                            onCollapse={this.state.navExpanded && !isDesktop} 
                            markers={ this.state.markers } 
                            showMarker={this.toggleMarker} />
                    </div>                    
                </main>
                <footer className="d-inline-flex position-fixed bg-dark">
                    <p className="mt-2">copyright by bla</p>
                </footer>
            </div>
        )
    }
}

export default Neighborhood;
