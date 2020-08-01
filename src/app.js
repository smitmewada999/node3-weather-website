const express = require('express');
const path = require('path');
const hbs = require('hbs');
const getForecast = require('./utils/forecast')
const app = express();

app.use(express.static(path.join(__dirname, '../public')))
const viewPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')


app.set('view engine', 'hbs');
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
    if (!req.query.address) {
        res.render('home', {
            error: 'Please provide address.'
        })
    }

    getForecast(req.query.address, (data) => {
        res.render('home', data)
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.render('weather', {
            error: 'provide proper key.'
        })
    }

    getForecast(req.query.address, (data) => {
        res.render('weather', data)
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    } 
        console.log(req.query.search)
        res.send({
        products: []
    })
    
    
})

app.get('/help/*', (req, res) => {
    res.send('<h1> Help article not found! </h1>')
})

// app.get('*', (req, res) => {
//     res.send(` 404 Not Found!! `)
// })

app.listen(3000, () => {
    console.log('Server has started!')
})