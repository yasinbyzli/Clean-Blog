const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const postController = require('./controllers/postControllers')
const pageController = require('./controllers/pageController')

const app = express()

mongoose.connect('mongodb://localhost/cleanblog-test-db', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify : false
})



// TEMPLATE ENGİNE
app.set('view engine', 'ejs')

// MIDDLEWARE's
app.use(express.static('public'))

// URL JSON BODY PARSER
app.use(express.urlencoded({extended : true}))
app.use(express.json())

// DELETE AND UPDATE
app.use(methodOverride('_method', {
    methods : ['POST', 'GET']
}))

// ROUTE's POST 
app.get('/', postController.getAllPosts)
app.put('/posts/:id', postController.updatePost)
app.post('/post', postController.createPost)
app.delete('/posts/:id', postController.deletePost)
app.get('/posts/:id', postController.getPost)
// ROUTE's GET PAGE
app.get('/about', pageController.getAbout)
app.get('/add-post', pageController.getAddPost)
app.get('/post/edit/:id', pageController.getEditPost)




const port = 5000;

app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port}/ adresinde başlatıldı`)
})