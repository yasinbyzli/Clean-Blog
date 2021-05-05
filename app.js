const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const Photo = require('./models/Post')
const Post = require('./models/Post')
const app = express()

mongoose.connect('mongodb://localhost/cleanblog-test-db', {
    useNewUrlParser: true, useUnifiedTopology: true
})



// TEMPLATE ENGİNE
app.set('view engine', 'ejs')

// MIDDLEWARE's
app.use(express.static('public'))

// URL JSON BODY PARSER
app.use(express.urlencoded({extended : true}))
app.use(express.json())

// ROUTE's GET
app.get('/', async (req, res) => {
    const posts = await Post.find({}, (err, data) => {
        if (err) throw err
        return data
    })
    res.render('index', {
        posts
    })
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

app.get('/posts/:id', async (req, res) => {
    let id = req.params.id
    let selectPost = await Post.findById(id, (err, data) => {
        if (err) throw err
        return data
    })
    res.render('post', {
        selectPost
    })
})

// ROUTE's POST
app.post('/post', async (req, res) => {
    await Post.create(req.body)
    res.redirect('/')
})

const port = 5000;

app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port}/ adresinde başlatıldı`)
})