import Head from 'next/head'
import MeetupDetail from '@/components/meetups/MeetupDetail'
import { MongoClient, ObjectId } from 'mongodb'

const MeetupDetails = (props) => {
	const { meetupData } = props
	return (
		<>
			<Head>
				<title>{meetupData.title}</title>
				<meta name='description' content={meetupData.description} />
			</Head>
			<MeetupDetail
				title={meetupData.title}
				image={meetupData.image}
				address={meetupData.address}
				description={meetupData.description}
			/>
		</>
	)
}

export async function getStaticPaths() {
	const client = await MongoClient.connect(
		'mongodb+srv://michaeldragomir:ucUti4lTACUVzlc4@meetupapi.t0kphsk.mongodb.net/?retryWrites=true&w=majority'
	)
	const db = client.db()

	const meetupCollections = db.collection('meetupapi')
	const selectedMeetups = await meetupCollections.find({}, { _id: 1 }).toArray()

	client.close()

	return {
		paths: selectedMeetups.map((meetup) => ({
			params: { meetupId: meetup._id.toString() },
		})),
		fallback: 'blocking',
	}
}

export async function getStaticProps(context) {
	//params is an object where identifier between square brackets are properties where vaules are encoded in url
	const meetupId = context.params.meetupId
	const client = await MongoClient.connect(
		'mongodb+srv://michaeldragomir:ucUti4lTACUVzlc4@meetupapi.t0kphsk.mongodb.net/?retryWrites=true&w=majority'
	)
	const db = client.db()

	const meetupCollections = db.collection('meetupapi')
	const selectedMeetup = await meetupCollections.findOne({
		_id: new ObjectId(meetupId),
	})

	client.close()

	return {
		props: {
			meetupData: {
				id: selectedMeetup._id.toString(),
				title: selectedMeetup.title,
				address: selectedMeetup.address,
				image: selectedMeetup.image,
				description: selectedMeetup.description,
			},
		},
	}
}

export default MeetupDetails
