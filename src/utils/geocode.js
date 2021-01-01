const request = require('request');

const geocode = (add,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(add)+'.json?access_token=pk.eyJ1Ijoic2huYWxtaWdodHkiLCJhIjoiY2tkd3lwcHNxMTVxOTMwc2d2cDZqODZhaiJ9.zj5KuvXFfFIUTLjnGLD-WQ&limit=1';
    request({ url, json:true },(err,{ body }={})=>{
        if(err){
            callback('Unable to connect to Map Box',undefined);
        }else if(body.features.length===0){
            callback('Enter a valid name',undefined);
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode; 