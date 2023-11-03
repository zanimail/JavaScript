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



function NewObjFromREST (item, Regular)
{
    list_prop = Regular.replace('/', '').replace('/', '').split("|");
    let NewObj ={};
    for (let i of list_prop){
        if (i.includes(".")){
            new_list = i.split(".");
            if (NewObj[new_list[0]] === undefined) NewObj[new_list[0]] = {};
            NewObj[new_list[0]][new_list[1]] = item[new_list[0]][new_list[1]];
        }
        else{
            NewObj[i] = item[i]; 
        }
    }
    return NewObj;
}


async function get_return (movies) {
    var ListResultOdject = []
    for (let item of movies.suggestions){
        let NewObjFromREST_item = new NewObjFromREST(item, '/value|unrestricted_value|data.street|data.region/');
        ListResultOdject.push(NewObjFromREST_item);
    }
    return ListResultOdject;
}


async function fetchMoviesJSON(url, options) {
    const response = await fetch(url, options)
    const movies = await response.json()
    let ListResultOdject = await get_return (movies);
    return ListResultOdject;
}   

fetchMoviesJSON(url, options).then(ListResultOdject => {
    console.log(ListResultOdject);
});
