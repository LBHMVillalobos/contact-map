
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
//Function that use a proxy call from the uprn to get the coordinates of the location
getCoordinates = () => {
    console.log("Getting coordinates...");
};

if (!uprn == ''){
    getCoordinates();
    createMap();
} else {
    console.log("UPRN is missing");
}

// GetCoordinates = async() => {
// const res = await fetch(`${process.env.ADDRESSES_API_PROXY_PROD}?format=detailed&uprn=100021051624`);
// const response = await res.json();
// console.log(response);
// };