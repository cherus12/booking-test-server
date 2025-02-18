import Rooms from '../models/rooms.js'

export const getAllRooms = async (req, res) => {
	try {
		const allRooms = await Rooms.find()

		res.status(200).json(allRooms)
	} catch (err) {
		throw err
	}
}

export const createRoom = async (req, res) => {
	try {
		const newRoom = new Rooms(req.body)
		const savedRoom = await newRoom.save()

		res.status(200).json(savedRoom)
	} catch (err) {
		throw err
	}
}

export const reserveRooms = async (req, res) => {
	try {
		const date = req.body.date
		const checkedRooms = req.body.checked

		for (let room of checkedRooms) {
			await Rooms.updateOne(
				{ 'roomNumbers._id': room },
				{
					$push: { 'roomNumbers.$.unavailableDates': date },
				}
			)
		}
		res.status(200).json({ success: true })
	} catch (err) {
		throw err
	}
}

const deleteExpiredDates = async () => {
	try {
		const findRooms = await Rooms.find()

		for (let room of findRooms) {
			for (let roomNumber of room.roomNumbers) {
				roomNumber.unavailableDates = roomNumber.unavailableDates.filter(
					date => new Date(date) > new Date()
				)
			}

			await room.save()
		}

		console.log('Expired dates deleted successfully')
	} catch (err) {
		console.error('Error deleting expired dates:', err)
	}
}

const interval = 1000 * 60 * 60

setInterval(deleteExpiredDates, interval)
