const request = require('request');

const forecast = (latitude, longtitude, callback) => {
    const url = 'https://api.darksky.net/forecast/713c11580b9b31306e801b394db4eeeb/' + latitude + "," + longtitude;

    // the original syntax of request is: request({url:url,json:true},(error,response))
    // using OBJECT DESTRUCTING SHORTHAND, we have the syntax below
    // {body} is to destructure the "response" because "response" is an object
    // body will replace response.body
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connecto to weather service", undefined);
        } else if (body.error) {
            callback("Unable to find location", undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + "It is " + body.currently.temperature + " degrees out.")
        }
    });
};

module.exports = forecast