
//load the dotenv config in order to use the process.env variables
//const regeneratorRuntime = require("regenerator-runtime");
const dotenv = require('dotenv').config();
const axios = require('axios').default;

//Create the uprn from the url parameter
let uprn = new URL(location.href).searchParams.get("uprn");
console.log(uprn);

let map = document.getElementById("map");

//Function that create the map
createMap = () => {
    console.log("Creating map...");
};

getCoordinates = (uprn) => {
    fetch(`${process.env.ADDRESSES_API_PROXY_PROD}?format=detailed&uprn=${uprn}`, {
      method: "get"
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let results = data.data.data.address;
        let latitude=results[0].latitude;
        let longitude=results[0].longitude;
        console.log(latitude);
        console.log(longitude);
        createMap();
    })
};


if (!uprn == ''){
    getCoordinates(uprn);
} else {
    console.log("UPRN is missing");
}

