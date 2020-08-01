const request = require('request')
const getForecast = (city, callback) => {
    const url = 'http://api.weatherstack.com/forecast?access_key=d2fc6ffc09506552f5c6bd9726b54681&query=' + city + '?language=ar';
    request({
        url,
        json: true
    }, (error, {body} = {error : 'Cannot connect to internet!'}) => {
        if (error || body == undefined) {
            callback(body)
        }
        else  callback(body.request)
    });
}

module.exports = getForecast;