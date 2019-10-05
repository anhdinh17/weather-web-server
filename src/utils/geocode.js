const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW5oZGluaDE3IiwiYSI6ImNqeWM3c2FkZDA1cG8zbW8xcHdnMGU5OTEifQ.pvqdscawOkxNMLqF441ziw&limit=1'

    // the original syntax of request is: request({url:url,json:true},(error,response))
    // using OBJECT DESTRUCTING SHORTHAND, we have the syntax below
    // {body} is to destructure the "response" because "response" is an object
    // body will replace response.body
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location services!", undefined);
            // if there's an error then data will be underfined and vice versa
        } else if (body.features.length === 0) { // error if there's no such location
            callback("Unable to find location. Try another search.", undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode