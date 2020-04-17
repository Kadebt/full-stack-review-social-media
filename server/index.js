const express = require('express')
const massive = require('massive')
require('dotenv').config()
const session = require('express-session')
const postCtrl = require('./controller')
const authCtrl = require('./authController')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

const app = express()

app.use(express.json())
app.use(
    session({
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
      secret: SESSION_SECRET,
      
    })
  )
//#auth endpoints
app.post('/auth/login', authCtrl.login)
app.post('/auth/register', authCtrl.register)
app.delete('/auth/logout', authCtrl.logout)
app.get('/auth/user', authCtrl.getUser)



//#auth endpoints
//TODO login, register, logout, getUser
app.get('/api/posts', postCtrl.getPosts)
app.post('/api/posts', postCtrl.addPost)
app.put('/api/posts/:post_id', postCtrl.editPost)
app.delete('/api/posts/:post_id', postCtrl.deletePost)

//#posts endpoints
//TODO get post put delete posts

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
      rejectUnauthorized: false,
    },
  }).then((dbInstance) => {
    app.set('db', dbInstance)
    console.log('Silly db, trix are for kids')
    app.listen(SERVER_PORT, () =>
      console.log(`Crunchatize me cap'n on port ${SERVER_PORT}`)
    )
  })
