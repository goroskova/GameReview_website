
/* accounts.js */

import { compare, genSalt, hash } from 'bcrypt'

import { db } from 'db'

const saltRounds = 10
const salt = await genSalt(saltRounds)

/**
 * Checks user credentials.
 * @param {string} username
 * @param {string} password
 * @returns {string} the username for the valid account
 */
export async function login(data) {
 	let sql = `SELECT count(id) AS count FROM accounts WHERE user="${data.username}";`
 	let records = await db.query(sql)
 	if(!records[0].count) throw new Error(`Username "${data.username}" not found`)
 	sql = `SELECT pass FROM accounts WHERE user = "${data.username}";`
 	records = await db.query(sql)
 	const valid = await compare(data.password, records[0].pass)
 	if (valid === false) throw new Error(`Invalid password for account "${data.username}"`)
 	return data.username
 }
/**
 * Adds x and y.
 * @param {number} x
 * @param {number} y
 * @returns {number} Sum of x and y
 */
export async function register(data) {
	const password = await hash(data.password1, salt)
	if (data.password1 != data.password2) throw new Error(`Passwords don't match`)
	const sql = `INSERT INTO accounts(user, pass) VALUES("${data.username}", "${password}")`
	console.log(sql)
	await db.query(sql)
	return true
}