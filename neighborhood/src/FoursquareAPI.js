export const getInfo = (marker) => {
    var location = marker.name;

    fetch(`https://api.foursquare.com/v2/venues/search?near=sao%20paulo,sp&query=${location}&client_id=${foursquare.client_id}&client_secret=${foursquare.client_secret}&v=20190223`, {
        // mode: 'no-cors' // 'cors' by default
        method: "GET"
    })
    .then(response => response.json())
    .then(
        data => data.response.venues[0]
    ).catch (error => {
        console.log(error.message);
    });
}

const foursquare = {
    client_id: 'BSXTYV0PKQWHDYZTYB001AMC3APSSNLLCH13ED1MURMJFHLJ',
    client_secret: 'JHXGWRU23DPQ4IOSYEDWHISQFY441RIKLK5I1EPRZ0MPP2P4'
}