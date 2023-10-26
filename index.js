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



function NewObjFromREST (value, unrestricted_value, street, region)
{
    return {
    value: value,
    unrestricted_value: unrestricted_value,
    data :{
        street: street,
        region: region,
    },
    }
}



fetch(url, options)
.then(response => response.json())
.then(result =>  {
    var ListResultOdject = []
    for (let item of result.suggestions){
        let NewObjFromREST_item = new NewObjFromREST(item.value, item.unrestricted_value, item.data.street, item.data.region);
        ListResultOdject.push(NewObjFromREST_item);
    }
    return ListResultOdject;})
.then(ListResultOdject => {
    for (let item of ListResultOdject){
        let JsonResultObj =JSON.stringify(item);
        console.log(JsonResultObj);
    }    
})
.catch(error => console.log("error", error));
