export const getAllLinks = () => {
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
            articles.push({"key": articleStr,"value": url});
        }

        return articles;
        
    }).catch (error => {
        console.log(error.message);
    });
}