import React, { Component } from 'react';
// import { withStyles } from 'material-ui/styles';
// import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
// import Button from 'material-ui/Button';
// import Typography from 'material-ui/Typography';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
};

class WikipediaInfo extends Component {
    
    state = {
        links: []
    }

    componentDidMount() {
        console.log('mount');
        var cityStr = 'jk180';
        //&callback=wikiCallback
        fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${cityStr}&format=json&origin=*`, {
            // mode: 'no-cors' // 'cors' by default
            method: "GET"
        })
        .then(response => response.json())
        .then(json => {
            var articleList = json[1];
            var articles = []; 
            for(var i = 0; i < articleList.length; i++) {
                var articleStr = articleList[i];
                var url = "https://en.wikipedia.org/wiki/" + articleStr;
                this.setState(prevState => {
                    links: this.state.links.push({"key": articleStr,"value": url})
                })
            }
            
        }).catch (error => {
            console.log(error.message);
        });
        
    }
    
    render() {
        const { links } = this.state;
        let items = '';
if (this.state.links.length) {
    return <div>
            <ul>
                {this.links.map( link => {
                    <React.Fragment><li key={link.key}><a href={link.value}>{link.key}</a></li></React.Fragment>
                })}
            </ul>
        </div>
}
return null;
        
    }

    // fetch (props) {
    //     var cityStr = 'jk180';
    //     //&callback=wikiCallback
    //     fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${cityStr}&format=json&origin=*`, {
    //         // mode: 'no-cors' // 'cors' by default
    //         method: "GET"
    //     })
    //     .then(response => response.json())
    //     .then(json => {
    //         var articleList = json[1];
    //         for(var i = 0; i < articleList.length; i++) {
    //             var articleStr = articleList[i];
    //             var url = "https://en.wikipedia.org/wiki/" + articleStr;
    //             return  (
    //                 <li key={articleStr}>
    //                     <a href={url}>{articleStr}</a>
    //                 </li>
    //             );
    //         }
    //     }).catch (error => {
    //         console.log(error.message);
    //     });
    // }
}

function Links(props) {
    let links = props.links;
    console.log(links);

    return links.map( link => {
        <React.Fragment><li key={link.key}><a href={link.value}>{link.key}</a></li></React.Fragment>
    });

}

function InfoWindow(props) {
  const { classes } = props;

  return (
    <div>
        <ImageCard />
        <WikipediaInfo />
    </div>
  );
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