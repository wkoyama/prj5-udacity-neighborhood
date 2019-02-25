import React, {Component} from 'react'
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

class FilterMap extends Component {        
    
    constructor(props) {
        super(props);
        this.handleClickItem = this.handleClickItem.bind(this);
    }

    state = {
        initialItems: [],
        items: [],
        currentMarker: {}
    }

    componentWillMount() {
        this.setState({
            initialItems: this.props.markers,
            items: this.props.markers
        })
    }

    filterList = (event) => {
        var list = this.state.initialItems;

        list = list.filter(function(marker){
            return marker.name.toLowerCase().search(
            event.target.value.toLowerCase()) !== -1;
        });

        this.setState({items: list});
    }

    handleClickItem(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div id="sidebar-wrapper" style={ this.props.onCollapse ? {display:'none'} : {}}>
                <Form inline>
                    <FormControl type="text" placeholder="Search" onChange={this.filterList} className="search-input mr-sm-2" />
                </Form>

                <div id="markers-wrapper">
                    
                    <Nav className="sidebar flex-column bg-dark position-fixed h-100 pt-3">
                        {
                            this.state.items.map( marker => {
                                return (
                                    <div key={marker.name}>
                                    <Nav.Link id={marker.name} key={marker.name} onClick={this.handleClickItem} className="marker-link">
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