const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();
const port = process.env.PORT || 3000;
const public1= path.join(__dirname,'../public');
const path1 = path.join(__dirname,'../templates/views');
const path2 = path.join(__dirname,'../templates/partials');

//setup views engine
app.set('view engine','hbs');
app.set('views',path1)
hbs.registerPartials(path2);

// nodemon src/app.js -e js,hbs

//setup static directory to serve
app.use(express.static(public1));

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather app',
        name:'Shantanu',
        foot:'Home Page Footer'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Shantanu',
        foot:'About Page footer'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help section',
        name:'Shantanu',
        foot:'Help Page Footer'
    });
});

//Not going to run as use is overriding it with index.html
// app.get('/',(req,res)=>{
//     res.send();
//./css/styles.css
// });

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Kindly provide a city name'
        });
    }
    console.log(`Search Address = ${req.query.address}`);
    const getgeocode = geocode(req.query.address,(err,{latitude,longitude,location}={})=>{
        if(err){
            return res.send({
                error:err
            });
        }else{
            forecast(latitude,longitude,(err,{temperature,humidity,weather_descriptions,wind_speed})=>{
                if(err){
                    return res.send({
                        error:err
                    });
                }else{
                    res.send({
                        Latitude:latitude,
                        Longitude:longitude,
                        Location:location,
                        Temperature:temperature,
                        Humidity:humidity,
                        Weather:weather_descriptions,
                        Windspeed:wind_speed
                    });
                }
            });
        }
    });
});

app.get('/products',(req,res)=>{
    if(!req.query.search){
       //using return keyword we dont have to write below block of code in else 
        res.send({
            error:'You must provide a search term'
        });
    }else{    console.log(req.query);
        res.send({
            products:[]
        });};
});

app.get('/help/*',(req,res)=>{
    res.render('error404',{
        pageinfo:'Help'
    });
});
app.get('/about/*',(req,res)=>{
    res.render('error404',{
        pageinfo:'About'
    });
});
app.get('*',(req,res)=>{
    res.render('error404',{
        name:"Shantanu"
    });
});
app.listen(port,()=>{
    console.log('server started on port 3000');
});