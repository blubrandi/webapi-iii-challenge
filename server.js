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
        res.status(500).json({  error: err, message: 'The posts information could not be retrieved.' })
    })
})




module.exports = server