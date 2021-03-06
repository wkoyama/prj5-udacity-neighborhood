import React, {Component} from 'react'
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

class FilterMap extends Component {

    render() {
        return (
            <div id="sidebar-wrapper" style={ this.props.onCollapse ? {display:'none'} : {}}>
                <Form inline>
                    <FormControl type="text" placeholder="Search" onChange={this.props.filterList} className="search-input mr-sm-2" />
                </Form>

                <div id="markers-wrapper">
                    
                    <Nav className="sidebar flex-column bg-dark position-fixed h-100 pt-3">
                        {
                            this.props.items.map( marker => {
                                return (
                                    <div key={marker.name}>
                                    <Nav.Link id={marker.name} key={marker.name} onClick={e => {
                                        this.props.showMarker(marker)
                                    }} className="marker-link">
                                        {marker.name}
                                    </Nav.Link>
                                    </div>
                            )})
                        }
                    </Nav>
                </div>
            </div>
        )
    }
}

export default FilterMap