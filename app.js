const express = require('express')
const ejs = require('ejs')
const app = express()


// TEMPLATE ENGİNE
app.set('view engine', 'ejs')

// MIDDLEWARE's
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/add-post', (req, res) => {
    res.render('add_post')
})

app.get('/post', (req, res) => {
    res.render('post')
})

const port = 5000;

app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port}/ adresinde başlatıldı`)
})