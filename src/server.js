'use strict'

import fs from 'fs'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { createServer } from 'http'
import { HTTP_PORT } from './config'

const start = async () => {

	// Setup server
	const app = express()
	const server = createServer(app)

	// Setup middlewares
	app.use(cors())
	app.use(bodyParser.json())

	// Setup endpoints
	await setupEndpoints(app)

	// Start service
	server.listen(HTTP_PORT, () => console.log(`[HTTP] Listening on port ${HTTP_PORT}`))
}

const setupEndpoints = async app => {

	const files = fs.readdirSync(`${__dirname}/endpoints`)
    
	for (let i = 0; i < files.length; i++) {

		const { default: { method, path, handler } } = await import(`./endpoints/${files[i]}`)

		app[method](path, async (req, res) => {
			console.log(`[HTTP] Request received: ${method.toUpperCase()} ${path}`)
			try {
				res.send(await handler(req.body))
			} catch (err) {
				res.status(400)
				res.send({ error: true, message: err.message })
			}
		})
	}

}

const server = {
	start
}

export default server