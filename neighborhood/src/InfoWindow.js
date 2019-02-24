import React, { Component } from 'react';
// import { withStyles } from 'material-ui/styles';
// import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
// import Button from 'material-ui/Button';
// import Typography from 'material-ui/Typography';
import * as FoursquareAPI from './FoursquareAPI'


const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
};

function InfoWindow(props) {
  const { classes } = props;

  return (
    <div>
        <ImageCard />
        
    </div>
  );
}

function createInfoWindow(marker) {
       
    var contentString = '';

    FoursquareAPI.getInfo(marker).then(info => {
        console.log(info);
        this.setState(state => ({
            infos: state.infos.push( {"key" : marker.name, "value" : info} )
        }))
    });

    var contentString = '<div id="content">'+
                            '<div id="siteNotice">'+
                            '</div>'+
                            '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
                            '<div id="bodyContent">'+
                            '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
                            'sandstone rock formation in the southern part of the '+
                            'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
                            'south west of the nearest large town, Alice Springs; 450&#160;km '+
                            '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
                            'features of the Uluru - Kata Tjuta National Park. Uluru is '+
                            'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
                            'Aboriginal people of the area. It has many springs, waterholes, '+
                            'rock caves and ancient paintings. Uluru is listed as a World '+
                            'Heritage Site.</p>'+
                            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
                            'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
                            '(last visited June 22, 2009).</p>'+
                            '</div>'+
                            '</div>'

    return <InfoWindow />;
}

function ImageCard (props) {
    let address = 'jk180';

    let streetviewUrl = `https://maps.googleapis.com/maps/api/streetview?location=${address}&size=300x200&key=AIzaSyAyqlRkzuQkEOFiSYkn198oWO5zwAwKWP0`;
    let addressAlt = `${address} view`
    return (
        <img id="local-view" 
        className="card-img"
        src={streetviewUrl}
        alt={addressAlt}
        />
    )
}

export default InfoWindow;