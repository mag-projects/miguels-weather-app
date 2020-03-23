const request = require("request");

const key = "pk.eyJ1IjoibWlndWVsMzA0MiIsImEiOiJjazQzcTZ1bmMwYWd1M2txeW1pYXFxa3k4In0.pcOQNge1hrvmiBrSh57HPg";

const geolocation = ((address, callback) => {
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${key}&limit=1`;
    request({url, json: true}, (error, {body}) => {
        if (error) callback("Mapbox services are not available!", undefined);
        else if (body.features.length === 0) callback("Location not found, please try again", undefined);
        else callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                name: body.features[0].place_name
            });
    });
});

module.exports = geolocation;
