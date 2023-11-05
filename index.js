var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
var token = "f92606fbfc9ce05a352e1bc2efcfa9ac86d7ba2f";
var query = "москва хабар";

var options = {
    method: "POST",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + token
    },
    body: JSON.stringify({query: query})
}


function newObjFromREST (item, Regular){
    let KeysData = Object.keys(item["data"]).join(" ");
    ListProp = KeysData.match(Regular);

    let NewObj ={};
    NewObj["value"] = item["value"];
    NewObj["unrestricted_value"] = item["unrestricted_value"];
    if (NewObj["data"] === undefined) {NewObj["data"] = {};}
    for (let prop of ListProp) {NewObj["data"][prop] = item["data"][prop];}
    return NewObj;
}


async function fetchMoviesJSON(url, options) {
    const response = await fetch(url, options)
    const movies = await response.json()
    let ListResultOdject = await (async (movies)=>{
        let ListResultOdject = [];
        for (let item of movies.suggestions){
            let NewObjFromREST_item = new newObjFromREST(item, /\bstreet\b|\bregion\b/gi);
            ListResultOdject.push(NewObjFromREST_item);
        }
        return ListResultOdject;
    }) (movies);
    return ListResultOdject;
}   

fetchMoviesJSON(url, options).then(ListResultOdject => {
    console.log(ListResultOdject);
});

