import {db} from './db.js';
import HandlebarsEnvironment from 'handlebars'

export async function addComment(data, username){
	let sql_user = await db.query("SELECT id FROM accounts WHERE user='"+username+"';")
	let sql_user_id = (sql_user[0])['id'];
	let sql = "INSERT INTO reviews(review_username, review_game_id, review_text, review_rating)VALUES('"+sql_user_id +"','"+ data.game_id+"', '"+ data.comment_text +"','"+ data.rating +"' );"
	let record = await db.query(sql);
	console.log(data.game_id)
	return record;
}

export async function addGame(data, user_id){
	console.log(user_id)
	let sql_user = await db.query("SELECT id FROM accounts WHERE user='"+user_id+"';")
	let sql_user_id = (sql_user[0])['id'];
	//let sql = "INSERT INTO game_details(game_name, game_publisher, game_user_id, game_year_of_release, game_description, game_rate, game_img, game_category)VALUES('"+data.games_name +"','"+ data.publisher  +"', '"+ sql_user_id +"', '"+ data.release_date +"', '"+ data.description +"', '"+ data.rating +"', '"+ data.fileDATA +"', '"+ data.select_category+"' );"
	let sql = "INSERT INTO game_details(game_name, game_publisher, game_user_id, game_year_of_release, game_description, game_rate,new, game_img, game_category)VALUES('"+data.games_name +"','"+ data.publisher  +"', '"+ sql_user_id +"', '"+ data.release_date +"', '"+ data.description +"', '"+ data.rating +"', '"+ 1 +"', '" + data.fileDATA +"', '"+ data.select_category+"' );"
	let record = await db.query(sql);
	console.log(record)
	return record;
}


export async function getGame(id) {
	let sql = "SELECT game_id, game_name, game_publisher, game_user_id, game_year_of_release, game_description, game_category, game_rate, game_img, accounts.user, accounts.id, DATE_FORMAT(game_added_at, '%Y-%m-%d') as game_added_at FROM accounts INNER JOIN game_details ON accounts.id=game_details.game_user_id WHERE game_details.game_id='" + id + "'";
	let record = await db.query(sql);
	console.log(record)
	return record;
}

export async function getReviews(id) {
	let sql = "SELECT review_username, review_game_id, review_text, review_rating, accounts.user, accounts.id, DATE_FORMAT(review_added_at, '%Y-%m-%d') as review_added_at FROM accounts INNER JOIN reviews ON accounts.id=reviews.review_username WHERE reviews.review_game_id='" + id + "' ORDER BY review_added_at DESC";
	let records = await db.query(sql);
	console.log(records)
	return records;
}

export async function getNewGames() {
	let sql = "SELECT*FROM game_details WHERE new='" + 1 + "' ORDER BY game_id DESC";
	let record = await db.query(sql);
	console.log(record)
	return record;
}

export async function getGames() {
	let sql = "SELECT*FROM game_details ORDER BY game_id DESC";
	let records = await db.query(sql);
	return records;
}


export async function getGames_by_category(category){
	let sql = "SELECT*FROM game_details WHERE game_category='" + category + "' ORDER BY game_id DESC";
	let records = await db.query(sql);
	console.log(records)
	return records;
	
}

export async function showMessage(category) {
	const urlParams = new URLSearchParams(window.location.search);
	const word = urlParams.get('word') || 'Fighting'
	console.log(`Category: ${word}`)
	const template = HandlebarsEnvironment.compile('{{word}}:')
	const data = {word}
	const html = template(data)
	document.querySelector(".category_here").innerHTML = html
}

