const path = require('path'); // require path to join path with the html file 
const express = require('express');
const hbs = require('hbs'); // because we use hbs files 
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// create an application to use express
const app = express()

// create port to use for herok
const port = process.env.PORT || 3000;

// __dirname is to get the directory of this file
// .. is to go back 1 level, /public is to go to public folder
// this is to let express know that we create a 'public' folder
// and we gonna use this folder's path to create css,img,javascript files 
const publicDirectoryPath = path.join(__dirname, '../public');

// we customize the views path by changing the folder "views" to "templates"
// by default, express only know "views" folder, in order to let express know the 
// new folder, we have to make a new path 
const viewsPath = path.join(__dirname, "../templates/views")

// create a path for partials which is for header and footer 
const partialsPath = path.join(__dirname, "../templates/partials")

// setup handlebars 
// this syntax is to set hbs - hadlebars
// bắt buộc để xài hbs,
// vừa xài cái này, vừa creat path, vừa set path để xài hbs  
app.set('view engine', 'hbs')

// set the path for hbs files, "views" is express default 
app.set('views', viewsPath)

// set the path to partials directory for handelbars: header and footer  
// bắt buộc để xài partials 
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
// this is to set the public folder and app.js 
// so that we can use css,img files


// run index.hbs file as root route 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Root Page',
        name: "Alex"
    })// the parameter must match the name of the hbs file which is 'index'
    // title and name will be injected in index.hbs
})

// /about page 
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Alex Dinh"
    })
})

// /help route
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Route",
        name: "Jennie"
    })
})

// Using query string to fetch the query from users and 
// we also provide the query from back-end.
// this is for the /weather route 
// address means the we type in url /weather?address=<somethin>
app.get('/weather', (req, res) => {
    // if there's no query.address from user
    // req.query.address is /weather?address=<something>
    // req.query.address is the address we type in the url
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address."
        });
    }

    // copy code from weather-app/app.js
    // and modify the code to match this app.js content
    // we make the object destruction = empty string incase there's error,
    // the app doesn't crash. (Check es6 aside: default parameters) 
    geocode(req.query.address, (error, { latitude, longtitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            });
        }
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                });
            }
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })

        })
    });
})

app.get('/help/*', (req, res) => {
    res.render('404-page', {
        title: '404 Help',
        name: 'Alex Dinh',
        errorMessage: "Help article not found"
    })
})

// syntax '*' is for the routes which are not found or which don't match
// any other routes that we have, it should be placed as the last app.get()
app.get('*', (req, res) => {
    res.render('404-page', {
        title: '404',
        name: "Alex Dinh",
        errorMessage: "Page not found."
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000');
})