/* (1) Create Nodemon script to start server in package.json file. In scripts in package.json, add "server": "nodemon ./server/server.js". To start server, in terminal type npm run server */

/* (2) Import Node Modules and Express Modules to enable server */
const express = require('express')
const app = express()
const port = 3042
const cors = require('cors') /* Cross resource resource sharing through Connect/Express Middleware. CORS defines a way in which a browser  and server can interact to determine whether it is safe to allow the cross-origin request.[3] It allows for more freedom and functionality than purely same-origin requests, but is more secure than simply allowing all cross-origin requests.*/

/* (3) Bind CORS middleware with app.use() because localhost can have cross origin errors depending on the browser you use! Bind application-level middleware to an instance of the app object by using the app.use() and app.METHOD() functions, where METHOD is the HTTP method of the request that the middleware function handles (such as GET, PUT, or POST) in lowercase*/
app.use(cors())
app.use(express.json())

/* (5) Setup Engine (ejs or pug) static template files in your application. After the view engine is set, you don’t have to specify the engine or load the template engine module in your app */
app.set('view engine', 'ejs')

/* (6) app.get([path], [request, response, next]) function lets you define a route handler for GET requests to a given URL. GET is used to request data from a specified resource. */
app.get('/', (req, res) => {
	// Will return in Terminal
	console.log('Message Ran in Server Terminal')
	// .send() passes the information we want to the user. When the users refreshes or uses the webpage they will receive this data
	// res.send('Hi')
	// sendStatus() tell user there is an error with our server
	// res.sendStatus(500)
	// You can chain on top of each other resolve functions
	// res.sendStatus(500).json({message:error})
	// .json() Sends client a Json Object
	// res.json({ message: 'JSON Object sent to User!' })
	// res.download() will download file in the users file when they refresh the browser
	// res.download('./server/server.js')
	// res.render([html path], [information passed]) will render a file in the path to webpage
	res.render('index', { text: 'World' })
})

/* (4) Run Server using the app.listen([port[, host[, backlog]]][, callback]) function which is used to bind and listen the connections on the specified host and port. The app returned by express() is in fact a JavaScript function, designed to be passed to Node’s HTTP servers as a callback to handle requests. If the port number is omitted or is 0, the operating system will assign an arbitrary unused port, which is useful for cases like automated tasks */
/* To kill server run "npx kill-port ####" in the terminal */
app.listen(port)
