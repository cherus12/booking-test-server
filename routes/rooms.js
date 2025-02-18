import express from 'express'
import { createRoom, getAllRooms, reserveRooms } from '../controllers/rooms.js'

const route = express.Router()

route.post('/', createRoom)
route.put('/reserve', reserveRooms)
route.get('/', getAllRooms)

export default route
