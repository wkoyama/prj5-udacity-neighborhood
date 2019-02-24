import React, {Component} from 'react'

class Map extends Component {
    constructor(props) {
      super(props);
      this.onScriptLoad = this.onScriptLoad.bind(this);
    }
  
    state = {
        map: {}
    }

    onScriptLoad() {
        const map = new window.google.maps.Map(
            document.getElementById(this.props.id), 
            this.props.opt
        );
        this.props.onMapLoad(map)
        // this.setState({ map:map });
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
    }
  
    buildMapTagScript() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://maps.google.com/maps/api/js?key=AIzaSyAyqlRkzuQkEOFiSYkn198oWO5zwAwKWP0`;
        script.async = true;
        script.defer = true;

        return script;
    }

    render() {
      return (
        <div id={ this.props.id } className="map-container d-inline-flex position-static" style={{ width: '70%', height: '100%' }}  />
      );
    }
  }
  
  export default Map;