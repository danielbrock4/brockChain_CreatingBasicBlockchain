const express = require('express')
const router = express.Router()

/* Middleware runs between the start and end of request by binding it to .use() which applies all functions. Use must be at the stop of the page because JavaScript runs top to bottom. If you want to use middleware once place inside an individual GET or POST Method instead of .use(). You add as many middleware as you want  */
router.use(logger)

/* (Functions) app.get([path], [request, response, next]) function lets you define a route handler for GET requests to a given URL. GET is used to request data from a specified resource. */
// app.get('/', (req, res) => {
// 	// Will return in Terminal
// 	console.log('Message Ran in Server Terminal')
// 	// .send() passes the information we want to the user. When the users refreshes or uses the webpage they will receive this data
// 	// res.send('Hi')
// 	// sendStatus() tell user there is an error with our server
// 	// res.sendStatus(500)
// 	// You can chain on top of each other resolve functions
// 	// res.sendStatus(500).json({message:error})
// 	// .json() Sends client a Json Object
// 	// res.json({ message: 'JSON Object sent to User!' })
// 	// res.download() will download file in the users file when they refresh the browser
// 	// res.download('./server/server.js')
// 	// res.render([html path], [information passed]) will render a file in the path to webpage
// 	res.render('index', { text: 'World' })
// })

// Router replaces the app function. Router will use the name of the js file in router.get('/users') = router.get('/')
/* Static routes should be placed on top because JavaScript runs top to bottom and if dynamic route like ./id will keep running even if static router is called next */
router.get('/', (req, res) => {
	// .query - This allows to access anything queried in the URL with ?=parameter in the URL
	console.log(req.query.name)
	res.send('User List')
})

router.get('/new', (req, res) => {
	// res.send('User New Form')
	/* Access the views file dynamic html ejn files. res.render([html path], [information passed]) will render a file in the path to webpage */
	res.render('users/new', { firstName: 'Test' })
})

router.post('/', (req, res) => {
	const isValid = true // set to false to test else error
	if (isValid) {
		// Add to Users Array
		users.push({ firstName: req.body.firstName })
		// Redirect user to get page to create User. Changes use to brand new URL
		// {users.length - 1} refers last part of the array index number
		res.redirect(`users/${users.length - 1}`)
	} else {
		console.log('error')
		// Even if the call fails its good practice to give back what the user added { firstName: req.body.firstName }
		res.render('users/new', { firstName: req.body.firstName })
	}
	// Access input by the name attribute. You cannot access anything without adding middleware in server file app.use(express.urlencoded({ extended: true }))
	// console.log(req.body.firstName)
	// res.send('Create User')
	// res.send('Hi')
})

/* .get() -> .put() -> .delete() is so common the created .route function to chain them together */
router
	.route('/:id')
	.get((req, res) => {
		console.log(req.user)
		res.send(`Get User With ID ${req.params.id}`)
	})
	.put((req, res) => {
		res.send(`Update User With ID ${req.params.id}`)
	})
	.delete((req, res) => {
		res.send(`Delete User With ID ${req.params.id}`)
	})

const users = [{ name: 'Kyle' }, { name: 'Sally' }]
/* .app.param([name], callback) is middleware that sets the parameter name of the parameter or an array of them for the entire document. This runs before all the (such as GET, PUT, or POST)etc because that requires the user interface.*/
router.param('id', (req, res, next, id) => {
	// 	console.log(id)
	// [] brackets access an array
	// [id] will return the array number of users object
	req.user = users[id]
	// Runs the next() middleware
	next()
})

// // For a dynamic route/URL when deploying an app we use a colon : with parameter name like id
// router.get('/:id', (req, res) => {
// 	//.params calls : colon parameter above. id the parameter we set
// 	// req.params.id
// 	res.send(`Get User With ID ${req.params.id}`)
// })

// /* The app.put() function routes the HTTP PUT requests to the specified path with the specified callback functions. */
// router.put('/:id', (req, res) => {
// 	res.send(`Update User With ID ${req.params.id}`)
// })

// /*app.delete function will delete the r */
// router.delete('/:id', (req, res) => {
// 	res.send(`Delete User With ID ${req.params.id}`)
// })

// Static Routes like this will run with dynamic route above so they should be called before dynamic routers
// router.get('/new', (req, res) => {
// 	res.send('User New Form')
// })

/* Middleware runs between the start and end of request. The middleware example below logs the where the url comes from */
function logger(req, res, next) {
	console.log(req.originalUrl)
	// Runs the next() middleware
	next()
}

module.exports = router
