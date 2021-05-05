const Post = require('../models/Post')

exports.getAllPosts = async (req, res) => {
    const posts = await Post.find({}, (err, data) => {
        if (err) throw err
        return data
    })
    res.render('index', {
        posts
    })
}

exports.createPost = async (req, res) => {
    await Post.create(req.body)
    res.redirect('/')
}

exports.getPost = async (req, res) => {
    let id = req.params.id
    let selectPost = await Post.findById(id, (err, data) => {
        if (err) throw err
        return data
    })
    res.render('post', {
        selectPost
    })
}

exports.updatePost = async (req, res) => {
    let id = req.params.id;
    await Post.findByIdAndUpdate(
        id, 
        {
            title : req.body.title,
            detail : req.body.detail
        }, 
        {
            new : true
        },
        (err, data) => {
            if (err) throw err
        }
    )
    res.redirect(`/posts/${id}`)
}

exports.deletePost = async (req, res) => {
    let id = req.params.id
    await Post.findByIdAndRemove({_id : id}, (err) => {
        if (err) throw err
    })
    res.redirect('/')
}