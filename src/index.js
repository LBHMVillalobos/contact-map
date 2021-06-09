//load leaflet components, styles and icons
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

//This fix the default icon issue
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

//load the dotenv config in order to use the process.env variables
//const regeneratorRuntime = require("regenerator-runtime");
const dotenv = require('dotenv').config();
const axios = require('axios').default;

//Create the uprn from the url parameter
let uprn = new URL(location.href).searchParams.get("uprn");
console.log(uprn);
let map = document.getElementById('map');

//Function that create the map
function createMapLocation(latitude,longitude){
    map = L.map('mapDiv').setView([latitude, longitude], 13);
    L.tileLayer(`https://api.os.uk/maps/raster/v1/zxy/Outdoor_3857/{z}/{x}/{y}.png?key=${process.env.OS_RASTER_API_KEY}`,{
    fadeAnimation: false,
    opacity: 1,
    attribution:
    'Map data &copy; Crown copyright and database rights 2021 <a href="https://www.ordnancesurvey.co.uk/">Ordnance Survey</a> 100019635.' ,
    maxZoom: 19,
    }).addTo(map);
    let marker = L.marker([latitude, longitude]).addTo(map);
};

//Function that get the coordinates from the uprn
function getCoordinates(uprn) {
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
        createMapLocation(latitude,longitude);
    })
};

//If there is a uprn, we get the coordinates and create a map
if (!uprn == ''){
    getCoordinates(uprn);
}
