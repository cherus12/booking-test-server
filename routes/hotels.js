import express from 'express'
import {
	createHotelRoom,
	createHotels,
	getAllHotels,
	getHotelsRooms,
} from '../controllers/hotels.js'

const router = express.Router()

router.get('/', getAllHotels)
router.get('/:id', getHotelsRooms)
router.post('/', createHotels)
router.put('/room/:id', createHotelRoom)

export default router
