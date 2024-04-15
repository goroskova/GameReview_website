
/* routes.js */

import { Router } from 'oak'
import HandlebarsEnvironment from 'handlebars'
import { Handlebars } from 'https://deno.land/x/handlebars/mod.ts'
import {getGame, getGames, addGame, addComment, getGames_by_category, getNewGames, getReviews} from "./modules/games.js"
import {Base64} from 'http://deno.land/x/bb64@1.1.0/mod.ts'
import { login, register } from 'accounts'
const router = new Router();
const handle = new Handlebars();


router.get('/', async context => {
	const authorised = await context.cookies.get('authorised')
	const allGames = await getGames();
	const data = { authorised , allGames }
	const body = await handle.renderView('home', data)
	context.response.body = body
	
})

router.get('/New', async context => {
	const authorised = await context.cookies.get('authorised')
	const allGames = await getNewGames();
	const category = 'New'
	const data = { authorised , allGames, category }
	const body = await handle.renderView('home', data)
	context.response.body = body
})


router.post('/add_game', async context => {
	console.log('POST /add_game')
	const authorised = await context.cookies.get('authorised');
	const body = await context.request.body({type: 'form-data'})
	const value = await body.value.read();
	console.log(value.fields)
	try {
		if (authorised == undefined){ontext.response.redirect('/');}
		
		const file = value.files[0];
    const { originalName, filename } = file
		var base64Data= Base64.fromFile(Deno.cwd()+"/public/img/placeholder.jpg").toString()
		value.fields.fileDATA = "data:image/jpeg;base64," +base64Data;

	if(file.originalName != ""){
		base64Data = Base64.fromFile(file.filename).toString()
		value.fields.fileDATA = "data:" +file.contentType +	";base64," +base64Data;
			}
	
		const game = await addGame(value.fields, authorised);
	console.log(game)
		context.response.redirect('/')
	} 
	catch(err) {
		console.log(err)
		context.cookies.set('error', err.message)	
		context.response.redirect('/')
		
	}
})

router.get('/game_details/:id', async context => {
	const authorised = await context.cookies.get('authorised')
	const id = context.params.id;
	const singleGame = await getGame(id);
	const allReviews = await getReviews(id);
	const data = {authorised, singleGame, allReviews}
	const body = await handle.renderView('game_details',data)
	context.response.body = body
})

router.post('/comment', async context => {
	try{
	console.log('post /comment')
	const authorised = await context.cookies.get('authorised')
	const body = await context.request.body({type: 'form-data'})
	const value = await body.value.read();
	console.log(value.fields)
	const comment = await addComment(value.fields, authorised );
	context.response.redirect('/')
	} catch(err) {
		//const error = "Don't use apostrophes"
		context.response.redirect('/')	
		}

})


router.get('/register', async context => {
	const templateString = await Deno.readTextFile("./views/home.hbs")
	const template = HandlebarsEnvironment.compile(templateString)
	const body = template()
	context.response.body = body
})

router.post('/register', async context => {
	try{
	console.log('POST /register')
	const body = context.request.body({ type: 'form' })
	const value = await body.value
	const obj = Object.fromEntries(value)
 	const r = await register(obj)
	console.log("Done!")
	context.response.redirect('/')
	}catch(err){
		const error = err.message
		const authorised = await context.cookies.get('authorised')
		const allGames = await getGames();
		const data = { authorised , allGames, error}
		const body = await handle.renderView('home', data)
		context.response.body = body
		}
})


router.get('/logout', async context => {
  await context.cookies.delete('authorised')
	console.log('Deleted "authorised" ')
  context.response.redirect('/')
})

router.get('/login', async context => {
	const templateString = await Deno.readTextFile("./views/home.hbs")
	const template = HandlebarsEnvironment.compile(templateString)
	const body = template()
	context.response.body = body
})

router.post('/login', async context => {
	console.log('POST /login')
	const body = context.request.body({ type: 'form' })
	const value = await body.value
	const obj = Object.fromEntries(value)
	try {
		const username = await login(obj)
		await context.cookies.set('authorised', username)
		console.log("Logged in as: " + username)
		context.response.redirect('/')
	} 
	catch(err) {
		const error = err.message
		const authorised = await context.cookies.get('authorised')
		const allGames = await getGames();
		const data = { authorised , allGames, error}
		const body = await handle.renderView('home', data)
	context.response.body = body

	}
})

// Categories 

router.get('/Cinematic', async context => {
	const authorised = await context.cookies.get('authorised')
	const category = 'Cinematic'
	const allGames = await getGames_by_category(category);
	const data = { authorised , allGames, category }
	const body = await handle.renderView('home', data)
	context.response.body = body
})
router.get('/Fighting', async context => {
	const authorised = await context.cookies.get('authorised')
	const category = 'Fighting'
	const allGames = await getGames_by_category(category);
	const data = { authorised , allGames, category }
	const body = await handle.renderView('home', data)
	context.response.body = body
})
router.get('/Horror', async context => {
	const authorised = await context.cookies.get('authorised')
	const category = 'Horror'
	const allGames = await getGames_by_category(category);
	const data = { authorised , allGames, category }
	const body = await handle.renderView('home', data)
	context.response.body = body
})
router.get('/MMORPG', async context => {
	const authorised = await context.cookies.get('authorised')
	const category = 'MMORPG'
	const allGames = await getGames_by_category(category);
	const data = { authorised , allGames, category }
	const body = await handle.renderView('home', data)
	context.response.body = body
})
router.get('/MOBA', async context => {
	const authorised = await context.cookies.get('authorised')
	const category = 'MOBA'
	const allGames = await getGames_by_category(category);
	const data = { authorised , allGames, category }
	const body = await handle.renderView('home', data)
	context.response.body = body
})

router.get('/Shooter', async context => {
	const authorised = await context.cookies.get('authorised')
	const category = 'Shooter'
	const allGames = await getGames_by_category(category);
	const data = { authorised , allGames, category }
	const body = await handle.renderView('home', data)
	context.response.body = body
})

router.get('/RTS', async context => {
	const authorised = await context.cookies.get('authorised')
	const category = 'RTS'
	const allGames = await getGames_by_category(category);
	const data = { authorised , allGames, category }
	const body = await handle.renderView('home', data)
	context.response.body = body
})
router.get('/RolePlay', async context => {
	const authorised = await context.cookies.get('authorised')
	const category = 'Role Play'
	const allGames = await getGames_by_category(category);
	const data = { authorised , allGames, category }
	const body = await handle.renderView('home', data)
	context.response.body = body
})
router.get('/Survival', async context => {
	const authorised = await context.cookies.get('authorised')
	const category = 'Survival'
	const allGames = await getGames_by_category(category);
	const data = { authorised , allGames, category }
	const body = await handle.renderView('home', data)
	context.response.body = body
})
router.get('/Strategy', async context => {
	const authorised = await context.cookies.get('authorised')
	const category = 'Strategy'
	const allGames = await getGames_by_category(category);
	const data = { authorised , allGames, category }
	const body = await handle.renderView('home', data)
	context.response.body = body
})



// Footer menu

router.get('/Help', async context => {
	const body = await handle.renderView('help')
	context.response.body = body
})

router.get('/Cookies', async context => {
	const body = await handle.renderView('cookies')
	context.response.body = body
})

router.get('/Privacy', async context => {
	const body = await handle.renderView('privacy')
	context.response.body = body
})
router.get('/AboutUs', async context => {
	const body = await handle.renderView('aboutUs')
	context.response.body = body
})
export default router
