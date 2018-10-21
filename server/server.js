const express = require('express')
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')
const _ = require('lodash')

const User = require('./models/user')
const Post = require('./models/post')

const app = express()

app.use(bodyParser.json())

// Root route or directory - Doesn't do any API related stuffs
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Adds new posts
app.post('/posts', (req, res) => {
    
    const body = req.body.comments

    const post = new Post({
        text: req.body.text,
        comments: [{ body }]
    })

    post.save().then(result => {
        res.send({ result })
    }).catch((e) => {
        res.status(400).send(e)
    })
})

// Get all the posts from the server
app.get('/posts', (req, res) => {
    
    Post.find().then((result) => {
        res.send({ result })
    }).catch((e) => {
        res.status(400).send(e)
    })
})

// Get the post with the specific ID
app.get('/posts/:id', (req, res) => {
    
    const id = req.params.id
    
    if (!ObjectId.isValid(id)) {
        res.status(404).send()
    }
    
    Post.findOne({
        _id: id
    }).then((result) => {
        res.send({ result })
    }).catch((e) => {
        res.status(400).send()
    })
})

// Delete the post with the specified ID
app.delete('/posts/:id', (req, res) => {

    const id = req.params.id 
    
    if (!ObjectId.isValid(id)) {
        res.status(404).send()
    }
    
    Post.findOneAndDelete({
        _id: id
    }).then((result) => {
        res.send({ result })
    }).catch((e) => {
        res.status(400).send()
    })
})

// Update the post with the specified ID
app.patch('/posts/:id', (req, res) => {

    const id = req.params.id
    const text = req.body.text
    const body = req.body.body
    
    if (!ObjectId.isValid(id)) {
        res.status(404).send()
    }

    Post.findOneAndUpdate({_id: id}, 
        {$set: { text }, $push: { comments: { body }}}, 
        {new: true}
    ).then((result) => {
        res.send({ result })
    }).catch((e) => {
        res.status(400).send(e)
    })
})

// Creates new User
app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password'])
    const user = new User({...body})
    
    user.save().then((result) => {
        res.send()
    })
})

app.listen(3000, () => {
    console.log('Server is running on 3000!')
})