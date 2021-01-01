const request = require('request');

const forecast = (lat,lon,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=1ab65f91dda55a833f2f6e18980a47a3&query=+'+lat+','+lon;
    request({ url,json:true },(err,{ body }={})=>{
        if(err){
            callback(err,undefined);
        }else if(body.error){
            callback('Invalid credentials',undefined);
        }else{
            callback(undefined,body.current);
        }
    });
};

module.exports = forecast;