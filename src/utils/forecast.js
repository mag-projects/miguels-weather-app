const request = require("request");
const key = "23473d3740d27d17ea4aa449b07f2944";

const forecast = ((coord1, coord2, callback) => {
    const url = `https://api.darksky.net/forecast/${key}/${coord1},${coord2}`;
    request({url, json: true}, (error, {body}) => {
        if (error) callback("Darksky services could not be reached at the moment", undefined);
        else if (body.error) callback("Location was not found, please try again", undefined);
        else callback(undefined, {
                summary: body.daily.data[0].summary,
                high: body.daily.data[0].temperatureHigh,
                low: body.daily.data[0].temperatureLow,
                current: body.currently.temperature,
                rainChance: body.daily.data[0].precipProbability
            });
    });
});

module.exports = forecast;
