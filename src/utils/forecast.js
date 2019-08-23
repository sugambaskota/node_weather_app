const request = require('request');
const forecast = (lat, lng, callback) => {
    const url = 'https://api.darksky.net/forecast/8557d723bb91ec59bec576b93df04c4a/' + encodeURIComponent(lat) + ',' + encodeURIComponent(lng) + '?units=si';
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Bad network condition!', undefined);
        } else if (body.error) {
            callback('Bad latitude and longitude', undefined);
        } else {
            const summary = body.daily.data[0].summary;
            const temperature = body.currently.temperature;
            const precipitation = body.currently.precipProbability * 100;
            callback(undefined, summary + ' It is currently ' + temperature + ' degress out and there is ' + precipitation + ' % chance of raining!');
        }
    });
}

module.exports = {
    forecast: forecast
}