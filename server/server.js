/* (1) Create Nodemon script to start server in package.json file. In scripts in package.json, add "server": "nodemon ./server/server.js". To start server, in terminal type npm run server */

/* (2) Import Node Modules and Express Modules to enable server */
const express = require('express')
const app = express()
const port = 3042
const cors = require('cors') /* Cross resource resource sharing through Connect/Express Middleware. CORS defines a way in which a browser  and server can interact to determine whether it is safe to allow the cross-origin request.[3] It allows for more freedom and functionality than purely same-origin requests, but is more secure than simply allowing all cross-origin requests.*/

/* (4) Setup Engine (ejs or pug) dynamic template files in your application. After the view engine is set, you don’t have to specify the engine or load the template engine module in your app */
app.set('view engine', 'ejs')

/* (5) Middleware runs between the start and end of request by binding it to .use() which applies all functions. Use must be at the stop of the page because JavaScript runs top to bottom. If you want to use middleware once place inside an individual GET or POST Method instead of .use(). You add as many middleware as you want  */
// // app.use(logger) - .use() Applies to all cases of the function
/* Add Cors Middleware - Bind CORS middleware with app.use() because localhost can have cross origin errors depending on the browser you use! Bind application-level middleware to an instance of the app object by using the app.use() and app.METHOD() functions, where METHOD is the HTTP method of the request that the middleware function handles (such as GET, PUT, or POST) in lowercase*/
app.use(cors())
// Middleware that allows you access json objects in the body
app.use(express.json())
// Middleware Static File =  Access static files in folder public
app.use(express.static('public'))
// Allows use to access information coming from html forms, because express will not allow you to access the body
app.use(express.urlencoded({ extended: true }))

/* Middleware Path Specific - If you want to use middleware once place inside an individual GET or POST Method instead of .use(). You add as many middleware as you want */
app.get('/hello', logger, logger, logger, (req, res, next) => {
	// res.render([html path], [information passed]) will render a file in the path to webpage
	res.render('helloWorld', { text: 'World' })
})

// (6) Import App functions from Routers File
const userRouter = require('.././routes/users.js')
// const postRouter = require('./routes/post.js')
app.use('/users', userRouter)
// app.use('/posts', postRouter)

/* Middleware runs between the start and end of request. The middleware example below logs the where the url comes from */
function logger(req, res, next) {
	console.log(req.originalUrl)
	// Runs the next() middleware
	next()
}

/* (3) Run Server using the app.listen([port[, host[, backlog]]][, callback]) function which is used to bind and listen the connections on the specified host and port. The app returned by express() is in fact a JavaScript function, designed to be passed to Node’s HTTP servers as a callback to handle requests. If the port number is omitted or is 0, the operating system will assign an arbitrary unused port, which is useful for cases like automated tasks */
/* To kill server run "npx kill-port ####" in the terminal */
app.listen(port)
