import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'

dotenv.config()

const app = express()

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001'] }))
app.use(express.json())

const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO)
		console.log('mongo is connected')
	} catch (err) {
		throw err
	}
}

connect()

mongoose.connection.on('connected', () => {
	console.log('MONGO is connected')
})

app.use('/hotels', hotelsRoute)
app.use('/rooms', roomsRoute)

app.listen(process.env.PORT, () => console.log('server is start'))
