const express = require('express')

const posts = require('./data/helpers/postDb')
const users = require('./data/helpers/userDb')

const server = express()

server.use(express.json())


server.get('/', (req, res, next) => {
    res.send(`
    <h1>Hello</h1>
    `)
})

//POSTS

// - GET all posts

server.get('/api/posts', (req, res, next) => {
    posts
    .get()
    .then(posts => {
        res.json(posts)
    })
    .catch(error => {
        res.status(500).json({  error: err, message: 'Posts could not be retrieved.' })
    })
})

// - GET all posts by id

server.get('/api/posts/:id', (req, res, next) => {
    const { id } = req.params
    posts
    .getById(id)
    .then(post => {
        if (post === 0) {
            return res(404).json({ message: 'The post you\'re looking for cannot be found.' })
        }
        res.json(post)
    })
    .catch(error => {
        res.status(500).json({  error: err, message: 'Posts could not be retrieved.' })
    })
})




module.exports = server