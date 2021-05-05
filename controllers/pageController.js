const Post = require('../models/Post')

exports.getAbout = (req, res) => {
    res.render('about')
}

exports.getAddPost = (req, res) => {
    res.render('add_post')
}

exports.getEditPost = async (req, res) => {
    let id = req.params.id
    let selectPost = await Post.findOne({_id : id}, (err, data) => {
        if (err) throw err
        return data
    })
    res.render('edit_post', {
        selectPost
    })
}