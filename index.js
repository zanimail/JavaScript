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


function newAddressFromREST(item, RegExp){
    let KeysData = Object.keys(item["data"]).join(" ");
    ListProp = KeysData.match(RegExp);

    let NewAddress ={};
    NewAddress["value"] = item["value"];
    NewAddress["unrestricted_value"] = item["unrestricted_value"];
    if (NewAddress["data"] === undefined) {NewAddress["data"] = {};}
    for (let prop of ListProp) {NewAddress["data"][prop] = item["data"][prop];}
    return NewAddress;
}


async function fetchJSON(url, options){
    const response = await fetch(url, options)
    const result = await response.json()
    let ListNewAddress = await (async (result)=>{
        let ListNewAddress = [];
        for (let item of result.suggestions){
            let NewAddressItem = new newAddressFromREST(item, /\bstreet\b|\bregion\b/gi);
            ListNewAddress.push(NewAddressItem);
        }
        return ListNewAddress;
    }) (result);
    return ListNewAddress;
}   

fetchJSON(url, options).then(ListNewAddress => {
    console.log(ListNewAddress);
});

