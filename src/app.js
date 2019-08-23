const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode')


const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sugam Baskota'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Sugam Baskota'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some help text!',
        title: 'Help',
        name: 'Sugam Baskota'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    } else {
        geocode.geocode(req.query.address, (error, {lat, lng, location} = {}) => {

            if (error) {
                return res.send({
                    error
                });
            }
            forecast.forecast(lat, lng, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error
                    });
                }
                res.send({
                    location,
                    forecast: forecastData,
                    address: req.query.address
                });
            });
    
        });
    }
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sugam Baskota',
        errorMessage: 'Help article not found!'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sugam Baskota',
        errorMessage: 'Page not found!'
    }); 
});

app.listen(port, () => {
    console.log('Server started on port ' + port);
});