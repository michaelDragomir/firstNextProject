import Head from 'next/head'
import MeetupList from '@/components/meetups/MeetupList'
import { MongoClient } from 'mongodb'

const HomePage = (props) => {
	return (
		<>
			<Head>
				<title>Next meetup Page</title>
				<meta
					name='description'
					content='this is a starter project to learn Next'
				/>
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	)
}

export async function getStaticProps() {
	const client = await MongoClient.connect(
		'mongodb+srv://michaeldragomir:ucUti4lTACUVzlc4@meetupapi.t0kphsk.mongodb.net/?retryWrites=true&w=majority'
	)
	const db = client.db()

	const meetupCollections = db.collection('meetupapi')

	const meetups = await meetupCollections.find().toArray()
	client.close()

	return {
		props: {
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 1,
	}
}

// export async function getServerSideProps(context) {
// 	const req = context.req //good for authentication
// 	const res = context.res

// 	return {
// 		props: {
// 			meetups: DUMMYPROPS,
// 		},
// 	}
// }

export default HomePage
