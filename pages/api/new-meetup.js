import { MongoClient } from 'mongodb'

//api/new-meetup

async function handler(req, res) {
	if (req.method === 'POST') {
		const data = req.body

		const client = await MongoClient.connect(
			'mongodb+srv://michaeldragomir:ucUti4lTACUVzlc4@meetupapi.t0kphsk.mongodb.net/?retryWrites=true&w=majority'
		)
		const db = client.db()

		const meetupCollections = db.collection('meetupapi')
		await meetupCollections.insertOne(data)
		client.close()
		res.status(201).json({ message: 'inserted successfully' })
	}
}

export default handler
