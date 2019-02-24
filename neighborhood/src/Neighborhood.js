import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import MapContainer from './MapContainer';
import FilterMap from './FilterMap';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import NavbarToggle from 'react-bootstrap/NavbarToggle';


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

class Neighborhood extends Component {

    // render() {
    //     return (
    //         <main className="container">
    //             <h1>Meus marcadores</h1>
    //             <FilterMap markers={ markers }/>
    //             <MapContainer markers={ markers } />
    //         </main>
    //     )
    // }

    state = {
        navExpanded: false
    }

    setNavExpanded(expanded) {
        this.setState({ navExpanded: expanded });
    }
    
    closeNav() {
        this.setState({ navExpanded: false });
    }

    render() {
        return (
            <div>
                <section>
                    <Navbar expand="lg" variant="dark" bg="dark" className="shadow-lg p-3">
                        <span className="navbar-toggler-icon"></span>
                        <h1 className="justify-content-end">Meus marcadores</h1>
                    </Navbar>
                </section>
                <main>
                    
                    <FilterMap markers={ markers }/>
                    <MapContainer markers={ markers } />
                    
                </main>
            </div>
        )
    }
}

export default Neighborhood;
