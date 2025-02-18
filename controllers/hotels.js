import Hotels from '../models/hotels.js'
import Rooms from '../models/rooms.js'

export const getAllHotels = async (req, res) => {
	try {
		const destination = req.query.city

		if (!destination) {
			const hotels = await Hotels.find()
			return res.status(200).json(hotels)
		}

		const hotels = await Hotels.find({ city: destination })

		res.status(200).json(hotels)
	} catch (err) {
		throw err
	}
}

export const createHotels = async (req, res) => {
	try {
		const newHotel = new Hotels(req.body)
		const savedHotel = await newHotel.save()
		res.status(201).json(savedHotel)
	} catch (err) {
		throw err
	}
}

export const createHotelRoom = async (req, res) => {
	try {
		const hotelId = req.params.id
		const room = req.body.rooms
		const hotelFind = await Hotels.findByIdAndUpdate(
			hotelId,
			{
				$push: {
					rooms: room,
				},
			},
			{ new: true }
		)
		res.status(200).json(hotelFind)
	} catch (err) {
		throw err
	}
}

export const getHotelsRooms = async (req, res) => {
	try {
		const findHotel = await Hotels.findById(req.params.id)

		const findRooms = await Rooms.find({ _id: findHotel.rooms })

		res.status(200).json(findRooms)
	} catch (err) {
		throw err
	}
}
