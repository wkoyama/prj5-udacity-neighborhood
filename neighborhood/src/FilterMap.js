import React, {Component} from 'react'
import Nav from 'react-bootstrap/Nav';

class FilterMap extends Component {        
    
    render() {
        return (
            <div style={{ flex : 0.6 }} id="sidebar-wrapper">
                <Nav style={{zIndex:-1}} className="flex-column bg-dark d-inline-block align-self-start position-fixed h-100 p-5">
                    {
                        this.props.markers.map( marker => {
                            return <Nav.Link key={marker.name}>{marker.name}</Nav.Link>
                        })
                    }
                </Nav>
            </div>
        )
    }
}

export default FilterMap